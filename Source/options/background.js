/*
	HotkeyBB extension for Opera © Fr0sT
	
	Backround script with the only purpose: to link the preferences page and the injected script.
	Saving the changes would notify the script and it would re-read preferences
*/

// Catches messages sent by Preferences page via opera.extension.postMessage
// and marshals them to all other scripts
opera.extension.addEventListener("message",
function(e)
{
	opera.extension.broadcastMessage(e.data);
}
, false);

// Command the injected script to reload settings
opera.extension.addEventListener("connect",
function(e)
{
	e.source.postMessage("HKBB_Load_Settings");
	// check if versions differ
	if (widget.preferences["Version"] == undefined || widget.preferences["Version"] != widget.version)
	{
		widget.preferences["Version"] = widget.version;
		opera.extension.tabs.create({url: "changelog.html", focused: true});
	}
}
, false);