import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";

const checkUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return false;
  }
  return true;
};

const Auth = async(req, res, next) => {
  try {
    const Authorization = req.headers.authorization;
    const cookieData = req.headers.cookie
      ? req.headers.cookie.split("=")[1]
      : null;
    const data = jwt.decode(
      cookieData ?? Authorization,
      process.env.SECRET_TOKEN
    );
    req.user = { UserId: data.UserId };
    if (await checkUser(data.UserId)){
        next();
    }
    else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default Auth;
