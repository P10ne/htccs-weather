import cityTemplate from '../city/cityTemplate';
import Cities from "../cities/cities";
import Handlebars from 'handlebars/dist/handlebars.min';
import Common from "../../modules/common";
import locStorage from "../../utils/locStorage";

export default class City {
    CITIES_ITEM_CLASS = 'cities__item';
    CITIES_ITEM_DEL_CLASS = 'js-cities__item-del';
    CITIES_ITEM_ACTIVE_CLASS = 'cities__item_active';
    static cityId = 0;

    constructor(city, mediator) {
        this.id = city.id || City.cityId;
        if (city.id && city.id > City.cityId) {
            City.cityId = city.id;
        }
        this.name = city.city;
        this.region = city.region;
        this.coords = city.coords;
        this.mediator = mediator;
        this.isActive = false;
        this.subscribe();
        this.nodeContainer = null;
        City.cityId++;
        console.log(`Создан город: ${JSON.stringify(this)}`);
    }

    subscribe() {
        const self = this;
        this.mediator.subscribe(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, (city) => {
            if (self !== city) {
                if (self.isActive) {
                    self.unsetActive();
                    console.log(`City: город ${self.name} больше не активен`);
                    self.updateNode();
                }
            } else {
                console.log(`City: город ${city.name} теперь активен`);
                self.updateNode();
            }
        });
    }



    initEvent(item) {
        const self = this;
        item.addEventListener('click', (e) => {
            if(!self.isActive) {
                self.setActive();
            }
        });
        item.querySelector(`.${self.CITIES_ITEM_DEL_CLASS}`).addEventListener('click', (e) => {
            console.log(`Удаляется город ${JSON.stringify(self)}`);
            if (locStorage.deleteCity(self)) {
                self.mediator.call(Common.CITY_DELETED_EVENT_NAME, [self]);
            }
            e.stopPropagation();
        });
    }

    setActive() {
        this.isActive = true;
        //this.nodeContainer.firstElementChild.classList.add(this.CITIES_ITEM_ACTIVE_CLASS);
        this.mediator.call(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, [this]);
        //this.updateNode();
    }

    unsetActive() {
        //this.nodeContainer.firstElementChild.classList.remove(this.CITIES_ITEM_ACTIVE_CLASS);
        this.isActive = false;
        this.updateNode();
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
