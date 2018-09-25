const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const args = yargs
        .options({
            'a': {
                alias: 'address',
                describe: 'Address to fetch weather for',
                demand: true,
                string: true
            },
            'u': {
                alias: 'unit',
                describe: 'Unit that you wish to use',
                default: 'C'
            }
        })
        .help()
        .alias('help', 'h')
        .argv

geocode.geocodeAddress(args.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(result.address)
        weather.getWeather(result.lat, result.lng, args.unit, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(`It's currently ${weatherResult.temperature} ${args.unit}. It feels like ${weatherResult.apparentTemperature} ${args.unit}`)
            }
        })
    }
})

