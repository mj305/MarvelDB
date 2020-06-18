import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userSchema from './models/users';

const app = express()
const port = 4000
const users = [];

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
    const { name, email, password } = req.body

    const newUser = new userSchema({
      name, 
      email,
      password,
    })

  const result = await newUser.save()

  if(result ){
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

app.post('/signup', (req, res) => {
  res.json(users)
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



/* SIGN UP / LOGIN */
/* MONGO DB AS DATA STORE */
/* Once user is sing-in to account only sign out needs to show */


/* 
Name: 
email: (also used as username)
password: 
*/
