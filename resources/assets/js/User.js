export default class User {

    constructor() {
        this.firstName = '',
        this.lastName = '',
        this.email = '',
        this.course = '',
        this.joined = ''
    }

    /**
     * Load the people in the localStorage is there are any of return an empty array
     *
     * @returns {Array}
     */
    loadPeople() {
        var json = JSON.parse(localStorage.getItem('TOUBU.people'));
        if (json !== null) {
            return json.length;
        } else {
            return [];``
        }
    }

}
