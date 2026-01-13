const title = document.querySelector("h1");
console.log(title);
title.textContent = 'Web Page Comonents';

let topics = document.getElementById('topics');
topics.style.color = 'purple';

let list = document.querySelector('.list');
list.style.border = '3px solid black';

let para = document.querySelector('p');
para.classList.add('background');

const image = document.querySelector("img");
image.setAttribute('src', 'images/logo.jpg');


let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
    document.getElementById(codeValue).style.color = 'red';
})