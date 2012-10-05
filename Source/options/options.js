/*
	HotkeyBB extension for Opera © Fr0sT

	A set of routines for use in options.html
*/

/* TABLE STUFF */

// deletes from a table the row that contains given elem
function deleteRow(elem)
{
	while (elem != null)
	{
		if (elem instanceof window.HTMLTableRowElement)
		{
			elem.parentTable.deleteRow(elem.rowIndex); // ! use our custom field
			break;
		}
		elem = elem.parentNode;
	}
}

// adds a new row to the table identified by tabIdx
function addRow(tabName)
{
	var table = document.getElementById(tabName);
	var pattRow = table.tBodies[0].rows[0];
	var newRow = table.tBodies[0].insertRow(-1);
	newRow.parentTable = table; // ! add a custom property with pointer to the parent table
	newRow.innerHTML = pattRow.innerHTML;
	return newRow;
}

/* COMBOBOX STUFF */

const OPTION_SAMEASOPEN = 0;
const OPTION_NONE       = 1;
const OPTION_ENTER      = 2;

// "close tag" combobox changed
function closeTagCBChange(cb)
{
	// request for tag
	if (cb.selectedIndex == OPTION_ENTER)
	{
		var closeTag = prompt(locStrings["sEnterTag"], "");
		if (closeTag == null || closeTag == "")
			cb.selectedIndex = OPTION_NONE;
		else
			cb.options[cb.selectedIndex].label = closeTag;
	}
	// return default value
	else
	{
		cb.options[OPTION_ENTER].label = locStrings["sEnter"];
	}
}

/* GENERAL CONSTANTS - KEEP IN SYNC WITH INJECTED SCRIPT! */

const MOD_ALT   = 1 << 0;
const MOD_CTRL  = 1 << 1;
const MOD_SHIFT = 1 << 2;

const OPT_QUOTES    = 1 << 0;
const OPT_HTMLTAG   = 1 << 1;
const OPT_TAGUPCASE = 1 << 2;
// default option set: all features switched off
const DEFOPTIONS = 0;

var HKBB_Tags = [];
var HKBB_SiteOptions = {};
var HKBB_DefSiteOptions = DEFOPTIONS;

/* GUI <-> SETTINGS STUFF */

// recursively searches for a child node with specified name
function getChildByName(parent, childName)
{
	var child = null;
	for (var i = 0; i < parent.childNodes.length; i++)
	{
		if (parent.childNodes[i].name == childName)
			return parent.childNodes[i];
		else if (parent.childNodes[i].childNodes)
		{
			child = getChildByName(parent.childNodes[i], childName);
			if (child != null) break;
		}
	}
	return child;
}

// copies current settings to GUI controls
function settingsToGui()
{
	// fill default site options
	DefOpsRow = document.getElementById("DefaultSiteOpts").tBodies[0].rows[0];
	getChildByName(DefOpsRow, "Quotes").checked       = ((HKBB_DefSiteOptions & OPT_QUOTES) != 0);
	getChildByName(DefOpsRow, "HTMLTag").checked      = ((HKBB_DefSiteOptions & OPT_HTMLTAG) != 0);
	getChildByName(DefOpsRow, "TagUpCase").checked    = ((HKBB_DefSiteOptions & OPT_TAGUPCASE) != 0);

	// fill site options table
	for (var url in HKBB_SiteOptions)
	{
		var opt = HKBB_SiteOptions[url];
		var row = addRow("TableSiteOpts");
		getChildByName(row, "URL").value              = url;
		getChildByName(row, "Quotes").checked         = ((opt & OPT_QUOTES) != 0);
		getChildByName(row, "HTMLTag").checked        = ((opt & OPT_HTMLTAG) != 0);
		getChildByName(row, "TagUpCase").checked      = ((opt & OPT_TAGUPCASE) != 0);
	}

	// fill tags table
	for (var tag in HKBB_Tags)
	{
		var row = addRow("TableTags");
		getChildByName(row, "OpenTag").value          = HKBB_Tags[tag].Open;
		if (HKBB_Tags[tag].Close == undefined)
			getChildByName(row, "CloseTag").selectedIndex = OPTION_SAMEASOPEN;
		else if (HKBB_Tags[tag].Close == "")
			getChildByName(row, "CloseTag").selectedIndex = OPTION_NONE;
		else
		{
			var cb = getChildByName(row, "CloseTag");
			cb.selectedIndex = OPTION_ENTER;
			cb.options[cb.selectedIndex].label = HKBB_Tags[tag].Close;			
		}
		getChildByName(row, "HasOption").checked      = HKBB_Tags[tag].HasOption;
		getChildByName(row, "SelToOpt").checked       = HKBB_Tags[tag].SelToOption;
		getChildByName(row, "ModCtrl").checked        = ((HKBB_Tags[tag].HKMods & MOD_CTRL) != 0);
		getChildByName(row, "ModAlt").checked         = ((HKBB_Tags[tag].HKMods & MOD_ALT) != 0);
		getChildByName(row, "ModShift").checked       = ((HKBB_Tags[tag].HKMods & MOD_SHIFT) != 0);
		getChildByName(row, "Key").value              = HKBB_Tags[tag].HKKey;
	}
}

