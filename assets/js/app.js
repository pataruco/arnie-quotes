const contentful = require('contentful');
const Vue = require('vue');
const SPACE_ID = '6t8um8649ku7';
const ACCESS_TOKEN = 'b1f8e5581b04e86e16d6ca876d41904c2c9f026c1ec806f246013e134a464c32';
const SPACE_NAME = 'vue-sandbox';
const mixitup = require('mixitup');

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: ACCESS_TOKEN
})

class Quote {
    constructor( data ) {
        this.data = data;
    }

    get className( ) {
        return this.data.movie.toLowerCase().replace(/\s/g, '-');
    }

    get year( ) {
        return this.data.year;
    }

    get movie( ) {
        return this.data.movie;
    }

    get youTubeUrl( ) {
        return this.data.youtubeUrl;
    }

    get youTubeCode( ) {
        let url = this.data.youtubeUrl;
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    get quote( ) {
        return this.data.quote;
    }

    get character( ) {
        return this.data.character;
    }
}


let mixer;
window.onload = function ( ) {
    let quote = new Vue({
        el: '#app',
        data: {
            quotes: [ ],
            movies: [ ]
        },
        methods: {
            getQuotes: function( ) {
                client.getEntries()
                .then( (response) => {
                    // this.quotes = response.items;
                    // this.setMovies( this.quotes )
                    this.setQuotes( response.items )
                })
                .catch(console.error)
            },
            filterBy: function ( quoteCharacter ) {
                let character = `.${quoteCharacter}`;
                console.log(character );
                mixer.filter( `.${quoteCharacter}` )
            },
            setMovies: function ( quotes ) {
                let allMovies = quotes.map( ( quote ) => {
                    return quote.fields.movie.toLowerCase().replace(/\s/g, '-');
                });
            },
            setQuotes: function ( rawQuotes ) {
                let quotes = rawQuotes.map( ( rawQuoute ) => {
                    return new Quote( rawQuoute.fields );
                });
                this.quotes = quotes;
            }
        },
        beforeMount( ) {
            this.getQuotes( );
        },
        updated( ) {
            mixer = mixitup('#js-container', {
                animation: {
                    effects: 'fade rotateZ(-180deg)',
                    duration: 700
                }
            });
        }
    });
}
