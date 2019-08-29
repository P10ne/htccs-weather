
export default class LStorage {
    constructor() {

    }

    getCities() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        return {
            cities: cities
        };
    }
}
