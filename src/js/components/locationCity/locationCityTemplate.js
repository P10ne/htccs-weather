import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('city-element-location', '' +
    '   <div class="cities__item-container cities__item-container_location" data-city-id="{{id}}" >\n' +
    '       {{#if isActive}} \n' +
    '            <div class="cities__item cities__item_active" >\n' +
    '       {{else}} \n' +
    '            <div class="cities__item" >\n' +
    '       {{/if}} \n' +
    '       {{#if isError}}\n' +
    '            <span class="cities__city-name cities__city-name_error">{{name}}</span>\n' +
    '       {{else}} \n' +
    '            <span class="cities__city-name">{{name}}</span>\n' +
    '       {{/if}} \n' +
    '            <span class="cities__city-description">{{region}}</span>\n' +
    '       </div>\n' +
    '       <svg class="cities__row_location-svg">\n' +
    '            <use xlink:href="#location_"></use>\n' +
    '      </svg>\n' +
    '   </div>'
);
