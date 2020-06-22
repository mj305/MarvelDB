import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userSchema from '../models/users';

const privateKey = "!@#$%^&*()79452"

const signIn = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ "email": email })

      if (email === "" || password === "") {
        return res.json({message: "Email or Password missing."})
      }

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!email.match(re)) {
        return res.json({message: "Ups... not a valid email"})
      }

      const pwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      if (!password.match(pwd)) {
        return res.json({message: "Minimum eight characters, at least one letter, one number and one special character"});
      }

      if (!user) {
        return res.json({message: "No account with that email... Please Sign Up!"});
      }
      
      const matchedPassword = await bcrypt.compare(password, user.password)
       if (!matchedPassword) {
         return res.json ({message: "Your PSWRD is FULL OF BS"})
       } else {
        const token = jwt.sign({ email: user.email, name: user.name }, privateKey);
        console.log(token)
        return res.json ({message: token})
       }
      
  } catch (error) {
    console.log(error)
    return res.json({message: "Something went wrong!"})
  }
}
  
export default signIn    




