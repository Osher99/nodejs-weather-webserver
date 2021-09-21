//DOM elements
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const clearButton = document.querySelector('.clearData');

// Submit weather form button
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const locationChosen = searchElement.value;

     if (locationChosen.length <= 3){
        messageOne.textContent = 'Search need to be more specific!';
     }

    const urlWeather = '/weather?address=' + locationChosen;

fetch(urlWeather).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            return;
        }

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    }).catch((err) => {
        messageOne.textContent = err;
    });
}).catch((err) => {
    messageOne.textContent = err;
});
});

// Clear button
clearData = (e) => {
    e.preventDefault();
    messageOne.textContent = '';
    messageTwo.textContent = '';
    searchElement.value = '';
};