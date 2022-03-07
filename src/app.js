const path = require('path');
const express = require('express');

console.log(__dirname);

const app = express();
const publicDirecPath = path.join(__dirname, '../public');
console.log(publicDirecPath);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(publicDirecPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'eric',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'eric',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!',
        name: 'eric',
    })
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'eric',
        age: 24
    }, {
        name: 'tom',
        age: 30
    }]);
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