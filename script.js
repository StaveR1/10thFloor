let currentIndex = 0;
let slidesToShow = 3; // За замовчуванням 3 слайди

function getSlidesToShow() {
    // Визначаємо кількість слайдів для відображення залежно від ширини екрана
    if (window.innerWidth <= 767) { // Мобільні пристрої
        return 1;
    } else if (window.innerWidth <= 1024) { // Планшети
        return 2;
    } else { // Десктопи
        return 3;
    }
}

function updateSlider() {
    slidesToShow = getSlidesToShow(); // Оновлюємо slidesToShow при кожному оновленні
    const slider = document.getElementById('slider');
    if (!slider) return; // Перевірка на існування елемента

    const slides = slider.children;
    if (slides.length === 0) return; // Перевірка на наявність слайдів

    // Обчислюємо ширину одного слайда, враховуючи padding
    const slideStyle = window.getComputedStyle(slides[0]);
    const slidePaddingLeft = parseFloat(slideStyle.paddingLeft);
    const slidePaddingRight = parseFloat(slideStyle.paddingRight);
    const slideWidth = slides[0].offsetWidth;

    // Перевіряємо, чи currentIndex не виходить за межі
    const totalSlides = slides.length;
    if (currentIndex + slidesToShow > totalSlides) {
        currentIndex = Math.max(0, totalSlides - slidesToShow);
    }

    const offset = -(slideWidth * currentIndex);
    slider.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    const slider = document.getElementById('slider');
    if (!slider) return;
    const totalSlides = slider.children.length;

    if (currentIndex + slidesToShow < totalSlides) {
        currentIndex += 1; // Переміщуємо на 1 слайд, а не на slidesToShow
    } else {
        currentIndex = 0; // Повертаємося на початок, якщо досягли кінця
    }
    updateSlider();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex -= 1; // Переміщуємо на 1 слайд
    } else {
        const slider = document.getElementById('slider');
        if (!slider) return;
        const totalSlides = slider.children.length;
        currentIndex = Math.max(0, totalSlides - slidesToShow); // Переходимо в кінець
    }
    updateSlider();
}

window.addEventListener('resize', updateSlider);

document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація слайдера при завантаженні сторінки
    updateSlider();

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const arrow = question.querySelector('.arrow');

            // Закрити всі інші відкриті відповіді
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherArrow = otherQuestion.querySelector('.arrow');

                    if (otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherAnswer.classList.remove('open');
                        otherArrow.style.transform = 'rotate(0deg)';
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });

            // Перемкнути поточну відповідь
            question.classList.toggle('active');
            answer.classList.toggle('open');

            if (answer.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                arrow.style.transform = 'rotate(0deg)';
                answer.style.maxHeight = '0';
            }
        });
    });

    // Логіка для гамбургер-меню
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Закриття меню при натисканні на посилання (для односторінкових сайтів)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
});
