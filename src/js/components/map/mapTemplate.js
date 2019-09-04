import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('map', '' +
    '<div class="card card_map js-map-container" id="map-container">' +
    '    <svg class="card__close-btn js-map-close-btn">' +
    '        <use xlink:href="#close"></use>' +
    '</svg>' +
    '</div>'
);
