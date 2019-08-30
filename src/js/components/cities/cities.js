import './cities.pcss';
import Handlebars from 'handlebars/dist/handlebars.min';
import City from '../city/City';
import LStorage from "../../utils/locStorage";
import Common from "../../modules/common";

import citiesTemplate from './citiesTemplate';

export default class Cities {
    doc = document;
    JS_CITIES_CLASS = 'js-cities';
    static CITIES_LIST_CLASS = 'cities__list';
    citiesContainer = this.doc.querySelector(`.${this.JS_CITIES_CLASS}`);
    citiesListContainer = null;

    constructor(mediator) {
        this.mediator = mediator;
        this.cities = this.createCityList();
        this.renderCityList();
        this.activeCity = null;
        this.subscribeCities();
    }

    subscribeCities() {
        this.mediator.subscribe(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, (item) => {
            if (this.activeCity !== null) {
                this.activeCity.isActive = false;
            }
            this.activeCity = item;
            this.renderCityList();
            console.log('Блок Cities: Город поменялся: ' + item.name);
        });
        this.mediator.subscribe(Common.LOCATION_CHANGED_EVENT_NAME, (geoLocationData) => {
            console.log(`Cities: местоположение изменено ${JSON.stringify(geoLocationData)}`);
        })
    }

    createCityList() {
        const localStCities = this.getCities().cities;
        const cities = [];
        if (localStCities) {
            localStCities.forEach((item) => {
                cities.push(new City(item, this.mediator));
            });
            return cities;
        } else {
            return [];
        }
    }

    getCities() {
        return LStorage.getCities();
    }

    renderCityList() {
        if (this.citiesListContainer === null) {
            this.citiesListContainer = this.citiesContainer.querySelector(`.${Cities.CITIES_LIST_CLASS}`);
        }
        this.citiesListContainer.innerHTML = '';
        this.cities.forEach((item) => {
            const city = item.getRendered();
            this.citiesListContainer.append(city);
        });
    }
}
