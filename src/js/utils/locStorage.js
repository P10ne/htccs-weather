
export default class LStorage {
    constructor() {

    }

    static getCities() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        return cities;
    }

    static addCity(city) {
        const currentCities = this.getCities() || [];
        currentCities.push(city);
        localStorage.setItem('cities', JSON.stringify(currentCities));
    }
}
