"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isForecastError = exports.getForecast = void 0;
var request = require('postman-request');
var fetch = require('node-fetch');
function getForecast(location) {
    var errorMessage = { error: 'API request has failed.' };
    if (!location) {
        return Promise.resolve(errorMessage);
    }
    var url = "http://api.weatherstack.com/current?access_key=e64cd630d96d952107ecd3d2609d3b78&query=" + location;
    try {
        return fetch(url).then(function (response) { return response.json(); })
            .then(function (data) {
            var error = data.error;
            if (error && error.code === 615) {
                return {
                    error: 'API request has failed.'
                };
            }
            var current = data.current;
            debugger;
            return {
                forecast: current.weather_descriptions[0] + ". It is curently " + current.temperature + " \n                        degress out. It feels like " + current.feelslike + " degress out."
            };
        });
    }
    catch (e) {
        console.error(e);
        return Promise.resolve(errorMessage);
    }
}
exports.getForecast = getForecast;
function isForecastError(data) {
    return data.error !== undefined;
}
exports.isForecastError = isForecastError;
//# sourceMappingURL=forecast.js.map