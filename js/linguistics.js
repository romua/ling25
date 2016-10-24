/**
 * Created by leap- on 19.10.2016.
 */
var doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "- ", "–", "(", ")", "—", "— ", "¬", "“",  "”", "’",  "‘",  "*", "|", ""];
var arrayF = []; //масив в якому зберігаються частоти(к-сть появ слів(унікальних) в всьому тексті )
var arrayL = []; //масив всіх слів
var arrayV = []; //масив унікальних слів - Vocabulary
var valueOfL = prompt("Give me l");

function clearTextAndGetLength() {
    
    var s = document.getElementById("inputText").value.toLowerCase();
    while (s.indexOf ('  ') >= 0) //видаляємо всі подвійні пробіли
    {
        t = s.split ('  ');
        s = t.join (' ');
    }
    for(var i=0; i< doomedSymbols.length; i++)
    {
        t = s.split (String(doomedSymbols[i])); s = t.join (''); //видаляємо всі непотрібні символи
    }
   
    var t = s.split ('\r'); s = t.join ('');  // видаляємо всі "повернення каретки" \r
    t = s.split ('\n'); s = t.join (' '); // заміняємо всі "переходи на новий рядок" на пробіл
    t = s.split ('\t'); s = t.join (' '); // заміняємо всі табуляції на пробіл
   

    while (s.indexOf ('  ') >= 0) //видаляємо всі подвійні пробіли
    {
        t = s.split ('  ');
        s = t.join (' ');
    }
    while (s.indexOf ('   ') >= 0) //видаляємо всі подвійні пробіли
    {
        t = s.split ('  ');
        s = t.join (' ');
    }

    while (s.indexOf ('    ') >= 0) //видаляємо всі подвійні пробіли
    {
        t = s.split ('  ');
        s = t.join (' ');
    }
    while (s.indexOf ('     ') >= 0) //видаляємо всі подвійні пробіли
    {
        t = s.split ('  ');
        s = t.join (' ');
    }
    
    if (s.charAt (0) == ' ') s = s.substr (1); //якщо першим в тексті йде пробіл видаляємо його
    if (s.charAt (s.length - 1) == ' ') s = s.substring (0, s.length - 1); //якщо останній в тексті йде пробіл видаляємо його
    
    arrayL = s.split(' '); //закидуємо в масив наш текст
    document.getElementById("outputText").value = s; //закидуємо в Textarea наш такст
    console.time('time to get Length'); // засікаємо час виконання пошуку довижини тексту
    alert ('L: ' + arrayL.length);
    console.timeEnd('time to get Length'); // засікаємо час виконання пошуку довижини тексту


}

function getUnique(arr) {
   
    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < arrayV.length; j++) {
               // if(str.length === valueOfL)
                if (arrayV[j] === str) continue nextInput;
            }
            if(str.length == +valueOfL)
            arrayV.push(str);
        }
    


        return arrayV.length;
}

function getTimes(arr, word) {
    var count=0;
        for (var i = 0; i < arr.length; i++)
            {
                if (word === arr[i])
                    {
                        count++
                    };
            }
    return count;

}

function getVocabulary() {
   
    console.time('time to get Vocabulary');
    alert("V: "+getUnique(arrayL));
    console.timeEnd('time to get Vocabulary');
    
}

function getTable() {
    console.time('time to get Table');
    var cols = 2;
    var rows = arrayV.length;
    if (cols < 1 || rows < 1) {
        cols = 1;
        rows = 1;
    }
    document.write('<button id="btnExport">');
    document.write("Save as xsl");
    document.write('</button>');
    //
    document.write(' <table id="table_wrapper" border=1, cellpadding=2, cellspacing=0, width="90%">');
    document.write("<tr>");
            document.write('<td>');
                    document.write("Word");
            document.write("</td>");
            document.write('<td>');
                    document.write("F");
            document.write("</td>");
            document.write('<td>');
                    document.write("f");
            document.write("</td>");
    document.write("</tr>");
    for (var i = 0; i < rows; i++)
    {
        document.write("<tr>");
            document.write('<td>');
            document.write(arrayV[i]);
            document.write("</td>");
            document.write('<td>');
            document.write(arrayF[i]);
            document.write("</td>");
            document.write('<td>');
            document.write(arrayF[i]/arrayL.length);
            document.write("</td>");
        document.write("</tr>");
    }
    document.write("</table>");
    console.timeEnd('time to get Table');
     $(document).ready(function() {
        $("#btnExport").click(function(e) {
            e.preventDefault();
           //getting data from our table
            var data_type = 'data:application/vnd.ms-excel';
            var table_div = document.getElementById('table_wrapper');
            var table_html = table_div.outerHTML.replace(/ /g, '%20');
            var data_name = new Date().toLocaleString();
            var a = document.createElement('a');
            a.href = data_type + ', ' + table_html;
            a.download = 'exported_table_' + data_name + '.xls';
            a.click();
        });
    });
}

function getF(){
    console.time('time to get F');
    for(var i=0; i<arrayV.length; i++)
    {   
        arrayF[i]=getTimes(arrayL,arrayV[i]);
    }
    console.timeEnd('time to get F');
}
