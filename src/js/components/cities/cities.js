import './cities.pcss';
import Handlebars from 'handlebars/dist/handlebars.min';
import City from '../city/City';
import LStorage from "../../utils/locStorage";
import Common from "../../modules/common";
import Geo from "../../utils/geo";
import citiesTemplate from './citiesTemplate';
import LocationCity from "../locationCity/LocationCity";

export default class Cities {
    doc = document;
    JS_CITIES_CLASS = 'js-cities';
    JS_LOCATION_ROW_CLASS = 'js-location__row';
    static CITIES_LIST_CLASS = 'js-cities__list';
    citiesContainer = this.doc.querySelector(`.${this.JS_CITIES_CLASS}`);
    locationContainer = this.citiesContainer.querySelector(`.${this.JS_LOCATION_ROW_CLASS}`);
    citiesListContainer = null;

    constructor(mediator) {
        this.mediator = mediator;
        this.cities = this.createCityList();
        this.locationCity = null;
        this.initLocation();
        this.renderCityList();
        this.subscribeCities();
    }

    initLocation() {
        const geo = new Geo(this.mediator);
        geo.getLocationData();
    }

    subscribeCities() {
        const self = this;
        this.mediator.subscribe(Common.ACTIVE_CITY_CHANGED_EVENT_NAME, (item) => {
            console.log('Блок Cities: Город поменялся: ' + item.name);
        });
        this.mediator.subscribe(Common.LOCATION_CHANGED_EVENT_NAME, (geoLocationData) => {
            console.log(`Cities: местоположение изменено ${JSON.stringify(geoLocationData)}`);
            self.locationCity = new LocationCity(geoLocationData, self.mediator);
            self.locationContainer.innerHTML = '';
            self.locationContainer.append(self.locationCity.getRendered());
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
