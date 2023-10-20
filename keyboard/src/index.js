import "./utils/create.js";
import {
  inputField,
  createAllElements,
  changeKeyboardLayout,
  changeAllRows,
  keyboardLayout,
  changeShiftAndCapps,
  flags
} from "./utils/create.js";

const shiftBtn = document.querySelectorAll(".shift");
const [shiftLeft, shiftRight] = Array.from(shiftBtn);
const capsLock = document.querySelector(".caps-lock");
const { firstRowKeys, firstRowChange, secondRowKeys, secondRowChange, thirdRowKeys, thirdRowChange, fourRowKeys, fourRowChange, fiveRowKeys, secondRowKeysUa, secondRowChangeUa, thirdRowKeysUa, thirdRowChangeUa, fourRowKeysUa, fourRowChangeUa } = keyboardLayout;

function getAllUpperCase() {
  (flags.language === "en")
    ? changeAllRows(firstRowKeys, secondRowKeys, thirdRowKeys, fourRowKeys)
    : changeAllRows(firstRowKeys, secondRowKeysUa, thirdRowKeysUa, fourRowKeysUa);
}

function addFocusClass(element) {
  if (element.getAttribute('data') !== 'CapsLock') {
    element.classList.add("focused");
    setTimeout(()=> {
      element.classList.remove("focused");
    }, 200);
  }
}

// click buttons and get input -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function clickButtons() {
  document.querySelectorAll(".main-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains('shift')){
      if (btn.getAttribute('data') === 'CapsLock') addFocusCapsLock();
      if (btn.getAttribute('data') === 'Tab') getInputSpaces('\t');
      if (btn.getAttribute('data') === 'Space') getInputSpaces(' ');
      if (btn.getAttribute('data') === 'Enter') getInputSpaces('\n');
      if (btn.getAttribute('data') === 'Delete') getDelBackspace(0);;
      if (btn.getAttribute('data') === 'Backspace') getDelBackspace(1);
      else {
        if (btn.textContent.length === 1) inputText(btn);
         addFocusClass(btn);
      }
    } 
    });
  });
}

clickButtons();

function inputText(btn) {
  const cursorPosition = inputField.selectionStart;
  const currentValue = inputField.value;
  const newValue = currentValue.substring(0, cursorPosition) + btn.innerHTML + currentValue.substring(cursorPosition);
  inputField.value = newValue;
  inputField.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  inputField.focus();
}

function getInputSpaces(symb) {
  const cursorPosition = inputField.selectionStart;
  const currentValue = inputField.value;
  const newValue = currentValue.substring(0, cursorPosition) + symb + currentValue.substring(cursorPosition);
  inputField.value = newValue;
  inputField.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  inputField.focus();
}

function getDelBackspace(i) {
  const cursorPosition = inputField.selectionStart;
  const currentValue = inputField.value;
  const newValue = currentValue.substring(0, cursorPosition-i) + currentValue.substring(cursorPosition + 1-i);
  inputField.value = newValue;
  inputField.setSelectionRange(cursorPosition-i, cursorPosition-i);
  inputField.focus();
}

// Shift pressed---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function clickShift() {
  if (flags.shiftKeyPressed) {
    if(!capsLock.classList.contains('focused')) {
    (flags.language === "en")
      ? changeAllRows(firstRowChange, secondRowChange, thirdRowChange, fourRowChange)
      : changeAllRows(firstRowChange, secondRowChangeUa, thirdRowChangeUa, fourRowChangeUa);
    } else {
      (flags.language === "en")
      ? changeShiftAndCapps(firstRowChange, secondRowChange, thirdRowChange, fourRowChange)
      : changeShiftAndCapps(firstRowChange, secondRowChangeUa, thirdRowChangeUa, fourRowChangeUa);
    }
  }
  if (!flags.shiftKeyPressed) {
    if(!capsLock.classList.contains('focused'))createAllElements(changeKeyboardLayout);
    else {
      getAllUpperCase()
    }
  }
}

function toggleShift(res) {
  flags.shiftKeyPressed = res;
  clickShift();
}

function shiftMousedown(shift) {
  shift.addEventListener("mousedown", function() {
    this.classList.add('focused');
    toggleShift(true);
  });
}

function shiftMouseup(shift) {
  shift.addEventListener("mouseup", function() {
    this.classList.remove('focused');
    toggleShift(false); 
  });
}

shiftMousedown(shiftLeft);
shiftMousedown(shiftRight);
shiftMouseup(shiftLeft);
shiftMouseup(shiftRight);

//CapsLock  pressed---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function clickCapsLock() {
  capsLock.classList.contains('focused') ? getAllUpperCase() : createAllElements(changeKeyboardLayout);
}

function pressCapsLock(value) {
  value?addFocusCapsLock():clickCapsLock();
}

function addFocusCapsLock() {
  capsLock.classList.toggle("focused");
  clickCapsLock();
}

//onkeyup/onkeydown---------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const btn = document.querySelector(`.main-btn[data="${event.code}"]`);

  switch (event.code) {
    case "CapsLock":
      pressCapsLock(true);
      break;
    case "ShiftLeft":
    case "ShiftRight":
      btn.classList.add('focused');
      toggleShift(true);
      break;
    case "Enter":
      getInputSpaces('\n');
      break;
    case "Tab":
      getInputSpaces('\t');
      break;
    case "Backspace":
      getDelBackspace(1);
      break;
    case "Delete":
      getDelBackspace(0);
      break;
    case "Space":
      getInputSpaces(' ');
      break;
    case "ControlLeft":
    case "ControlRight":
      flags.controlPressed = true;
      break;
    case "AltLeft":
    case "AltRight":
      flags.altPressed = true;
      break;
  }

  if (flags.controlPressed && flags.altPressed) {
    flags.language = (flags.language === "en") ? "uk" : "en";
    setLocalStorage();
    document.querySelector(`.main-btn[data="${event.code}"]`).classList.add("focused");
    capsLock.classList.contains('focused') ? getAllUpperCase() : createAllElements(changeKeyboardLayout);
  }
  
  else {
    if (btn.textContent.length === 1) inputText(btn);
      addFocusClass(btn);
    }
});


document.addEventListener("keyup", (event) => {
  const btn = document.querySelector(`.main-btn[data="` + event.code + `"]`);
  if (event.code === "CapsLock") pressCapsLock(false);
  if (event.key === "Shift") {
    btn.classList.remove('focused');
    toggleShift(false);
  }

  if (event.code === "ControlLeft" || event.code === "ControlRight") {
    flags.controlPressed = false;
    document.querySelector(`.main-btn[data="` + event.code + `"]`).classList.remove("focused");
  }
  
  if (event.code === "AltLeft" || event.code === "AltRight") {
    flags.altPressed = false;
    document.querySelector(`.main-btn[data="` + event.code + `"]`).classList.remove("focused");
  }
})

// save language in localStorage ----------------------------------------------------------------------------------------------------------
function setLocalStorage() {
  localStorage.setItem('language', flags.language);
}

function getLocalStorage() {
  if (localStorage.getItem('language')) {
    flags.language = localStorage.getItem('language');
    capsLock.classList.contains('focused') ? getAllUpperCase() : createAllElements(changeKeyboardLayout);
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);