/*
	HotkeyBB extension for Opera © Fr0sT

	A set of routines for use in changelog.html
*/

var changeLog = 
[
	{
		version: "1.6",
		highlights:
		[
			"\"Save and close\" button actually closes Preferences page",
			"Added warnings about Alt+Key shortcuts and shortcuts on Linux when non-Latin layout is active (actual up to Opera 12.10)",
			"Warning box on Preferences page close when tag(s) with Alt+Key shortcut(s) present",
			"Finnish Localization (thanks to Opeeera)",
			"Added link for those who wish to translate HkBB ",
			"Options: added checkbox to select whether import/merge from file or clipboard"
		],
		changes:
		[
			"* Options and Changelog bodies now adjust to the current page width",
			"* CSS: \"transition\" properties added (-o* prefixes are obsolete in Opera 12.50)",
			"* Preferences and Changelog pages have their own titles",
			"* Fixed issue: debug message box shows wrong site options",
			"* Open tag field length limit increased to 40 (some people find rather weird applications for HkBB so they needed more space)",
			"* New default tags: [LIST] and [*] (list element)",
			"* Translation: fixed Export declared to use File API too (when it's not)",
			"+ Translation: added version check (shows warning about probable incompleteness/inactuality of translation)",
			"* Options: fixed Export not saving changes before exporting",
			"* Background script: fixed unnecessary version check on every page load (now checks only on extension load)",
			"+ Options: added credits"
		]
	},

	{
		version: "1.5",
		highlights:
		[
			"Localization support, Russian localization added",
			"Partial urls in site options — now you can match all possible subdomains, like twitter.*",
			"Export, import and merge the settings",
			"Debug hotkey: show current url, domain, site opts. Intended for tracking cases when text areas are loaded into iframes from other addresses",
		],
		changes:
		[
			"* Prefs page: looks a little nicer (checkboxes, comboboxes, edits)"
		]
	},

	{
		version: "1.4",
		highlights:
		[
			"New option \"Default site options\" — set Quotes, HTML, Uppercase modes globally. <b>Old \"Global quote mode\" option is obsolete — re-set the value!</b>",
			"Editable closing tags — now you may enter any value. Tag pairs like &lt;a href=\"\"&gt;...&lt;/a&gt; are possible now.",
			"Version check — keeping you informed of a new features"
		],
		changes:
		[
			"+ Added default item to \"SiteOptions\" list",
			"+ Added license url in config.xml — eliminating warning in error console",
			"+ Feedback and blog links on Prefs page",
			"+ Nicer links style on Prefs page",
			"* Empty tags are ignored on save"
		]
	},
	{
		version: "1.3",
		highlights:
		[
			"Global \"Quote mode\" option — set Quote mode globally for all sites",
		],
		changes:
		[
			"* Quotes are off by default"
		]
	},
	{
		version: "1.2",
		highlights:
		[
			"Initial release"
		],
		changes:
		[
			"+ some cool stuff",
		]
	}	
]

// prepare GUI stuff
window.addEventListener("DOMContentLoaded",
function()
{
	// Set information fields
	document.getElementById("page-title").textContent = widget.name + " - " + locStrings.sChangelog;
	document.getElementById("widget-name").textContent = widget.name;
	
	var footerp = document.getElementById("footer-text");
	footerp.innerHTML =
		widget.name + " <b>" + widget.version + "</b> &copy; " + 
		"<a href=\"mailto:" + widget.authorEmail + "\" title=\"Email " + widget.author + "\">" + widget.author + "</a>";

	// Fill changes list
	var mainDiv = document.getElementById("log");
	var baseDiv = mainDiv.getElementsByTagName("div")[0];
	
	for (var ver in changeLog)
	{
		var newDiv = baseDiv.cloneNode(true);
		newDiv.getElementsByTagName("h3")[0].innerText = 
		    locStrings["sVer"] + " " + changeLog[ver].version;
		var lst = newDiv.getElementsByTagName("ul")[0];
		for (var hl in changeLog[ver].highlights)
			lst.innerHTML += ("<li>" + changeLog[ver].highlights[hl] + "</li>");
		var div = newDiv.getElementsByTagName("div")[0];
		for (var ch in changeLog[ver].changes)
			div.innerHTML += (changeLog[ver].changes[ch] + "<br/>");
		newDiv.style.display = "";
		mainDiv.appendChild(newDiv);
	}
}
, false);