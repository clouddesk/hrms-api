const request = require('request');
const config = require('config');

exports.getLocationMap = async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const key = config.get('googleMapsApiKey');

  const zoom = 17;
  const size = '700x250';
  const maptype = 'hybrid';
  const region = 'ge';

  url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&maptype=${maptype}&${region}&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${key}`;

  request.get(url, { encoding: null, json: false }, (error, response, body) => {
    // data = "data:" + response.headers["content-type"] + ";base64," + new Buffer.from(body, 'binary').toString('base64');
    data = new Buffer.from(body, 'binary').toString('base64');
    res.json(data);
  });

};
