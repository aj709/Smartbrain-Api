const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'gm201000',
		database : 'smartbrain'
	}
});



app.use(express.json());
app.use(cors());


app.post('/signin',(req,res)=>{ signin.handleSignin(req,res,db,bcrypt) });
app.post('/register', (req,res)=>{ register.handleRegister(req,res,db,bcrypt) } );
app.get('/profile/:id',(req,res)=>{ profile.handleProfileGet(req,res,db) });
app.put('/images',(req,res)=>{ image.handleImage(req,res,db) });
app.post('/imageurl',(req,res)=>{ image.handleApiCall(req,res) });

app.listen(3000,()=>{
	console.log("Working on 3000");
});