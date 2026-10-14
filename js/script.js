// ===== БУРГЕР-МЕНЮ =====

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        // Клик по кнопке — открыть/закрыть меню
        burger.addEventListener('click', function () {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Клик по ссылке — закрыть меню
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
});
// ===== КНОПКА ПРИНТЕРА =====

document.addEventListener('DOMContentLoaded', function () {
    const printBtn = document.getElementById('print-toggle');
    const styleLink = document.querySelector('link[rel="stylesheet"]');

    let isPrintMode = false;

    if (printBtn && styleLink) {
        printBtn.addEventListener('click', function () {
            if (!isPrintMode) {
                // Включаем режим для слабовидящих
                styleLink.setAttribute('href', 'print.css');
                isPrintMode = true;
                printBtn.textContent = '✖';

                // Открываем окно печати
                setTimeout(function () {
                    window.print();
                }, 300);
            } else {
                // Выключаем режим
                styleLink.setAttribute('href', 'styles.css');
                isPrintMode = false;
                printBtn.textContent = '🖨';
            }
        });
    }
});
