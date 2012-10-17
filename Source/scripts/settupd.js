/*
	HotkeyBB extension for Opera © Fr0sT

	External script that updates settings to the current format. Used from background script
	on extension connect (load) and from Options page on load and import/merge
*/

// Update settings to the current format.
// If settStr is defined, updates it and returns settings as string.
// Otherwise function updates widget.preferences.
function settUpdate(settStr)
{
	// settings object
/*	var tmpSett;
	if (settStr)
	
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
*/	
	// ... nothing for now ...
	
	
	widget.preferences["Version"] = widget.version;
}