var swiper = new Swiper("#swiperProducts", {
    spaceBetween: 20,
    navigation: {
        nextEl: ".btn-slide-right",
        prevEl: ".btn-slide-left",
    },
    autoplay: {
        delay: 2500,
    },
    loop: true,
    breakpoints: {
        488: {
        slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        }
    }
});

// Start Swiper Slide Product
var swiper = new Swiper(".slide_about", {
    spaceBetween: 20,
    navigation: {
        nextEl: ".fa-arrow-right",
        prevEl: ".fa-arrow-left",
    },
    loop: true,
});