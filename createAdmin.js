const User = require("./models/User");
const bcrypt = require("bcrypt");
const createAdmin = async () => {
  try {
    let user = await User.findOne({ email: "admin@yopmail.com" });
    if (user) {
      console.log("User Updated Successfully...");
    } else {
      user = new User();
      user.firstName = "admin";
      user.lastName = "book";
      user.mobileNo = "346353";
      user.email = "admin@yopmail.com";
      let password = bcrypt.hashSync("123456", 10);
      user.password = password;
      user.userType = "admin";
      await user.save();
      console.log("User Created Successfully...");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAdmin;
