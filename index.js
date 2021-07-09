import { user_info } from './user_information';
const time = 60 * 1000 * 2;
let hesapSecildi =0 , iban_girildi =0 ,miktarUygun =0;
let hesapOption;
let yanlis_giris =0;
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
for (let i = 0; i < user_info.accounts.length; i++) {
    var option = document.createElement("option")
    var accounts = document.getElementById("dropdownMenu");
    option.value = user_info.accounts[i].bakiye;
    option.innerHTML = user_info.accounts[i].iban + "- "+ user_info.accounts[i].bakiye
    document.getElementById("dropdownMenu").appendChild(option)
}

var hesapCntrl = document.getElementById("dropdownMenu");
hesapCntrl.addEventListener("change", function() {
    if(hesapCntrl.value!==0)
        hesapSecildi =1;
    else
        hesapSecildi=0;
    hesapOption = hesapOption = hesapCntrl.getElementsByTagName("option")[hesapCntrl.selectedIndex];
    butonAktif();
});
let ibanCntrl = document.getElementById("iban")
ibanCntrl.addEventListener("input",function (){
    if(ibanCntrl.value.length>11)
        ibanCntrl.value = ibanCntrl.value.slice(0,11);
})
ibanCntrl.addEventListener("change",function (){
    if(ibanCntrl.value.length<11){
        iban_girildi=0;
        alert("iban 11 hane olmalıdır")
    }
    else iban_girildi =1;
    butonAktif();
})
let paraCntrl = document.getElementById("para");
paraCntrl.addEventListener("change",function (){
    if(paraCntrl.value < parseInt(hesapOption.value) )
        miktarUygun=1;
    else {
        miktarUygun =0 ;
        alert("Hesap bakiyesi yetersizdir!")
    }
    butonAktif();
})
function butonAktif(){
    if(hesapSecildi && iban_girildi && miktarUygun)
        document.getElementById("gonder").disabled = false;
    else document.getElementById("gonder").disabled = true;
}
document.getElementById("gonder").addEventListener("click",function (){
    if(paraCntrl.value<500){
        alert("Başarılı")
        location.reload();
    }

    else{
        document.getElementById("sifre_iste").hidden=false;
        document.getElementById("sifre").hidden=false;
    }
})
let sifre  = document.getElementById("sifre")
sifre.addEventListener("change",function (){
    if(sifre.value == 1234) {
        alert("Başarılı")
        location.reload();
    }
    else{
        yanlis_giris++;
        if(yanlis_giris >3){
            alert("Hesabınız bloke oldu")
            location.reload();
        }else alert("Şifre yanlış")
    }
})


// Baska dosyadan calistirmak mumkun, dosyalari parcalamaktan korkmayin!
// name