/**
 * Created by leap- on 19.10.2016.
 */
var doomedSymbols = [];
var arrayF = []; //масив в якому зберігаються частоти(к-сть появ слів(унікальних) в всьому тексті )
var arrayL = []; //масив всіх слів
var arrayLl= []; //масив всіх слів на l букв
var arrayV = []; //масив унікальних слів - Vocabulary V(L)
var arrayVl = []; //масив унікальних слів на l букв в тексті на різну довжику слів(початковому) Vl(L)
var arrayVlLl = []; //масив унікальнких слів на l був в тексті з l-букв


//var arrayFel = []; 
var wordLength = prompt("Length of word: ");
var addedDoomedSymbols = prompt("Add new doomed symbols(separated by spaces)").split(' ');
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
            output.push('size:' + f.size, ' bytes, ',
                ' starts with: '+ text.substr(1, 40));
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    }
    
    reader.readAsText(file, "UTF-8");
    reader.onerror = function (e) {
        alert("Can`t read file");

    };
    //document.getElementById("inputText").value = text.substr(1,100);
}


function clearTextAndGetLength() {

    if ( document.getElementById("ignoreNumbers").checked == true)
    {
        doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "-", "–", "(", ")", "—",
            "—", "¬", "“",  "”", "’",  "‘",  "*", "|", "―", "�", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        console.log(doomedSymbols);
    }
    else
    {
        doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "-", "–", "(", ")", "—",
            "—", "¬", "“",  "”", "’",  "‘",  "*", "|", "―", "�"];
        console.log(doomedSymbols);
    }
    if ( document.getElementById("addDoomedSymbols").checked == true)
    {
        for(var i=0; i<addedDoomedSymbols.length; i++)
        {
            doomedSymbols.push(addedDoomedSymbols[i]);
        }
        
        console.log(doomedSymbols);
    }
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
            arrayLl.push(arrayL[i]);
        }
    }
    console.log(arrayL);
    console.log('К-сть усіх слів: '+ arrayL.length);
    document.getElementById("outputText").innerHTML+='К-сть усіх слів: '+ arrayL.length+"\n";
    console.log(arrayLl);
    console.log('К-сть слів на '+ wordLength +' букв: '+ arrayLl.length);
    document.getElementById("outputText").innerHTML+='К-сть слів на '+ wordLength +' букв: '+ arrayLl.length+"\n";
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
    document.getElementById("outputText").innerHTML+="К-сть різних слів: "+getUnique(arrayL)+"\n";
    console.timeEnd('time to get V(L)');

}

//функція що знаходить унікальні слова на l букв
function getUniqueEL(arr) {

    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < arrayVl.length; j++) {
                // if(str.length === wordLength)
                if (arrayVl[j] === str) continue nextInput;
            }
            if(str.length == +wordLength)
                arrayVl.push(str);
        }

    //console.log(arrayVl);
    return arrayVl.length;
}


function getVocabularyEL() {

    console.time('time to get Vl(L)');
    console.log('К-сть різних слів на '+ wordLength +' букв:'+getUniqueEL(arrayL));
    document.getElementById("outputText").innerHTML+= 'К-сть різних слів на '+ wordLength +' букв: '+getUniqueEL(arrayL)+"\n";
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
    for(var i=0; i<arrayVl.length; i++)
    {
        arrayF[i]=getTimes(arrayLl,arrayVl[i]);
    }
    console.log(arrayF);
    console.log(arrayF.length)
    console.timeEnd('time to get F');
}


//Отримання таблиці(Word F f fl) на l букв
function getTableLE() {
    console.time('time to get Table');
    var cols = 3;
    var rows = arrayVl.length;
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
                document.write(arrayVl[i]);
            document.write("</td>");

            document.write('<td>');
                document.write(arrayF[i]);
            document.write("</td>");

            document.write('<td>');
                document.write(+(arrayF[i]/arrayL.length));
            document.write("</td>");

            document.write('<td>');
                document.write(+(arrayF[i]/arrayLl.length));
            document.write("</td>");
        document.write("</tr>");
    }
    document.write("</table>");

     $(document).ready(function() {
        $("#btnExport").click(function(e) {
            e.preventDefault();
           //getting data from our table
            var data_type = 'data:application/vnd.ms-excel;charset=UTF-8';
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
    console.log('arrayPDFl:'+arrayPDFl.length);
}

function getCDF() 
{
    getPDF();
    var str = '';
    var sum = 0;
    for(var i=0; i<arrayPDFl.length; i++)
    {
        sum=0;
        str = arrayPDFl[i]/arrayVl.length;
        for (var j=0; j<arrayPDFl.length;j++)
        {
            if (arrayPDFl[j]/arrayVl.length<=str)
                sum+=arrayPDFl[j]/arrayVl.length;
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
    document.write("p");
    document.write("</td>");
    document.write('<td>');
    document.write("p'");
    document.write("</td>");
    document.write('<td>');
    document.write("p_l");
    document.write("</td>");
    document.write('<td>');
    document.write("P_l");
    document.write("</td>")
    document.write("</tr>");
    var sum=0;
    for (var i = 0; i< arrayPDFl.length; i++)
    {
         sum+=arrayPDFl[i];
         
    }
    console.log(sum);
    for (var i = 0; i < rows; i++)
    {
        document.write("<tr>");
        document.write('<td>');
        document.write(arrayVocabularyPDFl[i]); //вивід F
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]);          //вивід NF
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]/arrayV.length);  //вивід p
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]/sum);       //вивід p'=pi/sum(pi)
        document.write("</td>");
        document.write('<td>');
        document.write(arrayPDFl[i]/arrayVl.length); //вивід pl
        document.write("</td>");
        document.write('<td>');
        document.write(arrayCDFl[i]);     //вивід P
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
