/**
 * Created by leap- on 19.10.2016.
 */
var doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "-", "–", "(", ")", "—",
    "—", "¬", "“",  "”", "’",  "‘",  "*", "|", "―", "�", "="];
var doomedNumbers = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"];
var arrayF = []; //масив в якому зберігаються частоти(к-сть появ слів(унікальних) в всьому тексті )
var arrayL = []; //масив всіх слів
var arrayLl= []; //масив всіх слів на l букв
var arrayV = []; //масив унікальних слів - Vocabulary V(L)
var arrayVl = []; //масив унікальних слів на l букв в тексті на різну довжику слів(початковому) Vl(L)
var arrayVlLl = []; //масив унікальнких слів на l був в тексті з l-букв

var wordLength = prompt("Length of word: ");
var addedDoomedSymbols = [];
var arrayVocabularyPDFl = [];
var arrayPDFl = [];
var arrayCDFl= [];
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
    
}


function addDoomed() {
    addedDoomedSymbols = prompt("Add new doomed symbols(separated by spaces)").split(' ');
    for(var i=0; i<addedDoomedSymbols.length; i++)
        {
            doomedSymbols.push(addedDoomedSymbols[i]);
        }
}

function clearTextAndGetLength() {
    if ( document.getElementById("ignoreNumbers").checked == true) {
        for(var i=0; i<doomedNumbers.length; i++)
        {
            doomedSymbols.push(doomedNumbers[i]);
        }
    }
    console.log(doomedSymbols);
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
    vocabularyLength=arrayV.length;
    arrayV=[];
    return vocabularyLength;
}

function getVocabulary() {

    console.time('time to get V(L)');
    console.log("К-сть різних слів: "+getUnique(arrayL));
    document.getElementById("outputText").innerHTML+="К-сть різних слів: "+vocabularyLength+"\n";
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
    document.getElementById("outputText").innerHTML+= 'К-сть різних слів на '+ wordLength +' букв: '+arrayVl.length+"\n";
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
    var freqTable = [];

    for (var x = 0; x < arrayVl.length; x++) {
        freqTable[x] = {
            freqWord: arrayVl[x],
            freqF: +arrayF[x],
            freqf: +(arrayF[x]/arrayL.length),
            freqfl: +(arrayF[x]/arrayLl.length)
        };
    }
    freqTable.sort(function(a, b) {
        return b.freqF - a.freqF;
    });
    
    document.write('<button id="btnExport">');
    document.write("Save freq table");
    document.write('</button>');
    //
    document.write(' <table id="table_wrapper" border=1, cellpadding=2, cellspacing=0, width="90%">');
    document.write("<tr>");
            document.write('<td>');
                    document.write("rank");
            document.write("</td>");
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
                document.write(i+1);
            document.write("</td>");
            document.write('<td>');
                document.write(freqTable[i].freqWord); //вивід слова
            document.write("</td>");

            document.write('<td>');
                document.write(freqTable[i].freqF); //вивід абсолютної частоти появи слова
            document.write("</td>");

            document.write('<td>');
                document.write(freqTable[i].freqf); //вивід відносної частоти появи слова L
            document.write("</td>");

            document.write('<td>');
                document.write(freqTable[i].freqfl); //вивід відносної частоти появи слова в Ll
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

    var pdfTable = [];
    for (var x = 0; x < arrayVocabularyPDFl.length; x++) {
        pdfTable[x] = {

            dataF: +arrayVocabularyPDFl[x],
            dataNF: +arrayPDFl[x],
            dataPDF: +arrayPDFl[x]/arrayV.length,
            dataPDFl: +arrayPDFl[x]/arrayVl.length,
            dataCDF: +arrayCDFl[x]
        };
    }
    pdfTable.sort(function(a, b) {
        return b.dataNF - a.dataNF;
    });

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
    document.write("rank");
    document.write("</td>")
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
        document.write(i+1); //вивід F
        document.write("</td>");
        document.write('<td>');
        document.write(pdfTable[i].dataF); //вивід F
        document.write("</td>");
        document.write('<td>');
        document.write(pdfTable[i].dataNF);          //вивід NF
        document.write("</td>");
        document.write('<td>');
        document.write(pdfTable[i].dataPDF);  //вивід p
        document.write("</td>");
        document.write('<td>');
        document.write(pdfTable[i].dataNF/sum);       //вивід p'=pi/sum(pi)
        document.write("</td>");
        document.write('<td>');
        document.write(pdfTable[i].dataPDFl); //вивід pl
        document.write("</td>");
        document.write('<td>');
        document.write(pdfTable[i].dataCDF);     //вивід P
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
            getTableLE();
        });
    });
    console.timeEnd('time to get PDFl');
    
}
function  addDataToClass() {
   



}
