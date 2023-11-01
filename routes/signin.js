var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/users');

const { checkBody } = require('../modules/checkBody');
const { isStrongPassword } = require('../modules/passwordValidator');


// route to signin
router.post('/', async (req,res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'missing or empty fileds'});
    return;
  };
    
  const { username, password } = req.body;  

  //check if password format is valid 
  if (!isStrongPassword(password)) {
    res.json({result: false, error: 'password format incomplete'});
    return;
  };
  
  //check is username already exist 
  User.findOne({ username })
  .then(data => { 
    if (data && bcrypt.compareSync(password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      // password or email not correct 
      res.json({result: false, error: 'email or password incorrect' });
      return;
    }
  })
})

module.exports = router;