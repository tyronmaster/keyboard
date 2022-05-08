/* LOCAL STORAGE */
let lang = "en";
let theme = "dark";

function setLocalStorage() {
   localStorage.setItem("lang", lang);
   localStorage.setItem("theme", theme);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem("lang")) {
       lang = localStorage.getItem("lang");
    }
    if (localStorage.getItem("theme")) { 
     theme = localStorage.getItem("theme");
         if(theme == "dark"){
        document.body.classList.add("dark");
        colorMode.classList.remove("active");
    } else {
        document.body.classList.remove("dark");
        colorMode.classList.add("active");
    }
    };
 };
 
 window.addEventListener("load", getLocalStorage);
 /* local storage ends  ==========================*/



/* CREATE MAIN ==================================== */
const main = document.createElement("main");
main.classList.add("container");

//section settings -------------------------------
const settings = document.createElement("section");
settings.classList.add("settings");
const settingsContainer = document.createElement("div");
settingsContainer.classList.add("settings__container");

// color theme button
const colorMode = document.createElement("div");
colorMode.classList.add("button__theme");
colorMode.addEventListener("click", function(){
    document.body.classList.toggle("dark");
    colorMode.classList.toggle("active");
    document.body.classList.contains("dark") ? theme = "dark" : theme = "light";    
});
// color theme ends

settingsContainer.append(colorMode);
settings.append(settingsContainer);
// section settings ends ---------------------------

// section text ------------------------------------
const text = document.createElement("section");
text.classList.add("text");
const textContainer = document.createElement("textarea");
textContainer.classList.add("text__container");
text.append(textContainer);
//section text ends ---------------------------------

// section keyboard ---------------------------------
const keyboard = document.createElement("section");
keyboard.classList.add("keyboard");
const keyboardContainer = document.createElement("div");
keyboardContainer.classList.add("keyboard__container");
keyboard.append(keyboardContainer);
// section keyboardends -----------------------------

main.append(settings);
main.append(text);
main.append(keyboard);
document.body.append(main);
/* create main ends ==================================== */

