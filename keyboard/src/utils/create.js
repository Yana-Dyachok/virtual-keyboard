// create header-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const wrapperBlock = document.createElement("div");
wrapperBlock.setAttribute("class", "wrapper");
document.body.append(wrapperBlock);
const titleBlock = document.createElement("header");
titleBlock.setAttribute("class", "title-block");

const title = document.createElement("h1");
title.setAttribute("class", "title");
title.textContent = "RSS Virtual Keyboard";

titleBlock.append(title);

wrapperBlock.append(titleBlock);

const mainBlock = document.createElement("main");
mainBlock.setAttribute("class", "main-block");
wrapperBlock.append(mainBlock);

// create textarea-----------------------------------------------------------------------------------------------------------------------------------------------------------------
export const inputField = document.createElement("textarea");
inputField.setAttribute("type", "text");
inputField.setAttribute("class", "input-keyboard");
mainBlock.append(inputField);

// create keyboard-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const keyboard = document.createElement("div");
keyboard.setAttribute("class", "keyboard");
mainBlock.append(keyboard);

const firstRowBlock = document.createElement("div");
firstRowBlock.setAttribute("class", "first-row row-block");
keyboard.append(firstRowBlock);
const secondRowBlock = document.createElement("div");
secondRowBlock.setAttribute("class", "second-row row-block");
keyboard.append(secondRowBlock);
const thirdRowBlock = document.createElement("div");
thirdRowBlock.setAttribute("class", "third-row row-block");
keyboard.append(thirdRowBlock);
const fourRowBlock = document.createElement("div");
fourRowBlock.setAttribute("class", "four-row row-block");
keyboard.append(fourRowBlock);
const fiveRowBlock = document.createElement("div");
fiveRowBlock.setAttribute("class", "five-row row-block");
keyboard.append(fiveRowBlock);

export const keyboardLayout = {
  firstRowKeys: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  firstRowChange: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  secondRowKeys: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  secondRowChange: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'Del'],
  thirdRowKeys: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  thirdRowChange: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '\"', 'Enter'],
  fourRowKeys: ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', String.fromCharCode(0x2191), 'Shift'],
  fourRowChange: ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', String.fromCharCode(0x2191), 'Shift'],
  fiveRowKeys: ['Ctrl', 'Win', 'Alt', '', 'Alt', String.fromCharCode(0x2190), String.fromCharCode(0x2193), String.fromCharCode(0x2192), 'Ctrl'],
  secondRowKeysUa: ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', ']', '\\', 'Del'],
  secondRowChangeUa: ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', '}', '|', 'Del'],
  thirdRowKeysUa: ['CapsLock', 'ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'Enter'],
  thirdRowChangeUa: ['CapsLock', 'ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'Enter'],
  fourRowKeysUa: ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', String.fromCharCode(0x2191), 'Shift'],
  fourRowChangeUa: ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', String.fromCharCode(0x2191), 'Shift'],
};

const eventCode = {
  firstRowCode: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  secondRowCode: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  thirdRowCode: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  fourRowCode: ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  fiveRowCode: ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
};

export let flags = {
  language: "en",
  controlPressed: false,
  altPressed: false,
  shiftKeyPressed: false,
}

//createElements -------------------------------------------------------------------------------------------------------
export function createElements(array, num, eventCode) {
  let out = "";
  for (let i = 0; i < array.length; i++) {
    out +=
      `<button class="main-btn" data="` + eventCode[i] + `">` + array[i] + `</button>`;
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

export function createAllElements(create) {
  create(keyboardLayout.firstRowKeys, ".first-row", eventCode.firstRowCode);
  create(keyboardLayout.fiveRowKeys, ".five-row", eventCode.fiveRowCode);
  if (flags.language === "en") {
    create(keyboardLayout.secondRowKeys, ".second-row", eventCode.secondRowCode);
    create(keyboardLayout.thirdRowKeys, ".third-row", eventCode.thirdRowCode);
    create(keyboardLayout.fourRowKeys, ".four-row", eventCode.fourRowCode);
  } else {
    create(keyboardLayout.secondRowKeysUa, ".second-row", eventCode.secondRowCode);
    create(keyboardLayout.thirdRowKeysUa, ".third-row", eventCode.thirdRowCode);
    create(keyboardLayout.fourRowKeysUa, ".four-row", eventCode.fourRowCode);
  }
}

createAllElements(createElements);

export const getUpperCase = (array) =>
  array.map((key) => (key.length === 1 ? key.toUpperCase() : key));

export function changeKeyboardLayout(array, select) {
  const rowChild = document.querySelector(select).querySelectorAll('.main-btn');
  for (let i = 0; i < rowChild.length; i++) {
    if (rowChild[i].textContent.length == 1) {
      rowChild[i].textContent = array[i];
    }
  }
}

export function changeShiftAndCapps(firstRow, secondRow, thirdRow, fourRow) {
  changeKeyboardLayout(firstRow, ".first-row");
  changeKeyboardLayout(secondRow, ".second-row");
  changeKeyboardLayout(thirdRow, ".third-row");
  changeKeyboardLayout(fourRow, ".four-row");
}

export function changeAllRows(firstRow, secondRow, thirdRow, fourRow) {
  changeKeyboardLayout(getUpperCase(firstRow), ".first-row");
  changeKeyboardLayout(getUpperCase(secondRow), ".second-row");
  changeKeyboardLayout(getUpperCase(thirdRow), ".third-row");
  changeKeyboardLayout(getUpperCase(fourRow), ".four-row");
}

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
  "To switch the language combination: Ctrl + Alt";

instructionBlock.append(instructionOne);
instructionBlock.append(instructionTwo);

wrapperBlock.append(instructionBlock);