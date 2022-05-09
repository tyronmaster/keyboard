/* LOCAL STORAGE ==========================================*/
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

/* CREATE MAIN SECTION ==================================== */
const main = document.createElement("main");
main.classList.add("container");

//section settings -------------------------------
const settingsSection = document.createElement("section");
settingsSection.classList.add("settings");
const settingsContainer = document.createElement("div");
settingsContainer.classList.add("settings__container");

// color theme button
const colorMode = document.createElement("div");
colorMode.classList.add("button__theme");
colorMode.addEventListener("click", function(){
    document.body.classList.toggle("dark");
    colorMode.classList.toggle("active");
    document.body.classList.contains("dark") ? theme = "dark" : theme = "light"; 
    textContainer.focus();   
});
// color theme ends

settingsContainer.append(colorMode);
settingsSection.append(settingsContainer);
// section settings ends ---------------------------

// section text ------------------------------------
const textSection = document.createElement("section");
textSection.classList.add("text");
const textContainer = document.createElement("textarea");
textContainer.classList.add("text__container");
textSection.append(textContainer);
//section text ends ---------------------------------

// section keyboard ---------------------------------
const keyboardSection = document.createElement("section");
keyboardSection.classList.add("keyboard");
const keyboardContainer = document.createElement("div");
keyboardContainer.classList.add("keyboard__container");
keyboardSection.append(keyboardContainer);
// section keyboardends -----------------------------

main.append(settingsSection);
main.append(textSection);
main.append(keyboardSection);
document.body.append(main);
textContainer.focus();
/* create main ends ==================================== */

class Keyboard {
    constructor(language = "en", _keysContainer = keyboardContainer, _textContainer = textContainer){
        this.properties.language = language;
        this.elements.keysContainer = _keysContainer;
        this.elements.textContainer = _textContainer;
    }

keysData = {
    keysCode: ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", 
            "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", 
            "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", 
            "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight", 
            "ControlLeft", "", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"],
    keysEn: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", 
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "arrow-up", "right-shift", 
            "ctrl", "lang", "alt", "spacebar", "alt", "ctrl", "arrow-left", "arrow-down", "arrow-right"],
    keysRu: ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", 
            "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", 
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter", 
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "arrow-up", "right-shift", 
            "ctrl", "lang", "alt", "spacebar", "alt", "ctrl", "arrow-left", "arrow-down", "arrow-right"],
    shiftKey: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 
            "{", "}", "|", ":", '"', "<", ">", "?"],
    topRow: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 
            "[", "]", "\\", ";", "'", ",", ".", "/"]
}

elements = {
    keysContainer: null,
    textContainer: null,
    keys: [],
    tempArr: []
}

