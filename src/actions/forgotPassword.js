import userSchema from '../models/users';
import sendEmail from './SendEmail';
import randomKey from './randomKey';

const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.match(re)) {
      return res.json({message: "Ups... not a valid email"})
    }

    const validateEmail = await userSchema.findOne({ "email": email })
    console.log(validateEmail)
    if (validateEmail) {
      const token = randomKey(5);
      validateEmail.resetCode = token;
      await validateEmail.save()

      const mailOptions = {
        from: 'marvelcomicsreactapp@gmail.com',
        to: email,
        subject: 'Password Reset!',
        html: `<p>You are reseting your password</p><a href="${process.env.APP_URL}/resetpassword/${token}/${validateEmail.email}"> Click Here... </a>`
      };
      
      sendEmail.sendMail(mailOptions, function(error, info){
        if (error) {
        return res.json({message: "Can't send email, submit again..."});
        } else {
          return res.json({message: "Email sent, check your inbox..."})
        }
      });

    } else {
      return res.json({message: "Email doesn't exist!"});
    }
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Something went very wrong",
    }) 
  }


};

export default forgotPassword