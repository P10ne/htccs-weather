import Handlebars from 'handlebars/dist/handlebars.min';
import bodyTemplate from './bodyTemplate';

export default class Body {
    constructor() {

    }

    render() {
        const res = Handlebars.compile('{{> body }}')();
        return res;
    }
}
