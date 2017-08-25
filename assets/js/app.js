const contentful = require('contentful');
const Vue = require('vue');
const SPACE_ID = '6t8um8649ku7';
const ACCESS_TOKEN = 'b1f8e5581b04e86e16d6ca876d41904c2c9f026c1ec806f246013e134a464c32';
const SPACE_NAME = 'vue-sandbox';
const mixitup = require('mixitup');
const Quote = require('./quote.js');

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: ACCESS_TOKEN
})

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
