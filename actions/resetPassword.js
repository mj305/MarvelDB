import bcrypt from 'bcryptjs';
import userSchema from '../models/users';

const resetPassword = async (req, res) => {
  try {
      const {email, password, resetCode} = req.body
      const validToken = await userSchema.findOne({resetCode})
      if (!validToken) {
        return res.json({message: "wrong reset link"})
      }
      

    const validateEmail = await userSchema.findOne({ "email": email })
    if (validateEmail) {
      const hashedPassword = await bcrypt.hash(password, 12)

      validateEmail.resetcode = ""
      validateEmail.password = hashedPassword;
      await validateEmail.save()
      return res.json({message: "Successfully Reset..."})

    } else {
      return res.json({message: "Wront Email!"}); //REMEMBER TO CHANGE MESSAGE TO "Something Went Wrong..."
    }
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Something went very wrong",
    }) 
  }


};

export default resetPassword