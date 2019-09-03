import City from "../city/City";
import locationCityTemplate from './locationCityTemplate';
import Common from "../../modules/common";
import Handlebars from 'handlebars/dist/handlebars.min';
import Map from "../map/map";

export default class LocationCity extends City {
    constructor(city, mediator, isError) {
        super(city, mediator);
        if (isError) {
            this.isError = isError;
            this.mediator = mediator;
        }
    }

    initEvent(item) {
        const self = this;
        if (!self.isError) {
            item.addEventListener('click', (e) => {
                if(!self.isActive) {
                    self.setActive();
                }
            });
        }
        item.querySelector(`.${self.CITIES_ITEM_UPDATE_CLASS}`).addEventListener('click', (e) => {
            console.log('LocationCity: Обновляется местоположение');
            Map.updateLocation(self.mediator);
        })
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
