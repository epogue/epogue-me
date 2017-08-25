const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Force SSL
  server.use(function(req, res, next) {
    const reqIsSecure = req.get("X-Forwarded-Proto") === "https";
    if (!reqIsSecure && process.env.NODE_ENV === "production") {
      res.redirect(`https://${req.hostname}${req.url}`);
    } else {
      next();
    }
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