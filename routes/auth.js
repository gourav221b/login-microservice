const User = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            }
        )
        const user = await newUser.save();
        res.status(200).json({ user: user, message: "User registered successfully" });
        console.log(user)

    }

    catch (err) {
        res.status(500).json({ message: err })
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.username, req.body.password)
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(400).json({ message: 'Wrong credentials!' })
        const validated = await bcrypt.compare(req.body.password, user.password);
        // const validated = await (req.body.password===user.password);
        !validated && res.status(400).json({ message: 'Wrong credentials' });

        let { password, ...others } = user._doc
        validated && res.status(200).json({ message: "Log in successful", user: others })

    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;