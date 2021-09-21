const request = require('request');



const forecast = (lat, long, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + long + '&appid=c49cfd152da95bc3e5713872af5d6025&units=metric';

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
           callback('unable to connect to forecast services');
        } else if (body.error) {
            callback('unable to find location');
        } else {
            if (!body || !body.weather){
                callback('unable to find location');
            }
            callback(undefined, {
                description: body.weather[0].main,
                tempature: Math.round(body.main.temp),
                windSpeed: body.wind.speed,
                windDegree: body.wind.deg
            });
        }
    })
}

module.exports = forecast;