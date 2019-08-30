import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('cities', '' +
    '<div class="card card_cities js-cities">\n' +
    '    <div class="cities__content">\n' +
    '        <div class="row cities__row">\n' +
    '            <div class="cities__list">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row cities__add-city-row">\n' +
    '            <button class="btn cities__add-city-btn">Добавить город</button>\n' +
    '            <input class="input cities__add-city-input" placeholder="Название города" style="display:none">\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n');
