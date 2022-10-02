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


    // Модальное окно;
    const modal = document.querySelector('.popup-fade')
    document.querySelectorAll('.modalShow').forEach((element) => {
        element.onclick = () => {
            modalOpen();
        }
    });

    function modalOpen() {
        modal.style.display = 'block'
        clearInterval(modalTimeOpen)

    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.querySelector('.modal__close').onclick = () => {
        closeModal();
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
    })


    // const modalTimeOpen = setTimeout(modalOpen, 3000);


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


    // Карточки


    class Cards {
        constructor(imgSticket, altSticket, imgBg, nameProduct, price, discount, imgRatings, altRatings, parentSelector) {
            this.imgSticket = imgSticket;
            this.altSticket = altSticket;
            this.imgBg = imgBg;
            this.nameProduct = nameProduct;
            this.price = price;
            this.discount = discount;
            this.imgRatings = imgRatings;
            this.altRatings = altRatings;
            this.parent = document.querySelector(parentSelector);
            this.makeDiscount();
        }

        makeDiscount() {
            this.discount = this.price - ((this.price * this.discount) / 100);
        }

        render() {
            const element = document.createElement('div');
            element.classList.add('products__cards__body');
            element.innerHTML = `
            <!--New Cads-->
           <!--img-->
           <div class="products__cards__body-img">
               <div class="hover-feature">
                   <img src="./img/main/icon/favourite.png" alt="favourite">
                   <img src="./img/main/icon/shop.png" alt="shop">
                   <img src="./img/main/icon/compare.png" alt="compare">
                   <img src="./img/main/icon/view.png" alt="view">
               </div>
               <img src= ${this.imgSticket} alt=${this.altSticket} class="sticket-left">
               <a href="#"><img src=${this.imgBg}
                       alt=${this.nameProduct}></a>
           </div>
           <!--text-->
           <div class="products__cards__body-text">
               <p>Chair</p>
               <p>${this.nameProduct}</p>
               <p>$${this.discount}</p>
               <p>$${this.price}</p>
               <img class="ratings" src=${this.imgRatings} alt=${this.altRatings}>
       </div>
       `;
            this.parent.append(element);
        }
    }



    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/our_products/wood_coffee_tables.jpg",
        'Minimal LCD chair',
        '250',
        '30',
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        '.our'
    ).render();

    new Cards(
        "./img/main/icon/sticket_new.png",
        "New",
        "./img/main/our_products/modern_sofa.jpg",
        'Modern Sofa',
        '150',
        '20',
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        '.our'
    ).render();
    new Cards(
        "./img/main/icon/sticket_discount.png",
        "discount",
        "./img/main/our_products/microfiber_sofa.jpg",
        'Microfiber Sofa',
        '130',
        '30',
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        '.our'
    ).render();
    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/our_products/wood_coffee_tables.jpg",
        'Wood Coffee Tables',
        '120',
        '20',
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        '.our'
    ).render();
    new Cards(
        "./img/main/icon/sticket_discount.png",
        "discount",
        "./img/main/our_products/acacia_wood_club_chairs.png",
        'Acacia Wood Club Chairs',
        '120',
        '20',
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        '.our'
    ).render();
    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/our_products/amalia_cowhide_bench.png",
        'Amalia Cowhide Bench',
        '150',
        '20',
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        '.our'
    ).render();
    new Cards(
        "./img/main/icon/sticket_new.png",
        "new",
        "./img/main/our_products/juno_hinged_li_sdtorage.png",
        'Juno-Hinged Lid Storage',
        '250',
        '30',
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        '.our'
    ).render();
    new Cards(
        "./img/main/icon/sticket_new.png",
        "new",
        "./img/main/our_products/deli_pciaiece_living.jpg",
        'Delicia 3 Piece Living Room',
        '150',
        '20',
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        '.our'
    ).render();




})















// Модальное окно контактов

// function showContactScroll() {
//     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
//         modalOpen();
//         window.removeEventListener('scroll', showContactScroll);

//     }
// }
// window.addEventListener('scroll', showContactScroll);