// re-fills current settings with values of GUI controls
function guiToSettings()
{
	// re-fill default site options
	DefOpsRow = document.getElementById("DefaultSiteOpts").tBodies[0].rows[0];
	HKBB_DefSiteOptions = 0;
	if (getChildByName(DefOpsRow, "Quotes").checked)
		HKBB_DefSiteOptions |= OPT_QUOTES;
	if (getChildByName(DefOpsRow, "HTMLTag").checked)
		HKBB_DefSiteOptions |= OPT_HTMLTAG;
	if (getChildByName(DefOpsRow, "TagUpCase").checked)
		HKBB_DefSiteOptions |= OPT_TAGUPCASE;
	widget.preferences["DefaultSiteOpts"] = HKBB_DefSiteOptions.toString();

	// re-fill site options
	HKBB_SiteOptions = {};
	var rows = document.getElementById("TableSiteOpts").tBodies[0].rows;
	for (var row = 1; row < rows.length; row++)
	{
		var url = getChildByName(rows[row], "URL").value;
		if (url == "") continue; // skip empty addresses
		var opt = 0;
		if (getChildByName(rows[row], "Quotes").checked)
			opt |= OPT_QUOTES;
		if (getChildByName(rows[row], "HTMLTag").checked)
			opt |= OPT_HTMLTAG;
		if (getChildByName(rows[row], "TagUpCase").checked)
			opt |= OPT_TAGUPCASE;
		HKBB_SiteOptions[url] = opt;
	}
	widget.preferences["SiteOptions"] = JSON.stringify(HKBB_SiteOptions);

	// re-fill tags
	HKBB_Tags = [];
	var rows = document.getElementById("TableTags").tBodies[0].rows;
	for (var row = 1; row < rows.length; row++)
	{
		var Tag = new Object();
		Tag.Open        = getChildByName(rows[row], "OpenTag").value.toLowerCase();
		if (Tag.Open == "") continue; // skip empty tags
		var cb = getChildByName(rows[row], "CloseTag");
		switch (cb.selectedIndex)
		{
			case OPTION_SAMEASOPEN : Tag.Close = null; break;
			case OPTION_NONE       : Tag.Close = ""; break;
			case OPTION_ENTER      : Tag.Close = cb.options[cb.selectedIndex].label; break;
		}
		Tag.HasOption   = getChildByName(rows[row], "HasOption").checked;
		Tag.SelToOption = getChildByName(rows[row], "SelToOpt").checked;
		Tag.HKMods      = 0;
		if (getChildByName(rows[row], "ModCtrl").checked)
			Tag.HKMods |= MOD_CTRL;
		if (getChildByName(rows[row], "ModAlt").checked)
			Tag.HKMods |= MOD_ALT;
		if (getChildByName(rows[row], "ModShift").checked)
			Tag.HKMods |= MOD_SHIFT;
		// store upper-cased keys
		Tag.HKKey       = getChildByName(rows[row], "Key").value.toUpperCase();
		HKBB_Tags.push(Tag);
	}
	widget.preferences["StdTags"] = JSON.stringify(HKBB_Tags);

	// command the injected script to reload settings
	opera.extension.postMessage("HKBB_Load_Settings");
}

// prepare GUI stuff
window.addEventListener("DOMContentLoaded",
function()
{
	// Set information fields
	document.getElementById("widget-title").textContent = widget.name;
	document.getElementById("widget-name").textContent = widget.name;
	document.getElementById("widget-description").textContent = widget.description;

	var footerp = document.getElementById("footer-text");
	footerp.innerHTML =
		widget.name + " <b>" + widget.version + "</b> &copy; " + 
		"<a href=\"mailto:" + widget.authorEmail + "\" title=\"Email " + widget.author + "\">" + widget.author + "</a>";

	// Load preferences from storage - catch exceptions if values are undefined
	try {
		HKBB_DefSiteOptions = parseInt(widget.preferences["DefaultSiteOpts"]);
	} catch (e) {}
	try {
		HKBB_Tags = JSON.parse(widget.preferences["StdTags"]);
	} catch (e) {}
	try {
		HKBB_SiteOptions = JSON.parse(widget.preferences["SiteOptions"]);
	} catch (e) {}

	// Fill GUI controls with values
	settingsToGui(); 
}
, false);