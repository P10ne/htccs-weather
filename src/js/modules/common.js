export default class Common {
    static doc = document;
    static w = window;

    static EVENT = {
        MAP_CARD_CLOSED_EVENT_NAME: 'MAP_CARD_CLOSED_EVENT_NAME',
        GET_LOCATION_ERROR_EVENT_NAME: 'GET_LOCATION_ERROR_EVENT_NAME',
        LOCATION_CHANGED_EVENT_NAME: 'LOCATION_CHANGED_EVENT_NAME',
        ACTIVE_CITY_CHANGED_EVENT_NAME: 'ACTIVE_CITY_CHANGED_EVENT_NAME',
        NEW_CITY_ADDED_EVENT_NAME: 'NEW_CITY_ADDED_EVENT_NAME',
        CITY_DELETED_EVENT_NAME: 'CITY_DELETED_EVENT_NAME',
        ON_CITY_ADDING_EVENT_NAME: 'ON_CITY_ADDING_EVENT_NAME' // При клике по кнопке "добавить город"
    };

    /* Classes */
    static CLASSES = {
        CONTAINER_DN_CLASS_NAME: 'container--dn' // display:none
    };
}
