let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let body = document.querySelector('body');
let byui = document.getElementById('univ-text')

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        logo.setAttribute('src', 'byui-logo-white.png');
        body.style.color = 'white';
        body.style.backgroundColor = '#222';
        byui.style.color = '#8ebede';
    } else {
        logo.setAttribute('src', 'byui-logo-blue.webp');
        body.style.color = 'black';
        body.style.backgroundColor = 'white';
        byui.style.color = '#006eb6';
    }
}           
                    