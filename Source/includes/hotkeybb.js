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
	Open:        String  - opening tag
	Close:       String  - closing tag; if the same as opening, null value could be used
	HasOption:   Boolean - tag has an option ([open="option"]text[close]
	SelToOption: Boolean - selected text would be used as option
	HKMods:      Number  - modifier set for the shortcut
	HKKey:       Char    - literal or digit key for the shortcut
*/
var HKBB_Tags = [];
var HKBB_SiteOptions;            // Option set for current site. Simple integer bit map
var HKBB_EvHandled = false;
var HKBB_DefSiteOptions = DEFOPTIONS;
var currUrl;
var locStrings = null;
var settLoaded = false;

// Inserts values into string with patterns
// insPattern("Extension {extname} is {extprop}!", {extname: "HotkeyBB", extprop: "awesome"}) =>
// "Extension HotkeyBB is awesome!"
function insPattern(text, values)
{
	return text.replace(/\{(\w*)\}/g,
	                    function(str, code)
                        {
                             var res = values[code];
                             return (res == undefined) ? str: res;
                        });
}

// Loads current hotkey and tag settings including site-specific ones
// Only called once when a key is pressed
function loadSettings()
{
	// load default site options
	try {
		HKBB_DefSiteOptions = parseInt(widget.preferences["DefaultSiteOpts"]);
	} catch(ex) {}

	// load tag data
	try {
		HKBB_Tags = JSON.parse(widget.preferences["StdTags"]);
	} catch(ex) {}
	
	// load site-specific data. SiteOptions might be undefined!
	HKBB_SiteOptions = null;
	try
	{
		var SiteOptions = JSON.parse(widget.preferences["SiteOptions"]);
		// extract current URL (domain name and 1st level domain only) and get option set for it
		currUrl = /^(https?:\/\/|file:\/\/)?(www\.)?([^\/]+)[\/]/.exec(document.URL)[3];
		// search for site option that contain current URL
		if (currUrl !== undefined)
		{
			for (var url in SiteOptions)
			{
				// convert "*.domain.com" URL into RE "^.*\.domain\.com$"
				var rePatt=("^"+url+"$").replace(/\./g, "\\.").replace(/\*/g, ".*");
				// check the current URL
				if (new RegExp(rePatt).test(currUrl))
				{
					HKBB_SiteOptions = SiteOptions[url];
					break;
				}
			}		
		}
	} catch(ex) {}

	// if HKBB_SiteOptions is null or undefined (no option set for current URL) - set defaults
	if (HKBB_SiteOptions == undefined)
		HKBB_SiteOptions = HKBB_DefSiteOptions;
	
	settLoaded = true;
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

	if (!settLoaded) loadSettings();
	
	var keyCode = ev.keyCode;
	// fix for keycodes on numeric keypad: they come with special keycodes:
	// '0'..'9' are #96..#105 so we need to substract 48
	if (keyCode >= 96 && keyCode <= 105)
		keyCode -= 48;
	// '*'..'/' are #106..#111 so we need to substract 64
	else
	if (keyCode >= 106 && keyCode <= 111)
		keyCode -= 64;

	var evKey = String.fromCharCode(keyCode).toUpperCase();
	var evMods = 0;
	if (ev.altKey)   evMods = evMods | MOD_ALT;
	if (ev.ctrlKey)  evMods = evMods | MOD_CTRL;
	if (ev.shiftKey) evMods = evMods | MOD_SHIFT;

	// check for debug hotkey
	if (evMods == DEBUGHK_MODS && keyCode == DEBUGHK_KEY)
	{
		alert(insPattern(locStrings.sDebugMsg, 
                		 {url:      document.URL,
                		  domain:   currUrl,
                		  sitespec: (HKBB_SiteOptions != HKBB_DefSiteOptions),
                		  quotes:   ((HKBB_SiteOptions & OPT_QUOTES) ? locStrings.sOn : locStrings.sOff),
                		  tags:     ((HKBB_SiteOptions & OPT_HTMLTAG) ? locStrings.sOn : locStrings.sOff),
                		  upcase:   ((HKBB_SiteOptions & OPT_TAGUPCASE) ? locStrings.sOn : locStrings.sOff)
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
	var edit = ev.target ? ev.target : ev.srcElement;
	var selStart = edit.selectionStart;
	var selEnd = edit.selectionEnd;
	var SelText = edit.value.substring(selStart, selEnd);
	// Current tag properties
	var option = null;
	var opentag = null;
	var closetag = null;
	// consider site-specific options
	var quote        = (HKBB_SiteOptions & OPT_QUOTES)  ? '"' : '';
	var openBracket  = (HKBB_SiteOptions & OPT_HTMLTAG) ? '<' : '[';
	var closeBracket = (HKBB_SiteOptions & OPT_HTMLTAG) ? '>' : ']';

	// determine open tag text (if it is an inputable tag)
	if (currtag.Open == "?")
		opentag = prompt(locStrings.sEnterOpenTagText, "");
	else
		opentag = currtag.Open;
	if (opentag == undefined) return; // user cancel

	// determine tag option (if needed)
	if (currtag.HasOption)
		if (currtag.SelToOption && SelText != "")
		{	
			option = SelText;
			SelText = ""; // we moved selected text to option, text inside the tag pair will be empty
		}
		else
			option = prompt(insPattern(locStrings.sEnterTagOption, {tag: opentag.toUpperCase()}), "");

	// determine open tag text (if it is an inputable tag)
	if (currtag.Close == "?")
		closetag = prompt(locStrings.sEnterCloseTagText, "");
	else
		closetag = currtag.Close;

	// construct the tags - process close tag first as it uses value of the open tag
	
	// property could be null or undefined if a closing tag is set to "=Open"
	// !!! "== undefined" works both if variable is undefined and null !!!
	if (closetag == undefined)
		closetag = openBracket + "/" + 
		           ((HKBB_SiteOptions & OPT_TAGUPCASE) ? opentag.toUpperCase() : opentag ) +
		           closeBracket;
	// property could be set to empty string to omit a closing tag (e.g. [img=http://example.com/1.jpg] )
	else if (closetag != "")
		closetag = openBracket + "/" + 
		           ((HKBB_SiteOptions & OPT_TAGUPCASE) ? closetag.toUpperCase() : closetag) +
		           closeBracket;
	opentag = openBracket + 
              ((HKBB_SiteOptions & OPT_TAGUPCASE) ? opentag.toUpperCase() : opentag ) +
              ((option != null) ? ("="+quote+option+quote) : "") +
              closeBracket;
		           
	// check for tag toggle (if selected text is surrounded or contains at its edges the same tag as
	// a user wants to insert, remove it instead of inserting).
	// Only optionless tags are supported!
	if (!currtag.hasOption)
	{
		// che�k if current selection contains tags at its edges
		if (SelText != "")
			if (SelText.substr(0, opentag.length) == opentag &&
			    SelText.substr(SelText.length - closetag.length) == closetag)
			{
				SelText = SelText.substring(opentag.length, SelText.length - closetag.length);
				// insert new selection
				edit.value = edit.value.substring(0, selStart) +
				             SelText +
				             edit.value.substring(selEnd);
				edit.selectionStart = edit.selectionEnd = selStart; // ! move the cursor to selStart to avoid textarea scrolling
				// select inserted text
				edit.selectionStart = selStart;
				edit.selectionEnd = edit.selectionStart + SelText.length;
				
				return true;				
			}
		// che�k if current selection (or cursor position) is surrounded by tags
		if (edit.value.substr(selStart - opentag.length, opentag.length) == opentag &&
		    edit.value.substr(selEnd, closetag.length) == closetag)
		{
			// remove tags
			edit.value = edit.value.substr(0, selStart  - opentag.length) +
			             SelText +
			             edit.value.substring(selEnd + closetag.length);
			edit.selectionStart = edit.selectionEnd = selStart; // ! move the cursor to selStart to avoid textarea scrolling
			// select inserted text
			edit.selectionStart = selStart - opentag.length;
			edit.selectionEnd = edit.selectionStart + SelText.length;
			
			return true;				
		}
	}

	// insert tags
	edit.value = edit.value.substring(0, selStart) +
	             opentag + SelText + closetag +
	             edit.value.substring(selEnd);
	edit.selectionStart = edit.selectionEnd = selStart; // ! move the cursor to selStart to avoid textarea scrolling
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
	switch(ev.data.msg)
	{
		// Page is loading, init (for now, just copy localization strings)
		case "HKBB_Init":
			locStrings = ev.data.locStrings;
		// Command from Options page to reload settings
		case "HKBB_Load_Settings":
			loadSettings();
	}
}
, false);

// We're intercepting ALL events instead of assigning a handler to every textarea 
// to process dynamically created elements
window.opera.addEventListener("BeforeEvent",
function(userJSEvent)
{
	// only for textarea elements
	if (userJSEvent.event.target instanceof window.HTMLTextAreaElement)
	{
		var handled = false;
		// catch "keydown" & "keypress"
		if (userJSEvent.event.type == "keydown")
			handled = HKBB_OnKeyDown(userJSEvent.event)
		else if (userJSEvent.event.type == "keypress")
			handled = HKBB_EvHandled;
		// an Event is already handled - so cancel it
		if (handled)
		{
			userJSEvent.event.stopPropagation();
			userJSEvent.event.preventDefault();
		}
	}
}
, false);
