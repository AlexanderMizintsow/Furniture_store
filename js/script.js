// 24 часа
//main__dropbtn

// Переключение языка;
document.querySelector('#ru').onclick = () => {
    document.querySelector("#language").innerHTML = "Russia (RU)";
    document.querySelector(".dropbtn").style.background = 'url(../img/header/icon/icon-russia.png) no-repeat left center';
}

document.querySelector('#en').onclick = () => {
    document.querySelector("#language").innerHTML = "English (USD)";
    document.querySelector(".dropbtn").style.background = 'url(../img/header/icon/icon-united-kingdom.png) no-repeat left center';
}

// Вызов и закрытие модального окна;
document.querySelectorAll('.modalShow').forEach((element) => {
    element.onclick = () => {
        document.querySelector('.popup-fade').style.display = 'block'
    }
});

document.querySelector('.modal__close').onclick = () => {
    document.querySelector('.popup-fade').style.display = 'none'
}


// All collection
let openCloseFlag = true;
document.querySelector('.main__dropbtn').onclick = () => {
    if (openCloseFlag) {
        document.querySelector(".main__dropdown-content").style.display = "block";
        openCloseFlag = false;
    } else {
        document.querySelector(".main__dropdown-content").style.display = "none";
        openCloseFlag = true;
    }

}
