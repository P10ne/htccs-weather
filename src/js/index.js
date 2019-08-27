import '../css/index.pcss';
import cities from "./components/cities/cities";
import header from "./components/header/header";
import body from "./components/body/body";

(function init() {
    const doc = document;
    Handlebars.registerPartial('header');
    const body = body().render();
    document.body.prepend(body);
    /*
    doc.addEventListener('DOMContentLoaded', () => {
        cities().render(document.querySelector('.cities'));
    });
     */
})();
