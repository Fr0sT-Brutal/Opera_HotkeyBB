/*
	HotkeyBB extension for Opera © Fr0sT
	
	Backround script that is executed one time when extension is loaded.
	
	Inits communication between Options page and the injected script.
	Checks version number and shows changelog page
	Adds some initing handlers
*/

// Add handler to catch messages sent via opera.extension.postMessage (generally, by Options page)
opera.extension.addEventListener("message",
function(ev)
{
	switch (ev.data.msg)
	{
		// Settings must be reloaded - marshal the message to all injected scripts
		case "HKBB_Load_Settings":
			opera.extension.broadcastMessage(ev.data);
			break;
		// close Options page - since window.close() doesn't work, it's the only way
		case "HKBB_Close_Tab":
			// Search for tab with given address among all opened tabs and close it
			var tabs = opera.extension.tabs.getAll();
			for (var tab in tabs)
				if (tabs[tab].url == ev.data.addr)
					tabs[tab].close();
			break;
	}
}
, false);

// Add handler to creation of injected script, popup, or preferences environment - init stuff
opera.extension.addEventListener("connect",
function(ev)
{
	// Commands the injected script to init and sends it localized strings it uses
	ev.source.postMessage({msg: "HKBB_Init", 
	                      locStrings: {
	                        sEnterTagOption: locStrings.sEnterTagOption, 
	                        sDebugMsg: locStrings.sDebugMsg,
	                        sOn: locStrings.sOn,
	                        sOff: locStrings.sOff}
	                     });
}
, false);

// Check if current extension version differs from saved one (detecting extension update)
if (widget.preferences["Version"] == undefined || widget.preferences["Version"] != widget.version)
{
	// load settings updater
	var fileref = document.createElement('script')
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", "/scripts/settupd.js");
	if (window.fileref != undefined)
	{
		document.getElementsByTagName("head")[0].appendChild(fileref);
		// Update settings to current format. Script isn't loaded immediately so execute
		// needed function only when it finishes loading
		fileref.onload = function() { settUpdate(); }
	}
	opera.extension.tabs.create({url: "/changelog.html", focused: true});
}