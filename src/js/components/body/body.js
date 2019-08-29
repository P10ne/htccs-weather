import Handlebars from 'handlebars/dist/handlebars.min';
import bodyTemplate from './bodyTemplate';

export default function body() {
    return {
        render: (data, container) => {
            const res = Handlebars.compile('{{> body }}')(data);
            if (container) {
                container.innerHTML = res;
            } else {
                return res;
            }
        }
    }
}
