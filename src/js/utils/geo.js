import Mediator from "../modules/mediator";
import Common from "../modules/common";
import ymaps from "ymaps";
import Config from "../modules/config";


export default class Geo {

    constructor(mediator) {
       this.mediator = mediator;
       this.currentCoords = null;
       this.geoLocationData = null;
    }

    getLocation() {
        const self = this;
        return new Promise((resolve, reject) => {
            if(this.geoLocationData === null) {
                ymaps.load(Config.ymapsURL)
                    .then(ymaps => {
                        ymaps.geolocation.get({
                            provider: 'yandex',
                            autoReverseGeocode: true
                        }).then(res => {
                            self.geoLocationData = res.geoObjects.get(0);
                            resolve(self.geoLocationData);
                        });
                    });
            } else {
                resolve(this.geoLocationData);
            }
        });
    }

    getLocationData() {
        const self = this;
        this.getLocation()
            .then(response => {
                    const locationData = {};
                    locationData.country = self.geoLocationData.properties.get('metaDataProperty').GeocoderMetaData.Address.Components[0].name;
                    locationData.region = self.geoLocationData.properties.get('metaDataProperty').GeocoderMetaData.Address.Components[2].name;
                    locationData.city = self.geoLocationData.properties.get('metaDataProperty').GeocoderMetaData.Address.Components[4].name;
                    locationData.coords = self.geoLocationData.geometry.getCoordinates();
                    self.geoLocationData = locationData;
                    self.mediator.call(Common.LOCATION_CHANGED_EVENT_NAME, [self.geoLocationData]);
                },
                reject => {
                    self.mediator.call(Common.GET_LOCATION_ERROR_EVENT_NAME)
                }
            );
    }

    updateLocation() {
        this.currentCoords = this.getCoords();
        this.mediator.call(Common.LOCATION_CHANGED_EVENT_NAME, this.currentCoords);
    }
}
