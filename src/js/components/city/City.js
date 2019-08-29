import cityTemplate from '../city/cityTemplate';
import Cities from "../cities/cities";
import Handlebars from 'handlebars/dist/handlebars.min';
import Common from "../../modules/common";

export default class City {
    CITIES_ITEM_CLASS = 'cities__item';
    static cityId = 0;

    constructor(city, mediator) {
        this.id = City.cityId;
        this.name = city.city;
        this.region = city.region;
        this.mediator = mediator;
        this.isActive = false;
        City.cityId++;
    }

    initEvent(item) {
        const self = this;
        item.addEventListener('click', (e) => {
            this.setActive(self);
        });
    }

    setActive(self) {
        self.isActive = true;
        self.mediator.call(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, [self]);
    }

    unsetActive() {
        this.isActive = false;
    }

    getRendered() {
        const renderedCity = Handlebars.compile('{{> city-element }}')(this);
        const div = Common.doc.createElement('div');
        div.innerHTML = renderedCity.trim();
        const renderedCityNode = div.firstChild;
        this.initEvent(renderedCityNode);
        return renderedCityNode;
    }
}
