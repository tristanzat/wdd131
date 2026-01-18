let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let body = document.querySelector('body');
let byui = document.getElementById('univ-text')

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        // Change BYU-I logo to be the white version
        logo.setAttribute('src', 'byui-logo-white.png');
        // Change colors to dark mode; lighter text on a dark background.
        body.style.color = 'white';
        body.style.backgroundColor = '#333';
        byui.style.color = '#8ebede';
    } else {
        // Change BYU-I logo to be the blue version
        logo.setAttribute('src', 'byui-logo-blue.webp');
        // Change colors to light mode; dark text on a light background.
        body.style.color = 'black';
        body.style.backgroundColor = 'white';
        byui.style.color = '#006eb6';
    }
}           
                    