const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;



function encrypt(plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
      if (err) { reject(err); }
      resolve(hash);
    });
  });
}

function compare(myPlaintextPassword, hash) {
  return new  Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      resolve(result); 
    });
  } )
 
}

const  sign = (username) => {
  const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
  const token =   jwt.sign({username}, privateKey, { algorithm: 'RS256'});
  return token; 
}

const verify = (token) => {
  const publicKey = fs.readFileSync(path.join(__dirname,'../keys/rsa_public_key.pem' )); 
  const result =  jwt.verify(token, publicKey); 
  return result
}

module.exports = {
  encrypt,
  compare, 
  sign, 
  verify 
};
