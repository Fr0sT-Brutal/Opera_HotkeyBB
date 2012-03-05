/*
	HotkeyBB extension for Opera © Fr0sT

	A set of routines for use in changelog.html
*/

var changeLog = 
[
	{
		version: "1.4",
		highlights:
		[
			"New option \"Default site options\" - set Quotes, HTML, Uppercase modes globally. <b>Old \"Global quote mode\" option is obsolete - re-set the value!</b>",
			"Editable closing tags - now you may enter any value. Tag pairs like &lt;a href=\"\"&gt;...&lt;/a&gt; are possible now.",
			"Version check - keeping you informed of a new features"
		],
		changes:
		[
			"+ Added default item to \"SiteOptions\" list",
			"+ Added license url in config.xml - eliminating warning in error console",
			"+ New option \"Default site options\" - set Quotes, HTML, Uppercase modes globally",
			"+ Feedback and blog links on Prefs page",
			"+ Nicer links style on Prefs page",
			"* Empty tags are ignored on save",
			"+ Editable closing tags",
			"+ Version check"
		]
	},
	{
		version: "1.3",
		highlights:
		[
			"Global \"Quote mode\" option - set Quote mode globally for all sites",
		],
		changes:
		[
			"+ Global \"Quote mode\" option",
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
	document.getElementById("widget-title").textContent = widget.name;
	document.getElementById("widget-name").textContent = widget.name;
	
	var footerp = document.getElementById("footer-text");
	footerp.innerHTML =
		widget.name + " <b>" + widget.version + "</b> &copy; " + 
		"<a href=\"mailto:" + widget.authorEmail + "\" title=\"Email " + widget.author + "\">" + widget.author + "</a>";

	// Fill changes list
	div = document.getElementById("log");
	for (var ver in changeLog)
	{
		div.innerHTML += ("<h3>Ver. " + changeLog[ver].version + "<h3>");
		div.innerHTML += "<h4>Version highlights:</h4>";
		div.innerHTML += "<font color=\"#fff\"><ul>";
		for (var hl in changeLog[ver].highlights)
			div.innerHTML += ("<li>" + changeLog[ver].highlights[hl] + "</li>");
		div.innerHTML += "</ul>";
		div.innerHTML += "<h4>Version changes:</h4>";
		for (var ch in changeLog[ver].changes)
			div.innerHTML += (changeLog[ver].changes[ch] + "<br/>");
		div.innerHTML += "<hr>";
	}
}
, false);