// create header-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const wrapperBlock = document.createElement("div");
wrapperBlock.setAttribute("class", "wrapper");
document.body.appendChild(wrapperBlock);
const titleBlock = document.createElement("header");
titleBlock.setAttribute("class", "title-block");

const title = document.createElement("h1");
title.setAttribute("class", "title");
title.textContent = "RSS Virtual Keyboard";

titleBlock.appendChild(title);

wrapperBlock.appendChild(titleBlock);

const mainBlock = document.createElement("main");
mainBlock.setAttribute("class", "main-block");
wrapperBlock.appendChild(mainBlock);

// create textarea-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const inputField = document.createElement("textarea");
inputField.setAttribute("type", "text");
inputField.setAttribute("class", "input-keyboard");
mainBlock.appendChild(inputField);

// create keyboard-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const keyboard = document.createElement("div");
keyboard.setAttribute("class", "keyboard");
mainBlock.appendChild(keyboard);

let currentLanguage = "en";

function toggleKeyboardLayout() {
  if (currentLanguage === "en") {
    currentLanguage = "ru";
  } else {
    currentLanguage = "en";
  }
  inputField.lang = currentLanguage; 
}


//const firstRowKeys=[96,49,50,51,52,53,54,55,56,57,48,45,61,66]
//const secondRowKeys=[84,113,119,101,114,116,121,117,105,111,112,91,93,92]
//const thirdRowKeys=[67,97,115,100,102,103,104,106,107,108,59,39,69]
//const fourRowKeys=[83,122,120,99,118,98,110,109,44,46,47,65,83]
//const fiveRowKeys=[67,77,65,32,65,String.fromCharCode(0x2190),String.fromCharCode(0x2193),String.fromCharCode(0x2192),67]
const firstRowKeys=['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace']
const firstRowChange=['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace']
const secondRowKeys=['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del']
const secondRowChange=['Tab','q','w','e','r','t','y','u','i','o','p','{','}','|','Del']
const thirdRowKeys=['CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter']
const thirdRowChange=['CapsLock','a','s','d','f','g','h','j','k','l',':','\"','Enter']
const fourRowKeys=['Shift','z','x','c','v','b','n','m',',','.','/',String.fromCharCode(0x2191),'Shift']
const fourRowChange=['Shift','z','x','c','v','b','n','m','<','>','?',String.fromCharCode(0x2191),'Shift']
const fiveRowKeys=['Ctrl','Win','Alt','','Alt',String.fromCharCode(0x2190),String.fromCharCode(0x2193),String.fromCharCode(0x2192),'Ctrl']

const secondRowKeysUa=['Tab','й','ц','у','к','е','н','г','ш','щ','з','х',']','\\','Del']
const secondRowChangeUa=['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','}','|','Del']
const thirdRowKeysUa=['CapsLock','ф','і','в','а','п','р','о','л','д','ж','є','Enter']
const thirdRowChangeUa=['CapsLock','ф','і','в','а','п','р','о','л','д','ж','є','Enter']
const fourRowKeysUa=['Shift','я','ч','с','м','и','т','ь','б','ю','/',String.fromCharCode(0x2191),'Shift']
const fourRowChangeUa=['Shift','я','ч','с','м','и','т','ь','б','ю','?',String.fromCharCode(0x2191),'Shift']

const firstRowBlock = document.createElement("div");
firstRowBlock.setAttribute("class", "first-row row-block");
keyboard.appendChild(firstRowBlock);
const secondRowBlock = document.createElement("div");
secondRowBlock.setAttribute("class", "second-row row-block");
keyboard.appendChild(secondRowBlock);
const thirdRowBlock = document.createElement("div");
thirdRowBlock.setAttribute("class", "third-row row-block");
keyboard.appendChild(thirdRowBlock);
const fourRowBlock = document.createElement("div");
fourRowBlock.setAttribute("class", "four-row row-block");
keyboard.appendChild(fourRowBlock);
const fiveRowBlock = document.createElement("div");
fiveRowBlock.setAttribute("class", "five-row row-block");
keyboard.appendChild(fiveRowBlock);

//createElements -------------------------------------------------------------------------------------------------------
function createElements(array, num) {
  let out = "";
  for (let i = 0; i < array.length; i++) {
    let temp = array[i];
    if (array[i] === "") temp = "space";
    if (array[i] === "\\") temp = "backslash";
    if (array[i] === "Del") temp = "Delete";
    if (array[i] === "Win") temp = "Meta";
    if (array[i] === "Shift" && i === 0) temp = "Shift-left";
    if (array[i] === "Ctrl" && i === 0) temp = "Control-left";
    if (array[i] === "Ctrl" && i !== 0) temp = "Control";
    if (array[i] === "Alt" && i === 2) temp = "Alt-left";
    if (array[i] === String.fromCharCode(0x2191)) temp = "ArrowUp";
    if (array[i] === String.fromCharCode(0x2192)) temp = "ArrowRight";
    if (array[i] === String.fromCharCode(0x2193)) temp = "ArrowDown";
    if (array[i] === String.fromCharCode(0x2190)) temp = "ArrowLeft";
    out +=
      `<button class="main-btn" data="` + temp + `">` + array[i] + `</button>`;
    document.querySelector(num).innerHTML = out;
  }

  document.querySelectorAll(".main-btn").forEach((array, i) => {
    if (array.textContent.length > 4) array.classList.add("big-btn");
    if (array.textContent === "") array.classList.add("space-btn");
    if (array.textContent === "CapsLock") array.classList.add("caps-lock");
    if (array.textContent === "Shift") array.classList.add("shift");
    if (array.textContent === "Del") array.classList.add("del");
    if (array.textContent === "Backspace") array.classList.add("backspace");
  });
}