properties = {
    value: "",
    del: false,
    capsLock: false,
    shiftKey: false,
    cursorPosition: 0
}

    init(){
        //console.log(this.properties.language);
        const parentThis = this;
        
        this.elements.keysContainer.appendChild(this.createKeys());
        this.elements.keys.forEach(function (keyButton, index) {
            keyButton.setAttribute("data", parentThis.keysData.keysCode[index]);
            keyButton.addEventListener("click", function(){
                parentThis.elements.textContainer.value = parentThis.properties.value;
            })
        });
        this.keyDown();
        this.keyUp();
    }

    createKeys(){
        const parentThis = this;// save main context for forEach
        const fragment = document.createDocumentFragment();

        // create arrow svg
        const createArrow = () => `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.56699 0.75C3.75944 0.416667 4.24056 0.416667 4.43301 0.75L7.89711 6.75C8.08956 7.08333 7.849 7.5 7.4641 7.5H0.535898C0.150998 7.5 -0.0895646 7.08333 0.102885 6.75L3.56699 0.75Z"
          fill="#C4C4C4" /></svg>`;

        // check starting alphabet for keyboard darwing
        let keysLayout;
        this.properties.language == "en" ? keysLayout = this.keysData.keysEn : keysLayout = this.keysData.keysRu;
        keysLayout.forEach( key => {
            let keyElement = document.createElement("div");
            keyElement.classList.add("key");
            let dividerElement = 
            ["backspace", "\\", "enter", "right-shift"]
            .indexOf(key) !== -1;

            switch (key) {
                case "backspace":
                    keyElement.classList.add("key__wide", "backspace");
                    keyElement.innerHTML = `<span>Backspace</span>
                    <svg width="21" height="10" viewBox="0 0 21 10" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.81818 0L0 5L6.81818 10H20.7071V0H6.81818ZM16.7172 7.62626C16.9697 7.87879 16.9697 8.23232 16.7172 8.43434C16.4646 8.63636 16.1111 8.68687 15.9091 8.43434L13.3333 5.85859L10.7576 8.43434C10.5051 8.68687 10.1515 8.68687 9.9495 8.43434C9.74748 8.18182 9.69697 7.82828 9.9495 7.62626L12.5253 5.05051L9.9495 2.47475C9.69697 2.22222 9.69697 1.86869 9.9495 1.66667C10.202 1.46465 10.5556 1.41414 10.7576 1.66667L13.3333 4.24242L15.9091 1.66667C16.1616 1.41414 16.5152 1.41414 16.7172 1.66667C16.9192 1.91919 16.9697 2.27273 16.7172 2.47475L14.1414 5L16.7172 7.62626Z"
                        fill="#231F20"
                      /></svg>`;
                    keyElement.addEventListener("click", () => {
                        
                        const startOfSelection = parentThis.elements.textContainer.selectionStart;
                        const endOfSelection = parentThis.elements.textContainer.selectionEnd;

                        parentThis.properties.cursorPosition = startOfSelection;
                        if(startOfSelection == endOfSelection){
                            parentThis.properties.value = parentThis.properties.value.substring(0, parentThis.properties.cursorPosition -1) + parentThis.properties.value.substring(parentThis.properties.cursorPosition);
                        } else {
                            parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + parentThis.properties.value.substring(endOfSelection);
                        }

                        //parentThis.properties.cursorPosition = startOfSelection;
                        
                        parentThis.addText(parentThis.properties.value);

                        parentThis.elements.textContainer.selectionStart = parentThis.properties.cursorPosition-1;
                        parentThis.elements.textContainer.selectionEnd = parentThis.properties.cursorPosition-1;
                        console.log(parentThis.properties.value);
                    });
                    break;

                case "tab":
                    keyElement.classList.add("key__halfwide");
                    keyElement.textContent = "Tab";
                    keyElement.addEventListener("click", function(e){
                        e.preventDefault();
                        const startOfSelection = parentThis.elements.textContainer.selectionStart;
                        const endOfSelection = parentThis.elements.textContainer.selectionEnd;
                        
                        parentThis.properties.cursorPosition = startOfSelection;

                        if(startOfSelection == endOfSelection)
                        parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + "    " + parentThis.properties.value.substring(startOfSelection);
                        else 
                        parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + "    " + parentThis.properties.value.substring(endOfSelection);
                        parentThis.addText(parentThis.properties.value);

                        parentThis.elements.textContainer.selectionStart = parentThis.properties.cursorPosition + 4;
                        parentThis.elements.textContainer.selectionEnd = parentThis.properties.cursorPosition + 4;
                    });
                break;

                case "caps":
                    keyElement.classList.add("key__wide");
                    keyElement.textContent = "CapsLock";
                    keyElement.addEventListener("click", function(){
                        parentThis.toggleCapsLock();
                        this.classList.toggle("active", parentThis.properties.capsLock);
                    });
                break;
                        
                case "enter":
                    keyElement.classList.add("key__wide");
                    keyElement.textContent = "Enter";
                    keyElement.addEventListener("click", function(){
                        const startOfSelection = parentThis.elements.textContainer.selectionStart;
                        const endOfSelection = parentThis.elements.textContainer.selectionEnd;
                        
                        parentThis.properties.cursorPosition = startOfSelection;
                        if(startOfSelection == endOfSelection)
                        parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + "\n" + parentThis.properties.value.substring(startOfSelection);
                        else 
                        parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + "\n" + parentThis.properties.value.substring(endOfSelection);
                        
                        parentThis.addText(parentThis.properties.value);

                        parentThis.elements.textContainer.selectionStart = parentThis.properties.cursorPosition+1;
                        parentThis.elements.textContainer.selectionEnd = parentThis.properties.cursorPosition+1;
                    });
                    break;

                case "shift":
                    keyElement.classList.add("key__halfwide");
                    keyElement.textContent = "Shift";
                    keyElement.addEventListener("click", function () {
                        //parentThis._toggleShiftKey();
                    });
                break;
                case "right-shift":
                    keyElement.textContent = "Shift";
                    keyElement.addEventListener("click", function () {
                        //parentThis._toggleShiftKey();
                    });
                break;

                case "ctrl":
                    keyElement.classList.add("key__halfwide");
                    keyElement.textContent = "Ctrl";
                    keyElement.addEventListener("click", function () {
                        
                    });
                break;
                case "alt":
                    keyElement.textContent = "Alt";
                    keyElement.addEventListener("click", function () {
                        
                    });
                break;

                case "lang":
                    keyElement.textContent = this.properties.language.toUpperCase();
                    keyElement.addEventListener("click", function () {
                        if(parentThis.properties.language == "en"){
                            keyElement.textContent = "RU";
                            parentThis.properties.language = "ru";
                        } else {
                            keyElement.textContent = "EN";
                            parentThis.properties.language = "en";
                        }
                        parentThis.drawLanguageKeys();
                    });
                break;

                case "spacebar":
                    keyElement.classList.add("key__extrawide");
                    keyElement.textContent = "Backspace";
                    keyElement.addEventListener("click", function(){
                        const startOfSelection = parentThis.elements.textContainer.selectionStart;
                        const endOfSelection = parentThis.elements.textContainer.selectionEnd;
                        
                        parentThis.properties.cursorPosition = startOfSelection;
    
                        if(startOfSelection == endOfSelection)
                            parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + " " + parentThis.properties.value.substring(startOfSelection);
                        else 
                            parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + " " + parentThis.properties.value.substring(endOfSelection);
                        parentThis.addText(parentThis.properties.value);
    
                        parentThis.elements.textContainer.selectionStart = parentThis.properties.cursorPosition + 1;
                        parentThis.elements.textContainer.selectionEnd = parentThis.properties.cursorPosition + 1;
                    });
                break;

                // arrowup & arrowdown not implemented
                case "arrow-up":
                    keyElement.classList.add("arrowkey", "keyup");
                    keyElement.innerHTML = createArrow();
                    keyElement.addEventListener("click", function () {
                        const startOfSelection = parentThis.elements.textContainer.selectionStart;
                        const endOfSelection = parentThis.elements.textContainer.selectionEnd;
                        const lengthOfText = parentThis.elements.textContainer.textLength;

                        if(startOfSelection == endOfSelection && startOfSelection == lengthOfText){

                        }
                        parentThis.elements.textContainer.focus();
                        console.log(parentThis.elements.textContainer);
                    });
                break;
                case "arrow-left":
                    keyElement.classList.add("arrowkey", "keyleft");
                    keyElement.innerHTML = createArrow();

                    keyElement.addEventListener("click", function () {
                        parentThis.elements.textContainer.selectionStart ? parentThis.elements.textContainer.selectionStart-- : 0;
                        parentThis.elements.textContainer.selectionEnd ? parentThis.elements.textContainer.selectionEnd-- : 0;
                        parentThis.elements.textContainer.focus();
                });
                break;
                case "arrow-right":
                    keyElement.classList.add("arrowkey", "keyright");
                    keyElement.innerHTML = createArrow();

                    keyElement.addEventListener("click", function () {
                        parentThis.elements.textContainer.selectionDirection = "backward";

                        parentThis.elements.textContainer.selectionEnd < parentThis.elements.textContainer.textLength ? 
                        parentThis.elements.textContainer.selectionEnd++ : 
                        parentThis.elements.textContainer.selectionEnd = parentThis.elements.textContainer.textLength;

                        parentThis.elements.textContainer.selectionStart < parentThis.elements.textContainer.textLength ? 
                        parentThis.elements.textContainer.selectionStart++ : 
                        parentThis.elements.textContainer.selectionStart = parentThis.elements.textContainer.textLength;

                        parentThis.elements.textContainer.focus();
                });
                break;
                case "arrow-down":
                    keyElement.classList.add("arrowkey", "keydown");
                    keyElement.innerHTML = createArrow();
                    keyElement.addEventListener("click", function () {
                        parentThis.elements.textContainer.focus();
                        console.log(parentThis.elements.textContainer);
                    });
                break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.classList.add("keyboard-alphabet");
                    keyElement.classList.add("keyboard-lang");
                    keyElement.addEventListener("click", function () {
                        //parentThis.keySound();
                        const startOfSelection = parentThis.elements.textContainer.selectionStart;
                        const endOfSelection = parentThis.elements.textContainer.selectionEnd;
                        
                        parentThis.properties.cursorPosition = startOfSelection;
                        if (startOfSelection == endOfSelection) {
                            parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + keyElement.textContent + parentThis.properties.value.substring(startOfSelection);
                        } else {
                            parentThis.properties.value = parentThis.properties.value.substring(0, startOfSelection) + keyElement.textContent + parentThis.properties.value.substring(endOfSelection);
                        }

                        parentThis.addText(parentThis.properties.value);

                    parentThis.elements.textContainer.selectionStart = parentThis.properties.cursorPosition + 1;
                    parentThis.elements.textContainer.selectionEnd = parentThis.properties.cursorPosition + 1;
                    console.log(parentThis.properties.value);
                });
                break;
            };
            fragment.appendChild(keyElement);

            // create keys array for EventListener
            parentThis.elements.keys.push(keyElement); 

            // add break-keyboard-line div
            if (dividerElement) {
                const breakElement = document.createElement("div");
                breakElement.classList.add("break");
                fragment.appendChild(breakElement);
              }
        });
        return fragment;
    }

    addText(currentValue){
        this.elements.textContainer.focus();
        this.elements.textContainer.value = currentValue;
    }

    drawLanguageKeys(){
        
        const parentThis = this;
        let keysLang;
        this.properties.language == "en" ? keysLang = this.keysData.keysEn : keysLang = this.keysData.keysRu;

        this.elements.keys.forEach( (item, index) => {
            if(item.classList.contains("keyboard-lang")){
                item.textContent = parentThis.properties.capsLock ? keysLang[index].toUpperCase() : keysLang[index].toLowerCase();
            }
        });
        lang = this.properties.language;
        console.log(this.properties.language);
        console.log(lang);
    }

    toggleCapsLock(){
        this.properties.capsLock = !this.properties.capsLock;
        const parentThis = this;

        this.elements.keys.forEach( item => {
            if(item.classList.contains("keyboard-alphabet") && parentThis.properties.capsLock)
            item.textContent = item.textContent.toUpperCase();
            else if(item.classList.contains("keyboard-alphabet"))
            item.textContent = item.textContent.toLowerCase();
        });
    }

    toggleShiftKey(){

    }


    keyDown(){
        const parentThis = this;
        this.elements.textContainer.focus();

        document.addEventListener("keydown", (e) => {
            parentThis.elements.keys.forEach( item => {
                const keyAttribute = item.getAttribute("data");

                switch(e.code){
                    case keyAttribute:
                        item.classList.add("active");
                    break;
                    
                    case keyAttribute && (keyAttribute == "ShiftLeft" || keyAttribute == "ShiftRight"):
                        parentThis.toggleShiftKey();    
                    break;

                }
            })
        })
    }

    keyUp(){
        const parentThis = this;
        
        document.addEventListener("keyup", (e) => {
            console.log(e.code);
            console.log(e.key);
            this.elements.textContainer.focus();
            parentThis.elements.keys.forEach( item => {
                const keyAttribute = item.getAttribute("data");
                const alphabetItem = item.classList.contains("keyboard-alphabet");

                if( e.code == keyAttribute)
                    item.classList.remove("active");

                if(e.code == keyAttribute && (alphabetItem || keyAttribute == "Space"))
                    parentThis.properties.value += e.key;

                if( e.code == keyAttribute && keyAttribute === "CapsLock"){
                    parentThis.toggleCapsLock();
                    parentThis.elements.keys[28].classList.toggle("active", parentThis.properties.capsLock);
                }
            });
        });
    }

};

window.addEventListener("DOMContentLoaded", function () {
    getLocalStorage();
    let keyboard = new Keyboard(lang);
    keyboard.init();
  });