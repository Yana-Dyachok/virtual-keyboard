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
  
