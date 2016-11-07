/**
 * Created by admin on 06.11.2016.
 
console.time('time to load a text: ');
$( "#inputText" ).load( "inputText_large.txt");
console.timeEnd('time to load a text: ');
 */
console.time('time to load a text: ');
var text = '';
$.get("inputText_small.txt", function(response) {
   text = response;
});
console.timeEnd('time to load a text: ');