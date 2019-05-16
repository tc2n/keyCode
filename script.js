/*
event.key ==pageUP shown
event.location == 0,1,2
event.which==57 shown
event.code==numpad9
*/
const box = document.querySelector('.box');
const key = document.querySelectorAll('.key');
const icon = document.querySelectorAll('.icon');
const html = document.querySelector('.main');
const container = document.querySelector('.container');
const h1 = document.querySelector('.init');
const keyLocation = ['General keys', 'Left-side modifier keys', 'Right-side modifier keys', 'Numpad'];
let state = 'true' //true for light mode
let counter = 0;

function update(e) {
    counter++;
    if(counter===1){
        h1.style.setProperty('display', 'none');
        [...container.children].forEach(child => {if(child.nodeName!='svg'){child.style.setProperty('opacity', '1')}});
        //Only for first keypress
    }
    box.innerHTML = `${e.which}<span>${e.key}</span>`;
    if(e.which.toString().length===3){
        //Make space for 3 digit keycodes in the box
        box.style.setProperty('font-size', 'calc(var(--side) - 15rem)');
    }
    else {
        box.style.setProperty('font-size', 'calc(var(--side) - 10rem)');
    }
    key[0].textContent = e.key;
    key[1].textContent = `${e.location} (${keyLocation[e.location]})`;
    key[2].textContent = e.which;
    key[3].textContent = e.code;
}

window.addEventListener('keydown', update);
icon.forEach(ic => ic.addEventListener('click', () => {
    html.classList.toggle('dark');
    container.classList.toggle('darkcont');
    box.classList.toggle('darkbox');
    icon[1].classList.toggle('transp');
    state = !state;
    localStorage.setItem('state', JSON.stringify(state));
}));

window.addEventListener('load', ()=>{
    state = JSON.parse(localStorage.getItem('state'));
    //if state is 'dark' then update these
    if(!state) {
        html.classList.add('dark');
        container.classList.add('darkcont');
        box.classList.add('darkbox');
        icon[1].classList.add('transp');
    }
});