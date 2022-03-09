const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);

const app = express();
const publicDirecPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

console.log(publicDirecPath);

// setup hbs engine and views location
app.set('view engine', 'hbs');
// define path for Express config
app.set('views', viewsPath);

hbs.registerPartials(partialsPath); // partial 사용하기 위해

// setup static directory to serve
app.use(express.static(publicDirecPath));

app.get('', (req, res) => { // root. 처음 페이지
    res.render('index', {
        title: 'Weather',
        name: 'Chan',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chan',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Chan'
    })
})

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide address!'
//         }) 
//     }
//     res.send({
//         forecast: 'sunny',
//         location: 'Seoul',
//         address: req.query.address
//     });
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address!'
        }) 
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => { // {} is empty object default value.
        if (error) {
            return res.send({error}) // 원래 error: error인데 이름 같아서 short hand
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    //error: 'You must provide address!'
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location, // location: location,
                address: req.query.address + "(내가 query string으로 입력한 값)"
            });
        })
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        error: 'Help article not found.',
        name: 'Chan',
    });
})

app.get('*', (req, res) => { // * : 제외한 전부. 마지막에 와야 함.
    res.render('404', {
        title: '404',
        error: 'Page not found.',
        name: 'Chan',
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.');
})

// app.com
// app.com/help
// app.com/about
// have one domain, all run on single express server.
// multiple routes.