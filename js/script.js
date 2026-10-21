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
// ===== УМНЫЙ ФИЛЬТР (Лаба 3) =====
document.addEventListener('DOMContentLoaded', function () {
    const catalog = document.getElementById('elements');
    const filtersContainer = document.getElementById('filters');
    
    if (!catalog || !filtersContainer) return;

    const products = Array.from(catalog.querySelectorAll('.product'));
    
    // Критерии фильтрации (ключ: {название, значения})
    const properties = {
        'category': { title: 'Категория', values: ['Солнцезащитные', 'Оптические'] },
        'material': { title: 'Материал', values: ['Металл', 'Ацетат', 'Титан'] },
        'shape': { title: 'Форма', values: ['Овальная', 'Прямоугольная', 'Оверсайз', 'Круглая', 'Геометричная', 'Складная'] }
    };

    // 1. Генерация HTML для фильтров
    let filtersHTML = '';
    for (let key in properties) {
        filtersHTML += `<h3>${properties[key].title}</h3><div class="filter-group" data-prop="${key}">`;
        properties[key].values.forEach(val => {
            filtersHTML += `
                <label>
                    <input type="checkbox" name="${key}" value="${val}">
                    <span>${val}</span>
                </label>
            `;
        });
        filtersHTML += `</div>`;
    }
    filtersContainer.innerHTML = filtersHTML;

    const checkboxes = filtersContainer.querySelectorAll('input[type="checkbox"]');

    // 2. Функция обновления видимости карточек и блокировки чекбоксов
    function updateFilters() {
        // Собираем текущие выбранные значения
        const activeFilters = { category: [], material: [], shape: [] };
        checkboxes.forEach(cb => {
            if (cb.checked) activeFilters[cb.name].push(cb.value);
        });

        // Фильтруем товары
        products.forEach(product => {
            let isVisible = true;
            for (let key in activeFilters) {
                if (activeFilters[key].length > 0) {
                    const productValue = product.getAttribute('data-' + key);
                    if (!activeFilters[key].includes(productValue)) {
                        isVisible = false;
                        break;
                    }
                }
            }
            product.style.display = isVisible ? '' : 'none';
        });

        // "Умный" фильтр: блокируем варианты, которые дадут 0 результатов
        checkboxes.forEach(cb => {
            if (cb.checked) return; // Выбранные не трогаем

            const prop = cb.name;
            const val = cb.value;
            const label = cb.closest('label');

            // Проверяем: если добавить этот чекбокс, останутся ли товары?
            let hasMatches = false;
            products.forEach(product => {
                // Товар должен подходить под ВСЕ остальные выбранные фильтры
                let matchesOtherFilters = true;
                for (let otherProp in activeFilters) {
                    if (otherProp !== prop && activeFilters[otherProp].length > 0) {
                        const pVal = product.getAttribute('data-' + otherProp);
                        if (!activeFilters[otherProp].includes(pVal)) {
                            matchesOtherFilters = false;
                            break;
                        }
                    }
                }
                
                // И при этом иметь нужное значение текущего фильтра
                if (matchesOtherFilters && product.getAttribute('data-' + prop) === val) {
                    hasMatches = true;
                }
            });

            // Блокируем/разблокируем
            if (!hasMatches) {
                label.classList.add('disabled');
                cb.disabled = true;
            } else {
                label.classList.remove('disabled');
                cb.disabled = false;
            }
        });
    }

    // 3. Вешаем событие на чекбоксы
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateFilters);
    });

    // Запускаем при загрузке
    updateFilters();
});
