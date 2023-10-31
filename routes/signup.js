var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const uid2 = require('uid2');

const User = require('../models/users');

const { checkBody } = require('../modules/checkBody');
const { isStrongPassword } = require('../modules/passwordValidator');


// route to signup
router.post('/', async (req,res) => {
  if (!checkBody(req.body, ['username', 'password', 'city'])) {
    res.json({ result: false, error: 'missing or empty fileds'});
    return;
  };
    
  const { username, password, city } = req.body;  

  //check if password format is valid 
  if (!isStrongPassword(password)) {
    res.json({result: false, error: 'password format incomplete'});
    return;
  };
  
  //check is username already exist 
  User.findOne({ username })
  .then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      
        // user creation
        const newUser = new User({
          username,
          password: hash,
          city,
          token: uid2(32)
        })

        newUser.save()
        .then(newUser => {
          res.json({ result: true, token: newUser.token });
        });
    } else {
      // User already exists in database
      res.json({result: false, error: 'User already exists bro' });
      return;
    }
  })
})

module.exports = router;