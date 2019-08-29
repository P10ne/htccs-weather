import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('body', '' +
    '{{> header }}' +
    '<main class="main">' +
    '    <div class="container weather__container">' +
    '        <div class="weather">' +
    '           {{> weather }}' +
    '        </div>' +
'            <div class="cities">' +
    '           {{> cities }}' +
    '        </div>\n' +
    '    </div>\n' +
    '</main>\n');
