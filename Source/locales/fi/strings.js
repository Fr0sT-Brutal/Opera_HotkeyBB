// Local strings, refer to localize.js for manual

var locStrings =
{
// Common pages
	sFeedback: "Palaute",
	sAnn: "Ilmoitukset (blogi)",
	sChangelog: "Muutosloki",
// Options page
	sPref: "Asetukset",
	sWhatsTitle: "Mikä HotkeyBB?",
	sWhatsPar1: "HotkeyBB on suunniteltu foorumeiden, blogien ja vieraskirjojen viestikenttiä varten. HotkeyBB:llä voit syöttää BB-kooditageja salamannopeasti riippumatta siitä, onko sivustolla valmiita painikkeita BB-koodia varten. Voit syöttää uuden BB-kooditagiparin tai ympäröidä valitun tekstin BB-kooditageilla. Laajennus tukee myös tageja, jotka tarvitsevat parametrin (kuten [tag=&quot;option&quot;]tekstiä[/tag]). Riippuen asetuksista, laajennus käyttää valittua tekstiä parametrina tai kysyy parametria sinulta.",
	sWhatsPar2: 'HotkeyBB tukee myös sivustokohtaisia asetuksia, joiden avulla saat syötetyt tagit vastaamaan sivuston vaatimuksia. Saatavilla olevat asetukset ovat parametrien ympäröiminen lainausmerkeillä, sulkumerkki ( &lt; tai [ ) ja tagin merkkikoko.',
	sWhatsPar3: "<strong>Varoitus!</strong> Laajennus pystyy sieppaamaan KAIKKI näppäinyhdistelmät, joten varo käyttämästä yleisiä yhdistelmiä (kuten Ctrl-Z, Ctrl-X, Ctrl-C, Ctrl-V ja Ctrl-A). Näppäinyhdistelmät tosin siepataan vain, kun tekstialue on kohdistettuna: muulloin yhdistemät toimivat normaalisti.",
	sSiteOptsTitle: "Sivustoasetukset",
	sSiteOptsDescr: "Voit muuttaa tagiasetuksia vastaamaan foorumialustan vaatimuksia.",
	sSiteOptsItem1: "Lainausmerkit — ympäröi parametrit lainausmerkeillä",
	sSiteOptsItem2: "HTML-tagit — käytä HTML-tyylisiä tageja ( &lt;&gt; ) BB-koodin ( [] ) sijaan",
	sSiteOptsItem3: "Isot kirjaimet — syötä tagit isoilla kirjaimilla",
	sDefSiteOptsTitle: "Oletusasetukset",
	sURLHdr: "URL-osoite",
	sQuotesHdr: "Lainausmerkit",
	sHTMLTagHdr: "HTML-tagit",
	sTagUpCaseHdr: "Isot kirjaimet",
	sSiteSpecTitle: "Sivustokohtaiset asetukset",
	sSiteSpecDescr: "URL-osoite — sivuston osoite ilman protokollaprefixiä (\"http://\").<br/> <strong>Huom!</strong> Voit käyttää korvausmerkkejä alidomaineja varten, esimerkkejä: *.diary.ru — täsmää sivustoihin john.diary.ru ja mary.diary.ru; google.* — täsmää sivustoihin google.fi ja google.com; *.livejournal.* — täsmää sivustoihin john.livejournal.com ja diego.livejournal.es.<br/> <strong>Huom:</strong> Elleivät sivustokohtaiset asetukset toimi, voi olla, että tekstikenttä sijaitsee eri sivustossa kuin muu sisältö (näin on esimerkiksi blogspot.com-blogeissa). Siinä tapauksessa kohdista tekstikenttä ja paina debug-näppäinyhdistelmää <em>Ctrl-Vaihto-Alt-F1</em>.",
	sDelOpt: "Poista",
	sAddSiteOpt: "Lisää sivusto",
	sTagListTitle: "Tagiluettelo",
	sTagListDescr: "Tässä on luettelo käytettävissä olevista tageista. Voit vapaasti poistaa ja lisätä niitä.",
	sTagListItem1: "Avaustagi — avaava tagi",
	sTagListItem2: "Sulkutagi — sulkeva tagi; voi olla sama kuin avaava tagi, tyhjä (ts. [tag=&quot;option&quot;]) tai vapaavalintainen",
	sTagListItem3: "Parametri — tagi tarvitsee parametrin (ts. [tag=&quot;option&quot;]tekstiä[/tag])",
	sTagListItem4: "Valinta parametriksi — valittua tekstiä käytetään parametrina",
	sTagListItem5: "Näppäinyhdistelmä — näppäinyhdistelmä, joka syöttää tagin",
	sOpenTag: "Avaustagi",
	sCloseTag: "Sulkutagi",
	sOption: "Parametri",
	sSelToOpt: "Valinta parametriksi",
	sHotkey: "Näppäinyhdistelmä",
	sDelHK: "Poista tagi",
	sAsOpen: "= avaus",
	sNone: "[tyhjä]",
	sEnter: "Oma…",
	sAddTag: "Lisää tagi",
	sSettActions: "Toimenpiteet",
	sExportSett: "Vie",
	sExportSettDescr: "Tallenna HotkeyBB:n asetukset tekstitiedostoon",
	sImportSett: "Tuo",
	sImportSettDescr: "Lataa asetukset tiedostosta (ylikirjoittaa nykyiset asetukset)",
	sMergeSett: "Yhdistä",
	sMergeSettDescr: "Lataa asetukset tiedostosta ja yhdistä ne nykyisten asetusten kanssa",
	sExpTip: "Kopioi tämä teksti ja tallenna se millä tahansa tekstieditorilla (vaikkapa Muistiolla)",
	sImpTip: "Liitä aiemmin tallennetut asetukset allaolevaan kenttään ja paina OK",
	sImpAreUSure: "Tuonti ylikirjoittaa kaikki nykyiset asetukset! Haluatko jatkaa?",
	sImpErr: "Asetuksia tuotaessa tapahtui virhe!",
	sSavenClose: "Tallenna ja sulje",
// Changelog page
	sVersHist: "Versiohistoria",
	sVer: "Ver.",
	sVerHilites: "Suuret muutokset:",
	sVerChanges: "Kaikki muutokset:",
// Script messages
	sEnterTag: "Syötä sulkeva tagi (ei saa olla tyhjä)",
// Injected script messages
	sEnterTagOption: "Syötä parametri <tag>-tagille.\nPaina \"Peruuta\", jos haluat jättää parametrin pois",
	sDebugMsg: "HotkeyBB:n debug-tietoja.\n"+
	           "Sivun osoite: <url>\n"+
	           "Domain: <domain>\n"+
	           "Sivustokohtaiset asetukset:\n"+
	           "   Lainausmerkit <quotes>\n"+
	           "   HTML-tagit <tags>\n"+
	           "   Isot kirjaimet <upcase>",
	sOn: "KÄYTÖSSÄ",
	sOff: "POISSA KÄYTÖSTÄ"
}