const bcrypt = require("bcrypt");

async function saltPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function comparePassword(textPassword, hash) {
  return bcrypt.compare(textPassword, hash);
}

module.exports = { saltPassword, comparePassword };
