// MAPA
var map = L.map('map').setView([45.18608870928669, 19.80387268438132], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([45.18608870928669, 19.80387268438132]).addTo(map);

//POCETNA SLIKA PREKO EKRANA

window.addEventListener('load', ()=>{
   const mainEl = document.querySelector('.main-start');
   if(mainEl){
    mainEl.remove();
   }
});
window.addEventListener('scroll', () => {
    const viewportHeight = window.innerHeight; //visina internet pregledaca
    const scrollTop = window.scrollY;
    if(scrollTop > viewportHeight/2){
        document.querySelector('.line-payment').style.width = `100%`;
    }
})
const paymentBtns = (button) => {
    let btnsCateg = button.getAttribute('data-category')
    let paymentFolio = document.querySelectorAll('.slide')

    paymentFolio.forEach((item) => {
        item.style.display = 'none'
    })

    paymentFolio.forEach((items) => {
        if(items.getAttribute('data-category').includes(btnsCateg)){
            items.style.display = 'block'
        }
    })
}

const rightBtn = document.querySelector('#right-btn');
const leftBtn = document.querySelector('#left-btn');
const divContent = document.querySelectorAll('.slider-word div');
let contentNum = 0;

const moveRight = () => {
    displayNone();
    contentNum++;
    if(contentNum > divContent.length - 1){
        contentNum = 0
    }
    divContent[contentNum].style.display = 'block';
}
const moveLeft = () => {
    displayNone();
    contentNum--;
    if(contentNum < 0){
        contentNum = divContent.length - 1;
    }
    divContent[contentNum].style.display = 'block';
}
const displayNone = () => {
    divContent.forEach((cont) => {
        cont.style.display = 'none';
    })
}
displayNone()
divContent[contentNum].style.display = 'block';

rightBtn.addEventListener('click', moveRight)
leftBtn.addEventListener('click', moveLeft)

//Open modal
const modalPayment = document.querySelector('.modal-payment');
const overlay = document.querySelector('.overlay');
const accNumbers = document.querySelectorAll('.bank-acc');
function openModal(){
    modalPayment.style.display = 'block';

    accNumbers.forEach((num) => {
        const min = 1000;
        const max = 9999;
        const randomNum = Math.floor(Math.random() * (max-min + 1) + min)
        num.value = randomNum;
    })
}
overlay.addEventListener('click', function(e){
    if(e.target === overlay){
        modalPayment.style.display = 'none'
    }
})

let data = [];

document.querySelector('#submitBtn').addEventListener('click', function(e){
    // e.preventDefault();
        const first = document.querySelector('#firstName');
        const last = document.querySelector('#lastName');
        const bankNum = document.querySelector('.bank-acc');

        let dataUser = {
            firstName: first.value,
            lastName: last.value,
            cardNumber: bankNum.value,
        }
        console.log(dataUser)

        data.push(dataUser)

        // dataUser = JSON.stringify(dataUser);

        // fetch('https://banking-44f69-default-rtdb.europe-west1.firebasedatabase.app/paymentCard.json',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: dataUser
        // }).then(response => response.json())
        // .then(data => console.log('Nalog kreiran'))
   
})
console.log(data)