import bcrypt from 'bcryptjs';
import userSchema from '../models/users';


const signUp = async (req,res) => {

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

    const hashedPassword = await bcrypt.hash(password, 12)
    
    const newUser = new userSchema({
      name,
      email,
      password: hashedPassword,
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
}



export default signUp