/**
 * Created by leap- on 19.10.2016.
 */
var doomedSymbols = [",", ".", ";", "!", ":", "", "\"", "«", "»", "?", "…", "- ", "–", "(", ")", "—", "— ", "¬", "“",  "”", "’",  "‘",  "*", "|", ""];
var arrayF = []; //масив в якому зберігаються частоти(к-сть появ слів(унікальних) в всьому тексті )
var arrayL = []; //масив всіх слів
var arrayV = []; //масив унікальних слів - Vocabulary
var arrayLel= []; //масив всіх слів на l букв
var arrayVel=[];//масив унікальних слів на l букв
var arrayFel = []; 
var wordLength = prompt("Give me el");
console.log("Довжина слова(букв): "+wordLength);

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
    console.log('К-сть усіх слів: '+ arrayL.length);
    for (var i=0; i<arrayL.length; i++) {
        if (arrayL[i].length === +wordLength)
        {
            arrayLel.push(arrayL[i]);
        }
    }
    console.log(arrayLel);
    console.log(arrayL);
    console.log('К-сть слів на '+ wordLength +' букв: '+ arrayLel.length);
    console.timeEnd('time to get Length'); // засікаємо час виконання пошуку довижини тексту


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
                if (word === arr[i])
                    {
                        count++
                    };
            }
    return count;

}
//Отримання словника на el букв
function getVocabularyEL() {
   
    console.time('time to get Vocabulary');
        console.log('К-сть слів на '+ wordLength +' букв:'+getUniqueEL(arrayLel));
    console.timeEnd('time to get Vocabulary');

    
}
//Отримання словника
function getVocabulary() {

    console.time('time to get Vocabulary');
        console.log("К-сть різних слів: "+getUnique(arrayL));
    console.timeEnd('time to get Vocabulary');

}

//Отримання таблиці(Word F f fl) на el букв
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
                document.write(arrayFel[i]);
            document.write("</td>");

            document.write('<td>');
                document.write(arrayFel[i]/arrayL.length);
            document.write("</td>");

            document.write('<td>');
                document.write(arrayFel[i]/arrayLel.length);
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

//Отримання таблиці всіх слів
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

//Отримання частот слів на el букв у всьому тексі L
function getFel(){
    console.time('time to get fel');
    for(var i=0; i<arrayVel.length; i++)
    {   
        arrayFel[i]=getTimes(arrayLel,arrayVel[i]);
    }
    console.log(arrayFel);
    console.timeEnd('time to get fel');
}

function getF(){
    console.time('time to get F');
    for(var i=0; i<arrayVel.length; i++)
    {
        arrayF[i]=getTimes(arrayL,arrayVel[i]);
    }
    console.log(arrayF);
    console.timeEnd('time to get f');
}



//Отримання частот слів на el букв у тексті Lel
