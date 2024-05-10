import bcrypt from "bcrypt";
import mongoose from "mongoose";
// import Stuff from "./Item.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "seller",
    },
    // stuffs: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "stuff",
    //   },
    // ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: "avatar.svg",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// match password
UserSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

// Cascading deletion
UserSchema.pre("remove", async function (next) {
  await this.model("Stuff").deleteMany({ user: this._id });
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
