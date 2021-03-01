const bcrypt = require("bcrypt");
const saltRounds = 10;

function encrypt(plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
      if (err) { reject(err); }
      resolve(hash);
    });
  });
}

module.exports = {
  encrypt,
};
