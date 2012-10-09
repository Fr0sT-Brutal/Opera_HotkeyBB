/*
	HotkeyBB extension for Opera © Fr0sT
	
	Backround script that is executed one time when extension is loaded.
	
	Inits communication between Options page and the injected script.
	Checks version number and shows changelog page
	Inits injected script with localized strings
*/

// Catches messages sent by Preferences page via opera.extension.postMessage
// and marshals them to all other scripts
opera.extension.addEventListener("message",
function(e)
{
	opera.extension.broadcastMessage(e.data);
}
, false);

// Init stuff
opera.extension.addEventListener("connect",
function(e)
{
	// Commands the injected script to init and sends it localized strings it uses
	e.source.postMessage({msg: "HKBB_Init", 
	                      locStrings: {
	                        sEnterTagOption: locStrings.sEnterTagOption, 
	                        sDebugMsg: locStrings.sDebugMsg,
	                        sOn: locStrings.sOn,
	                        sOff: locStrings.sOff}
	                     });
	// check if versions differ
	if (widget.preferences["Version"] == undefined || widget.preferences["Version"] != widget.version)
	{
		widget.preferences["Version"] = widget.version;
		opera.extension.tabs.create({url: "/changelog.html", focused: true});
	}
}
, false);