import cityTemplate from '../city/cityTemplate';
import Cities from "../cities/cities";
import Handlebars from 'handlebars/dist/handlebars.min';
import Common from "../../modules/common";

export default class City {
    CITIES_ITEM_CLASS = 'cities__item';
    CITIES_ITEM_DEL_CLASS = 'js-cities__item-del';
    static cityId = 0;

    constructor(city, mediator) {
        this.id = City.cityId;
        this.name = city.city;
        this.region = city.region;
        this.mediator = mediator;
        this.isActive = false;
        City.cityId++;
        this.subscribe();
        this.nodeContainer = null;
    }

    subscribe() {
        this.mediator.subscribe(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, (city) => {
            if (this !== city) {
                if (this.isActive) {
                    this.unsetActive();
                    console.log(`City: город ${this.name} больше не активен`);
                    this.updateNode();
                }
            } else {
                console.log(`City: город ${city.name} теперь активен`);
                this.updateNode();
            }
        });
    }

    initEvent(item) {
        item.addEventListener('click', (e) => {
            if(!this.isActive) {
                this.setActive(this);
            }
        });
        item.querySelector(`.${this.CITIES_ITEM_DEL_CLASS}`).addEventListener('click', (e) => {
            console.log('Удаляется город');
            e.stopPropagation();
        });
    }

    setActive() {
        this.isActive = true;
        this.mediator.call(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, [this]);
    }

    unsetActive() {
        this.isActive = false;
    }

    getRendered() {
        const renderedCity = Handlebars.compile('{{> city-element }}')(this);
        const div = Common.doc.createElement('div');
        div.innerHTML = renderedCity;
        const renderedCityNode = div.firstElementChild;
        this.initEvent(renderedCityNode);
        if(this.nodeContainer === null) {
            this.nodeContainer = renderedCityNode;
        }
        return renderedCityNode;
    }

    updateNode() {
        const renderedCityNode = this.getRendered();
        this.nodeContainer.firstElementChild.replaceWith(renderedCityNode.firstElementChild);
    }
}
