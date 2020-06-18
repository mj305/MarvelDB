import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String, 
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

export default model("user", userSchema);

/* 
Name: 
email: (also used as username)
password: 
*/