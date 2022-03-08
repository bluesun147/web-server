const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmx1ZXN1bjE0NyIsImEiOiJjbDBlaTB0N3AwamhrM2RvOWc2enc4ZzRoIn0.BqMI625cyh-okAEmQ2linA&limit=1`;
    request({url, json: true}, (error, {body}) => { // const {body} = response. response 자리에 앞부분 넣은것. 원래는 request({url, json: true}, (error, response) => {
        if (error) {
            callback('No network connection!', undefined); // flexible하게 여러곳에서 사용하기 위해.
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0], // 위도
                longitude: body.features[0].center[1], // 경도
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;