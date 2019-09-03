export default class Common {
    static doc = document;
    static w = window;

    /* Classes */
    static CONTAINER_DN_CLASS_NAME = 'container_dn';

    /* Event names */
    static LOCATION_CHANGED_EVENT_NAME = 'location_changed';
    static GET_LOCATION_ERROR_EVENT_NAME = 'get_location_error';
    static ACTIVE_CITY_CHANGED_EVENT_NAME = 'active_city_changed';
    static NEW_CITY_ADDED_EVENT_NAME = 'new_city_added';
    static CITY_DELETED_EVENT_NAME = 'city_deleted';
    static ON_CITY_ADDING_EVENT_NAME = 'on_city_adding';
    static MAP_CARD_CLOSED_EVENT_NAME = 'map_card_closed';
}
