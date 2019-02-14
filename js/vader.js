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

        var temp = [50, 50, 50, 50, 50, 50,]  /* sätter standarvärdena här uppe så variabler inte är tomma och sedan fyller jag arrayen med rätt värden i funktionerna nedan. */
        var vr = [0, 0, 0, 0, 0, 0]

        var vh = [-1, -1, -1, -1, -1, -1]
        var va = [0, 0, 0, 0, 0, 0]


        var d = new Date();  //Hämta dagens datum
        var datum = d.getDate();

        //Om datumet är enkelsiffrigt måste en nolla läggas till före
        if (datum.toString().length == 1) {
            var tid06 = "0" + datum + "T06:00:00Z"
            var tid12 = "0" + datum + "T12:00:00Z"
            var tid18 = "0" + datum + "T18:00:00Z"

        }
        /*Annars lägga in datum plus texten för de olika tiderna. Använder enbart texten för datum ej år eller månad för inte troligt väder en hel månad framåt */

        else {

            var tid06 = datum + "T06:00:00Z"
            var tid12 = datum + "T12:00:00Z"
            var tid18 = datum + "T18:00:00Z"
        }

        var tomorrow = new Date(); /*hämtar dagens datum*/
        tomorrow.setDate(tomorrow.getDate() + 1); /* använder setdate för att välja morggondagens datum i en lösning som även fungerar ny månad */
        var imorgon = tomorrow.getDate(); /* väljer att ta ut datumet för morgondagens datum som jag skapat och lägger in det i variabeln i morgon */

        /* samma här datum med en eller två sifror*/
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

        var tSeries = json.timeSeries; /* hämtar arrayen med timeseries */

        var tSeriesLenght = tSeries.length;

        for (var k5 = 0; k5 < tSeriesLenght; k5++) {
            /* idag */
            if (json.timeSeries[k5].validTime.substr(8, 15) == tid06) {
                temp[0] = tSeries[k5].parameters[1].values  /*hämtar värden för den tiden och datuemet och läggar in det i rätt plats i de skapade arrayerna som sedan används nedan. Med hjälp av en for loop*/
                vr[0] = tSeries[k5].parameters[3].values
                vh[0] = tSeries[k5].parameters[4].values
                va[0] = tSeries[k5].parameters[18].values

            } /* variabel som går igenom timeserias med de olika tiderna och datumena, Jag hämtar bara slutat på strängen med substr så det överstämmer med texten. Att valde som sagt att inte ha med år och månad. */

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


        var tempfalt = [this.querySelector('#temp1'), this.querySelector('#temp2'), this.querySelector('#temp3'), this.querySelector('#temp4'), this.querySelector('#temp5'), this.querySelector('#temp6')] //Använder this och quereselector samt de id jag har angett för att hitta fälten där värdena ska in.
        var tempLength = temp.length;

        for (var i = 0; i < tempLength; i++) //Skapa For loop som går igenom värden i variabeln. For loop bestående av tre statement först anges värdet för k sedan anges vilkor när loopen och dess funktion ska köras i det här fallet tills alla värden i arrayen gåtts igenom. Första arrayplats är noll medan startvärde för längden är 1. Sedan vad som ska hända varje omgång funktionen utförs i det är fallet att värdet k plusas på med ett. Har valt att dela upp det på tre foorloppar en för temperatur, en för vind och en för väder för att göra det mer tydligt.
        {
            if ((-41 < temp[i]) && !(40 < temp[i])) /* Utgår från att extremt temperaturspannet för Gotland bör vara mellan -40 och + 40 att utanför det spannet bör det vara något fel. Då går det även att få med om att det skulle vara några fel.Om ej fel så sätts värdet till  */ {
                tempfalt[i].innerHTML = temp[i]


            }
            else {
                tempfalt[i].innerHTML = "N/A" //Om värdet inte är inom extremspannet så ska texten N/A visas i stället.


            }

        }


        //Skapa arrayer för temperaturvärden och de fält datan ska in:


        var vind = [this.querySelector('#vind1'), this.querySelector('#vind2'), this.querySelector('#vind3'), this.querySelector('#vind4'), this.querySelector('#vind5'), this.querySelector('#vind6')] //Använder this och quereselector samt de id jag har angett för att hitta fälten där värdena ska in.

        vrLength = vr.length;

        for (var j = 0; j < vr.length; j++) {


            if ((0 < vr[j]) && !(360 < vr[j])) /* För att pilen ska visa vindriktning ska värdet vara i det normala spannet för vindriktning 1-360 grader 0 grader betyder att ingen vindriktning går att faställa altenertivt vindstilla */ {
                vind[j].childNodes[0].alt = "Vindrikrning " + vr[j] + " grader." // För den som inte kan se bilden så finns det en alt text med vindriktningen.
                let vrpil = parseInt(vr[j]) + 180
                vind[j].childNodes[0].style.transform = "rotate(" + vrpil + "deg)" // Få pilen att snurra till avsedda grader genom att välja childnode ett i fältet vilket är pilen samt ange attributet style för att ändra css i detta fall at property transform ska ändra samt att värdet är rotate + siffervärdet + deg



            }
            else {
                vind[j].innerHTML = "" // om värdet för vindriktning inte befinner sig inom spannet så ska pilen tas bort. Genom att innehållet i fälten med namnet vind anges till "" det vill säga tomt


            }
            if ((0 <= vh[j]) && !(55 < vh[j])) /*Värdet för vindhastighet ska läggas in om värdet är lika eller större 0, får då med vinstilla samt mindre 55, en bit över maximala orkanstyrkan Sverige */ {
                vind[j].innerHTML += "(" + vh[j] + ")" //använder innerHTML i kombination med += för att inte pilen ska tas bort anger även konsolerna inom parentser för att dessa ska läggas till som text.


            }


            if (!((0 < vr[j]) && !(360 < vr[j])) && !((0 <= vh[j]) && !(55 < vh[j]))) //Om både värdet för vindriktning och vindhastighet är utanför spannet ska värdet anges till N/A

            {
                vind[j].innerHTML = "N/A" //Här är det text som ska läggas in därför använda paranteser

            }
        }
        //Har kollat upp värdena 1-15 och lagt in dem i en array från plats ett till 15 plats 0 är om väder saknas
        var vader = ["Väder saknas", "Klar himmel", "Nästan klar himmel", "Växlande molnighet", "Halvklar himmel",
            "Molnigt", "Mulet", "Dimma", "Regnskurar", "Åskväder",
            "Lätt snöblandat regn", "Snöbyar", "Regn", "Åska", "Snöblandat regn", "Snöfall"]


        var va1 = [this.querySelector('#va1'), this.querySelector('#va2'), this.querySelector('#va3'), this.querySelector('#va4'), this.querySelector('#va5'), this.querySelector('#va6')]

        var vaLenght = va.length;

        for (var k = 0; k < vaLenght; k++) {

            if (vader[va[k]] == undefined) { /* om värdet är undefinet så ska värdet för array plats 0  för vädret anges vilket är att vädret saknas */
                va1[k].innerHTML = vader[0]

            }
            else {
                va1[k].innerHTML = vader[va[k]] //annas sätts värdet in i respektive fält.

            }
        }

    }





}());



