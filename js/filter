/* ===== Лабораторная работа 3. Умный фильтр (GEN.MONSTER) ===== */

var modelsData = [
    { id: 1, name: "HER 01", category: "Солнцезащитные", material: "Металл", shape: "Овальная", photo: "images/NEW_HER_01_1.jpg", price: "25 000 ₽", desc: "Классическая форма в современном прочтении. Тонкая металлическая оправа." },
    { id: 2, name: "LANG 01", category: "Солнцезащитные", material: "Ацетат", shape: "Прямоугольная", photo: "images/LADY_LANG_01_1.jpg", price: "28 000 ₽", desc: "Футуристичный дизайн с прозрачным ацетатом и необычной геометрией." },
    { id: 3, name: "DREAMER 17", category: "Солнцезащитные", material: "Ацетат", shape: "Оверсайз", photo: "images/Dreamer_17.jpg", price: "30 000 ₽", desc: "Оверсайз-форма с затемнёнными линзами. Для тех, кто любит привлекать внимание." },
    { id: 4, name: "MOONCUT 01", category: "Оптические", material: "Металл", shape: "Круглая", photo: "images/Mooncut_1.jpg", price: "22 000 ₽", desc: "Круглая форма в минималистичном исполнении. Подходит для повседневной носки." },
    { id: 5, name: "VIS VIVA 01", category: "Оптические", material: "Титан", shape: "Геометричная", photo: "images/Vis_Viva_02.jpg", price: "24 000 ₽", desc: "Необычная геометрия оправы, вдохновлённая архитектурой." },
    { id: 6, name: "POCKET 01", category: "Солнцезащитные", material: "Ацетат", shape: "Складная", photo: "images/pocket_1.jpg", price: "32 000 ₽", desc: "Компактная складная модель. Удобно носить с собой." }
];

/* ----- Описание фильтров ----- */
var properties = {
    category: {
        label: "Категория",
        values: [
            { value: "Солнцезащитные", label: "Солнцезащитные" },
            { value: "Оптические", label: "Оптические" }
        ]
    },
    material: {
        label: "Материал",
        values: [
            { value: "Металл", label: "Металл" },
            { value: "Ацетат", label: "Ацетат" },
            { value: "Титан", label: "Титан" }
        ]
    },
    shape: {
        label: "Форма",
        values: [
            { value: "Овальная", label: "Овальная" },
            { value: "Прямоугольная", label: "Прямоугольная" },
            { value: "Оверсайз", label: "Оверсайз" },
            { value: "Круглая", label: "Круглая" },
            { value: "Геометричная", label: "Геометричная" },
            { value: "Складная", label: "Складная" }
        ]
    }
};

/* ----- Рендер блока фильтров ----- */
function renderFilters() {
    var container = document.getElementById("filters");
    var html = '<h2 class="filters-title">Фильтр</h2>';

    for (var prop in properties) {
        var group = properties[prop];
        html += '<div class="filter-group">';
        html += '<h3 class="filter-group-title">' + group.label + '</h3>';
        html += '<ul class="filter-list">';
        for (var i = 0; i < group.values.length; i++) {
            var v = group.values[i];
            html += '<li>';
            html += '<label class="filter-item">';
            html += '<input type="checkbox" name="' + prop + '" value="' + v.value + '">';
            html += '<span class="filter-label">' + v.label + '</span>';
            html += '</label>';
            html += '</li>';
        }
        html += '</ul>';
        html += '</div>';
    }

    html += '<button type="button" class="filters-reset" id="filters-reset">Сбросить фильтр</button>';
    container.innerHTML = html;
}

/* ----- Рендер карточек товаров ----- */
function renderModels(models) {
    var catalog = document.getElementById("catalog"); // Ищем контейнер товаров

    if (models.length === 0) {
        catalog.innerHTML = '<p class="catalog-empty">Ничего не найдено. Попробуйте изменить фильтр.</p>';
        return;
    }

    var html = "";
    for (var i = 0; i < models.length; i++) {
        var m = models[i];
        html += '<article class="product">';
        html += '<div class="product-image"><img src="' + m.photo + '" alt="' + m.name + '"></div>';
        html += '<div class="product-info">';
        html += '<span class="product-cat">' + m.category + '</span>';
        html += '<h3>' + m.name + '</h3>';
        html += '<p class="product-desc">' + m.desc + '</p>';
        html += '<ul class="product-specs">';
        html += '<li>Материал: ' + m.material + '</li>';
        html += '<li>Форма: ' + m.shape + '</li>';
        html += '</ul>';
        html += '</div>';
        html += '</article>';
    }
    catalog.innerHTML = html;
}

/* ----- Получить текущий выбор чекбоксов ----- */
function getSelection() {
    var selection = {};
    for (var prop in properties) {
        var checked = document.querySelectorAll('#filters input[name="' + prop + '"]:checked');
        var values = [];
        for (var i = 0; i < checked.length; i++) {
            values.push(checked[i].value);
        }
        selection[prop] = values;
    }
    return selection;
}

/* ----- Фильтрация ----- */
function filterModels(selection) {
    return modelsData.filter(function (m) {
        for (var prop in selection) {
            var vals = selection[prop];
            if (vals.length > 0 && vals.indexOf(m[prop]) === -1) {
                return false;
            }
        }
        return true;
    });
}

/* ----- Умный фильтр: блокировка недоступных значений ----- */
function updateAvailability() {
    var selection = getSelection();

    for (var prop in properties) {
        var values = properties[prop].values;
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            var cb = document.querySelector('#filters input[name="' + prop + '"][value="' + v.value + '"]');
            if (!cb) continue;

            var testSelection = {};
            for (var p in selection) {
                testSelection[p] = selection[p].slice();
            }
            testSelection[prop] = [v.value];

            var count = filterModels(testSelection).length;

            if (cb.checked) {
                cb.disabled = false;
            } else {
                cb.disabled = (count === 0);
            }
            
            // Визуальная блокировка
            if(cb.disabled) {
                cb.closest('label').classList.add('disabled');
            } else {
                cb.closest('label').classList.remove('disabled');
            }
        }
    }
}

/* ----- Главная функция ----- */
function applyFilters() {
    var selection = getSelection();
    var filtered = filterModels(selection);
    renderModels(filtered);
    updateAvailability();
}

/* ----- Инициализация ----- */
document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("filters")) return;

    renderFilters();
    applyFilters();

    document.getElementById("filters").addEventListener("change", function (e) {
        if (e.target.type === "checkbox") {
            applyFilters();
        }
    });

    document.getElementById("filters-reset").addEventListener("click", function () {
        var cbs = document.querySelectorAll('#filters input[type="checkbox"]');
        for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
        }
        applyFilters();
    });
});
