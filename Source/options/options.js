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
		var closeTag = prompt(locStrings.sEnterTag, "");
		if (closeTag == null || closeTag == "")
			cb.selectedIndex = OPTION_NONE;
		else
			cb.options[cb.selectedIndex].label = closeTag;
	}
	// return default value
	else
	{
		cb.options[OPTION_ENTER].label = locStrings.sEnter;
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

var useFileApi = false;
var mergeMode = false; // if true, imported settings will be merged with current;
                       // if false, they will replace current

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
function settingsToGui(tmp)
{
	// fill default site options
	DefOpsRow = document.getElementById("DefaultSiteOpts").tBodies[0].rows[0];
	getChildByName(DefOpsRow, "Quotes").checked       = ((HKBB_DefSiteOptions & OPT_QUOTES) != 0);
	getChildByName(DefOpsRow, "HTMLTag").checked      = ((HKBB_DefSiteOptions & OPT_HTMLTAG) != 0);
	getChildByName(DefOpsRow, "TagUpCase").checked    = ((HKBB_DefSiteOptions & OPT_TAGUPCASE) != 0);

	// clear tables
	var tbl;
	tbl = document.getElementById("TableSiteOpts");
	for (var i = tbl.tBodies[0].rows.length; i > 1; i--)
		tbl.deleteRow(i);
	tbl = document.getElementById("TableTags");
	for (var i = tbl.tBodies[0].rows.length; i > 1; i--)
		tbl.deleteRow(i);

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
	opera.extension.postMessage({msg: "HKBB_Load_Settings"});
}

// output some warnings on page close if settings are somewhat incorrect
// returns: TRUE - continue closing, FALSE - cancel closing
function checkSettings()
{
	// check for Alt+Key shortcuts
	var s = "";
	for (var tag in HKBB_Tags)
		if (HKBB_Tags[tag].HKMods == MOD_ALT)
			s += "*\t" + HKBB_Tags[tag].Open + "\n";
	if (s != "")
		if (confirm(locStrings.sAltHotkeyWarn.replace("<tags>", s)))
			return false;
	// ...
	
	return true;
}

// user selected a file in Open file dialog
function handleFileSelect(ev)
{
	importSettings(ev.target.files[0]);
}

// export whole settings to a new window
function exportSettings()
{
	var settStr = JSON.stringify(widget.preferences);
	window.open("data:text/plain;,"+escape(settStr));
}

// import settings from a file if File IO available or from textarea otherwise
// param could be:
//    Boolean - merge mode - whether replace current settings or mix with them. This param is used during 1st call only
//    Object - file to import - object of type File. This param is used during 2nd call only
//    Object - FileReader.onload event. This param is used during 3rd call only
function importSettings(param)
{
	var settStr;
	
	// if File API used, this function is called three times with different parameter types
	if (useFileApi)
	{
		// if param is FileReader.onload event, change it to event.target.result
		// it will be the string loaded
		if (param instanceof Event)
			param = param.target.result;
	
		switch (typeof param)
		{
			case "boolean": // 1st call - launch file selection dialog or prompt for settings
				mergeMode = param;
				if (!mergeMode)
					if (!confirm(locStrings.sImpAreUSure))
						return;
				var selFiles = document.getElementById("imp_fileselect");
				selFiles.addEventListener('change', handleFileSelect, false);
				selFiles.click();
				return;
			case "object": // 2nd call (file selected) - read the file
				var reader = new FileReader();
				reader.onload = importSettings;
				reader.onerror = function(err) {alert(locStrings.sImpTip);}
				reader.readAsText(param);
				return;			
			case "string": // 3rd call (file read) - assign the text read to the variable
				settStr = param;
				break;
		} // switch
	}
	else
	{
		settStr = prompt(locStrings.sImpTip, "");
	}	
	
	// parse text and do the job
	if (settStr == undefined || settStr == "") return;
	try
	{
		var newSett = JSON.parse(settStr);
		if (mergeMode)
		{
			guiToSettings(); // ! save any unsaved modifications
			
			// merge tags
			var newTags = JSON.parse(newSett.StdTags);
			for (var tag in newTags)
			{
				var found = false;
				for (var tag1 in HKBB_Tags)
					if (HKBB_Tags[tag1].Open == newTags[tag].Open)
					{
						found = true;
						break;
					}
				// tag not found in current settings, add it
				if (!found)
					HKBB_Tags.push(newTags[tag]);
			}
			// save to settings
			widget.preferences["StdTags"] = JSON.stringify(HKBB_Tags);

			// merge site options
			var newSiteOptions = JSON.parse(newSett.SiteOptions);
			for (var url in newSiteOptions)
				if (!(url in HKBB_SiteOptions))
					HKBB_SiteOptions[url] = newSiteOptions[url];
			// save to settings
			widget.preferences["SiteOptions"] = JSON.stringify(HKBB_SiteOptions);
		}
		else
		{
			widget.preferences = newSett;
		}
		// command the injected script to reload settings
		opera.extension.postMessage({msg: "HKBB_Load_Settings"});
		// redraw
		settingsToGui();
	}
	catch (ex)
	{
		alert(locStrings.sImpErr + "\n" + e.message);
	}
}

// Apply all GUI modifications, check the settings, close page
function btnCloseClick()
{
	guiToSettings();
	if (!checkSettings()) return;
	window.close(); // won't work in Opera 11.6x+
	// we have to do it asyncronously because tabs API is accessible from
	// backround script only
	opera.extension.postMessage({msg: "HKBB_Close_Tab", addr: document.URL});
};

// prepare GUI stuff
window.addEventListener("DOMContentLoaded",
function()
{
	// Set information fields
	document.getElementById("page-title").textContent = widget.name + " - " + locStrings.sPref;
	document.getElementById("widget-name").textContent = widget.name;
	document.getElementById("widget-description").textContent = widget.description;
	
	document.getElementById("close-btn").onclick = btnCloseClick;

	document.getElementById("footer-text").innerHTML =
		widget.name + " <b>" + widget.version + "</b> &copy; " + 
		"<a href=\"mailto:" + widget.authorEmail + "\" title=\"Email " + widget.author + "\">" + widget.author + "</a>";

	useFileApi = (FileReader !== undefined);

	// Load preferences from storage - catch exceptions if values are undefined
	try {
		HKBB_DefSiteOptions = parseInt(widget.preferences["DefaultSiteOpts"]);
	} catch (ex) {}
	try {
		HKBB_Tags = JSON.parse(widget.preferences["StdTags"]);
	} catch (ex) {}
	try {
		HKBB_SiteOptions = JSON.parse(widget.preferences["SiteOptions"]);
	} catch (ex) {}

	// Fill GUI controls with values
	settingsToGui(); 
}
, false);