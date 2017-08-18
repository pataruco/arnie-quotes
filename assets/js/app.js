
const contentful = require('contentful');
const SPACE_ID = '6t8um8649ku7';
const ACCESS_TOKEN = 'b1f8e5581b04e86e16d6ca876d41904c2c9f026c1ec806f246013e134a464c32';
const SPACE_NAME = 'vue-sandbox';

const client = contentful.createClient({
     // This is the space ID. A space is like a project folder in Contentful terms
     space: SPACE_ID,
     // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
     accessToken: ACCESS_TOKEN
})
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
client.getEntries()
     .then((response) => console.log(response.items))
     .catch(console.error)
