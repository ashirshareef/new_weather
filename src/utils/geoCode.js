const request=require('../../node_modules/request');

const geoCode = (city, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?limit=1&access_token=pk.eyJ1IjoiYXNoaXJzIiwiYSI6ImNqdTlkMjByYzI3Y3QzeXRheDh5enV2N3cifQ.Ed5OxzZ12w2cRrBWvsYxmg`;
    //console.log(geocodeUrl);
    request({url: geocodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect to box map api', undefined);

        } else if (response.body.features.length === 0) {
            callback('Unable to find location.Try another search.', undefined);

        } else {
            let city = {};
            city.latitude = response.body.features[0].center[0];
            city.longitude = response.body.features[0].center[1];
            city.placeName = response.body.features[0].place_name;
            callback(undefined, city);
        }
    });
};

module.exports=geoCode;
