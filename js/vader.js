(function () {
    "use strict";
    document.onload = hamtavader();

   

    function hamtavader() {
        fetch('http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json')
            .then(res => res.json())
            .then(json => this._skapaVader(json));
        
    }

    function _skapaVader(json) {
        //

        var temp = [50, 50, 50, 50, 50, 50,]  /* s�tter standarv�rdena h�r uppe s� variabler inte �r tomma och sedan fyller jag arrayen med r�tt v�rden i funktionerna nedan. */
        var vr = [0, 0, 0, 0, 0, 0]

        var vh = [-1, -1, -1, -1, -1, -1]
        var va = [0, 0, 0, 0, 0, 0]


        var d = new Date();  //H�mta dagens datum
        var datum = d.getDate();

        //Om datumet �r enkelsiffrigt m�ste en nolla l�ggas till f�re
        if (datum.toString().length == 1) {
            var tid06 = "0" + datum + "T06:00:00Z"
            var tid12 = "0" + datum + "T12:00:00Z"
            var tid18 = "0" + datum + "T18:00:00Z"

        }
        /*Annars l�gga in datum plus texten f�r de olika tiderna. Anv�nder enbart texten f�r datum ej �r eller m�nad f�r inte troligt v�der en hel m�nad fram�t */

        else {

            var tid06 = datum + "T06:00:00Z"
            var tid12 = datum + "T12:00:00Z"
            var tid18 = datum + "T18:00:00Z"
        }

        var tomorrow = new Date(); /*h�mtar dagens datum*/
        tomorrow.setDate(tomorrow.getDate() + 1); /* anv�nder setdate f�r att v�lja morggondagens datum i en l�sning som �ven fungerar ny m�nad */
        var imorgon = tomorrow.getDate(); /* v�ljer att ta ut datumet f�r morgondagens datum som jag skapat och l�gger in det i variabeln i morgon */

        /* samma h�r datum med en eller tv� sifror*/
        if (imorgon.toString().length == 1) {
            var tid06im = "0" + imorgon + "T06:00:00Z"
            var tid12im = "0" + imorgon + "T12:00:00Z"
            var tid18im = "0" + imorgon + "T18:00:00Z"

        }

        else {

            var tid06im = imorgon + "T06:00:00Z"
            var tid12im = imorgon + "T12:00:00Z"
            var tid18im = imorgon + "T18:00:00Z"
        }

        var tSeries = json.timeSeries; /* h�mtar arrayen med timeseries */

        var tSeriesLenght = tSeries.length;

        for (var k5 = 0; k5 < tSeriesLenght; k5++) {
            /* idag */
            if (json.timeSeries[k5].validTime.substr(8, 15) == tid06) {
                temp[0] = tSeries[k5].parameters[1].values  /*h�mtar v�rden f�r den tiden och datuemet och l�ggar in det i r�tt plats i de skapade arrayerna som sedan anv�nds nedan. Med hj�lp av en for loop*/
                vr[0] = tSeries[k5].parameters[3].values
                vh[0] = tSeries[k5].parameters[4].values
                va[0] = tSeries[k5].parameters[18].values

            } /* variabel som g�r igenom timeserias med de olika tiderna och datumena, Jag h�mtar bara slutat p� str�ngen med substr s� det �verst�mmer med texten. Att valde som sagt att inte ha med �r och m�nad. */

            if (json.timeSeries[k5].validTime.substr(8, 15) == tid12) {
                temp[1] = tSeries[k5].parameters[1].values
                vr[1] = tSeries[k5].parameters[3].values
                vh[1] = tSeries[k5].parameters[4].values
                va[1] = tSeries[k5].parameters[18].values


            }

            if (json.timeSeries[k5].validTime.substr(8, 15) == tid18) {
                temp[2] = tSeries[k5].parameters[1].values
                vr[2] = tSeries[k5].parameters[3].values
                vh[2] = tSeries[k5].parameters[4].values
                va[2] = tSeries[k5].parameters[18].values

            }

            /*imorgon*/
            if (json.timeSeries[k5].validTime.substr(8, 15) == tid06im) {
                temp[3] = tSeries[k5].parameters[1].values
                vr[3] = tSeries[k5].parameters[3].values
                vh[3] = tSeries[k5].parameters[4].values
                va[3] = tSeries[k5].parameters[18].values

            }

            if (json.timeSeries[k5].validTime.substr(8, 15) == tid12im) {
                temp[4] = tSeries[k5].parameters[1].values
                vr[4] = tSeries[k5].parameters[3].values
                vh[4] = tSeries[k5].parameters[4].values
                va[4] = tSeries[k5].parameters[18].values


            }

            if (json.timeSeries[k5].validTime.substr(8, 15) == tid18im) {
                temp[5] = tSeries[k5].parameters[1].values
                vr[5] = tSeries[k5].parameters[3].values
                vh[5] = tSeries[k5].parameters[4].values
                va[5] = tSeries[k5].parameters[18].values

            }
        }


        var tempfalt = [this.querySelector('#temp1'), this.querySelector('#temp2'), this.querySelector('#temp3'), this.querySelector('#temp4'), this.querySelector('#temp5'), this.querySelector('#temp6')] //Anv�nder this och quereselector samt de id jag har angett f�r att hitta f�lten d�r v�rdena ska in.
        var tempLength = temp.length;

        for (var i = 0; i < tempLength; i++) //Skapa For loop som g�r igenom v�rden i variabeln. For loop best�ende av tre statement f�rst anges v�rdet f�r k sedan anges vilkor n�r loopen och dess funktion ska k�ras i det h�r fallet tills alla v�rden i arrayen g�tts igenom. F�rsta arrayplats �r noll medan startv�rde f�r l�ngden �r 1. Sedan vad som ska h�nda varje omg�ng funktionen utf�rs i det �r fallet att v�rdet k plusas p� med ett. Har valt att dela upp det p� tre foorloppar en f�r temperatur, en f�r vind och en f�r v�der f�r att g�ra det mer tydligt.
        {
            if ((-41 < temp[i]) && !(40 < temp[i])) /* Utg�r fr�n att extremt temperaturspannet f�r Gotland b�r vara mellan -40 och + 40 att utanf�r det spannet b�r det vara n�got fel. D� g�r det �ven att f� med om att det skulle vara n�gra fel.Om ej fel s� s�tts v�rdet till  */ {
                tempfalt[i].innerHTML = temp[i]


            }
            else {
                tempfalt[i].innerHTML = "N/A" //Om v�rdet inte �r inom extremspannet s� ska texten N/A visas i st�llet.


            }

        }


        //Skapa arrayer f�r temperaturv�rden och de f�lt datan ska in:


        var vind = [this.querySelector('#vind1'), this.querySelector('#vind2'), this.querySelector('#vind3'), this.querySelector('#vind4'), this.querySelector('#vind5'), this.querySelector('#vind6')] //Anv�nder this och quereselector samt de id jag har angett f�r att hitta f�lten d�r v�rdena ska in.

        vrLength = vr.length;

        for (var j = 0; j < vr.length; j++) {


            if ((0 < vr[j]) && !(360 < vr[j])) /* F�r att pilen ska visa vindriktning ska v�rdet vara i det normala spannet f�r vindriktning 1-360 grader 0 grader betyder att ingen vindriktning g�r att fast�lla altenertivt vindstilla */ {
                vind[j].childNodes[0].alt = "Vindrikrning " + vr[j] + " grader." // F�r den som inte kan se bilden s� finns det en alt text med vindriktningen.
                let vrpil = parseInt(vr[j]) + 180
                vind[j].childNodes[0].style.transform = "rotate(" + vrpil + "deg)" // F� pilen att snurra till avsedda grader genom att v�lja childnode ett i f�ltet vilket �r pilen samt ange attributet style f�r att �ndra css i detta fall at property transform ska �ndra samt att v�rdet �r rotate + sifferv�rdet + deg



            }
            else {
                vind[j].innerHTML = "" // om v�rdet f�r vindriktning inte befinner sig inom spannet s� ska pilen tas bort. Genom att inneh�llet i f�lten med namnet vind anges till "" det vill s�ga tomt


            }
            if ((0 <= vh[j]) && !(55 < vh[j])) /*V�rdet f�r vindhastighet ska l�ggas in om v�rdet �r lika eller st�rre 0, f�r d� med vinstilla samt mindre 55, en bit �ver maximala orkanstyrkan Sverige */ {
                vind[j].innerHTML += "(" + vh[j] + ")" //anv�nder innerHTML i kombination med += f�r att inte pilen ska tas bort anger �ven konsolerna inom parentser f�r att dessa ska l�ggas till som text.


            }


            if (!((0 < vr[j]) && !(360 < vr[j])) && !((0 <= vh[j]) && !(55 < vh[j]))) //Om b�de v�rdet f�r vindriktning och vindhastighet �r utanf�r spannet ska v�rdet anges till N/A

            {
                vind[j].innerHTML = "N/A" //H�r �r det text som ska l�ggas in d�rf�r anv�nda paranteser

            }
        }
        //Har kollat upp v�rdena 1-15 och lagt in dem i en array fr�n plats ett till 15 plats 0 �r om v�der saknas
        var vader = ["V�der saknas", "Klar himmel", "N�stan klar himmel", "V�xlande molnighet", "Halvklar himmel",
            "Molnigt", "Mulet", "Dimma", "Regnskurar", "�skv�der",
            "L�tt sn�blandat regn", "Sn�byar", "Regn", "�ska", "Sn�blandat regn", "Sn�fall"]


        var va1 = [this.querySelector('#va1'), this.querySelector('#va2'), this.querySelector('#va3'), this.querySelector('#va4'), this.querySelector('#va5'), this.querySelector('#va6')]

        var vaLenght = va.length;

        for (var k = 0; k < vaLenght; k++) {

            if (vader[va[k]] == undefined) { /* om v�rdet �r undefinet s� ska v�rdet f�r array plats 0  f�r v�dret anges vilket �r att v�dret saknas */
                va1[k].innerHTML = vader[0]

            }
            else {
                va1[k].innerHTML = vader[va[k]] //annas s�tts v�rdet in i respektive f�lt.

            }
        }

    }





}());



