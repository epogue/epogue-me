const express = require("express");
const next = require("next");
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

app.prepare().then(() => {
  const server = express();

  // Force SSL
  server.use(function(req, res, next) {
    const reqIsSecure = req.get("X-Forwarded-Proto") === "https";
    if (!reqIsSecure && prod) {
      res.redirect(`https://${req.hostname}${req.url}`);
    } else {
      next();
    }
  });

  server.get("/", (req, res) => {
    return renderAndCache(req, res, '/');
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (prod) {
    if (ssrCache.has(key)) {
      console.log(`CACHE HIT: ${key}`)
      res.send(ssrCache.get(key))
      return
    }
  }

  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      if (prod) { 
        console.log(`CACHE MISS: ${key}`);
        ssrCache.set(key, html)
      }

      res.send(html)
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}
