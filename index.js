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

//create instruction-----------------------------------------------------------------------------------------------------------------------------------------------------
const instructionBlock = document.createElement('footer');
instructionBlock.setAttribute('class', 'instruction-block');

const instructionOne = document.createElement('h3');
instructionOne.setAttribute('class', 'instruction');
instructionOne.textContent = "The keyboard is created in the Windows operating system";

const instructionTwo = document.createElement('h3');
instructionTwo.setAttribute('class', 'instruction');
instructionTwo.textContent = "To switch the language combination: left ctrl + alt";

instructionBlock.appendChild(instructionOne); 
instructionBlock.appendChild(instructionTwo); 

wrapperBlock.appendChild(instructionBlock); 

const scriptTag = document.querySelector('script[src="./index.js"]');
document.body.appendChild(scriptTag);
