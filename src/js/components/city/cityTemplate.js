import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('city-element', '' +
'       <li class="cities__item" data-city-id="{{id}}">\n' +
'            <span class="cities__city-name">{{name}}</span>\n' +
'            <span class="cities__city-description">{{region}}</span>\n' +
'            <span class="cities__item-del js-cities__item-del">+</span>\n' +
'       </li>\n'
);
