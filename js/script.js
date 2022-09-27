// 24 часа
//main__dropbtn

window.addEventListener('DOMContentLoaded', () => {



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


    // Таймер

    const sale = ['2022-11-27T03:24:00', '2022-12-11T11:21:00']

    getTime('#sale-1', sale[0]);
    getTime('#sale-2', sale[1]);

    function calculateDate(endTime) {
        const time = Date.parse(endTime) - new Date(),
            day = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor((time / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            time,
            day,
            hours,
            minutes,
            seconds
        }
    }


    function getTime(id, endTime) {
        const time = document.querySelector(id),
            days = time.querySelector('#days'),
            hours = time.querySelector('#hours'),
            minutes = time.querySelector('#min'),
            seconds = time.querySelector('#sec')
        updateTime()


        function updateTime() {
            const time = calculateDate(endTime);
            if (time.time > 0) {
                days.innerHTML = editNum(time.day);
                hours.innerHTML = editNum(time.hours);
                minutes.innerHTML = editNum(time.minutes);
                seconds.innerHTML = editNum(time.seconds);
                const timeInterval = setInterval(updateTime, 1000);
            } else {
                clearInterval(timeInterval);
            }

        }
    }
    function editNum(time) {
        if (time < 10) {
            return `0${time}`
        } else {
            return time;
        }
    }




})