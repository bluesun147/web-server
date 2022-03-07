const path = require('path');
const express = require('express');
const hbs = require('hbs');

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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'sunny',
        location: 'Seoul'
    });
})

app.listen(3000, () => {
    console.log('server is up on port 3000.');
})

// app.com
// app.com/help
// app.com/about
// have one domain, all run on single express server.
// multiple routes.