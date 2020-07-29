import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import forgotPassword from './actions/forgotPassword';
import resetPassword from './actions/resetPassword';
import signUp from './actions/signUp';
import users from './actions/users';
import signIn from './actions/signIn';
import me from './actions/me';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/forgotpassword', forgotPassword)

app.post('/resetpassword', resetPassword)

app.post('/signUp', signUp)

app.post('/signIn', signIn)

app.get('/users', users)

app.get('/me', me)

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
