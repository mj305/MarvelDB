import jwt from "jsonwebtoken";

const privateKey = "!@#$%^&*()79452";


const me = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, privateKey);
        return res.json({message: user, auth: true});
        
      } catch (error) {
        return res.json({message: "you are not autenticated", auth: false}) 
      }

    } else {
      return res.json({message: "wrong token", auth: false})
    }
  } else {
    return res.json({message: "You are not logged in", auth: false})
  }
}

export default me


