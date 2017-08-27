const contentful = require('contentful');
const Vue = require('vue');
const SPACE_ID = '6t8um8649ku7';
const ACCESS_TOKEN = 'b1f8e5581b04e86e16d6ca876d41904c2c9f026c1ec806f246013e134a464c32';
const SPACE_NAME = 'vue-sandbox';
const mixitup = require('mixitup');
import Quote from './quote.js';
import Movie from './movie.js';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: ACCESS_TOKEN
})

let mixer;
window.onload = function() {
    let quote = new Vue({
        el: '#app',
        data: {
            quotes: [],
            movies: [],
            filtersIsActive: false
        },
        methods: {
            getQuotes: function() {
                client.getEntries()
                    .then((response) => {
                        this.setQuotes(response.items)
                        this.setMovies(response.items)
                    })
                    .catch(console.error)
            },
            setMovies: function(quotes) {
                let movies = [ ];
                for ( quote of quotes ) {
                    let movie = quote.fields.movie;
                    if ( !movies.includes( movie ) ) {
                        movies.push(movie)
                    }
                }
                return this.movies = movies.map( ( movieName ) => {
                    return new Movie( movieName );
                });
            },
            setQuotes: function(rawQuotes) {
                return this.quotes = rawQuotes.map((quote) => {
                    return new Quote(quote.fields);
                });
            },
            sortBy: function( sortOrder) {
                console.log( sortOrder );
                let order = `order:${sortOrder}`;
                mixer.sort( order )
            },
            filterBy: function( filter ) {
                if ( filter === 'all') {
                    return mixer.filter( filter );
                }
                let movieFilter = `.${filter}`;
                if ( mixer ) {
                    mixer.filter( movieFilter )
                }
                this.filtersIsActive = false;
            },
            showFilters: function ( ) {
                this.filtersIsActive = !this.filtersIsActive;
            }
        },
        beforeMount() {
            this.getQuotes();
        },
        updated() {
            mixer = mixitup('#js-container', {
                animation: {
                    effects: 'fade rotateY(-180deg)',
                    duration: 700
                }
            });
        }
    });
}
