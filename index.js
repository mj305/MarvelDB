import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import signUp from './actions/signUp';
import users from './actions/users';
import signIn from './actions/signIn';


const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://mariab:monotono23@cluster0-mcj2c.mongodb.net/marveldb?retryWrites=true&w=majority', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/signUp', signUp)

app.post('/signIn', signIn)

app.get('/users', users)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

/* 
Login-in and getting jwt (auth) token
*/

/* SIGN UP / LOGIN */
/* MONGO DB AS DATA STORE */
/* Once user is sing-in to account only sign out needs to show */


/* 
Name: 
email: (also used as username)
password: 
*/
