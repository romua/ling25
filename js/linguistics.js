/**
 * Created by leap- on 19.10.2016.
 */
var doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "- ", "–", "(", ")", "—", "— ", "¬", "“",  "”", "’",  "‘",  "*", "|", ""];
var arrayF = []; //масив в якому зберігаються частоти(к-сть появ слів(унікальних) в всьому тексті )
var arrayL = []; //масив всіх слів
var arrayV = []; //масив унікальних слів - Vocabulary
var arrayLel= []; //масив всіх слів на l букв
var arrayVel=[];//масив унікальних слів на l букв
//var arrayFel = []; 
var wordLength = prompt("Length of word: ");
var arrayVocabularyPDFl = [];
var arrayPDFl = [];
console.log("Довжина слова(букв): "+wordLength);

function clearTextAndGetLength() {
    console.time('time of preprocessing');
    var s = document.getElementById("inputText").value.toLowerCase();
    document.getElementById("inputText").value = null;
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
    if (s.charAt (0) == ' ') s = s.substr (1); //якщо першим в тексті йде пробіл видаляємо його
    if (s.charAt (s.length - 1) == ' ') s = s.substring (0, s.length - 1); //якщо останній в тексті йде пробіл видаляємо його
    
    arrayL = s.split(' '); //закидуємо в масив наш текст
    //document.getElementById("outputText").value = s; //закидуємо в Textarea наш такст

   // засікаємо час виконання пошуку довижини тексту
    
    for (var i=0; i<arrayL.length; i++) {
        if (arrayL[i].length === +wordLength)
        {
            arrayLel.push(arrayL[i]);
        }
    }
    console.log(arrayL);
    console.log('К-сть усіх слів: '+ arrayL.length);
    console.log(arrayLel);
    console.log('К-сть слів на '+ wordLength +' букв: '+ arrayLel.length);
    console.timeEnd('time of preprocessing');
}
//функція що знаходить унікальні слова на el букв
function getUniqueEL(arr) {

    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < arrayVel.length; j++) {
                // if(str.length === wordLength)
                if (arrayVel[j] === str) continue nextInput;
            }
            if(str.length == +wordLength)
                arrayVel.push(str);
        }


    console.log(arrayVel);
    return arrayVel.length;
}


//функція що знаходить усі унікальні слова
function getUnique(arr) {

    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < arrayV.length; j++) {
                if (arrayV[j] === str) continue nextInput;
            }
            arrayV.push(str);
        }
    console.log(arrayV)
    return arrayV.length;
}

function getTimes(arr, word) {
    var count=0;
        for (var i = 0; i < arr.length; i++)
            {
                if (word == arr[i])
                    {
                        count++
                    };
            }
    return count;

}
//Отримання словника
function getVocabulary() {

    console.time('time to get V(L)');
    console.log("К-сть різних слів: "+getUnique(arrayL));
    console.timeEnd('time to get V(L)');

}

//Отримання словника на l-букв
function getVocabularyEL() {
   
    console.time('time to get Vl(L)');
        console.log('К-сть різних слів на '+ wordLength +' букв:'+getUniqueEL(arrayLel));
    console.timeEnd('time to get Vl(L)')
}


//Отримання таблиці(Word F f fl) на l букв
function getTableLE() {
    console.time('time to get Table');
    var cols = 3;
    var rows = arrayVel.length;
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

            document.write('<td>');
                document.write("f_l");
            document.write("</td>");
    document.write("</tr>");
    for (var i = 0; i < rows; i++)
    {
        document.write("<tr>");
            document.write('<td>');
                document.write(arrayVel[i]);
            document.write("</td>");

            document.write('<td>');
                document.write(arrayF[i]);
            document.write("</td>");

            document.write('<td>');
                document.write(+(arrayF[i]/arrayL.length));
            document.write("</td>");

            document.write('<td>');
                document.write(+(arrayF[i]/arrayLel.length));
            document.write("</td>");
        document.write("</tr>");
    }
    document.write("</table>");

     $(document).ready(function() {
        $("#btnExport").click(function(e) {
            e.preventDefault();
           //getting data from our table
            var data_type = 'data:application/vnd.ms-excel;charset=KOI8-U';
            var table_div = document.getElementById('table_wrapper');
            var table_html = table_div.outerHTML.replace(/ /g, '%20');
            var data_name = new Date().toLocaleString();
            var a = document.createElement('a');
            a.href = data_type + ', ' + table_html;
            a.download = 'exported_table_' + data_name + '.xls';
            a.click();
        });
    });
    console.timeEnd('time to get Table');
}

//Отримання таблиці Pdf
function getPDF() {
    getUniquePDFl(arrayFel)
    console.time('time to get PDFl');
    for(var i=0; i<arrayVocabularyPDFl.length; i++)
    {
        arrayPDFl[i]=getTimes(arrayFel,arrayVocabularyPDFl[i]);
    }
    console.log(arrayPDFl);
    
    var cols = 3;
    var rows = arrayVocabularyPDFl.length;
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
    document.write("F");
    document.write("</td>");
    document.write('<td>');
    document.write("NF");
    document.write("</td>");
    document.write('<td>');
    document.write("p");
    document.write("</td>");
    document.write('<td>');
    document.write("p_l");
    document.write("</td>");
    document.write("</tr>");
    for (var i = 0; i < rows; i++)
    {
        document.write("<tr>");
        document.write('<td>');
        document.write(arrayVocabularyPDFl[i]);
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]);
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]/arrayV.length);
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]/arrayVel.length);
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
            a.download = 'data_'+wordLength+ '_' + data_name + '.xls';
            a.click();
            
        });
    });
    console.timeEnd('time to get PDFl');
}


function getUniquePDFl(arr) {

    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < arrayVocabularyPDFl.length; j++) {
                if (arrayVocabularyPDFl[j] === str) continue nextInput;
            }
            arrayVocabularyPDFl.push(str);
        }
    


    console.log(arrayVocabularyPDFl);
    return arrayVocabularyPDFl.length;
}

//Отримання частот слів на el букв у всьому тексі L
/*function getFel(){
    console.time('time to get Fl');
    for(var i=0; i<arrayVel.length; i++)
    {   
        arrayFel[i]=getTimes(arrayLel,arrayVel[i]);
    }
    console.log(arrayFel);
    console.timeEnd('time to get Fl');
}*/

function getF(){
    console.time('time to get F');
    for(var i=0; i<arrayVel.length; i++)
    {
        arrayF[i]=getTimes(arrayL,arrayVel[i]);
    }
    console.log(arrayF);
    console.timeEnd('time to get F');
}

/*function getPDFl() {
    
}*/

/*function getPdfF(arr)
{
    console.time('time to get PDF ');
     console.log('К-сть різних слів на '+ wordLength +' букв:'+getUniqueEL(arrayFel));
    console.timeEnd('time to get PDF ');
}
/*
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

        document.getElementById("table_wrapper").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();

    }
})();*/

//Отримання частот слів на el букв у тексті Lel
