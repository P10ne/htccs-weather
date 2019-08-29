import '../css/index.pcss';

import header from "./components/header/header";
import cities from "./components/cities/cities";
import weather from "./components/weather/weather";
import body from "./components/body/body";
import Geo from "./utils/geo";
import Mediator from "./mediator";

(function init() {
    const doc = document;
    doc.body.insertAdjacentHTML('afterBegin', body().render({title: 'Заголовок'}));
    cities().renderCityList();



    const mediator = new Mediator();
    const geoLoc = new Geo(mediator);
    mediator.addEventListener(mediator.EventNames.LOCATION_CHANGED_EVENT_NAME, () => {
        console.log('Местоположение изменено');
    });
    geoLoc.updateLocation();
})();
