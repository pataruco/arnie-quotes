const contentful = require('contentful');
const Vue = require('vue');
const SPACE_ID = '6t8um8649ku7';
const ACCESS_TOKEN = 'b1f8e5581b04e86e16d6ca876d41904c2c9f026c1ec806f246013e134a464c32';
const SPACE_NAME = 'vue-sandbox';

const client = contentful.createClient({
     // This is the space ID. A space is like a project folder in Contentful terms
     space: SPACE_ID,
     // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
     accessToken: ACCESS_TOKEN
})

const mixitup = require('mixitup');

window.onload = function ( ) {
     let quote = new Vue({
          el: '#app',
          data: {
               quotes: [ ]
          },
          methods: {
               getQuotes: function( ) {
                    client.getEntries()
                    .then( (response) => {
                         this.quotes = response.items;
                        //  this.getRandomQuote()
                        console.log(this.quotes[0].fields);
                    })
                    .catch(console.error)
               }
            //    getRandomQuote: function( ) {
            //         let quotesLength = this.quotes.length;
            //         let randomNumber = this.getRandomArbitrary( 0, quotesLength );
            //         return this.quote = this.quotes[randomNumber].fields;
            //    },
            //    getRandomArbitrary(min, max) {
            //         return Math.floor( Math.random() * (max - min) + min );
            //    }
          },
          beforeMount( ) {
               this.getQuotes( );
          }
     });
}
