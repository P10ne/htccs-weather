import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('city-element', '' +
'   <div class="cities__item-container" data-city-id="{{id}}" >\n' +
'       {{#if isActive}} \n' +
'            <div class="cities__item cities__item_active" >\n' +
'       {{else}} \n' +
'            <div class="cities__item" >\n' +
'       {{/if}} \n' +
    '            <span class="cities__city-name">{{name}}</span>\n' +
    '            <span class="cities__city-description">{{region}}</span>\n' +
    '            <span class="cities__item-del js-cities__item-del">+</span>\n' +
    '       </div>\n' +
'   </div>'
);
