//POCETNA SLIKA PREKO EKRANA

const mainMenu = document.querySelector('.main');
mainMenu.style.display = 'none';
window.addEventListener('load', ()=>{
   const mainEl = document.querySelector('.main-start');
   if(mainEl){
    mainEl.remove();
    mainMenu.style.display = 'block';
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

//------------------------------------------------------------------
const formMain = document.querySelector('#submitBtn');
formMain.addEventListener('onclick', function(e){
    e.preventDefault();
    console.log('ok je')
    const username = document.querySelector('#firstName').value;
    const pin = document.querySelector('#pin').value;

    fetch(`https://6534d4d5e1b6f4c59046f640.mockapi.io/users`)
    .then(response => response.json())
    .then(data => {
        data.forEach((dat) =>{
            if(username === dat.username && pin === dat.pin){
                window.location.href = 'google.com'
            }
        })
    })
})

function handleOpenMenu(){
    const menuOpened = document.querySelector('.nav-itemsHamburger');
    const btnOpen = document.querySelector('.hamburgerBtn');
    if(btnOpen.textContent === '☰'){
        btnOpen.textContent = 'X';
        menuOpened.style.display = 'block';
    }else{
        btnOpen.textContent = '☰';
        menuOpened.style.display = 'none';
    }
}

const apiUrl = 'https://6534d4d5e1b6f4c59046f640.mockapi.io/users';
const confirmButtonCredit = document.querySelector('#cashCreditBtn');
const wheelConfirmBtnCredit = document.querySelector('#wheelCreditBtn');
const refinanceConfirmBtnCredit = document.querySelector('#refinanceCreditBtn');
const apartmentConfirmBtnCredit = document.querySelector('#apartmentCreditBtn');


async function fetchData(){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Došlo je do greške prilikom dobijanja podataka:', error);
        throw error;
    }
}

async function updateUserData(numberOfCard, cashCreditValue) {
  try {
    const data = await fetchData();

    const userToUpdate = data.find(user => user.cardNumber === numberOfCard);

    if (!userToUpdate) {
      console.error('Korisnik nije pronađen.');
      return;
    }

    userToUpdate.moneyValue = Number(userToUpdate.moneyValue) + Number(cashCreditValue);
    const transferObj = {
        date: new Date().toDateString(),
        name: userToUpdate.userName,
        value: cashCreditValue
    }
    userToUpdate.transfers.push(transferObj);

    await fetch(`${apiUrl}/${userToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToUpdate),
    });

    console.log('Podaci o korisniku ažurirani:', userToUpdate);
  } catch (error) {
    console.error('Došlo je do greške:', error);
  }
}

// function handleCredits(e, pin1, pin2, pin3, pin4, cashValue,installment){
//     e.preventDefault();
//     const cashCreditValue = document.querySelector('#'+cashValue).value;
//     const installment = document.querySelector('#'+installment);
//     const numberCard1 = document.querySelector('#'+pin1);
//     const numberCard2 = document.querySelector('#'+pin2);
//     const numberCard3 = document.querySelector('#'+pin3);
//     const numberCard4 = document.querySelector('#'+pin4);
//     const numberOfCard = Number(numberCard1.value+numberCard2.value+numberCard3.value+numberCard4.value);

//     if(cashCreditValue.value < 0 && numberOfCard.length < 0) return;
//     updateUserData(numberOfCard, cashCreditValue);

//     cashCreditValue.value = '';
//     installment.value = '';
//     numberCard1.value = '';
//     numberCard2.value = '';
//     numberCard3.value = '';
//     numberCard4.value = '';
// }
// confirmButtonCredit.addEventListener('click', handleCredits(e, 'payment-numberCredit1', 'payment-numberCredit2', 'payment-numberCredit3', 'payment-numberCredit4', 'numberInputCredit', 'installmentCredit'));


confirmButtonCredit.addEventListener('click', function(e){
    e.preventDefault();

    const cashCreditValue = document.querySelector('#numberInputCredit').value;
    const installment = document.querySelector('#installmentCredit');
    const numberCard1 = document.querySelector('#payment-numberCredit1');
    const numberCard2 = document.querySelector('#payment-numberCredit2');
    const numberCard3 = document.querySelector('#payment-numberCredit3');
    const numberCard4 = document.querySelector('#payment-numberCredit4');
    const numberOfCard = Number(numberCard1.value+numberCard2.value+numberCard3.value+numberCard4.value);
    if(cashCreditValue.value < 0 && numberOfCard.length < 0) return;

    updateUserData(numberOfCard, cashCreditValue);

    cashCreditValue.value = '';
    installment.value = '';
    numberCard1.value = '';
    numberCard2.value = '';
    numberCard3.value = '';
    numberCard4.value = '';
});

wheelConfirmBtnCredit.addEventListener('click', function(e){
    e.preventDefault();

    const cashCreditValue = document.querySelector('#numberInputWheel').value;
    const installment = document.querySelector('#installmentWheel');
    const numberCard1 = document.querySelector('#payment-numberWheel1');
    const numberCard2 = document.querySelector('#payment-numberWheel2');
    const numberCard3 = document.querySelector('#payment-numberWheel3');
    const numberCard4 = document.querySelector('#payment-numberWheel4');
    const numberOfCard = Number(numberCard1.value+numberCard2.value+numberCard3.value+numberCard4.value);
    if(cashCreditValue.value < 0 && numberOfCard.length < 0) return;
    updateUserData(numberOfCard, cashCreditValue);

    cashCreditValue.value = '';
    installment.value = '';
    numberCard1.value = '';
    numberCard2.value = '';
    numberCard3.value = '';
    numberCard4.value = '';
});

refinanceConfirmBtnCredit.addEventListener('click', function(e){
    e.preventDefault();

    const cashCreditValue = document.querySelector('#numberInputRefinance').value;
    const installment = document.querySelector('#installmentRefinance');
    const numberCard1 = document.querySelector('#payment-numberRefinance1');
    const numberCard2 = document.querySelector('#payment-numberRefinance2');
    const numberCard3 = document.querySelector('#payment-numberRefinance3');
    const numberCard4 = document.querySelector('#payment-numberRefinance4');
    const numberOfCard = Number(numberCard1.value+numberCard2.value+numberCard3.value+numberCard4.value);
    if(cashCreditValue.value < 0 && numberOfCard.length < 0) return;
    updateUserData(numberOfCard, cashCreditValue);

    cashCreditValue.value = '';
    installment.value = '';
    numberCard1.value = '';
    numberCard2.value = '';
    numberCard3.value = '';
    numberCard4.value = '';
});

apartmentConfirmBtnCredit.addEventListener('click', function(e){
    e.preventDefault();

    const cashCreditValue = document.querySelector('#numberInputApartment').value;
    const installment = document.querySelector('#installmentApartment');
    const numberCard1 = document.querySelector('#payment-numberApartment1');
    const numberCard2 = document.querySelector('#payment-numberApartment2');
    const numberCard3 = document.querySelector('#payment-numberApartment3');
    const numberCard4 = document.querySelector('#payment-numberApartment4');
    const numberOfCard = Number(numberCard1.value+numberCard2.value+numberCard3.value+numberCard4.value);
    if(cashCreditValue.value < 0 && numberOfCard.length < 0) return;
    updateUserData(numberOfCard, cashCreditValue);

    cashCreditValue.value = '';
    installment.value = '';
    numberCard1.value = '';
    numberCard2.value = '';
    numberCard3.value = '';
    numberCard4.value = '';
});