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
app.use(express.static(path.join(__dirname, 'tbox-client/build')));
// parse JSON body
app.use(express.json());

// Database

const knex = require('knex');
const pg = require('knex')(({
    client: 'pg',
    connection: process.env.DATABASE_URL
}))

// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();

// login
app.post('/db/login', (req,res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    pg.from('u_table')
    .select('u_name').where({
        u_email : `${email}`,
        u_pass : `${pass}`
    })
    .then(data => res.send(data[0].u_name))
    .catch(err => {
        res.status(400).send({'error': 'please check your login details'});
        // throw err;
    });
});

// signup
app.post('/db/signup', (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    // check if exists, then insert
    pg.from('u_table')
    .select('u_name')
    .where({u_email: `${email}`})
    .then(precheck => {
        if (precheck.length === 0) {
            pg('u_table')
            .insert({
                u_name: `${name}`,
                u_email: `${email}`,
                u_pass: `${pass}`
            })
            .then(res.send(`${name} added!`));
        } else {
            res.status(409).send({'error': 'email already used'});
        };
    });
});

// add task
app.post('/db/nutask', (req,res) => {
    let task = req.body.task;
    let desc = req.body.desc;
    let uid = req.body.uid;
    pg('t_table')
    .insert({
        t_name: `${task}`,
        t_desc: `${desc}`,
        t_user: `${uid}`
    })
    .then(res.send(`task added!`))
    .catch(err => {
        res.status(500).send({'error': 'something went wrong'});
        throw err;
    });
});

// update task desc
app.post('/db/desc', (req,res) => {
    let desc = req.body.desc;
    let tid = req.body.tid;
    pg('t_table')
    .where({t_id: `${tid}`})
    .update({t_desc: `${desc}`})
    .then(res.send('task updated!'))
    .catch(err => {
        res.status(500).send({'error': 'description could not be updated'});
        throw err;
    });
});

// set task complete
app.post('/db/comp', (req,res) => {
    let tid = req.body.tid;
    pg('t_table')
    .where({t_id: `${tid}`})
    .select('t_comp')
    .then(data => {
        // let comp = !data[0].t_comp;
        pg('t_table')
        .where({t_id: `${tid}`})
        .update({t_comp: !data[0].t_comp})
        .then(res.send('task status changed!'))
        .catch(err => {
            res.status(500).send({'error': 'status could not be changed'});
            throw err;
        });
    });
})





// API routes

//  weather fetch
app.get('/api/weather/:lon/:lat', (req,res) => {
    let lon = req.params.lon;
    let lat = req.params.lat;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.W_API_KEY}`)
        .then(response => response.json())
        .then(data => res.json(data));
    console.log(`weather api called! location: ${lon}, ${lat}`);
  });

// news fetch
app.get('/api/news', (req,res) => {
    fetch('http://feeds.bbci.co.uk/news/rss.xml')
    .then(response => response.text())
    // .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => res.send(data));
});

// article fetch
app.get('/api/scrape/:url', (req, res) => {
    let url = req.params.url;
    fetch(`https://www.bbc.co.uk/news/${url}`)
    .then(data => data.text())
    .then(response => res.send(response));
});

// test route
app.get('/test', (req, res) => {
    res.send(`dash home, ${process.env.TEST_VAR || 'env file not here, nice!'}`);
});

app.listen(port, () => {
    console.log(`Live on port: ${port}`)
});