import City from "../city/City";
import locationCityTemplate from './locationCityTemplate';
import Common from "../../modules/common";
import Map from "../map/map";

export default class LocationCity extends City {
    constructor(city, mediator, isError) {
        super(city, mediator);
        if (isError) {
            this.isError = isError;
            this.mediator = mediator;
        }
    }

    onSelect = () => {
        if(!this.isActive) {
            this.setActive();
        }
    }

    onLocationUpdate = () => {
        console.log('LocationCity: Обновляется местоположение');
        Map.updateLocation(this.mediator);
    }

    initEvent(item) {
        if (!this.isError) {
            item.addEventListener('click', this.onSelect);
        }
        item.querySelector(`.${this.CITIES_ITEM_UPDATE_CLASS}`).addEventListener('click', this.onLocationUpdate);
    }

    getRendered() {
        const renderedCity = Handlebars.compile('{{> city-element-location }}')(this);
        const div = Common.doc.createElement('div');
        div.innerHTML = renderedCity;
        const renderedCityNode = div.firstElementChild;
        this.initEvent(renderedCityNode);
        if(this.nodeContainer === null) {
            this.nodeContainer = renderedCityNode;
        }
        return renderedCityNode;
    }
}
