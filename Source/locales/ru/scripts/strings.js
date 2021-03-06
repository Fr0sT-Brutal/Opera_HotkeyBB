﻿// Local strings, refer to localize.js for manual

var locStrings =
{
	VERSION: "1.7",
// Common pages
	sHelpTranslating: "Помочь переводом",
	sFeedback: "Отзывы",
	sAnn: "Анонсы (блог)",
	sChangelog: "История версий",
// Options page
	sPref: "Настройки",
	sWhatsTitle: "Что такое HotkeyBB?",
	sWhatsPar1: "HotkeyBB предназначен для использования в полях ответа на форумах, блогах, гостевых книгах. С HotkeyBB вы можете молниеносно вставлять теги BB-кодов, не завися от набора кнопок, предоставляемого дизайном сайта. Можно просто вставлять пару тегов или обрамлять ими выделенный текст. Поддерживаются теги с параметрами (как [tag=&quot;парам&quot;]текст[/tag]). В зависимости от настроек тега, будет выдан запрос на ввод параметра либо выделенный текст будет использован как параметр.",
	sWhatsPar2: 'HotkeyBB также поддерживает персональные настройки для каждого сайта (на основе URL). Вы можете настроить некоторые опции вставки тегов в соответствии с требованиями движка сайта. Доступные для настройки следующие опции: применение кавычек для параметров, стиль скобки тега (BB-код или HTML) и регистр тега.',
	sWhatsPar3: "<strong>Внимание!</strong> Расширение перехватывает ВСЕ клавиши, включая стандартные, поэтому будьте осторожны и не переопределяйте такие комбинации, как Ctrl-Z, Ctrl-X, Ctrl-C, Ctrl-V, Ctrl-A. Вместе с тем, это происходит только если фокус ввода находится в поле набора текста; в других случаях клавиши работают как обычно.",
	sSiteOptsTitle: "Опции сайтов",
	sSiteOptsDescr: "Вы можете настроить некоторые опции вставки тегов в зависимости от требований движка соответствующего сайта.",
	sSiteOptsItem1: "<em>Кавычки</em> — заключать ли параметр тега в кавычки",
	sSiteOptsItem2: "<em>HTML тег</em> — использовать теги в HTML-стиле ( &lt;&gt; ) вместо BB-кода ( [] )",
	sSiteOptsItem3: "<em>Теги в верхнем регистре</em> — вставлять теги ЗАГЛАВНЫМИ буквами",
	sDefSiteOptsTitle: "Опции сайтов по умолчанию",
	sURLHdr: "URL",
	sQuotesHdr: "Кавычки",
	sHTMLTagHdr: "HTML тег",
	sTagUpCaseHdr: "Теги заглавными",
	sSiteSpecTitle: "Персональные настройки сайтов",
	sSiteSpecDescr: "<em>URL</em> — базовый адрес сайта без префикса протокола (\"http://\" и т.д.).</br><strong>Внимание!</strong> Можно использовать маски для адресов, напр.: *.diary.ru — соответствует john.diary.ru, mary.diary.ru и всем остальным; google.* — соответствует google.ru, google.com и всем остальным; *.livejournal.* — john.livejournal.com, diego.livejournal.es и всем остальным.</br><strong>Прим.</strong> Если настройки сайта не работают, возможно, поле ввода загружается с другого адреса (напр., блоги на blogspot.com). В этом случае установите курсор в поле ввода текста и нажмите отладочное сочетание клавиш: <em>Ctrl+Shift+Alt+F1</em>.",
	sDelOpt: "Удалить опцию",
	sAddSiteOpt: "Добавить опцию сайта",
	sTagListTitle: "Список тегов",
	sTagListDescr: "Список всех доступных тегов. Можно удалять имеющиеся теги и добавлять новые.",
	sTagListItem1: "<em>Откр. тег</em> — открывающий тег. Если значение = &quot;?&quot;, будет выдан запрос на ввод текста тега",
	sTagListItem2: "<em>Закр. тег</em> — закрывающий тег; может совпадать с открывающим, может отсутствовать (как у [tag=&quot;парам&quot;]) или иметь произвольное значение. Если значение = &quot;?&quot;, будет выдан запрос на ввод текста тега",
	sTagListItem3: "<em>Параметр</em> — тег имеет параметр (как [tag=&quot;парам&quot;]текст[/tag])",
	sTagListItem4: "<em>Выделение в параметр</em> — выделенный текст будет использован как параметр (если не отмечено — будет выдан запрос на ввод параметра)",
	sTagListItem5: "<em>Клавиша</em> — комбинация клавиш, вызывающая вставку тега",
	sHotkeyWarn: "<strong>Прим</strong>. Комбинации Alt+Key не будут работать, поскольку считаются системными (активация пункта меню).<br/><strong>Прим</strong>. HotkeyBB может не ловить некоторые комбинации клавиш на некоторых ОС (Linux, возможно, Mac), когда активна нелатинская раскладка клавиатуры. Это баг Opera (исправлен в Opera 12.10).",
	sOpenTag: "Откр. тег",
	sCloseTag: "Закр. тег",
	sOption: "Парам.",
	sSelToOpt: "Выдел. в парам.",
	sHotkey: "Клавиша",
	sDelTag: "Удалить тег",
	sAsOpen: "= Откр.",
	sNone: "[Нет]",
	sEnter: "Ввести…",
	sAddTag: "Добавить тег",
	sSettActions: "Действия с настройками",
	sExportSett: "Экспорт",
	sExportSettDescr: "Получить текущие настройки HotkeyBB в виде текста",
	sImportSett: "Импорт",
	sImportSettDescr: "Загрузить настройки HotkeyBB из текста/текстового файла, <b>заменив</b> текущие",
	sMergeSett: "Слияние",
	sMergeSettDescr: "Загрузить настройки HotkeyBB из текста/текстового файла и <b>объединить</b> с текущими",
	sExpTip: "Скопируйте этот текст и сохраните в файл в любом текстовом редакторе",
	sImpTip: "Вставьте предварительно сохранённый текст настроек в поле ниже и нажмите ОК",
	sImpAreUSure: "Импорт перезапишет все текущие настройки! Продолжить?",
	sImpErr: "Ошибка при импорте настроек!",
	sUseFileApi: "Импорт через файлы",
	sFileApiDescr_File: "Импорт и слияние будут выполняться посредством файлов. Снимите галочку, чтобы использовать буфер обмена.",
	sFileApiDescr_Clip: "Импорт и слияние будут выполняться посредством буфера обмена. Поставьте галочку, чтобы использовать файлы.",
	sSaveNClose: "Сохранить и закрыть",
// Changelog page
	sVersHist: "История версий",
	sVerHilites: "Основные изменения:",
	sVer: "Ver.",
	sVerChanges: "Другие изменения:",
// Script messages
	sEnterTag: "Введите непустой закрывающий тег",
	sAltHotkeyWarn: "Вы указали комбинации вида Alt+Клавиша для следующих тегов:\n{tags}\nЭти комбинации считаются системными и работать НЕ будут!\nХотите исправить?",
// Injected script messages - don't forget to add new entries in \scripts\background.js:opera.extension.addEventListener("connect")!
	sEnterTagOption: "Введите параметр для тега {tag}.\nНажмите Отмена, чтобы вставить тег без параметра.",
	sEnterOpenTagText: "Введите открывающий тег.\nНажмите Отмена, чтобы прервать вставку тега.",
	sEnterCloseTagText: "Введите закрывающий тег.",
	sDebugMsg: "Отладочные данные HotkeyBB.\n"+
	           "Текущий URL: {url}\n"+
	           "Домен: {domain}\n"+
	           "Применены персональные опции сайта: {sitespec}\n"+
	           "Опции сайта:\n"+
	           "   Кавычки {quotes}\n"+
	           "   HTML теги {tags}\n"+
	           "   Теги заглавными {upcase}",
	sOn: "ВКЛ",
	sOff: "ОТКЛ"
}