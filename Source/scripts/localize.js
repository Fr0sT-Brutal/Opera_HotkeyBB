/*
	Localization routine for Opera extensions © Fr0sT

	You must have strings.js included with local string values inside in the following form:
        var locStrings = // ! do NOT change !
        {
        	sFoo: "foo", // your string names and values here
        	sBar: "bar", // string names MUST begin with "s"!
        	...
        }

    In scripts, you may obtain localized strings in the following form: locStrings.sMyText
*/

// Function inserts local strings into text pattern (text with {sSmth} placeholders)
// You may localize any part of page's HTML
// To localize the whole body:
// <head>
// 		<script src="/scripts/strings.js"></script>
// 		<script src="/scripts/localize.js"></script>
// 		<script>
// 			window.addEventListener("DOMContentLoaded",
// 			                        function() {document.body.innerHTML=localize(document.body.innerHTML)});
// 		</script>
// 		<script src="/options/options.js"></script>
// </head>
// Don't forget to include strings.js and localize.js before any script that uses them
function localize(text)
{
	return text.replace(/\{(s\w*)\}/g,
	                    function(str, code)
                        {
                             var res = locStrings[code];
                             return (res == undefined) ? str: res;
                        });
}