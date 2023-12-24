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
const tableData = document.querySelector('#appendTableData');

const apiUrl = 'https://6534d4d5e1b6f4c59046f640.mockapi.io/users';
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
async function transferMoney(valueForSend, recipientNum, sender){
    try {
        const data = await fetchData();
        const userToSend = data.find(user => user.cardNumber === Number(recipientNum));
        if(!userToSend) console.log('Korisnik nije pronadjen');
        userToSend.moneyValue += Number(valueForSend);
        const recipientTransfer = {
            date: new Date().toDateString(),
            name: sender.userName,
            value: valueForSend + '⤵️'
        }
        userToSend.transfers.unshift(recipientTransfer);

        sender.moneyValue -= Number(valueForSend);
        const senderTransfer = {
            date: new Date().toDateString(),
            name: userToSend.userName,
            value: valueForSend + '⤴️'
        }
        sender.transfers.unshift(senderTransfer);


        await fetch(`${apiUrl}/${userToSend.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToSend),
          });

          await fetch(`${apiUrl}/${sender.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sender),
          });
    } catch (error) {
        console.error(error)
    }
}

logInBtn.addEventListener('click', function(e){
    e.preventDefault();

    const logInUser = document.querySelector('#userNameLogIn').value;
    const logInPin = document.querySelector('#pinLogIn').value;
    // document.querySelector('appendTableData').innerHTML = '';

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
                document.querySelector('#bankNumber').textContent += dat.cardNumber;
                
                const dataTransfer = dat.transfers;
                dataTransfer.forEach(obj=>{
                    const tr = document.createElement('tr');
                    for(const key in obj){
                        const td = document.createElement('td');
                        td.textContent = obj[key];
                        tr.appendChild(td)
                    }
                    tableData.appendChild(tr)
                })
            //TRANSFER MONEY FROM USER TO OTHER USER
            const transferBtn = document.querySelector('#transferBtn');
            transferBtn.addEventListener('click', async function(){
                const valueForSend = document.querySelector('#moneyToTransfer').value;
                const recipientNum = document.querySelector('#numberRecipient').value;
                try {
                    await transferMoney(valueForSend, recipientNum, dat);
                    await fetch(`${apiUrl}/${dat.id}`)
                    .then(response => response.json())
                    .then(data => {
                        document.querySelector('#currentMoney').textContent = data.moneyValue;
                    })
                } catch (error) {
                    console.error(error)
                }
            })
            }
        })
    })
})

const logOutBtn = document.querySelector('#logOut');
logOutBtn.addEventListener('click', function(){
    // logInBtn.style.display = 'block';
    onlineBankingForm.style.display = 'none';
    openedProfile.style.display = 'none';
    toCreateProfile.style.display = 'none';
    createAndExistBtns.style.display = 'flex';
    imgLogo.style.display = 'block';
    document.querySelector('#pinLogIn').value = '';
    document.querySelector('#userNameLogIn').value = '';
    document.querySelector('#pinCreate').value = '';
    document.querySelector('#pinReCreate').value = '';
    document.querySelector('#creatingUserName').value = '';
    document.querySelector('#createEmail').value = '';
    bankNumber.textContent = '';
    tableData.textContent = '';
    window.location.reload(true);
});