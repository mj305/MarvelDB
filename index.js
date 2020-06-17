import express from 'express';
import bodyParser from 'body-parser';

const app = express()
const port = 4000
const users = [];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/signUp', (req,res) => {
  const { name, email, password } = req.body

  users.push({
    name,
    email,
    password,
  })

  res.json({
    message: "Success... You're all Set"
  })
})

app.get('/users', (req, res) => {
  res.json(users)
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
