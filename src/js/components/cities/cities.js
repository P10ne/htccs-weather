import './cities.pcss';
import Handlebars from 'handlebars/dist/handlebars.min';

import citiesTemplate from './citiesTemplate';

export default function cities(mediator) {
    const doc = document;

    const JS_CITIES_CLASS = 'js-cities';
    const citiesContainer = doc.querySelector(JS_CITIES_CLASS);
    function getCities() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        return {
            cities: cities
        };
    }

    Handlebars.registerPartial('city-element', '' +
        '{{#each cities }}' +
            '<li class="cities__item">\n' +
    '            <span class="cities__city-name">{{this.city}}</span>\n' +
    '            <span class="cities__city-description">{{this.region}}</span>\n' +
    '            <span class="cities__item-del js-cities__item-del">+</span>\n' +
    '        </li>\n' +
    '        {{else}}' +
            '<li class="cities__item">\n' +
    '            <span class="cities__city-name">Города не найдены</span>\n' +
    '        </li>' +
            '{{/each}}'
    );

    function renderCityList() {
        const cityList = Handlebars.compile('{{> city-element }}')(getCities());
        document.querySelector('.cities__list').innerHTML = cityList;
    }

    return {
        renderCityList: renderCityList
    }
}
