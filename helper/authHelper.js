const bcrypt = require("bcrypt");

module.exports.bcryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

module.exports.comparePassword = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);

};