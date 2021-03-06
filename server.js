const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
})

const register =  require('./controllers/register');
const signin = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{res.send('it is working')})

app.post("/signin", (req, res) => { signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) });
app.put('/image', (req, res) => { image.handleImage(req, res, knex)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});


let port = process.env.PORT;
if(port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
  console.log('app is running on', port);
});
