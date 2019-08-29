import Mediator from "../modules/mediator";
import Common from "../modules/common";

export default class Geo {
    let
        currentCoords = null;

    constructor(mediator) {
       this.mediator = mediator;
    }

    initEvents() {

    }

    getCoords() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.currentCoords = position.coords;
            });
        }
    }

    updateLocation() {
        this.currentCoords = this.getCoords();
        this.mediator.call(Common.LOCATION_CHANGED_EVENT_NAME, this.currentCoords);
    }
}
