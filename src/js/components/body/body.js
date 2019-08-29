import Handlebars from 'handlebars/dist/handlebars.min';
import bodyTemplate from './bodyTemplate';

export default class Body {
    constructor() {

    }

    render(data, container) {
        const res = Handlebars.compile('{{> body }}')(data);
        if (container) {
            container.innerHTML = res;
        } else {
            return res;
        }
    }
}
