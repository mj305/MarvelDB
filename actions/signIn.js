import userSchema from '../models/users';

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    /* If email && pswrd exist compare with the one in file */

    const checkEmailExist = await userSchema.findOne({ "email": email })
    if (!checkEmailExist) {
      return res.json({message: "Email exists!"});
    }

  } catch (error) {
    return res.json({message: "Ups... something went wrong!"})
  }
}

