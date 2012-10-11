// ==UserScript==
// @version 2.8
// @description
//   Adds hotkey ability for textarea elements to quickly insert BB-code tags
// @author Fr0sT
// @other Special thanks to Lanior for valuable tips!
// @warning
// 	 Script intercepts ALL shortcuts including standard ones, so beware of redefining such
// 	 combinations as Ctrl-Z, Ctrl-X, Ctrl-C, Ctrl-V, Ctrl-A
//   ! Script could fail to detect some keystrokes on some OS-es in non-Latin keyboard layouts
//   due to Opera bug with event.keyCode. Unfortunately I can't fix that :( 
// @license
// 	 Any modifications allowed provided this copyright is kept
// @ujs:category browser: enhancements
// ==/UserScript==

// *** Interface section ***

/* GENERAL CONSTANTS - KEEP IN SYNC WITH OPTIONS.JS! */

const MOD_ALT   = 1 << 0;
const MOD_CTRL  = 1 << 1;
const MOD_SHIFT = 1 << 2;

const OPT_QUOTES    = 1 << 0;
const OPT_HTMLTAG   = 1 << 1;
const OPT_TAGUPCASE = 1 << 2;
// default option set: all features switched off
const DEFOPTIONS = 0;
// debug hotkey
const DEBUGHK_MODS = MOD_CTRL | MOD_ALT | MOD_SHIFT;
const DEBUGHK_KEY = 112; // F1

/*
Tag array contains objects with the following fields:
	open:        String  - opening tag
	close:       String  - closing tag; if the same as opening, null value could be used
	hasOption:   Boolean - tag has an option ([open="option"]text[close]
	selToOption: Boolean - selected text would be used as option
	hkmods:      Number  - modifier set for the shortcut
	hkkey:       Char    - literal or digit key for the shortcut
*/
var HKBB_Tags = [];
var HKBB_SiteOptions;            // Option set for current site. Simple integer bit map
var HKBB_EvHandled = false;
var HKBB_DefSiteOptions = DEFOPTIONS;
var currUrl;
var locStrings = null;

// Inserts values into string with patterns
// insPattern("Extension <extname> is <extprop>!", {extname: "HotkeyBB", extprop: "awesome"}) =>
// "Extension HotkeyBB is awesome!"
function insPattern(text, values)
{
	return text.replace(/<(\w*)>/g,
	                    function(str, code)
                        {
                             var res = values[code];
                             return (res == undefined) ? str: res;
                        });
}

function HKBB_OnKeyDown(ev)
{
	// Set this flag if we catched an Event. Default processing will be cancelled
	// This allows to intercept standard Opera shortcuts
	HKBB_EvHandled = false;

	// Filter events without modifier or key code (in this case ev.keyCode == 16/17/18)
	// to launch default handler for the text input ASAP
	if (!ev.altKey && !ev.ctrlKey && !ev.shiftKey) return false;
	if (!ev.keyCode) return false;
	if ((ev.keyCode == 0) || (ev.keyCode == 16) || (ev.keyCode == 17) || (ev.keyCode == 18) ) return false;

	var evKey = String.fromCharCode(ev.keyCode).toUpperCase();
	var evMods = 0;
	if (ev.altKey)   evMods = evMods | MOD_ALT;
	if (ev.ctrlKey)  evMods = evMods | MOD_CTRL;
	if (ev.shiftKey) evMods = evMods | MOD_SHIFT;

	// check for debug hotkey
	if (evMods == DEBUGHK_MODS && ev.keyCode == DEBUGHK_KEY)
	{
		alert(insPattern(locStrings.sDebugMsg, 
                		 {url:   document.URL,
                		 domain: currUrl,
                		 quotes: ((HKBB_SiteOptions & OPT_QUOTES != 0) ? locStrings.sOn : locStrings.sOff),
                		 tags:   ((HKBB_SiteOptions & OPT_HTMLTAG != 0) ? locStrings.sOn : locStrings.sOff),
                		 upcase: ((HKBB_SiteOptions & OPT_TAGUPCASE != 0) ? locStrings.sOn : locStrings.sOff)
                		 }));
		HKBB_EvHandled = true;
		return true;
	}

	// search for the hotkey in our list
	var currtag = null;
	for (var tag in HKBB_Tags)
		if (HKBB_Tags[tag].HKMods == evMods && HKBB_Tags[tag].HKKey == evKey)
			{ currtag = HKBB_Tags[tag]; break; }
	if (currtag == null) return false; // not ours - let it pass
	HKBB_EvHandled = true;
	var Option = null;
	var SelText = null;
	var edit = ev.target ? ev.target : ev.srcElement;
	SelText = edit.value.substring(edit.selectionStart,edit.selectionEnd);

	// determine tag option (if necessary)
	if (currtag.HasOption)
		if (currtag.SelToOption && SelText)
		{	
			Option = SelText;
			SelText = ""; // we moved selected text to option, text inside the tag pair will be empty
		}
		else
			Option = prompt(insPattern(locStrings.sEnterTagOption, {tag: currtag.Open.toUpperCase()}), "");

	// consider site-specific options
	var quote        = (HKBB_SiteOptions & OPT_QUOTES)  != 0 ? '"' : '';
	var openBracket  = (HKBB_SiteOptions & OPT_HTMLTAG) != 0 ? '<' : '[';
	var closeBracket = (HKBB_SiteOptions & OPT_HTMLTAG) != 0 ? '>' : ']';

	// construct the tags
	var opentag = openBracket + 
	              ((HKBB_SiteOptions & OPT_TAGUPCASE) != 0 ? currtag.Open.toUpperCase() : currtag.Open ) +
	              ((Option != null) ? ("="+quote+Option+quote) : "") +
	              closeBracket;
	var closetag;
	// property could be null or undefined if a closing tag is equal to an opening one
	// !!! "== undefined" works both if variable is undefined and null !!!
	if (currtag.Close == undefined)
		closetag = openBracket + "/" + 
		           ((HKBB_SiteOptions & OPT_TAGUPCASE) != 0 ? currtag.Open.toUpperCase() : currtag.Open ) +
		           closeBracket;
	// property could be set to empty string to omit a closing tag (e.g. [img=...url...] )
	else if (currtag.Close == "")
		closetag = "";
	else
		closetag = openBracket + "/" + 
		           ((HKBB_SiteOptions & OPT_TAGUPCASE) != 0 ? currtag.Close.toUpperCase() : currtag.Close) +
		           closeBracket;

	// insert tags
	var selStart = edit.selectionStart;
	edit.value = edit.value.substring(0, selStart) +
	             opentag + SelText + closetag +
	             edit.value.substring(edit.selectionEnd);
	// select the text between tags or just set the cursor there
	edit.selectionStart = selStart + opentag.length;
	edit.selectionEnd = edit.selectionStart + SelText.length;

	return true;
}

