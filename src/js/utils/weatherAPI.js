import Config from "../modules/config";

export default class WeatherAPI {

    static getForecast(data) {
        const forecastWeather = WeatherAPI.createRequest({type: Config.weatherForecast,
                                                                params: [
                                                                            { name: 'q', value: data.coords.join(',')},
                                                                            { name: 'days', value: data.days }
                                                                        ]
                                                            });
        return forecastWeather;
    }

    static createRequest(data) {
        let url = `${ Config.weatherUrlHead }${ data.type }?key=${Config.weatherKey}`;
        data.params.forEach((param) => {
            url += `&${ param.name }=${ param.value }`;
        });
        url += `&lang=ru`;
        console.log(url);
        return fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        return result;
                    });
    }
}
