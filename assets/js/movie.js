export default class Movie {
    constructor(data) {
        this.data = data;
    }

    get name( ) {
        return this.data;;
    }

    get filter( ) {
        return this.data.toLowerCase().replace(/\s/g, '-');
    }
}
