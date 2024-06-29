import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,

  },
  profileImage: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    // required: true,
    indexedDB: false
  },
  image: {
    type: String,
  },
  addresses: String,
},{
  timestamps: true,
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;