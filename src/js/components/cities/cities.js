import './cities.pcss';

const citiesTemplate = require('./cities.handlebars');

export default function cities() {
    function getCities() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        return {
            cities: cities
        };
    }

    return {
        render: (container) => {
            const result = citiesTemplate( getCities() );
            if (container) {
                container.innerHTML = result;
            } else {
                return result;
            }

            console.log('Cities rendered');
        }
    }
}
