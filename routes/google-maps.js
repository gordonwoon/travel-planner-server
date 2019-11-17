const keys = require('../config/keys');
const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleAPIKey,
  Promise: Promise
});

module.exports = app => {
  app.get(
    '/google/places',
    (req, res) => {
      googleMapsClient.places({ query: req.query.query })
        .asPromise()
        .then((response) => {
          res.json(response.json.results)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
};
