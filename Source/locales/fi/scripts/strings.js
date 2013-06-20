// Local strings, refer to localize.js for manual

var locStrings =
{
	VERSION: "1.7",
// Common pages
	sHelpTranslating: "Auta kääntämisessä"
	sFeedback: "Palaute",
	sAnn: "Ilmoitukset (blogi)",
	sChangelog: "Muutosloki",
// Options page
	sPref: "Asetukset",
	sWhatsTitle: "Mikä HotkeyBB?",
	sWhatsPar1: "HotkeyBB on suunniteltu foorumeiden, blogien ja vieraskirjojen viestikenttiä varten. HotkeyBB:llä voit syöttää BB-kooditageja salamannopeasti riippumatta siitä, onko sivustolla valmiita painikkeita BB-koodia varten. Voit syöttää uuden BB-kooditagiparin tai ympäröidä valitun tekstin BB-kooditageilla. Laajennus tukee myös tageja, jotka tarvitsevat parametrin (kuten [tag=&quot;option&quot;]tekstiä[/tag]). Riippuen asetuksista, laajennus käyttää valittua tekstiä parametrina tai kysyy parametria sinulta.",
	sWhatsPar2: "HotkeyBB tukee myös sivustokohtaisia asetuksia, joiden avulla saat syötetyt tagit vastaamaan sivuston vaatimuksia. Saatavilla olevat asetukset ovat parametrien ympäröiminen lainausmerkeillä, sulkumerkki ( &lt; tai [ ) ja tagin merkkikoko.",
	sWhatsPar3: "<strong>Varoitus!</strong> Laajennus pystyy sieppaamaan KAIKKI näppäinyhdistelmät, joten varo käyttämästä yleisiä yhdistelmiä (kuten Ctrl-Z, Ctrl-X, Ctrl-C, Ctrl-V ja Ctrl-A). Näppäinyhdistelmät tosin siepataan vain, kun tekstialue on kohdistettuna: muulloin yhdistelmät toimivat normaalisti.",
	sSiteOptsTitle: "Sivustoasetukset",
	sSiteOptsDescr: "Voit muuttaa tagiasetuksia vastaamaan foorumialustan vaatimuksia.",
	sSiteOptsItem1: "<em>Lainausmerkit</em> — ympäröi parametrit lainausmerkeillä",
	sSiteOptsItem2: "<em>HTML-tagit</em> — käytä HTML-tyylisiä tageja ( &lt;&gt; ) BB-koodin ( [] ) sijaan",
	sSiteOptsItem3: "<em>Isot kirjaimet</em> — syötä tagit isoilla kirjaimilla",
	sDefSiteOptsTitle: "Oletusasetukset",
	sURLHdr: "URL-osoite",
	sQuotesHdr: "Lainausmerkit",
	sHTMLTagHdr: "HTML-tagit",
	sTagUpCaseHdr: "Isot kirjaimet",
	sSiteSpecTitle: "Sivustokohtaiset asetukset",
	sSiteSpecDescr: "<em>URL-osoite</em> — sivuston osoite ilman protokollaprefixiä (\"http://\").<br/> <strong>Huom!</strong> Voit käyttää korvausmerkkejä alidomaineja varten, esimerkkejä: *.diary.ru — täsmää sivustoihin john.diary.ru ja mary.diary.ru; google.* — täsmää sivustoihin google.fi ja google.com; *.livejournal.* — täsmää sivustoihin john.livejournal.com ja diego.livejournal.es.<br/> <strong>Huom:</strong> Elleivät sivustokohtaiset asetukset toimi, voi olla, että tekstikenttä sijaitsee eri sivustossa kuin muu sisältö (näin on esimerkiksi blogspot.com-blogeissa). Siinä tapauksessa kohdista tekstikenttä ja paina debug-näppäinyhdistelmää <em>Ctrl-Vaihto-Alt-F1</em>.",
	sDelOpt: "Poista",
	sAddSiteOpt: "Lisää sivusto",
	sTagListTitle: "Tagiluettelo",
	sTagListDescr: "Tässä on luettelo käytettävissä olevista tageista. Voit vapaasti poistaa ja lisätä niitä.",
	sTagListItem1: "<em>Avaustagi</em> — avaava tagi. If set to &quot;?&quot;, you will be prompted for the tag text",
	sTagListItem2: "<em>Sulkutagi</em> — sulkeva tagi; voi olla sama kuin avaava tagi, tyhjä (ts. [tag=&quot;option&quot;]) tai vapaavalintainen. If set to &quot;?&quot;, you will be prompted for the tag text",
	sTagListItem3: "<em>Parametri</em> — tagi tarvitsee parametrin (ts. [tag=&quot;option&quot;]tekstiä[/tag])",
	sTagListItem4: "<em>Valinta parametriksi</em> — valittua tekstiä käytetään parametrina",
	sTagListItem5: "<em>Näppäinyhdistelmä</em> — näppäinyhdistelmä, joka syöttää tagin",
	sHotkeyWarn: "<strong>Huom:</strong> Alt-näppäin -yhdistelmät eivät toimi, koska ne on varattu järjestelmän käyttöön (niillä aktivoidaan valikon toimintoja).<br/><strong>Huom:</strong> HotkeyBB ei välttämättä pysty sieppaamaan näppäinyhdistelmiä joillakin käyttöjärjestelmillä (GNU/Linux, ehkä myös Mac OS X), jos käytössä on esimerkiksi venäläinen tai kreikkalainen näppäimistö. Kyseessä on Operan bugi event.keyCode:n kanssa (korjattu versiossa 12.10).",
	sOpenTag: "Avaustagi",
	sCloseTag: "Sulkutagi",
	sOption: "Parametri",
	sSelToOpt: "Valinta parametriksi",
	sHotkey: "Näppäinyhdistelmä",
	sDelTag: "Poista tagi",
	sAsOpen: "= avaus",
	sNone: "[tyhjä]",
	sEnter: "Oma…",
	sAddTag: "Lisää tagi",
	sSettActions: "Toimenpiteet",
	sExportSett: "Vie",
	sExportSettDescr: "Näytä HotkeyBB:n asetukset tekstimuodossa tallentamista varten",
	sImportSett: "Tuo",
	sImportSettDescr: "Lataa asetukset tekstistä/tiedostosta (<b>ylikirjoittaa</b> nykyiset asetukset)",
	sMergeSett: "Yhdistä",
	sMergeSettDescr: "Lataa asetukset tekstistä/tiedostosta ja <b>yhdistä</b> ne nykyisten asetusten kanssa",
	sExpTip: "Kopioi tämä teksti ja tallenna se millä tahansa tekstieditorilla (vaikkapa Muistiolla)",
	sImpTip: "Liitä aiemmin tallennetut asetukset allaolevaan kenttään ja paina OK",
	sImpAreUSure: "Tuonti ylikirjoittaa kaikki nykyiset asetukset! Haluatko jatkaa?",
	sImpErr: "Asetuksia tuotaessa tapahtui virhe!",
	sUseFileApi: "Tuo tiedostosta",
	sFileApiDescr_File: "Asetukset tuodaan/yhdistetään tiedostosta. Poista valinta, jos haluat käyttää leikepöytää.",
	sFileApiDescr_Clip: "Asetukset tuodaan/yhdistetään leikepöydältä. Poista valinta, jos haluat käyttää tiedostoa.",
	sSaveNClose: "Tallenna ja sulje",
// Changelog page
	sVersHist: "Versiohistoria",
	sVer: "Ver.",
	sVerHilites: "Suuret muutokset:",
	sVerChanges: "Pienet muutokset:",
// Script messages
	sEnterTag: "Syötä sulkeva tagi (ei saa olla tyhjä)",
	sAltHotkeyWarn: "Syötit Alt-näppäin -yhdistelmiä seuraaville tageille:\n{tags}\nAlt-näppäin -yhdistelmät on varattu järjestelmän käyttöön, joten ne EIVÄT tule toimimaan!\nHaluatko korjata syöttämäsi näppäinyhdistelmät?",
// Injected script messages - don't forget to add new entries in \scripts\background.js:opera.extension.addEventListener("connect")!
	sEnterTagOption: "Syötä parametri {tag}-tagille.\nPaina \"Peruuta\", jos haluat jättää parametrin pois",
	sEnterOpenTagText: "Enter opening tag.\nCancel this box to omit tag insertion",
	sEnterCloseTagText: "Enter closing tag.",
	sDebugMsg: "HotkeyBB:n debug-tietoja.\n"+
	           "Sivun osoite: {url}\n"+
	           "Domain: {domain}\n"+
	           "Sivustokohtaiset asetukset:\n"+
	           "   Lainausmerkit {quotes}\n"+
	           "   HTML-tagit {tags}\n"+
	           "   Isot kirjaimet {upcase}",
	sOn: "KÄYTÖSSÄ",
	sOff: "POISSA KÄYTÖSTÄ"
}