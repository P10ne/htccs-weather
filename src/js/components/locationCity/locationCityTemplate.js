Handlebars.registerPartial('city-element-location', '' +
    '   <div class="cities__item-container cities__item-container_location" data-city-id="{{id}}" >\n' +
    '       {{#if isActive}} \n' +
    '            <div class="cities__item cities__item_active" >\n' +
    '       {{else}} \n' +
    '            <div class="cities__item" >\n' +
    '       {{/if}} \n' +
    '       {{#if isError}}\n' +
    '            <span class="cities__city-name cities__city-name_error">Не удалось определить местоположение</span>\n' +
    '       {{else}} \n' +
    '            <span class="cities__city-name">{{name}}</span>\n' +
    '            <span class="cities__city-description">{{region}}</span>\n' +
    '       {{/if}} \n' +
    '            <svg class="cities__item-control cities__item-control_update js-cities__item-update">\n' +
'                     <use xlink:href="#update"></use>\n' +
'                </svg>\n' +
    '       </div>\n' +
    '       <svg class="cities__row_location-svg">\n' +
    '            <use xlink:href="#location_"></use>\n' +
    '      </svg>\n' +
    '   </div>'
);
