

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
    const modalTimeOpen = setTimeout(modalOpen, 30000);

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


    // Форма регистрации и входа;

    document.querySelectorAll('.registration').forEach(item => {
        postData(item);
    });

    document.querySelectorAll('.login').forEach(item => {
        postData(item);
    });


    const message = {
        loading: 'img/header/spinner.svg',
        succes: 'Thank you for registering!',
        failure: 'An error has occurred, try again a little later!',
        welcome: 'Welcome to the website'
    }

    function postData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.append(statusMessage);

            const formData = new FormData(form);

            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(obj)
            })
                .then(data => data.text())
                .then(() => {
                    if (form.classList.contains('login')) {
                        showThanksModal(message.welcome);
                    } else {
                        showThanksModal(message.succes);
                    }
                })
                .catch(() => {
                    showThanksModal(message.failure)
                })
                .finally(() => {
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModal();
                    }, 2000);
                })
        })
    }


    function showThanksModal(mes) {
        document.querySelector('.modal__signup').classList.add('hide');
        document.querySelector('.modal__login',).classList.add('hide');
        const thanksWindows = document.createElement('div');
        thanksWindows.classList.add('modal__thanks');
        thanksWindows.innerHTML = mes;
        const thanksModal = document.querySelector('.modal');
        thanksModal.append(thanksWindows);
        thanksModal.style.height = '16rem';

        setTimeout(() => {
            thanksWindows.remove();
            document.querySelector('.modal__signup').classList.remove('hide');
            document.querySelector('.modal__login',).classList.remove('hide');
            thanksModal.style.height = '45rem'
        }, 2000)
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

    // Слайды
    const slides = document.querySelectorAll('.reviews__cards'),
        slider = document.querySelector('.reviews'),
        back = document.querySelector('#back'),
        next = document.querySelector('#next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.reviews__slides-wrapper'),
        slidesInner = document.querySelector('.reviews__slides-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slidesIndex = 1;
    let offset = 0;
    const dots = [];

    counterSlides(slidesIndex);
    slides.length < 10 ? total.innerHTML = `0${slides.length}`
        : total.innerHTML = slides.length;

    slidesInner.style.width = 100 * slides.length + '%';
    slides.forEach(items => items.style.width = width);

    drawDots();

    next.addEventListener('click', () => {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesTransform();
        counterSlides(++slidesIndex);
        installOpacity();
    })

    back.addEventListener('click', () => {

        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesTransform();
        counterSlides(--slidesIndex);
        installOpacity();
    })

    dots.forEach(item => {
        item.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidesIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesTransform();

            slides.length < 10 ? current.innerHTML = `0${slidesIndex}`
                : current.innerHTML = slidesIndex;

            installOpacity();
        })
    })

    function slidesTransform() {
        slidesInner.style.transform = `translateX(-${offset / 10}rem)`;
    }

    function installOpacity() {
        dots.forEach(item => item.style.opacity = '.5');
        dots[slidesIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function counterSlides(i) {
        if (i > slides.length) {
            slidesIndex = 1;
        } else if (i < 1) {
            slidesIndex = slides.length;
        }

        slides.length < 10 ? current.innerHTML = `0${slidesIndex}`
            : current.innerHTML = slidesIndex;

    }

    function drawDots() {

        const indicators = document.createElement('ol');

        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');

            if (i == 0) {
                dot.style.opacity = 1;
            }

            indicators.append(dot);
            dots.push(dot);
        }
    }


    // Карточки
    class Cards {
        constructor(imgSticket, altSticket, imgBg, nameProduct, price, discount, imgRatings, altRatings, group, parentSelector) {
            this.imgSticket = imgSticket;
            this.altSticket = altSticket;
            this.imgBg = imgBg;
            this.nameProduct = nameProduct;
            this.price = price;
            this.discount = discount;
            this.imgRatings = imgRatings;
            this.altRatings = altRatings;
            this.group = group;
            this.parent = document.querySelector(parentSelector);
            this.makeDiscount();
        }

        makeDiscount() {
            this.discount = this.price - ((this.price * this.discount) / 100);
        }

        render() {
            const element = document.createElement('div');
            element.classList.add(`products__cards__body-${this.group}`);
            element.innerHTML = `
           <div class="products__cards__body-img fade">
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
           <div class="products__cards__body-text">
               <p>Chair</p>
               <p>${this.nameProduct}</p>
               <p>$${this.discount}</p>
               <p>$${this.price}</p>
               <img class="ratings" src=${this.imgRatings} alt=${this.altRatings}>
       </div>`;
            this.parent.append(element);
        }

    }

    const categoriesCards = document.querySelectorAll('.products__header__categories');
    categoriesCards.forEach(item => {

        item.addEventListener('click', (e) => {
            e.preventDefault();
            // активное заглавие;
            document.querySelectorAll('.active-green').forEach(green => green.classList.remove('active-green'))
            e.target.classList.add('active-green');

            // перебор карточек Our products;;
            if (e.target.classList.contains("our-best")) {
                throughCards('.products__cards__body-our-new', '.products__cards__body-our-todays', '.products__cards__body-our-best');
            }
            else if (e.target.classList.contains('our-new')) {
                throughCards('.products__cards__body-our-best', '.products__cards__body-our-todays', '.products__cards__body-our-new');
            }
            else if (e.target.classList.contains('our-todays')) {
                throughCards('.products__cards__body-our-best', '.products__cards__body-our-new', '.products__cards__body-our-todays');
            }
            else if (e.target.classList.contains('our-all')) {
                document.querySelectorAll('.hide').forEach(i => i.classList.remove('hide'));
            }
            // перебор карточек  trand
            if (e.target.classList.contains("trending-top")) {
                throughCards('.products__cards__body-trending-new', '.products__cards__body-trending-new', '.products__cards__body-trending-top');
            }
            else if (e.target.classList.contains('trending-new')) {
                throughCards('.products__cards__body-trending-best', '.products__cards__body-trending-top', '.products__cards__body-trending-new');
            }
            else if (e.target.classList.contains('trending-best')) {
                throughCards('.products__cards__body-trending-top', '.products__cards__body-trending-new', '.products__cards__body-trending-best');
            }


            function throughCards(hide1, hide2, show) {
                document.querySelectorAll(hide1).forEach(i => i.classList.add('hide'));
                document.querySelectorAll(hide2).forEach(i => i.classList.add('hide'));

                document.querySelectorAll(show).forEach(i => i.classList.remove('hide'));
            }
        })
    })

    // *PRODUCTS trands
    new Cards(
        "./img/main/icon/sticket_new.png",
        "New",
        "./img/main/trending/minimal_lcd_chair.jpg",
        "Minimal LCD chair",
        "250",
        "30",
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        "trending-new",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_new.png",
        "New",
        "./img/main/trending/minimal_iconic_chair.jpg",
        "Minimal iconic chair",
        "150",
        "20",
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        "trending-new",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/trending/dining_chairs.jpg",
        "Dining chairs",
        "120",
        "20",
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        "trending-top",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/trending/buskbo_armchair.jpg",
        "Buskbo armchair",
        "150",
        "30",
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        "trending-best",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/trending/modern_chairs.jpg",
        "Modern chairs",
        "120",
        "30",
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        "trending-best",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/trending/plastic_dining_chair.jpg",
        "Plastic dining chair",
        "130",
        "20",
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        "trending-best",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_new.png",
        "new",
        "./img/main/trending/minimal_Wood_chair.jpg",
        "Minimal Wood chair",
        "250",
        "30",
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        "trending-top",
        ".trending"
    ).render();

    new Cards(
        "./img/main/icon/sticket_new.png",
        "new",
        "./img/main/trending/elegent_wood_chair.jpg",
        "Elegent wood chair",
        "150",
        "20",
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        "trending-new",
        ".trending"
    ).render();

    // *OUR PRODUCTS*
    new Cards(
        "./img/main/icon/sticket_sale.png",
        "sale",
        "./img/main/our_products/wood_coffee_tables.jpg",
        'Minimal LCD chair',
        '250',
        '30',
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        "our-best",
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
        "our-new",
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
        "our-todays",
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
        "our-best",
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
        "our-todays",
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
        "our-best",
        '.our'
    ).render()
    new Cards(
        "./img/main/icon/sticket_new.png",
        "new",
        "./img/main/our_products/juno_hinged_li_sdtorage.png",
        'Juno-Hinged Lid Storage',
        '250',
        '30',
        "./img/main/icon/ratings-5.png",
        "ratings-5",
        "our-new",
        '.our'
    ).render()
    new Cards(
        "./img/main/icon/sticket_new.png",
        "new",
        "./img/main/our_products/deli_pciaiece_living.jpg",
        'Delicia 3 Piece Living Room',
        '150',
        '20',
        "./img/main/icon/ratings-4.png",
        "ratings-4",
        "our-new",
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