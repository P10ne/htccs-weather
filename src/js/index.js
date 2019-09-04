import '../css/index.pcss';

import Cities from "./components/cities/cities";
import Weather from "./components/weather/weather";
import Map from "./components/map/map";
import Body from "./components/body/body";
import Mediator from "./modules/mediator";
import Header from "./components/header/header";
import Common from "./modules/common";

(function init() {
    const mediator = new Mediator();
    Common.doc.body.insertAdjacentHTML('afterBegin', new Body().render());

    const cities = new Cities(mediator);
    const weather = new Weather(mediator);
    const map = new Map(mediator);
})();
