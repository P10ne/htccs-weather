import "./map.pcss";

import mapTemplate from '../map/mapTemplate';
import ymaps from "ymaps";
import Common from "../../modules/common";
import Config from "../../modules/config";
import LStorage from "../../utils/locStorage";

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
                    console.log(coords);
                    ymaps.geocode(coords).then((res) => {
                        console.log(res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData);
                        const newCityData = {};
                        const address = res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.Address;
                        newCityData.country = address.Components[0] ? address.Components[0].name : 'Страна'
                        newCityData.region = address.Components[2] ? address.Components[2].name : 'Регион';
                        newCityData.city = address.Components[4] ? address.Components[4].name : 'Город';
                        newCityData.coords = res.geoObjects.get(0).geometry.coordinates;
                        LStorage.addCity(newCityData);
                        this.mediator.call(Common.NEW_CITY_ADDED_EVENT_NAME, [newCityData]);
                    });
                });
            })
    }
}
