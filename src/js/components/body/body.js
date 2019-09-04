import bodyTemplate from './bodyTemplate';

export default class Body {
    render() {
        const res = Handlebars.compile('{{> body }}')();
        return res;
    }
}
