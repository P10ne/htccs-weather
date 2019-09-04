import cityTemplate from '../city/cityTemplate';
import Cities from "../cities/cities";
import Common from "../../modules/common";
import locStorage from "../../utils/locStorage";

export default class City {
    CITIES_ITEM_CLASS = 'cities__item';
    CITIES_ITEM_DEL_CLASS = 'js-cities__item-del';
    CITIES_ITEM_UPDATE_CLASS = 'js-cities__item-update';
    CITIES_ITEM_ACTIVE_CLASS = 'cities__item_active';
    static cityId = 0;

    constructor(city, mediator) {
        if (city) {
            this.id = city.id || City.cityId;
            if (city.id && city.id > City.cityId) {
                City.cityId = city.id;
            }
            this.name = city.city;
            this.region = city.region;
            this.coords = city.coords;
            this.mediator = mediator;
            this.isActive = false;
            this.nodeContainer = null;
            City.cityId++;
            console.log(`Создан город: ${JSON.stringify(this)}`);
        }
    }

    activeCityChangedEvent  = (city) => {
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
    };

    onSelect() {
        if(!this.isActive) {
            this.setActive();
        }
    }

    onDelete = (e) => {
        console.log(`Удаляется город ${JSON.stringify(this)}`);
        if (locStorage.deleteCity(this)) {
            this.mediator.call(Common.EVENT.CITY_DELETED_EVENT_NAME, [this]);
        }
        e.stopPropagation();
    }

    subscribe() {
        this.mediator.subscribe(Common.EVENT.ACTIVE_CITY_CHANGED_EVENT_NAME, this.activeCityChangedEvent);
    }


    initEvent(item) {
        item.addEventListener('click', this.onSelect.bind(this));
        item.querySelector(`.${this.CITIES_ITEM_DEL_CLASS}`).addEventListener('click', this.onDelete);
    }

    setActive() {
        this.isActive = true;
        this.mediator.call(Common.EVENT.ACTIVE_CITY_CHANGED_EVENT_NAME, [this]);
    }

    unsetActive() {
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