// Add event listener which loads preferences from widget storage.
// The message could be sent by background.js when it's connected (i.e. page reloaded)
// and by preferences page when the changes are saved.
opera.extension.addEventListener("message",
function(ev)
{
	// Page is loading, init ourselves (for now, just copy localization strings)
	if (ev.data.msg == "HKBB_Init")
	{
		locStrings = ev.data.locStrings;
		// now load the settings
		ev.data.msg = "HKBB_Load_Settings";
	}

	// Command from Options page to reload settings
	if (ev.data.msg == "HKBB_Load_Settings")
	{
		// load default site options
		try {
			HKBB_DefSiteOptions = parseInt(widget.preferences["DefaultSiteOpts"]);
		} catch(e) {}
	
		// load tag data
		try {
			HKBB_Tags = JSON.parse(widget.preferences["StdTags"]);
		} catch(e) {}
		
		// load site-specific data. SiteOptions might be undefined!
		try {
			var SiteOptions = JSON.parse(widget.preferences["SiteOptions"]);
			// extract current URL (domain name and 1st level domain only) and get option set for it
			currUrl = /^(https?:\/\/|file:\/\/)?(www\.)?([^\/]+)[\/]/.exec(document.URL)[3];
			// search for site option that contain current URL
			if (currUrl !== undefined)
			{
				for (var url in SiteOptions)
				{
					// convert "*.domain.com" URL into RE
					var rePatt=("^"+url+"$").replace(/\./g, "\\.").replace(/\*/g, ".*");
					// check the current URL
					if (new RegExp(rePatt).test(currUrl))
					{
						HKBB_SiteOptions = SiteOptions[url];
						break;
					}
				}		
			}
		} catch(e) {}
		// if HKBB_SiteOptions is null or undefined (no option set for current URL) - set defaults
		if (HKBB_SiteOptions == undefined)
			HKBB_SiteOptions = HKBB_DefSiteOptions;
	}
}
, false);

// We're intercepting ALL events instead of assigning a handler to every textarea 
// to process dynamically created elements
window.opera.addEventListener("BeforeEvent",
function(UserJSEvent)
{
	// only for textarea elements
	if (UserJSEvent.event.target instanceof window.HTMLTextAreaElement)
	{
		var handled = false;
		// catch "keydown" & "keypress"
		if (UserJSEvent.event.type == "keydown")
			handled = HKBB_OnKeyDown(UserJSEvent.event)
		else if (UserJSEvent.event.type == "keypress")
			handled = HKBB_EvHandled;
		// an Event is already handled - so cancel it
		if (handled)
		{
			UserJSEvent.event.stopPropagation();
			UserJSEvent.event.preventDefault();
		}
	}
}
, false);
