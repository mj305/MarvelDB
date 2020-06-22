import userSchema from '../models/users';

const users = async (req, res) => {
  try {
    const allUsers = await userSchema.find({})
    return res.json(allUsers)
  } catch (error) {
    return res.json({
      message: error,
    })
  }
  
}

export default users