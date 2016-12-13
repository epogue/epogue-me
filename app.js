/**
 * Module dependencies.
 */
var Prismic = require('prismic-nodejs');
var app = require('./config');
var PORT = app.get('port');
var PConfig = require('./prismic-configuration');
var request = require('request');

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send('404 not found');
  } else {
    res.status(500).send('Error 500: ' + err.message);
  }
}

function render404(req, res) {
  res.status(404).render('not-found');
}

function getProjects(api, callback) {
  return api.query(Prismic.Predicates.at('document.type', 'project'),
                   { pageSize: 40, orderings: '[my.project.date desc]' });
}

app.listen(PORT, function() {
  const repoEndpoint = PConfig.apiEndpoint.replace('/api', '');
  request.post(repoEndpoint + '/app/settings/onboarding/run', {});
  console.log('Point your browser to: http://localhost:' + PORT);
});

/**
* initialize prismic context and api
*/
function api(req, res) {
  res.locals.ctx = { // So we can use this information in the views
    endpoint: PConfig.apiEndpoint,
    linkResolver: PConfig.linkResolver
  };
  return Prismic.api(PConfig.apiEndpoint, {
    accessToken: PConfig.accessToken,
    req: req
  });
}

// INSERT YOUR ROUTES HERE

/**
* preconfigured prismic preview
*/
app.get('/', function(req, res) {
  api(req, res).then(function(api) {
    api.getByUID('homepage', 'homepage').then(function(pageContent) {
      getProjects(api).then(function(projects) {
        res.render('homepage', {
          pageContent: pageContent,
          projects: projects.results
        });
      }).catch(function(err) {
        handleError(err, req, res);
      });
    }).catch(function(err) {
      handleError(err, req, res);
    });
  });
});

app.get('/preview', function(req, res) {
  api(req, res).then(function(api) {
    return Prismic.preview(api, PConfig.linkResolver, req, res);
  }).catch(function(err) {
    handleError(err, req, res);
  });
});

app.get('/work/:uid', function(req, res) {
  var uid = req.params.uid;

  api(req, res).then(function(api) {
    api.getByUID('project', uid).then(function(pageContent) {
      getProjects(api).then(function(projects) {
        res.render('project', {
          pageContent: pageContent,
          projects: projects.results
        });
      }).catch(function(err) {
        handleError(err, req, res);
      });
    }).catch(function(err) {
      handleError(err, req, res);
    });
  });
});


app.get('/:uid', function(req, res) {
  var uid = req.params.uid;

  api(req, res).then(function(api) {
    return api.getByUID(uid, uid);
  }).then(function(pageContent) {
    res.render(uid, {
      pageContent: pageContent
    });
  }).catch(function(err) {
    handleError(err, req, res);
  })
});

app.get('*', function(req, res) {
  render404(req, res);
});
