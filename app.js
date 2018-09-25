const yargs = require('yargs')

const geocode = require('./geocode/geocode')

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
    }
})

