import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import signUp from './actions/signUp';
import users from './actions/users';
import signIn from './actions/signIn';
import me from './actions/me';


const app = express();
const port = 4000;

app.use(cors())

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

app.get('/me', me)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