function createAllElements() {
  createElements(firstRowKeys, ".first-row");
  createElements(secondRowKeys, ".second-row");
  createElements(thirdRowKeys, ".third-row");
  createElements(fourRowKeys, ".four-row");
  createElements(fiveRowKeys, ".five-row");
}

createAllElements();

let lastKeyPressed = null;
let keyboardLayout = "default";

function toggleKeyboardLayout() {
 // if (keyboardLayout === "default") {
  //  keyboardLayout = "alternative";
    createElements(secondRowKeysUa, ".second-row");
    createElements(thirdRowKeysUa, ".third-row");
    createElements(fourRowKeysUa, ".four-row");
    clickButtons();
  // } else {
  //   keyboardLayout = "default";
  //   createAllElements()
  //   clickButtons();
  // }
  
}

// document.querySelector('.del').addEventListener ('click', () => {
//   out = out.substring(0, out.length - 1);
//   document.querySelector(num).innerHTML = out;
// });

function getUpperCase(array) {
  return array.map((key) => {
    if (key.length === 1) {
      return key.toUpperCase();
    } else {
      return key;
    }
  });
}

function getAllUpperCase() {
  createElements(getUpperCase(secondRowChange), ".second-row");
  createElements(getUpperCase(thirdRowKeys), ".third-row");
  createElements(getUpperCase(fourRowKeys), ".four-row");
  clickButtons();
}

let shiftKeyPressed = false;
function clickShift() {
  if (shiftKeyPressed) {
  createElements(getUpperCase(firstRowChange), ".first-row");
  createElements(getUpperCase(secondRowChange), ".second-row");
  createElements(getUpperCase(thirdRowChange), ".third-row");
  createElements(getUpperCase(fourRowChange), ".four-row");
  clickButtons();
}
if(!shiftKeyPressed) {
  createAllElements();
}
}

function addFocusClass(element) {
  if (element.textContent === "CapsLock") {
    element.classList.toggle("focused");
  } else {
    element.classList.add("focused");
    setTimeout(function () {
      element.classList.remove("focused");
    }, 300);
  }
}

function clickButtons() {
  document.querySelectorAll(".main-btn").forEach((array) => {
    array.addEventListener("click", function () {
      addFocusClass(this);
    });
    array.addEventListener("click", function () {
      if (array.textContent.length === 1) inputField.value += this.innerHTML;
    });
  });
}

clickButtons();

document.querySelectorAll(".shift").forEach((array) => {
  array.addEventListener("click", clickShift())
});

function clickCapsLock() {
  const capsLock = document.querySelector(".caps-lock");
  capsLock.addEventListener("click", () => {
    //if (this.classList.contains("focused")) {
     getAllUpperCase();
   // } else  {
     // createAllElements();
   // }
  });
}

clickCapsLock();

//onkeyup---------------------------------------------------------------------------------------------------------------------------------------------
document.onkeyup = function (event) {
  let temp = event.key;
  if (event.key === " ") temp = "space";
  if (event.key === "\\") temp = "backslash";
  if (event.code === "ShiftLeft") temp = "Shift-left";
  if (event.code === "ControlLeft") temp = "Control-left";
  if (event.code === "AltLeft") temp = "Alt-left";
  document.querySelectorAll(".main-btn").forEach((el) => {
    el.classList.remove("focused");
  });
  if (event.key === "CapsLock") getAllUpperCase();
document.addEventListener("keydown", function(event) {
  if (event.key === "Shift") {
    shiftKeyPressed = true;
    clickShift();
    document.querySelectorAll(".shift").classList.add('.focused')
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "Shift") {
    shiftKeyPressed = false;
    createAllElements();
    document.querySelectorAll(".shift").classList.remove('.focused')
  }
});
  addFocusClass(document.querySelector(`.main-btn[data="` + temp + `"]`));
 if (event.code === "ControlLeft"|| event.code === "AltLeft") toggleKeyboardLayout()
// document.addEventListener("keydown", function(event) {
//   if (event.code === "ControlLeft" || event.code === "AltLeft") {
//     if (event.code === lastKeyPressed) {
//       toggleKeyboardLayout();
//       lastKeyPressed = null;
//     } else {
//       lastKeyPressed = event.code;
//     }
//   }
// });
};

//create instruction-----------------------------------------------------------------------------------------------------------------------------------------------------
const instructionBlock = document.createElement("footer");
instructionBlock.setAttribute("class", "instruction-block");

const instructionOne = document.createElement("h3");
instructionOne.setAttribute("class", "instruction");
instructionOne.textContent =
  "The keyboard is created in the Windows operating system";

const instructionTwo = document.createElement("h3");
instructionTwo.setAttribute("class", "instruction");
instructionTwo.textContent =
  "To switch the language combination: left ctrl + alt";

instructionBlock.appendChild(instructionOne);
instructionBlock.appendChild(instructionTwo);

wrapperBlock.appendChild(instructionBlock);

const scriptTag = document.querySelector('script[src="./index.js"]');
document.body.appendChild(scriptTag);

