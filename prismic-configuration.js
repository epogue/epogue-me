module.exports = {

  apiEndpoint: 'https://epogue-me.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc, ctx) {
    if (doc.type == "homepage") return '/';
    if (doc.type == "project") return '/work/' + doc.uid;
    if (doc.type == "blog-post") return '/blog/' + doc.uid;
    return '/' + doc.uid;
  }
};
