import { user_info } from './user_information';
const timeOut = 60 * 1000 * 2;

/*window.addEventListener("load", ()=>{
    window.setTimeout(() => {
        alert("Oturumunuz sonlanmıştır");
        window.location.reload(true);
    }, timeOut);

});*/
for (let i = 0; i < user_info.accounts.length; i++) {
    var option = document.createElement("option")
    var accounts = document.getElementById("dropdownMenu");
    option.value = user_info.accounts[i].bakiye;
    option.innerHTML = user_info.accounts[i].iban + "- "+ user_info.accounts[i].bakiye
    document.getElementById("dropdownMenu").appendChild(option)
}
let hesapSecildi =0 , iban_girildi =0 ,miktarUygun =0;
let hesapOption;
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
    console.log(paraCntrl.value)
    console.log(hesapOption.value)
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
// Baska dosyadan calistirmak mumkun, dosyalari parcalamaktan korkmayin!
// name