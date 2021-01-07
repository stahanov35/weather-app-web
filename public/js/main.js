console.log('Frontend js script');
const form = document.querySelector('form');
const search = document.querySelector('input');

const firstMessage = document.querySelector('#message1');
const secondMessage = document.querySelector('#message2');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    firstMessage.textContent = location;

    if (!location) {
        console.error('No location provided');

        return;
    }

    getForecast(location).then(data => secondMessage.textContent = data.forecast || data.error);
})

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