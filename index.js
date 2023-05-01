// create header-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const wrapperBlock = document.createElement('div');
wrapperBlock.setAttribute('class', 'wrapper');
document.body.appendChild(wrapperBlock); 
const titleBlock = document.createElement('header');
titleBlock.setAttribute('class', 'title-block');

const title = document.createElement('h1');
title.setAttribute('class', 'title');
title.textContent = "RSS Virtual Keyboard";

titleBlock.appendChild(title); 

wrapperBlock.appendChild(titleBlock); 

const mainBlock = document.createElement('main');
mainBlock.setAttribute('class', 'main-block');
wrapperBlock.appendChild(mainBlock);
  
// create textarea-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const inputField = document.createElement('textarea');
inputField.setAttribute('type', 'text');
inputField.setAttribute('class', 'input-keyboard');
mainBlock.appendChild(inputField)

// create keyboard-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const keyboard = document.createElement('div');
keyboard.setAttribute('class', 'keyboard');
mainBlock.appendChild(keyboard);

const firstRowKeys=['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace']
const firstRowChange=['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace']
const secondRowKeys=['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del']
const secondRowChange=['Tab','q','w','e','r','t','y','u','i','o','p','{','}','|','Del']
const thirdRowKeys=['CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter']
const thirdRowChange=['CapsLock','a','s','d','f','g','h','j','k','l',':','\"','Enter']
const fourRowKeys=['Shift','z','x','c','v','b','n','m',',','.','/',String.fromCharCode(0x2191),'Shift']
const fourRowChange=['Shift','z','x','c','v','b','n','m','<','>','?',String.fromCharCode(0x2191),'Shift']
const fiveRowKeys=['Ctrl','Win','Alt','','Alt',String.fromCharCode(0x2190),String.fromCharCode(0x2193),String.fromCharCode(0x2192),'Ctrl']

const firstRowBlock = document.createElement('div');
firstRowBlock.setAttribute('class', 'first-row row-block');
keyboard.appendChild(firstRowBlock);
const secondRowBlock = document.createElement('div');
secondRowBlock.setAttribute('class', 'second-row row-block');
keyboard.appendChild(secondRowBlock);
const thirdRowBlock = document.createElement('div');
thirdRowBlock.setAttribute('class', 'third-row row-block');
keyboard.appendChild(thirdRowBlock);
const fourRowBlock = document.createElement('div');
fourRowBlock.setAttribute('class', 'four-row row-block');
keyboard.appendChild(fourRowBlock);
const fiveRowBlock = document.createElement('div');
fiveRowBlock.setAttribute('class', 'five-row row-block');
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

function clickShift() {
  createElements(getUpperCase(firstRowChange), ".first-row");
  createElements(getUpperCase(secondRowChange), ".second-row");
  createElements(getUpperCase(thirdRowChange), ".third-row");
  createElements(getUpperCase(fourRowChange), ".four-row");
  clickButtons();
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

function clickCapsLock() {
  const capsLock = document.querySelector(".caps-lock");
  capsLock.addEventListener("click", () => {
    if (capsLock.classList.contains("focused")) {
     getAllUpperCase();
    } else  {
      createAllElements();
    }
  });
}

clickCapsLock();

document.querySelector(".shift").addEventListener("click", () => {
  clickShift();
});

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
  addFocusClass(document.querySelector(`.main-btn[data="` + temp + `"]`));
  if (event.code === "ControlLeft"|| event.code === "AltLeft") toggleKeyboardLayout()
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

