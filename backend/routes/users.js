const router = require('express').Router();
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, body, validationResult} = require('express-validator')
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',body('email').isEmail(), body("username").isLength({ min: 5 }), check('password', 'password min length is 5 symbols').isLength({ min: 5 }), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array(), message: 'something not valid' });
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 12);  
  const condidate = await User.findOne({email});
  if(condidate){
    return res.status(400).json({message : 'email is alredy registred'})
  }
  const newUser = new User({username, email, password: hashPassword});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login/auth',body('email').isEmail(), check('password', 'min length is 5 symbols').isLength({ min: 5 }), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array(), message: 'something not valid' });
  }


 
  const email = req.body.email;
  const password = req.body.password;
  // const hashPassword = await bcrypt.hash(password, 12);  
  const condidate = await User.findOne({email});
  if(!condidate){
    return res.status(400).json({message : 'email is not registred'})
  }
  const isMatch = await bcrypt.compare(password, condidate.password);
  if(!isMatch){
    return res.status(400).json({message : 'password not '})
  }
const token = jwt.sign(
  {userId :condidate.id},
  'secret',
  {expiresIn: '1h'}
)
res.json({token, userId :condidate.id})
  
});

module.exports = router;