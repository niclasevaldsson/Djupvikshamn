(function() {
"use strict"; 

    

    const menu = document.getElementById("menu"); 
    const menuOffSetTop = menu.offsetTop;
    const mobilmenu = document.getElementById("mobilmenu");
    menu.style.display = "none";

    window.onscroll = function () { windowOnScroll(); };

    mobilmenu.addEventListener("click", function () {
        this.classList.toggle("change");
        menu.style.display = menu.style.display === "none" ? "" : "none";
    });

    function windowOnScroll() {
           
        if (menuOffSetTop <= window.pageYOffset) {
            console.log(window.pageYOffset);
            menu.classList.add("fixerad");
        }

        else {
            menu.classList.remove("fixerad");
        }
    }

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "dd0344a9-583c-4ead-be34-47ce07901d96");

    xhr.send(data);


}());



