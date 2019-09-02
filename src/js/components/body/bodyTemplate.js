import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('body', '' +
    '{{> header }}' +
    '<main class="main">' +
    '    <div class="container weather__container">' +
    '        <div class="weather js-weather-container">' +
    '           {{> weather }}' +
    '        </div>' +
    '        <div class="map js-map-container container_dn">' +
    '           {{> map }}' +
    '        </div>'      +
'            <div class="cities js-cities-container">' +
    '           {{> cities }}' +
    '        </div>\n' +
    '    </div>\n' +
    '</main>\n');
