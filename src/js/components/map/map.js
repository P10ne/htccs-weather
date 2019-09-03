import "./map.pcss";

import mapTemplate from '../map/mapTemplate';
import ymaps from "ymaps";
import Common from "../../modules/common";
import Config from "../../modules/config";
import LStorage from "../../utils/locStorage";
import City from "../city/City";

export default class Map {
    JS_MAP_CONTAINER_CLASS = 'js-map-container';
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
                        const newCityData = {};
                        if (res.geoObjects.get(0)) {
                            const address = res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.AddressDetails;
                            newCityData.country = address.Country ? address.Country.CountryName : 'Страна'
                            newCityData.region = address.Country.AdministrativeArea ? address.Country.AdministrativeArea.AdministrativeAreaName : 'Регион';
                            newCityData.city = address.Country.AdministrativeArea.SubAdministrativeArea ?
                                address.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName:
                                address.Country.AdministrativeArea.Locality.LocalityName;

                            newCityData.coords = res.geoObjects.get(0).geometry.getCoordinates();
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
}
