const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors())
// production static route
app.use(express.static(path.join(__dirname, 'tbox-client/buid')));

app.get('/api/weather/:lon/:lat', (req,res) => {
    let lon = req.params.lon;
    let lat = req.params.lat;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.W_API_KEY}`)
        .then(response => response.json())
        .then(data => res.json(data));
    console.log(`weather api called! location: ${lon}, ${lat}`);
  });

// test route
app.get('/test', (req, res) => {
    res.send(`dash home, ${process.env.TEST_VAR || 'env file not here, nice!'}`);
});

app.listen(port, () => {
    console.log(`Live on port: ${port}`)
});