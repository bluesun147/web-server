const request = require('request');

// const url1 = 'http://api.weatherstack.com/current?access_key=7a6b5de2e07356b5635da2f06d6495f2&query=37.8267,-122.4233';

// 첫번째: options object, 두번째: function to run
// request({url: url1, json: true}, (error, response) => { // 둘중 하나만. 하나는 null
//     // const data = JSON.parse(response.body); // json(lower)은 request 모듈의 옵션. 자동으로 parse하기 떄문에 이 코드 필요없음
//     if (error) { // low level error like no network connection
//         console.log('Unable to connect to weather service!');
//     }  else if (response.body.error) {
//         console.log('Unable to find location.');
//     } else {
//         const currD = response.body.current.temperature; // 현재 온도
//         const feelslikeD = response.body.current.feelslike; // 체감 온도
//         console.log(`${response.body.current.weather_descriptions[0]}, It is currently ${currD} degree, feels like ${feelslikeD} degree out.`);
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7a6b5de2e07356b5635da2f06d6495f2&query=${longitude},${latitude}`;

    // 첫번째: options object, 두번째: function to run
    request({url, json: true}, (error, {body} = {}) => { // 둘중 하나만. 하나는 null
        // const data = JSON.parse(response.body); // json(lower)은 request 모듈의 옵션. 자동으로 parse하기 떄문에 이 코드 필요없음
        if (error) { // low level error like no network connection
            callback('Unable to connect to weather service!', undefined);
        }  else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const currD = body.current.temperature; // 현재 온도
            const feelslikeD = body.current.feelslike; // 체감 온도
            callback(undefined, `${body.current.weather_descriptions[0]}, It is currently ${currD} degree, feels like ${feelslikeD} degree out.`);
        }
    })
}

module.exports = forecast;