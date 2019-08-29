import Config from "../modules/config";

export default class WeatherAPI {

    static getCurrent(data) {
        const currentWeather = WeatherAPI.createRequest({type: Config.weatherCurrent, params: [{ name: 'q', value: data.city}]});
        return currentWeather;
    }

    static getForecast(data) {
        const forecastWeather = WeatherAPI.createRequest({type: Config.weatherCurrent,
                                                                params: [
                                                                            { name: 'q', value: data.city},
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
        console.log(url);
        return fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        return result;
                    })
                    .catch(error => console.error(error));
    }
}
