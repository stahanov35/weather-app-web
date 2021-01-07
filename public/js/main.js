const form = document.querySelector('form');
const search = document.querySelector('input');

const firstMessage = document.querySelector('#message1');
const secondMessage = document.querySelector('#message2');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    firstMessage.textContent = 'Loading...';
    secondMessage.textContent = '';
    firstMessage.textContent = location;

    if (!location) {
        console.error('No location provided');

        return;
    }

    getForecast(location).then(data => secondMessage.textContent = data.forecast || data.error);
})

function getForecast(location) {
    var errorMessage = { error: 'API request has failed.' };

    var url = `/weather?address=${location}`;
    try {
        return fetch(url).then(function (response) { return response.json(); });
    }
    catch (e) {
        console.error(e);
        return Promise.resolve(errorMessage);
    }
}