const request = require('request')

var convert = (temperature, unit) => {
    switch (unit) {
        case 'F':
            return temperature
            break;
        case 'C':
            return convertToCelcius(temperature)
            break;
        case 'K':
            return convertToKelvin(temperature)
            break;
    }
}

var convertToCelcius = (temperature) => {
    return (temperature - 32) / 1.8
}

var convertToKelvin = (temperature) => {
    return (temperature + 459.67) * (5/9)
}

var getWeather = (lat, lng, unit, callback) => {
    request({
        url: `https://api.darksky.net/forecast/bcaf6ec56028331d27a2b7a32b4dcece/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback(`Unable to connect forecast.io servers...`)
        } else if (body.code === 400) {
            callback('Invalid address...')
        } else if (response.statusCode === 200) {
            callback(undefined, { 
                temperature: convert(body.currently.temperature, unit),
                apparentTemperature: convert(body.currently.apparentTemperature, unit)
            })
        } else {
            console.log(`Unable to fetch weather.`)
        }
    })
}

module.exports.getWeather = getWeather