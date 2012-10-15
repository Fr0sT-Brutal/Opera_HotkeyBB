/*
	HotkeyBB extension for Opera © Fr0sT
	
	Backround script that is executed one time when extension is loaded.
	
	Inits communication between Options page and the injected script.
	Checks version number and shows changelog page
	Inits injected script with localized strings
*/

// Catches messages sent via opera.extension.postMessage (generally, by Options page)
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

// Init stuff
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

	// check if versions differ
	if (widget.preferences["Version"] == undefined || widget.preferences["Version"] != widget.version)
	{
		widget.preferences["Version"] = widget.version;
		opera.extension.tabs.create({url: "/changelog.html", focused: true});
	}
}
, false);