import '../css/index.pcss';

import Cities from "./components/cities/cities";
import Weather from "./components/weather/weather";
import Body from "./components/body/body";
import Geo from "./utils/geo";
import Mediator from "./modules/mediator";
import Header from "./components/header/header";
import Common from "./modules/common";
import WeatherAPI from "./utils/weatherAPI";

(function init() {
    const mediator = new Mediator();
    const header = new Header();
    Common.doc.body.insertAdjacentHTML('afterBegin', new Body().render({title: 'Заголовок'}));

    const cities = new Cities(mediator);
    const weather = new Weather(mediator);

    const geo = new Geo(mediator);
    geo.getLocationData((data) => console.log(data));

/*
    const geo = new Geo(mediator);
    mediator.subscribe(mediator.EventNames.LOCATION_CHANGED_EVENT_NAME, () => {
        console.log('Местоположение изменено');
    });
    geo.updateLocation();
 */
})();
