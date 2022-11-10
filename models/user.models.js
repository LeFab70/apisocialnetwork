const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

 // (str [{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}])
//const passwordValidator = require("password-validator");
/* const schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
 */
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: [true,"le pseudo doit etre unique"],
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true,"l'email doit etre unique"],
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate: [isStrongPassword],
      //validate:[isStrongPassword(str [{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}])],
      minLength: 8,
      max: 1024,
      maxLength: 55,
      trim: true,
    },
    biographie: {
      type: String,
      max: 1024,
    },
    picture: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  //schema.validate(this.password);
  const salt = await bycrypt.genSalt();
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model("user", userSchema);
