import './weather.pcss';
import weatherTemplate from './weatherTemplate';
import Common from "../../modules/common";
import WeatherAPI from "../../utils/weatherAPI";
import Config from "../../modules/config";
import Handlebars from 'handlebars/dist/handlebars.min';

export default class Weather {
    constructor(mediator) {
        this.mediator = mediator;
        this.subscribe();
        this.container = Common.doc.querySelector('.weather');
    }

    subscribe() {
        this.mediator.subscribe(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, (city) => {
            console.log('Блок погоды: город поменялся: ' + city.name);
            const weather = WeatherAPI.getForecast({ city: city.name, days: Config.forecastDays} ).then( response => {
                const parsedWeather = this.parseWeather(city.name, response);
                console.log(parsedWeather);
                this.render(parsedWeather);
            });

        });
    }

    parseWeather(city, data) {
        const parsedWeather = {
            city: city,
            current: {
                last_updated: data.current.last_updated,
                temp_c: this.getTemp(data.current.temp_c),
                condition: {
                    text: this.getConditionText(data.current.condition.code),
                    icon: this.getConditionIconName(data.current.condition.code),
                },
                wind_kph: data.current.wind_kph,
                wind_dir: this.getWindDir(data.current.wind_dir),
                feelslike_c: this.getTemp(data.current.feelslike_c),
                humidity: data.current.humidity,
                pressure: this.getPressureInMM(data.current.pressure_mb)
            }
        };
        return parsedWeather;
    }

    getTemp(temp) {
        return temp > 0 ?
            `+${temp}` :
            `${temp}`;
    }

    getConditionText(code) {
        return code;
    }

    getConditionIconName(code) {
        return code;
    }

    getPressureInMM(pressure) {
        return pressure;
    }

    getWindDir(dir) {
        return dir;
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
