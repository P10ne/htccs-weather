import './header.pcss';

const headerTemplate = require('./header.handlebars');
export default function header() {
    return {
        render: (container) => {
            container.innerHTML = headerTemplate();
        }
    }
}
