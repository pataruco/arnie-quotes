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


// window.onload = function ( ) {
//     let quote = new Vue({
//         el: '#app',
//         data: {
//             quotes: [ ],
//             characters: [ ]
//         },
//         methods: {
//             getQuotes: function( ) {
//                 client.getEntries()
//                 .then( (response) => {
//                     this.quotes = response.items;
//                     this.setCharacters( this.quotes )
//                 })
//                 .catch(console.error)
//             },
//             filterBy: function ( quoteCharacter ) {
//                 mixer.filter( `.${quoteCharacter}` )
//             },
//             setCharacters: function ( quotes ) {
//                 let allCharacters = quotes.map( ( quote ) => {
//                     return quote.fields.character;
//                 });
//                 let selectedCharacters = [ ];
//
//                 for ( character of allCharacters ) {
//                     if (  !selectedCharacters.includes( character ) ) {
//                         selectedCharacters.push( character )
//                     }
//                 }
//                 this.characters = selectedCharacters;
//
//             }
//         },
//         beforeMount( ) {
//             this.getQuotes( );
//         },
//           mounted( ) {
//               mixitup('#js-container', {
//                 // load: {
//                 //   sort: 'order:asc'
//                 // },
//                   animation: {
//                   effects: 'fade rotateZ(-180deg)',
//                   duration: 700
//                 },
//                 classNames: {
//                   block: 'filters',
//                   elementFilter: 'filter-btn'
//                 },
//                 selectors: {
//                   target: '.mix-target'
//                 }
//               });
//           }
//     });
// }

window.onload = function( ) {
        let quote = new Vue({
            el: '#app',
            mounted( ) {
                mixitup('#mix-wrapper', {
                  load: {
                  	sort: 'order:asc'
                  },
                	animation: {
                    effects: 'fade rotateZ(-180deg)',
                    duration: 700
                  },
                  classNames: {
                    block: 'programs',
                    elementFilter: 'filter-btn',
                    elementSort: 'sort-btn'
                  },
                  selectors: {
                    target: '.mix-target'
                  }
                });
            }
        });
}
