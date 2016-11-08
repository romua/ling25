/**
 * Created by leap- on 19.10.2016.
 */
var doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "- ", "–", "(", ")", "—", "—", "¬", "“",  "”", "’",  "‘",  "*", "|", "―"];
var arrayF = []; //масив в якому зберігаються частоти(к-сть появ слів(унікальних) в всьому тексті )
var arrayL = []; //масив всіх слів
var arrayV = []; //масив унікальних слів - Vocabulary
var arrayLel= []; //масив всіх слів на l букв
var arrayVel=[];//масив унікальних слів на l букв
//var arrayFel = []; 
var wordLength = prompt("Length of word: ");
var arrayVocabularyPDFl = [];
var arrayPDFl = [];
var arrayCDFl= [];
var mytextLength =0;
var vocabularyLength=0;
console.log("Довжина слова(букв): "+wordLength);
var text = '';

function loadTextFile(files){
    var file = files[0];
    var theFileElem = document.getElementById("myFile");

    var reader = new FileReader();
    reader.onload = function (e) {
        text = e.target.result;

        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    }
    
    reader.readAsText(file);
    reader.onerror = function (e) {
        alert("Can`t read file");

    };
}


function clearTextAndGetLength() {

    
    console.time('time of preprocessing');
    //var s = document.getElementById("inputText").value.toLowerCase();
   // document.getElementById("inputText").value = null;
    var s = text.toLowerCase();
    text = '';
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

   // засікаємо час виконання пошуку довжини тексту
    
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
    s = '';
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
    //console.log(arrayV)
    return arrayV.length;
}

function getVocabulary() {

    console.time('time to get V(L)');
    console.log("К-сть різних слів: "+getUnique(arrayL));
    console.timeEnd('time to get V(L)');

}

//функція що знаходить унікальні слова на l букв
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

    //console.log(arrayVel);
    return arrayVel.length;
}


function getVocabularyEL() {

    console.time('time to get Vl(L)');
     console.log('К-сть різних слів на '+ wordLength +' букв:'+getUniqueEL(arrayLel));
    console.timeEnd('time to get Vl(L)')
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


//Отримання словника на l-букв


function getUniquePDFl(arr) {

    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < arrayVocabularyPDFl.length; j++) {
                if (arrayVocabularyPDFl[j] === str) continue nextInput;
            }
            arrayVocabularyPDFl.push(str);
        }



    //console.log(arrayVocabularyPDFl);
    return arrayVocabularyPDFl.length;
}
function getF(){
    console.time('time to get F');
    for(var i=0; i<arrayVel.length; i++)
    {
        arrayF[i]=getTimes(arrayLel,arrayVel[i]);
    }
    console.log(arrayF);
    console.log(arrayF.length)
    console.timeEnd('time to get F');
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
    document.write("Save freq table");
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
            a.download = 'freq_'+wordLength+ '_' + data_name + '.xls';
            a.click();
        });
    });
    console.timeEnd('time to get Table');
}
function getPDF() {
    getUniquePDFl(arrayF)
    console.time('time to get PDFl');
    for(var i=0; i<arrayVocabularyPDFl.length; i++)
    {
        arrayPDFl[i]=getTimes(arrayF,arrayVocabularyPDFl[i]);
    }
    console.log(arrayPDFl);
}

function getCDF() 
{
    getPDF();
    var str = '';
    var sum = 0;
    for(var i=0; i<arrayPDFl.length; i++)
    {
        sum=0;
        str = arrayPDFl[i]/arrayVel.length;
        for (var j=0; j<arrayPDFl.length;j++)
        {
            if (arrayPDFl[j]/arrayVel.length<=str)
                sum+=arrayPDFl[j]/arrayVel.length;
        }
        arrayCDFl.push(sum);
    }
    console.log(arrayCDFl);
}
//Отримання таблиці Pdf

function getTablePDFandCDF() {

    
    var cols = 3;
    var rows = arrayVocabularyPDFl.length;
    if (cols < 1 || rows < 1) {
        cols = 1;
        rows = 1;
    }
    document.open();
    document.write('<button id="btnExport" >');
    document.write("Save PDF");
    document.write('</button>');
    //
    document.write(' <table id="table_wrapper" border=1, cellpadding=2, cellspacing=0, width="90%" charset="windows-1251">');
    document.write("<tr>");
    document.write('<td>');
    document.write("F");
    document.write("</td>");
    document.write('<td>');
    document.write("NF");
    document.write("</td>");

    document.write('<td>');
    document.write("p_l");
    document.write("</td>");
    document.write('<td>');
    document.write("P_l");
    document.write("</td>")
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
        document.write(arrayPDFl[i]/arrayVel.length);
        document.write("</td>");
        document.write('<td>');
        document.write(arrayCDFl[i]);
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
            table_html.replace(/,/, '.');
            var data_name = new Date().toLocaleString();
            var a = document.createElement('a');
            a.href = data_type + ', ' + table_html;
            a.download = 'word_'+wordLength+ '_' + data_name + '.xls';
            a.click();
            document.close();
            getTableLE()
        });
       
        
    });
    console.timeEnd('time to get PDFl');
    
}
