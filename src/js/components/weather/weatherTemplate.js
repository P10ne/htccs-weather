import Handlebars from 'handlebars/dist/handlebars.min';

Handlebars.registerPartial('weather', '' +
    '<div class="card card_weather">' +
    '   <div class="weather__content">' +
    '       <span class="weather__city-name">{{ city }}</span>' +
'           <div class="weather__top-container">' +
    '           <div class="weather__top-wrapper">' +
    '               <div class="weather__state">' +
    '                   <span class="weather__temp-val">{{ current.temp_c }}</span>' +
    '                   <span class="weather__temp-unit">°</span>' +
    '                   <p class="weather__precip">{{ current.condition.text }}</p>' +
    '               </div>' +
    '               <img class="weather__img" src="https:{{ current.condition.icon }}">' +
    '               <div class="weather__temp weather__temp_feel">' +
    '                   <p class="weather__temp-feel-text">Ощущается как <span class="weather__temp-val">{{ current.feelslike_c }}</span>' +
    '                       <span class="weather__temp-unit">°</span>' +
    '                   </p>' +
    '               </div>' +
'               </div>' +
    '           <ul class="weather-fields-list">' +
    '               <li class="weather-field">' +
    '                   <svg class="field__img"><use xlink:href="#wind"></use></svg>' +
    '                   <p class="field__content field__content_wind">' +
    '                       <span class="field__val js-field__wind-speed">{{ current.wind_mps }}</span>' +
    '                       <span class="field__unit"> м/с,</span>' +
    '                       <span class="field__val js-field__wind-dir">{{ current.wind_dir }}</span>' +
    '                   </p>' +
    '               </li>' +
'                   <li class="weather-field">' +
    '                   <svg class="field__img"><use xlink:href="#mist"></use></svg>    ' +
    '                   <p class="field__content field__content_humidity">' +
    '                       <span class="field__val js-field__humidity">{{ current.humidity }}%</span>' +
'                           <span class="field__unit"></span>' +
    '                   </p>' +
'                   </li>' +
'                   <li class="weather-field">' +
    '                   <svg class="field__img"><use xlink:href="#thermometer"></use></svg>' +
    '                   <p class="field__content field__content_pressure">' +
    '                       <span class="field__val js-field__pressure">{{ current.pressure }}</span>' +
    '                       <span class="field__unit"> мм.рт.ст</span>' +
    '                   </p>' +
    '               </li>' +
    '           </ul>' +
'           </div>' +
    '       <div class="weather__forecast-container">' +
'               {{#each forecast.forecastday }} ' +
'                   <div class="forecast__card">' +
    '                  <span class="forecast__card-label">{{ this.date }}</span>' +
    '                  <div class="row forecast__temp">' +
    '                      <img class="weather__img" src="https:{{ this.condition.icon }}">' +
    '                      <span class="weather__temp-val forecast__temp-val forecast__temp_min">{{ this.mintemp_c }}</span>' +
    '                      <span class="weather__temp-unit">°...</span>' +
    '                      <span class="weather__temp-val forecast__temp-val forecast__temp_max">{{ this.maxtemp_c }}</span>' +
    '                      <span class="weather__temp-unit">°</span>' +
    '                  </div>' +
    '                   <ul class="weather-fields-list forecast__fields-list">' +
    '                      <li class="weather-field forecast-field">' +
    '                          <svg class="field__img field__img_dark"><use xlink:href="#wind"></use></svg>  ' +
    '                          <p class="field__content field__content_wind">' +
    '                              <span class="field__val js-field__wind-speed_max">{{ this.maxwind_kph }}</span>' +
    '                              <span class="field__unit"> м/с</span>' +
    '                          </p>' +
    '                      </li>' +
    '                      <li class="weather-field forecast-field">' +
    '                          <svg class="field__img field__img_dark"><use xlink:href="#mist"></use></svg>' +
    '                          <p class="field__content field__content_humidity">' +
    '                              <span class="field__val js-field__humidity">{{ this.avghumidity }}%</span>' +
    '                              <span class="field__unit"></span>' +
    '                          </p>' +
    '                      </li>' +
    '                  </ul>' +
    '               </div>' +
    '           {{/each}}' +
    '       </div>' +
    '   </div>' +
    '</div>'
)
