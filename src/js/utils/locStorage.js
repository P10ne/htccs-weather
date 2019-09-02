
export default class LStorage {
    constructor() {

    }

    static getCities() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        return cities;
    }

    static addCity(city) {
        const currentCities = LStorage.getCities() || [];
        currentCities.push(city);
        localStorage.setItem('cities', JSON.stringify(currentCities));
    }

    static deleteCity(city) {
        const currentCities = LStorage.getCities();
        const deleteIndex = currentCities.findIndex((item => item.id === city.id));
        currentCities.splice(deleteIndex, 1);
        localStorage.setItem('cities', JSON.stringify(currentCities));
        return true;
    }
}
