import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";



const checkUserAlreadyExist = async(data) =>{
  const user =  await UserModel.findOne({$or: [{email: data.email},{ phoneNumber: data.phoneNumber}]})
  return user ? true : false;
}

const userSignUp = async (req, res) => {
    try {
      const { userName, password, phoneNumber, email, image } = req.body;
  
      if (!userName || !password || !phoneNumber || !email) {
        return res.status(400).json({ error: "Add complete Details" });
      }
  
      const Salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, Salt);
      if( await checkUserAlreadyExist({email, phoneNumber})){
      return res.status(400).json({ error: "User Alreadty Exist" });
      }
      const user = await UserModel.create({
        userName: userName,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        email: email,
        image: image,
      });
      if (user) {
        const jwtToken = jwt.sign(
          { UserId: user._id },
          process.env.SECRET_TOKEN,
          {
            expiresIn: "30d",
          }
        );
        res.cookie("jwt", jwtToken);
        return res.status(200).json({
          data: {
            _id: user._id,
            userName: user.name,
            email: user.email,
            image: user.image,
            token: jwtToken,
          },
        });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Enter correct email address and password" });
      }
      const cmpPassword = await bcrypt.compare(password, user.password);
      if (cmpPassword) {
        const jwtToken = jwt.sign(
          { UserId: user._id },
          process.env.SECRET_TOKEN,
          {
            expiresIn: "30d",
          }
        );
        res.cookie("jwt", jwtToken);
  
        return res.status(200).json({
          data: {
            _id: user._id,
            email: user.email,
            token: jwtToken,
          },
        });
      } else {
        return res.status(400).json({
          error: "Invalid credentials",
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  export {
    userSignUp, userLogin
  }