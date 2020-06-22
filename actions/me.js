import jwt from "jsonwebtoken";

const privateKey = "!@#$%^&*()79452";


const me = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, privateKey);
        return res.json({message: user});
        
      } catch (error) {
        return res.json({message: "you are not autenticated"}) 
      }

    } else {
      return res.json({message: "wrong token"})
    }
  } else {
    return res.json({message: "You are not logged in"})
  }
}

export default me


