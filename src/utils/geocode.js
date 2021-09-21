const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3NoZXJkMjUiLCJhIjoiY2t0Z3l2dDAyMG16ajJubXVkdHpmOTZtbiJ9.4bTsGY8JY_K_g8p40NUmJQ&limit=1'

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location sevices');
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search');
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[0],
                longtitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            });
        }
    });

}

module.exports = geocode;