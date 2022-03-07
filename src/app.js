const path = require('path');
const express = require('express');

console.log(__dirname);

const app = express();
const publicDirecPath = path.join(__dirname, '../public');
console.log(publicDirecPath);

app.use(express.static(publicDirecPath));

app.get('/help', (req, res) => {
    res.send([{
        name: 'eric',
        age: 24
    }, {
        name: 'tom',
        age: 30
    }]);
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About page!</h1>');
// }) 

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