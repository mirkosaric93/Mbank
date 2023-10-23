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

    const creditLine = document.querySelector('.line-credit');
    const positionCreditLine = creditLine.offsetTop;
    if(positionCreditLine <= scrollTop + 300){
        creditLine.style.width = `100%`;
    }

    const savingLine = document.querySelector('.line-saving');
    const positionSavingLine = savingLine.offsetTop;
    if(positionSavingLine <= scrollTop + 300){
        savingLine.style.width = `100%`;
    }

    const courseLine = document.querySelector('.line-course');
    const positionCourseLine = courseLine.offsetTop;
    if(positionCourseLine <= scrollTop + 300){
        courseLine.style.width = `100%`;
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

document.querySelector('#submitBtn').addEventListener('click', function(e){

})
const noAccBtn = document.querySelector('#noAccount');
noAccBtn.addEventListener('click', function(e){
    e.preventDefault()
    const logInLink = 'onlineBanking.html';
    window.open(logInLink, '_blank');
 })


// const logInImage = document.querySelector('#imgLogoOnLine');
// const logInBtn = document.querySelector('#logInBtn');
// const openedProfile = document.querySelector('.openedProfile');
// const toCreateProfile = document.querySelector('.toCreateProfile');
// logInImage.style.display = 'none';
// const noAccBtn = document.querySelector('#noAccount');
// noAccBtn.addEventListener('click', function(){
//     const logInLink = 'onlineBanking.html';
//     window.open(logInLink, '_blank');

//     logInImage.style.display = 'none';
//     logInBtn.style.display = 'none';
//     openedProfile.style.display = 'none';
//     toCreateProfile.syle.display = 'block'
// })
/*
    // e.preventDefault();
        const first = document.querySelector('#firstName');
        const pin = document.querySelector('#pin');
        // const bankNum1 = document.querySelector('#bank-account1');    
        // const bankNum2 = document.querySelector('#bank-account2');  
        // const bankNum3 = document.querySelector('#bank-account3');  
        // const bankNum4 = document.querySelector('#bank-account4');  
        
        // let bankNumber = [];
        // bankNumber.push(bankNum1.value, bankNum2.value, bankNum3.value, bankNum4.value);
        // const generalNumber = bankNumber.join('-')

        let dataUser = {
            firstName: first.value,
            pin: pin.value,
            // cardNumber: generalNumber,
        }

        fetch(`https://banking-44f69-default-rtdb.europe-west1.firebasedatabase.app/paymentCard.json`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        }).then(response => response.json())
        .then(data => console.log('Nalog kreiran'))

    first.value = '';
    pin.value = '';
    modalPayment.style.display = 'none';
*/

//============================================================
//Calculator kredita
function calculatorCredit(formName){
    const form = document.querySelector(`.form${formName}`);
    form.addEventListener('change', function(){
        let actionValue;
        if(formName === 'Wheel'){
            actionValue = document.querySelector('#wheel-price').value;
        }else if(formName === 'Apartment'){
            actionValue = document.querySelector('#apartment-priceApartment').value;
        }

        const paymentNum1 = document.querySelector(`#payment-number${formName}1`);
        const paymentNum2 = document.querySelector(`#payment-number${formName}2`);
        const paymentNum3 = document.querySelector(`#payment-number${formName}3`);
        const paymentNum4 = document.querySelector(`#payment-number${formName}4`);

        const displayValue = document.querySelector(`.value${formName}`);
        const displayPercentage = document.querySelector(`.interest-percentage${formName}`);
        const displayMonth = document.querySelector(`.interest-month${formName}`);
        const displayBruto = document.querySelector(`.interest-bruto${formName}`);

        const creditValue = document.querySelector(`#numberInput${formName}`);
        const numInstallment = document.querySelector(`#installment${formName}`);
        const percentageCredit = 7; // %

        const creditValueNum = Number(creditValue.value);
        const numInstallmentNum = Number(numInstallment.value);

        const monthPay = creditValueNum / numInstallmentNum;
        const monthPayPercentage = Math.round(monthPay + ((percentageCredit / 100) * monthPay));
            

        if(formName === 'Wheel'){
            const minimalAction = Number((10 / 100) * creditValueNum);
            actionValue = Number(minimalAction) > Number(actionValue) ? Number(0) : Number(actionValue);
            
            displayValue.textContent = `${creditValueNum}  Minimalno učešće: ${minimalAction}`;
            displayPercentage.textContent = percentageCredit +'%';
            displayMonth.textContent = monthPayPercentage;
            displayBruto.textContent = monthPayPercentage * numInstallmentNum;
        }else if(formName === 'Apartment'){
            const minimalAction = Number((10 / 100) * creditValueNum);
            actionValue = Number(minimalAction) > Number(actionValue) ? Number(0) : Number(actionValue);
            
            displayValue.textContent = `${creditValueNum}  Minimalno učešće: ${minimalAction}`;
            displayPercentage.textContent = percentageCredit +'%';
            displayMonth.textContent = monthPayPercentage;
            displayBruto.textContent = monthPayPercentage * numInstallmentNum;
        }else{
        displayValue.textContent = creditValue.value;
        displayPercentage.textContent = percentageCredit +'%';
        displayMonth.textContent = monthPayPercentage;
        displayBruto.textContent = monthPayPercentage * numInstallmentNum;
        }
    })
}

calculatorCredit('Credit')
calculatorCredit('Wheel')
calculatorCredit('Refinance')
calculatorCredit('Apartment')


//======================================================
const creditBtn = (button) => {
    let btnsCateg = button.getAttribute('data-category')
    let paymentFolio = document.querySelectorAll('.dataWindow')

    paymentFolio.forEach((item) => {
        item.style.display = 'none'
    })

    paymentFolio.forEach((items) => {
        if(items.getAttribute('data-category').includes(btnsCateg)){
            items.style.display = 'block'
        }
    })
}

// const numberInput = document.getElementById("numberInput");
// // const output = document.getElementById("output");
// const updateButton = document.querySelector("#updateButton");

// let currentValue = 0;

// numberInput.value = currentValue;
// // output.textContent = "Vrednost: " + currentValue;

// numberInput.addEventListener("input", function() {
//     let newValue = parseFloat(numberInput.value);
    
//     if (!isNaN(newValue)) {
//         // currentValue = newValue;
//         // output.textContent = "Vrednost: " + currentValue;
//     }
// });

const spansClipPath = document.querySelectorAll('.spanClipPath');
const investedBtn = (button) => {
    let btnsCateg = button.getAttribute('data-category')
    let investedFolio = document.querySelectorAll('.invested-desc')
    spansClipPath.forEach((span) => {
        span.style.clipPath = 'none';
        span.style.fontSize = '1em'
    })
    button.style.clipPath = "polygon(100% 0, 100% 75%, 50% 100%, 0 75%, 0 0)"
    button.style.fontSize = '1.5em'
    
    investedFolio.forEach((item) => {
        item.style.display = 'none'
    })

    investedFolio.forEach((items) => {
        if(items.getAttribute('data-category').includes(btnsCateg)){
            items.style.display = 'block';
        }
    })
}

//Course list
const currDatePlace = document.querySelector('#currentDate');
const currDate = new Date().toDateString()
currDatePlace.textContent = currDate;

const russia = document.querySelector('.russia');
const usa = document.querySelector('.usa');
const euro = document.querySelector('.euro');

async function courseListAPI(country, nameValue){
    try{
        const response = await fetch(`https://banking-44f69-default-rtdb.europe-west1.firebasedatabase.app/courseList/${nameValue}.json`);
        const data = await response.json();

        country.children[0].textContent = `${data.valueName}`;
        country.children[1].textContent = `${data.countryName}`;
        country.children[2].textContent = `1 ${data.valueName}`;
        country.children[3].textContent = `${data.valueRelationDin} Din`;
    }catch(err){
        console.error('Doslo je do greske: ' + err)
    }
}
courseListAPI(russia, 'Rublja');
courseListAPI(euro, 'Euro');
courseListAPI(usa, 'Dollar');

// MAPA
let map = L.map('map').setView([45.18608870928669, 19.80387268438132], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let marker = L.marker([45.18608870928669, 19.80387268438132]).addTo(map);