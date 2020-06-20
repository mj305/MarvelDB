import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userSchema from './models/users';

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

app.post('/signUp', async (req,res) => {

  try {
    const { name, email, password } = req.body;

    if (name === "") {
      return res.json({message: "Ups... need to enter a name"})
    } 
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.match(re)) {
      return res.json({message: "Ups... not a valid email"})
    }

    const validateEmail = await userSchema.findOne({ "email": email })
    if (validateEmail) {
      return res.json({message: "Email exists!"});
    }

    const pwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!password.match(pwd)) {
      return res.json({message: "Minimum eight characters, at least one letter, one number and one special character"});
    }
    
    const newUser = new userSchema({
      name,
      email,
      password,
    })

  const result = await newUser.save()

  if(result){
    return  res.json({ message: "Success... You're all Set" })
  } else {
    return res.json({
      message: "Ups"
    })
  }
  } catch (error) {
    console.log(error)
    return res.json({
      message: error,
    })
  } 
})

app.get('/users', async (req, res) => {
  try {
    const allUsers = await userSchema.find({})
    return res.json(allUsers)
  } catch (error) {
    return res.json({
      message: error,
    })
  }
  
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

/* 
June 21
Password Hashing
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
