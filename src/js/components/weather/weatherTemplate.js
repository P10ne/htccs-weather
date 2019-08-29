import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('weather', '' +
    '<div class="card card_weather">' +
    '   <div class="weather__content">' +
    '       <span class="weather__city-name">Ижевск</span>' +
'           <div class="weather__top-container">' +
    '           <div class="weather__top-wrapper">' +
    '               <div class="weather__state">' +
    '                   <span class="weather__temp-val">+19</span>' +
    '<!--span.weather__temp-unit &#8451;-->' +
    '                   <span class="weather__temp-unit">°</span>' +
    '                   <p class="weather__precip">Облачно</p>' +
    '               </div>' +
    '               <img class="weather__img" src="/images/116.png">' +
    '               <div class="weather__temp weather__temp_feel">' +
    '                   <p class="weather__temp-feel-text">Ощущается как<span class="weather__temp-val"> +18</span>' +
    '<!--span.weather__temp-unit &#8451;-->' +
    '                       <span class="weather__temp-unit">°</span>' +
    '                   </p>' +
    '               </div>' +
'               </div>' +
    '           <ul class="weather-fields-list">' +
    '               <li class="weather-field">' +
    '                   <svg class="field__img"><use xlink:href="#wind"></use></svg>' +
    '                   <p class="field__content field__content_wind">' +
    '                       <span class="field__val js-field__wind-speed">3.6</span>' +
    '                       <span class="field__unit"> м/с,</span>' +
    '                       <span class="field__val js-field__wind-dir"> ЮЗ</span>' +
    '                   </p>' +
    '               </li>' +
'                   <li class="weather-field">' +
    '                   <svg class="field__img"><use xlink:href="#mist"></use></svg>    ' +
    '                   <p class="field__content field__content_humidity">' +
    '                       <span class="field__val js-field__humidity">87%</span>' +
'                           <span class="field__unit"></span>' +
    '                   </p>' +
'                   </li>' +
'                   <li class="weather-field">' +
    '                   <svg class="field__img"><use xlink:href="#thermometer"></use></svg>' +
    '                   <p class="field__content field__content_pressure">' +
    '                       <span class="field__val js-field__pressure">745</span>' +
    '                       <span class="field__unit"> мм.рт.ст</span>' +
    '                   </p>' +
    '               </li>' +
    '           </ul>' +
'           </div>' +
    '       <div class="weather__forecast-container"><div class="forecast__card"><span class="forecast__card-label">28.08.2019</span><div class="row forecast__temp"><img class="weather__img" src="/images/116.png"><span class="weather__temp-val forecast__temp-val forecast__temp_min">33</span><span class="weather__temp-unit">°...</span><span class="weather__temp-val forecast__temp-val forecast__temp_max">36</span><span class="weather__temp-unit">°</span></div><ul class="weather-fields-list forecast__fields-list"><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#wind"></use></svg><p class="field__content field__content_wind"><span class="field__val js-field__wind-speed_min">3.6</span><span class="field__val">...</span><span class="field__val js-field__wind-speed_max">6</span><span class="field__unit"> м/с</span></p></li><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#mist"></use></svg><p class="field__content field__content_humidity"><span class="field__val js-field__humidity">87%</span><span class="field__unit"></span></p></li><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#thermometer"></use></svg><p class="field__content field__content_pressure"><span class="field__val js-field__pressure">745</span><span class="field__unit"> мм.рт.ст</span></p></li></ul></div><div class="forecast__card"><span class="forecast__card-label">29.08.2019</span><div class="row forecast__temp"><img class="weather__img" src="/images/116.png"><span class="weather__temp-val forecast__temp-val forecast__temp_min">13</span><span class="weather__temp-unit">°...</span><span class="weather__temp-val forecast__temp-val forecast__temp_max">16</span><span class="weather__temp-unit">°</span></div><ul class="weather-fields-list forecast__fields-list"><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#wind"></use></svg><p class="field__content field__content_wind"><span class="field__val js-field__wind-speed_min">3.6</span><span class="field__val">...</span><span class="field__val js-field__wind-speed_max">6</span><span class="field__unit"> м/с</span></p></li><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#mist"></use></svg><p class="field__content field__content_humidity"><span class="field__val js-field__humidity">87%</span><span class="field__unit"></span></p></li><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#thermometer"></use></svg><p class="field__content field__content_pressure"><span class="field__val js-field__pressure">745</span><span class="field__unit"> мм.рт.ст</span></p></li></ul></div><div class="forecast__card"><span class="forecast__card-label">30.08.2019</span><div class="row forecast__temp"><img class="weather__img" src="/images/116.png"><span class="weather__temp-val forecast__temp-val forecast__temp_min">13</span><span class="weather__temp-unit">°...</span><span class="weather__temp-val forecast__temp-val forecast__temp_max">16</span><span class="weather__temp-unit">°</span></div><ul class="weather-fields-list forecast__fields-list"><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#wind"></use></svg><p class="field__content field__content_wind"><span class="field__val js-field__wind-speed_min">3.6</span><span class="field__val">...</span><span class="field__val js-field__wind-speed_max">6</span><span class="field__unit"> м/с</span></p></li><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#mist"></use></svg><p class="field__content field__content_humidity"><span class="field__val js-field__humidity">87%</span><span class="field__unit"></span></p></li><li class="weather-field forecast-field"><svg class="field__img field__img_dark"><use xlink:href="#thermometer"></use></svg><p class="field__content field__content_pressure"><span class="field__val js-field__pressure">745</span><span class="field__unit"> мм.рт.ст</span></p></li></ul></div></div></div></div>')
