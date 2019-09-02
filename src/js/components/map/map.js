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
        this.init();
        this.subscribe();
    }

    subscribe() {
        this.mediator.subscribe(Common.ON_CITY_ADDING_EVENT_NAME, () => {
            console.log('Map: Добавляется город');
            this.show();
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
                        console.log(res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData);

                        const newCityData = {};
                        const address = res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.AddressDetails;
                        newCityData.country = address.Country ? address.Country.CountryName : 'Страна'
                        newCityData.region = address.Country.AdministrativeArea ? address.Country.AdministrativeArea.AdministrativeAreaName : 'Регион';
                        newCityData.city = address.Country.AdministrativeArea.SubAdministrativeArea ?
                            address.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName:
                            address.Country.AdministrativeArea.Locality.LocalityName;
                        newCityData.coords = res.geoObjects.get(0).geometry.getCoordinates();
                        newCityData.id = City.cityId;

                        LStorage.addCity(newCityData);
                        this.mediator.call(Common.NEW_CITY_ADDED_EVENT_NAME, [newCityData]);
                    });
                });
            })
    }
}
