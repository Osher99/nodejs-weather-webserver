// requires
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Express
const app = express();

// Getting Port
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));


// GET Methods
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Osher Dror' 
    });
});

app.get('/weather', (req, res) => {
   if (!req.query.address) {
    res.send({
        error: 'Address was not provided'
    });
    return;
   }

   
geocode(req.query.address, (error, { latitude = 0, longtitude = 0, location = ''} = {}) =>{
    if (error || longtitude == 0 || latitude == 0) {
        res.send({
            error: error.toString()
        });
        return;
    } 
    forecast(latitude, longtitude,
         (error, {description, tempature}) => {
            if (error) {
                res.send({
                    error: error.toString()
                });
                 return;
             }

             res.send({
                forecast: 'The weather in ' + location + ' is ' + description + ' and the tempature is ' + tempature + ' Celsuis',
                location: location,
                address: req.query.address 
            });
          });
        });
    });

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Search was not provided in the query URL'
        });
        return;
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        description: 'Weather app built and running',
        name: 'Osher Dror'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        phoneNumber: '+972526540414',
        name: 'Osher Dror'
    });
});

app.get ('/weather', (req,res) => {
    res.send([{
        location: 'Osher',
        forecast: 28
    }, {
        location: 'Andrew',
        forecast: 27
    }]);
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Not found Page',
        name: 'Osher Dror',
        errorMessage: 'Help Page not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Not found Page',
        name: 'Osher Dror',
        errorMessage: 'Page not found'
    });
});

// Listen method
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});