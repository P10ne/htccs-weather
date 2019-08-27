const bodyTemplate = require('./body.handlebars');

export default function body() {
    return {
        render: (container) => {
            const result = bodyTemplate();
            if (container) {
                container.innerHTML = result;
            } else {
                return result;
            }

            console.log('body rendered');
        }
    }
}
