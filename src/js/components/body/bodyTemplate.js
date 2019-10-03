Handlebars.registerPartial('body', '' +
    '{{> header }}' +
    '<main class="main">' +
    '    <div class="container container--weather">' +
    '        <div class="weather js-weather-container">' +
    '           ' +
    '        </div>' +
    '        <div class="map js-map-container container--dn">' +
    '           {{> map }}' +
    '        </div>'      +
'            <div class="cities js-cities-container">' +
    '           {{> cities }}' +
    '        </div>\n' +
    '    </div>\n' +
    '</main>\n');
