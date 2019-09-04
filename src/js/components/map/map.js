import "./map.pcss";

import mapTemplate from '../map/mapTemplate';
import ymaps from "ymaps";
import Common from "../../modules/common";
import Config from "../../modules/config";
import LStorage from "../../utils/locStorage";
import City from "../city/City";

export default class Map {
    JS_MAP_CONTAINER_CLASS = 'js-map-container';
    JS_MAP_CLOSE_BTN_CLASS = 'js-map-close-btn';
    static geoLocationData = null;
    constructor(mediator) {
        this.mediator = mediator;
        this.container = Common.doc.querySelector(`.${this.JS_MAP_CONTAINER_CLASS}`);
        this.subscribe();
        this.init();
    }

    subscribe() {
        const self = this;
        this.mediator.subscribe(Common.ON_CITY_ADDING_EVENT_NAME, () => {
            console.log('Map: Добавляется город');
            self.show();
        });
        this.mediator.subscribe(Common.NEW_CITY_ADDED_EVENT_NAME, (item) => {
            this.hide();
        })
    }

    hide() {
        this.container.classList.add(Common.CONTAINER_DN_CLASS_NAME);
    }

    show() {
        this.container.classList.remove(Common.CONTAINER_DN_CLASS_NAME);
    }

    init() {
        const self = this;

        // Закрытие окна с картой
        const mapCloseBtn = Common.doc.querySelector(`.${this.JS_MAP_CLOSE_BTN_CLASS}`).addEventListener('click', (e) => {
             console.log('Закрывается map');
             self.hide();
             this.mediator.call(Common.MAP_CARD_CLOSED_EVENT_NAME);
        });

        // Работа с картой
        ymaps.load(Config.ymapsURL)
            .then(ymaps => {
                const myMap = new ymaps.Map("map-container", {
                    center: [55.76, 37.64],
                    zoom: 7,
                    controls: ['searchControl'],
                });

                myMap.events.add('click', (e) => {
                    const coords = e.get('coords');
                    ymaps.geocode(coords, {
                        kind: 'locality'
                    }).then((res) => {
                        let newCityData = {};
                        if (res.geoObjects.get(0)) {
                            newCityData = Map.getGeoObjectData(res.geoObjects.get(0));
                            newCityData.id = City.cityId;
                            LStorage.addCity(newCityData);
                            self.mediator.call(Common.NEW_CITY_ADDED_EVENT_NAME, [newCityData]);
                        } else {
                            newCityData.coords = coords;
                            newCityData.city = prompt('Не удалось определить город. Введите название: ', JSON.stringify(coords));
                            newCityData.id = City.cityId;
                            LStorage.addCity(newCityData);
                            self.mediator.call(Common.NEW_CITY_ADDED_EVENT_NAME, [newCityData]);
                        }
                    })
                    .catch(error => {
                        alert('Ошибка при получении данных');
                        console.log(error);
                    });
                });
            })
    }

    static getGeoObjectData(geoObject) {
        const newCityData = {};
        const address = geoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails;
        newCityData.country = address.Country ? address.Country.CountryName : 'Страна'
        newCityData.region = address.Country.AdministrativeArea ? address.Country.AdministrativeArea.AdministrativeAreaName : 'Регион';
        newCityData.city = address.Country.AdministrativeArea.SubAdministrativeArea ?
            address.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName:
            address.Country.AdministrativeArea.Locality.LocalityName;
        newCityData.coords = geoObject.geometry.getCoordinates();
        return newCityData;
    }

    static getLocation() {
        return new Promise((resolve, reject) => {
            ymaps.load(Config.ymapsURL)
                .then(ymaps => {
                    ymaps.geolocation.get({
                        provider: 'browser',
                        autoReverseGeocode: true
                    }).then(res => {
                        resolve(res.geoObjects.get(0));
                    }).catch(error => reject(error));
                }).catch(error => reject(error));
        });
    }

    static getLocationData(mediator) {
        Map.getLocation()
            .then(response => {
                if (Map.geoLocationData && Map.geoLocationData.coords === response.geometry.getCoordinates()) {
                    mediator.call(Common.LOCATION_CHANGED_EVENT_NAME, [Map.geoLocationData]);
                } else {
                    let locationData = {};
                    locationData = Map.getGeoObjectData(response);
                    Map.geoLocationData = locationData;
                    mediator.call(Common.LOCATION_CHANGED_EVENT_NAME, [Map.geoLocationData]);
                }
            },
            reject => {
                console.error(reject);
                mediator.call(Common.GET_LOCATION_ERROR_EVENT_NAME);
            });
    }

    static updateLocation(mediator) {
        Map.getLocationData(mediator);
    }
}
