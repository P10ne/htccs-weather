import './cities.pcss';
import City from '../city/City';
import LStorage from "../../utils/locStorage";
import Common from "../../modules/common";
import citiesTemplate from './citiesTemplate';
import LocationCity from "../locationCity/LocationCity";
import Map from "../map/map";

export default class Cities {
    JS_CITIES_CLASS = 'js-cities';
    JS_LOCATION_ROW_CLASS = 'js-location__row';
    JS_ADD_CITY_BTN_CLASS = 'js-add-city-btn';
    static CITIES_LIST_CLASS = 'js-cities__list';
    citiesContainer = Common.doc.querySelector(`.${this.JS_CITIES_CLASS}`);
    locationContainer = this.citiesContainer.querySelector(`.${this.JS_LOCATION_ROW_CLASS}`);
    citiesListContainer = null;
    addCityBtn = this.citiesContainer.querySelector(`.${this.JS_ADD_CITY_BTN_CLASS}`);

    constructor(mediator) {
        this.mediator = mediator;
        this.cities = null;
        this.createCityList();
        this.locationCity = null;
        this.initLocation();
        this.renderCityList();
        this.subscribeCities();
        this.initAddCityBtn();
    }

    initAddCityBtn() {
        this.addCityBtn.addEventListener('click', () => {
            console.log('Кнопка: добавляем город');
            this.mediator.call(Common.EVENT.ON_CITY_ADDING_EVENT_NAME);
        });
    }

    initLocation() {
        Map.updateLocation(this.mediator);
    }

    locationChangedEvent = (geoLocationData) => {
        console.log(`Cities: местоположение изменено ${JSON.stringify(geoLocationData)}`);
        this.locationCity = new LocationCity(geoLocationData, this.mediator);
        this.locationCity.subscribe();
        this.locationContainer.innerHTML = '';
        this.locationContainer.append(this.locationCity.getRendered());
        this.locationCity.setActive()
    }

    locationChangedError = () => {
        console.log('Cities: ошибка определения местоположения');
        this.locationCity = new LocationCity(null, this.mediator, true);
        this.locationContainer.innerHTML = '';
        this.locationContainer.append(this.locationCity.getRendered());
        if (this.cities[0]) {
            this.cities[0].setActive();
        }
    }

    newCityAddedEvent = (item) => {
        console.log(`Cities: Добавлен новый город: ${JSON.stringify(item)}`);
        this.updateCityList();
        this.cities.find(city => city.id === item.id).setActive();
    }

    cityDeletedEvent = () => {
        console.log(`cities: город удаляется`);
        this.updateCityList();
    }


    subscribeCities() {
        this.mediator.subscribe(Common.EVENT.ACTIVE_CITY_CHANGED_EVENT_NAME, (item) => {
            console.log('Блок Cities: Город поменялся: ' + item.name);
        });
        this.mediator.subscribe(Common.EVENT.LOCATION_CHANGED_EVENT_NAME, this.locationChangedEvent);
        this.mediator.subscribe(Common.EVENT.GET_LOCATION_ERROR_EVENT_NAME, this.locationChangedError);
        this.mediator.subscribe(Common.EVENT.NEW_CITY_ADDED_EVENT_NAME, this.newCityAddedEvent);
        this.mediator.subscribe(Common.EVENT.CITY_DELETED_EVENT_NAME, this.cityDeletedEvent);
    }

    createCityList() {
        const localStCities = this.getCities();
        const cities = [];
        if (localStCities) {
            localStCities.forEach((item) => {
                const newCity = new City(item, this.mediator);
                newCity.subscribe();
                cities.push(newCity);
            });
            this.cities = cities;
        } else {
            this.cities = [];
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

    updateCityList() {
        this.createCityList();
        this.renderCityList();
    }
}
