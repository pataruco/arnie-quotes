export default class Quote {
    constructor(data) {
        this.data = data;
    }

    get className() {
        return this.data.movie.toLowerCase().replace(/\s/g, '-');
    }

    get year() {
        return this.data.year;
    }

    get movie() {
        return this.data.movie;
    }

    get youTubeUrl() {
        return this.data.youtubeUrl;
    }

    get youTubeCode() {
        let url = this.data.youtubeUrl;
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    get quote() {
        return this.data.quote;
    }

    get character() {
        return this.data.character;
    }
}
