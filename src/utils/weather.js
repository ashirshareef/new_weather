const request=require('../../node_modules/request');

const weather=(city,callback)=>{
    const url = `https://api.darksky.net/forecast/a295ec6220913371099f0dc8c94f47ff/${city.longitude},${city.latitude}?units=si`;
    //console.log(url);
    request({url: url, json: true}, (error, response) => {

        if (error) {
            callback('unable to connect to weather api',undefined,undefined)

        } else if (response.body.error) {
            callback('Unable to fetch weather details for this location.Try another search.',undefined,undefined);

        } else {
            //console.log(response);
            callback(undefined,response,city.placeName);

        }

    });
};

module.exports=weather;
