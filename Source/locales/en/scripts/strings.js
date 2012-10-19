// Local strings, refer to localize.js for manual

var locStrings =
{
	VERSION: "1.6",
// Common pages
	sHelpTranslating: "Help translating",
	sFeedback: "Feedback",
	sAnn: "Announces (blog)",
	sChangelog: "Changelog",
// Options page
	sPref: "Preferences",
	sWhatsTitle: "What is HotkeyBB?",
	sWhatsPar1: "HotkeyBB is intended for usage in forum/blog/guestbook reply fields. With HotkeyBB you can insert BB-code tags as fast as lightning not depending on BB-code buttons provided. You may simply insert BB-code tag pair or surround the selected text. Complicated tags with option (like [tag=&quot;option&quot;]text[/tag]) are also supported. Depending on tag properties, you'll be prompted for option value or the selected text will be used as option.",
	sWhatsPar2: "HotkeyBB also supports URL-based site-specific options. You may adjust some tag insertion options according to the site requirements. Available options include: quote mode for tag option, tag bracket style (BB-code or HTML) and tag case.",
	sWhatsPar3: "<strong>Warning!</strong> Extension intersepts ALL shortcuts including standard ones, so beware of defining such combinations as Ctrl-Z, Ctrl-X, Ctrl-C, Ctrl-V, Ctrl-A. However this happens only when input focus is within a textarea; when it isn't, shortcuts are working as usual.",
	sSiteOptsTitle: "Site options",
	sSiteOptsDescr: "You may adjust some tag insertion options according to the web engine requirements.",
	sSiteOptsItem1: "<em>Quotes</em> — whether tag options should be surrounded by quotes",
	sSiteOptsItem2: "<em>HTML tag</em> — use HTML-style tags ( &lt;&gt; ) instead of BB-code ( [] )",
	sSiteOptsItem3: "<em>Tag upper case</em> — insert tags in upper case",
	sDefSiteOptsTitle: "Default site options",
	sURLHdr: "URL",
	sQuotesHdr: "Quotes",
	sHTMLTagHdr: "HTML tag",
	sTagUpCaseHdr: "Tags upper case",
	sSiteSpecTitle: "Site-specific options",
	sSiteSpecDescr: "<em>URL</em> — base site address without protocol prefix (\"http://\").</br> <strong>Attention!</strong> You can use wildcards for subdomains, ex.: *.diary.ru — matches john.diary.ru, mary.diary.ru and all the others; google.* — matches google.ru, google.com and all the others; *.livejournal.* — matches john.livejournal.com, diego.livejournal.es and all the others.</br><strong>Note</strong>. If site options won't work, the text input field is probably loaded from other address (for ex., blogspot.com blogs). In this case set focus to text input field and press debug hotkey: <em>Ctrl+Shift+Alt+F1</em>.",
	sDelOpt: "Delete option",
	sAddSiteOpt: "Add site option",
	sTagListTitle: "Tag list",
	sTagListDescr: "Here's the list of all tags available. You may delete any of them and add new ones.",
	sTagListItem1: "<em>Open tag</em> — opening tag",
	sTagListItem2: "<em>Close tag</em> — closing tag; could be the same as opening, null (like [tag=&quot;option&quot;]) or custom",
	sTagListItem3: "<em>Option</em> — tag has an option (like [tag=&quot;option&quot;]text[/tag])",
	sTagListItem4: "<em>Sel to option</em> — selected text would be used as option",
	sTagListItem5: "<em>Hotkey</em> — key combination which will insert the tag",
	sHotkeyWarn: "<strong>Note</strong>. Alt+Key shortcuts won't work because they're considered system combinations (menu item activation).<br/><strong>Note</strong>. HotkeyBB could fail to catch some keystrokes on some OS (Linux, maybe Mac) when non-Latin keyboard layout is active due to Opera bug with event.keyCode (fixed in Opera 12.10b).",
	sOpenTag: "Open tag",
	sCloseTag: "Close tag",
	sOption: "Option",
	sSelToOpt: "Sel to option",
	sHotkey: "Hotkey",
	sDelHK: "Delete hotkey",
	sAsOpen: "= Open",
	sNone: "[None]",
	sEnter: "Enter…",
	sAddTag: "Add tag",
	sSettActions: "Settings actions",
	sExportSett: "Export",
	sExportSettDescr: "Get current HotkeyBB settings as text",
	sImportSett: "Import",
	sImportSettDescr: "Load HotkeyBB settings from text/text file <b>overriding</b> current ones",
	sMergeSett: "Merge",
	sMergeSettDescr: "Load HotkeyBB settings from text/text file and <b>merge</b> with current ones",
	sExpTip: "Copy this text and save it using any text editor",
	sImpTip: "Paste previously saved settings text into field below and hit OK",
	sImpAreUSure: "Import will override all current settings! Continue?",
	sImpErr: "Error importing settings!",
	sUseFileApi: "Import using files",
	sFileApiDescr_File: "Import and merge will be executed via files. Uncheck to use clipboard instead.",
	sFileApiDescr_Clip: "Import and merge will be executed via clipboard. Check to use files instead.",
	sSaveNClose: "Save and close",
// Changelog page
	sVersHist: "Version history",
	sVer: "Ver.",
	sVerHilites: "Version highlites:",
	sVerChanges: "Other changes:",
// Script messages
	sEnterTag: "Enter non-empty closing tag",
	sAltHotkeyWarn: "You entered Alt+Key shortcuts for the following tags:\n{tags}\nThese shortcuts are considered system and WON'T work!\nDo you want to fix that?",
// Injected script messages
	sEnterTagOption: "Enter an option for the tag {tag}.\nCancel this box to omit option",
	sDebugMsg: "HotkeyBB debug info.\n"+
	           "Current URL: {url}\n"+
	           "Domain: {domain}\n"+
	           "Site options:\n"+
	           "   Quotes {quotes}\n"+
	           "   HTML tags {tags}\n"+
	           "   Tag uppercase {upcase}",
	sOn: "ON",
	sOff: "OFF"
}