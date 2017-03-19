var express = require('express')
var User = require('../models/user')
var router = express.Router()
var auth = require('../middlewares/auth')

router.get('/', auth, function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err
    res.json(users)
  })
})

router.get('/:id', auth, function (req, res) {
  User.findOne({_id: req.params.id}, function (err, user) {
    if (err) throw err
    res.json(user)
  })
})

// router.post('/', auth, function (req, res) {
// })

router.get('/setup', function (req, res) {
  var bcrypt = require('bcryptjs')

  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err

    bcrypt.hash('password', salt, function (err, hash) {
      if (err) throw err

      var user = new User({
        username: 'mark@firstcoders.co.uk',
        password: hash,
        roles: ['ROLE_ADMIN']
      })

      // save the sample user
      user.save(function (err) {
        if (err) throw err

        console.log('User saved successfully')
        res.json({ success: true })
      })
    })
  })
})

module.exports = router
