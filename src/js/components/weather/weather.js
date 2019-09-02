import './weather.pcss';
import weatherTemplate from './weatherTemplate';
import Common from "../../modules/common";
import WeatherAPI from "../../utils/weatherAPI";
import Config from "../../modules/config";
import Handlebars from 'handlebars/dist/handlebars.min';

export default class Weather {
    JS_WEATHER_CONTAINER_CLASS = 'js-weather-container';
    constructor(mediator) {
        this.mediator = mediator;
        this.subscribe();
        this.container = Common.doc.querySelector(`.${this.JS_WEATHER_CONTAINER_CLASS}`);
    }

    subscribe() {
        this.mediator.subscribe(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, (city) => {
            console.log('Блок погоды: город поменялся: ' + city.name);
            const weather = WeatherAPI.getForecast({ coords: city.coords, days: Config.forecastDays} ).then( response => {
                const parsedWeather = this.parseWeather(city.name, response);
                console.log(parsedWeather);
                this.render(parsedWeather);
            });

        });

        this.mediator.subscribe(Common.ON_CITY_ADDING_EVENT_NAME, () => {
            console.log('Weather: Добавляется город');
            this.hide();
        });

        this.mediator.subscribe(Common.NEW_CITY_ADDED_EVENT_NAME, () => {
           this.show();
        });
    }


    hide() {
        this.container.classList.add(Common.CONTAINER_DN_CLASS_NAME);
    }

    show() {
        this.container.classList.remove(Common.CONTAINER_DN_CLASS_NAME);
    }

    parseWeather(city, data) {
        const parsedWeather = {
            city: city,
            current: {
                last_updated: data.current.last_updated,
                temp_c: this.getTemp(data.current.temp_c),
                condition: {
                    text: data.current.condition.text,
                    icon: this.getConditionIconName(data.current.condition.icon),
                },
                wind_mps: this.getWindMPS(data.current.wind_kph),
                wind_dir: this.getWindDir(data.current.wind_dir),
                feelslike_c: this.getTemp(data.current.feelslike_c),
                humidity: data.current.humidity,
                pressure: this.getPressureInMM(data.current.pressure_mb)
            },
            forecast: {
                forecastday: [
                    this.getForecastdayData(data.forecast.forecastday[0]),
                    this.getForecastdayData(data.forecast.forecastday[1]),
                    this.getForecastdayData(data.forecast.forecastday[2])
                ]
            }
        };
        return parsedWeather;
    }

    getForecastdayData(data) {
        return {
            date: data.date,
            maxtemp_c: this.getTemp(data.day.maxtemp_c),
            mintemp_c: this.getTemp(data.day.mintemp_c),
            maxwind_kph: this.getWindMPS(data.day.maxwind_kph),
            avghumidity: data.day.avghumidity,
            condition: {
                text: data.day.condition.text,
                icon: this.getConditionIconName(data.day.condition.icon)
            }
        }
    }

    getTemp(temp) {
        return temp > 0 ?
            `+${Math.round(temp)}` :
            `${Math.round(temp)}`;
    }

    getWindMPS(windkph) {
        return Math.round(windkph / 3.6);
    }

    getConditionIconName(icon) {
        return icon;
    }

    getPressureInMM(pressure) {
        return Math.round(pressure / 1.333);
    }

    getWindDir(dir) {
        switch(dir) {
            case 'N': return 'С'; break;
            case 'NNE': return 'ССВ'; break;
            case 'NE': return 'СВ'; break;
            case 'ENE': return 'ВСВ'; break;
            case 'E': return 'В'; break;
            case 'ESE': return 'ВЮВ'; break;
            case 'SE': return 'ВЮВ'; break;
            case 'SSE': return 'ЮЮВ'; break;
            case 'S': return 'Ю'; break;
            case 'SSW': return 'ЮЮЗ'; break;
            case 'SW': return 'ЮЗ'; break;
            case 'WSW': return 'ЗЮЗ'; break;
            case 'W': return 'З'; break;
            case 'WNW': return 'ЗСЗ'; break;
            case 'NW': return 'СЗ'; break;
            case 'NNW': return 'ССЗ'; break;
        }
    }

    render(data) {
        this.container.innerHTML = '';
        this.container.append(this.getRenderedWeather(data));
    }

    getRenderedWeather(data) {
        const renderedWeather = Handlebars.compile('{{> weather }}')(data);
        const div = Common.doc.createElement('div');
        div.innerHTML = renderedWeather.trim();
        const renderedWeatherNode = div.firstChild;
        return renderedWeatherNode;
    }
}
