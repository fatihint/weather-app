const request = require('request')

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address)

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAN_A5kXWlUvAozVsYNTUs18LcQlGpwkE4`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect Google servers...')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to locate the address...')
        } else {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
            })
        }
    })
}

module.exports.geocodeAddress = geocodeAddress
