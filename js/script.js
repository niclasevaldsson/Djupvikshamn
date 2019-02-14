(function() {
"use strict"; 
    
    const menu = document.getElementById("menu"); 
    const menuOffSetTop = menu.offsetTop;
    const mobilmenu = document.getElementById("mobilmenu");

    menu.classList.add("dold");
   
    mobilmenu.addEventListener("click", function () {
        this.classList.toggle("menysynlig");
        menu.classList.toggle("dold");   
    });  


}());



