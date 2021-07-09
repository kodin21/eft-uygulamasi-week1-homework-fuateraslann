import { user_info } from './user_information';
const time = 60 * 1000 * 2;

/**********kontrol değerleri***********/
let accountSelected =0 , ibanEntered =0 ,amount_OK =0;

let accountOption;
let wrong_password_count =0;
/****USER DATA OPTION******/
for (let i = 0; i < user_info.accounts.length; i++) {
    let option = document.createElement("option")
    option.value = user_info.accounts[i].bakiye;
    option.innerHTML = user_info.accounts[i].iban + "- "+ user_info.accounts[i].bakiye
    document.getElementById("dropdownMenu").appendChild(option)
}
/****CONTROL ACCOUNT IS SELECTED OR NOT******/
let account_control = document.getElementById("dropdownMenu");
account_control.addEventListener("change", function() {
    if(account_control.value!==0)
        accountSelected =1;
    else
        accountSelected=0;
    accountOption = account_control.getElementsByTagName("option")[account_control.selectedIndex];
    isBtnActive();
});

/****CONTROL IBAN IS CORRECT OR NOT******/
let ibanCntrl = document.getElementById("iban")
ibanCntrl.addEventListener("input",function (){
    if(ibanCntrl.value.length>11)
        ibanCntrl.value = ibanCntrl.value.slice(0,11);
})
ibanCntrl.addEventListener("change",function (){
    if(ibanCntrl.value.length<11){
        ibanEntered=0;
        alert("iban 11 hane olmalıdır")
    }
    else ibanEntered =1;
    isBtnActive();
})

/****CONTROL MONEY IS ENOUGH OR NOT******/
let money_control = document.getElementById("para");
money_control.addEventListener("change",function (){
    if(money_control.value < parseInt(accountOption.value) )
        amount_OK=1;
    else {
        amount_OK =0 ;
        alert("Hesap bakiyesi yetersizdir!")
    }
    isBtnActive();
})
/****ACTIVE BUTTON IF ALL INFOS ARE CORRECT ******/
function isBtnActive(){
    if(accountSelected && ibanEntered && amount_OK)
        document.getElementById("gonder").disabled = false;
    else document.getElementById("gonder").disabled = true;
}

document.getElementById("gonder").addEventListener("click",function (){
    if(money_control.value<500){
        alert("Başarılı")
        location.reload();
    }
    else{
        document.getElementById("sifre_iste").hidden=false;
        document.getElementById("sifre").hidden=false;
    }
})
/*****PASSWORD VALUE CONTROL *****/
let password  = document.getElementById("sifre")
password.addEventListener("change",function (){
    if(password.value == 1234) {
        alert("Başarılı")
        location.reload();
    }
    else{
        wrong_password_count++;
        if(wrong_password_count >3){
            alert("Hesabınız bloke oldu")
            location.reload();
        }else alert("Şifre yanlış")
    }
})

/***************TIMER*************/
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
        if(minutes==0 && seconds == 0){
            alert("Oturumunuz Sonlandırılmıştır");
            location.reload();
        }

    };
    timer();
    setInterval(timer, 1000);

}
window.onload = function () {
    var twoMinutes = 60 * 2,
        display = document.querySelector('#time');
    startTimer(twoMinutes, display);
};

