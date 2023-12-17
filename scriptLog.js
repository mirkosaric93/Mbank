const imgLogo = document.querySelector('#imgLogoOnline');
const logInBtn = document.querySelector('#logInBtn');
const createAndExistBtns = document.querySelector('.logInBtn');
const openedProfile = document.querySelector('.openedProfile');
const toCreateProfile = document.querySelector('.toCreateProfile');
const onlineBankingForm = document.querySelector('.onlineBankingForm');

const openExistBtn = document.querySelector('#existing');
const openNewBtn = document.querySelector('#creatingNew');
const backBtn = document.querySelector('#backBtn');

const accNumbers = document.querySelectorAll('.bank-acc')
function openModal(){
    accNumbers.forEach((num) => {
        const min = 1000;
        const max = 9999;
        const randomNum = Math.floor(Math.random() * (max-min + 1) + min)
        num.value = randomNum;
    })
}

openExistBtn.addEventListener('click', function(){
    setTimeout(()=> {
        openedProfile.style.display = 'flex';
        setTimeout(()=>{
            openedProfile.style.opacity = '1';
            openedProfile.style.transform = 'translateX(0%)';
    }, 500)
    }, 500);
    toCreateProfile.style.display = 'none';
    imgLogo.style.display = 'none';
    createAndExistBtns.style.display = 'none';
})

openNewBtn.addEventListener('click', function(){
    openModal();
    setTimeout(()=> {
        toCreateProfile.style.display = 'flex';
        setTimeout(()=>{
            toCreateProfile.style.opacity = '1';
            toCreateProfile.style.transform = 'translateX(0%)';
    }, 500)
    }, 500);
    openedProfile.style.display = 'none';
    createAndExistBtns.style.display = 'none';
    imgLogo.style.display = 'none';
})

backBtn.addEventListener('click', function(e){
    e.preventDefault()
    openedProfile.style.display = 'none';
    toCreateProfile.style.display = 'none';
    createAndExistBtns.style.display = 'flex';
    imgLogo.style.display = 'block';
})

//CREATE NEW PROFILE

const userName = document.querySelector('#creatingUserName');
const pin = document.querySelector('#pinCreate');
const rePin = document.querySelector('#pinReCreate');
const email = document.querySelector('#createEmail');
const pin1 = document.querySelector('#bank-account1');
const pin2 = document.querySelector('#bank-account2');
const pin3 = document.querySelector('#bank-account3');
const pin4 = document.querySelector('#bank-account4');
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
let uniqueCode;

userName.addEventListener('keydown', function(){
    if(userName.value.length < 4){
        userName.style.color = 'red'
    }else{
        userName.style.color = 'black'
    }
})
rePin.addEventListener('change', function(){
    if(rePin.value !== pin.value){
        rePin.style.color = 'red'
    }else{
        rePin.style.color = 'black'
    }
})

const creatingProfile = document.querySelector('#createBtn');
creatingProfile.addEventListener('click', function(e){
    e.preventDefault();

    const isValidEmail = emailRegex.test(email.value);

    if(userName.value.length < 4) return;
    if(pin.value !== rePin.value) return;
    if (!isValidEmail) {
        email.style.color = 'red'
        return;
    }else{
        email.style.color = 'black'
    }

    let bankNumber = [];
    bankNumber.push(pin1.value, pin2.value, pin3.value, pin4.value);
    const finishedNumber = bankNumber.join('')

    let dataUser = {
        userName: userName.value,
        pin: pin.value,
        email: email.value,
        cardNumber: Number(finishedNumber),
        moneyValue: 0,
        transfer: null,
    }
    dataUser = JSON.stringify(dataUser)
    // if(dataUser.validationPassed())

    // fetch(`https://banking-44f69-default-rtdb.europe-west1.firebasedatabase.app/paymentCard.json`)
    // .then(response => response.json())
    // .then(data => {
    //     data.map((user) => console.log(user))
    // })
    fetch(`https://6534d4d5e1b6f4c59046f640.mockapi.io/users`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataUser
    })
    .then(response => response.json())
    .then(data => {
        openedProfile.style.display = 'none';
        toCreateProfile.style.display = 'none';
        createAndExistBtns.style.display = 'none';
        imgLogo.style.display = 'none';
        setTimeout(()=> {
            onlineBankingForm.style.display = 'block';
            setInterval(()=>onlineBankingForm.style.opacity = '1',500)
        }, 1000)
        

        document.querySelector('#welcome').textContent = data.userName;
        document.querySelector('#currentDate').textContent = new Date().toDateString();
        document.querySelector('#currentMoney').textContent = data.moneyValue;
    })
})

//OPEN EXIST PROFILE
logInBtn.addEventListener('click', function(e){
    e.preventDefault();

    const logInUser = document.querySelector('#userNameLogIn').value;
    const logInPin = document.querySelector('#pinLogIn').value;

    fetch(`https://6534d4d5e1b6f4c59046f640.mockapi.io/users`)
    .then(response => response.json())
    .then(data => {
        data.forEach(dat => {
            if(dat.userName === logInUser && dat.pin === logInPin){
                openedProfile.style.display = 'none';
                toCreateProfile.style.display = 'none';
                createAndExistBtns.style.display = 'none';
                imgLogo.style.display = 'none';
                setTimeout(()=> {
                    onlineBankingForm.style.display = 'block';
                    setInterval(()=>onlineBankingForm.style.opacity = '1',500)
                }, 1000)
                
                document.querySelector('#welcome').textContent = dat.userName;
                document.querySelector('#currentDate').textContent = new Date().toDateString();
                document.querySelector('#currentMoney').textContent = dat.moneyValue;
            }
        })
    })
})