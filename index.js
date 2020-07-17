const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// for development only
const dotenv = require('dotenv');
dotenv.config();

// production static route
// app.use(express.static(path.join(__dirname, 'tbox-client/buid')))

app.get('/', (req, res) => {
    res.send(`dash home, ${process.env.TEST_VAR || 'env file not here, nice!'}`)
})

app.get('/test', (req,res) => {
    res.send('this will be a cool dashboard')
})

app.listen(port, () => {
    console.log(`Live on port: ${port}`)
})