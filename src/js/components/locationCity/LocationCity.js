import City from "../city/City";
import locationCityTemplate from './locationCityTemplate';
import Common from "../../modules/common";
import Handlebars from 'handlebars/dist/handlebars.min';

export default class LocationCity extends City {
    constructor(city, mediator, isError) {
        super(city, mediator);
        if (isError) {
            this.isError = isError;
        }
    }

    initEvent(item) {
        const self = this;
        item.addEventListener('click', (e) => {
            if(!self.isActive) {
                self.setActive();
            }
        });
    }

    getRendered() {
        const renderedCity = Handlebars.compile('{{> city-element-location }}')(this);
        const div = Common.doc.createElement('div');
        div.innerHTML = renderedCity;
        const renderedCityNode = div.firstElementChild;
        if(!this.isError) {
            this.initEvent(renderedCityNode);
        }
        if(this.nodeContainer === null) {
            this.nodeContainer = renderedCityNode;
        }
        return renderedCityNode;
    }
}
