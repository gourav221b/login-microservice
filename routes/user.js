const router = require('express').Router();
const User = require('../models/user');

router.get("/", async (req, res) => {
    try {
        const user = await User.find()

        !user && res.status(404).json('Not found');
        let temp = [];
        user.forEach((item) => {
            let { password, ...others } = item._doc
            temp.push(others)
        }
        )


        console.log(temp)
        // const { password, ...others } = user._doc
        res.status(200).json(temp)
    }
    catch (err) {
        res.status(500).json(err)
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
}
)

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         !user && res.status(404).json('Not found');
//         const { password, ...others } = user._doc
//         res.status(200).json(others)
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// })
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })

        !user && res.status(404).json('Not found');
        const { password, ...others } = user._doc
        res.status(200).json(others)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
router.put('/:username', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate((
            req.params.username,
            {
                $set: req.body,
            },
            { new: true }
        ))
        !user && res.status(404).json('Not found');
        const { password, ...others } = user._doc
        res.status(200).json(password + "updated successfully")
    }
    catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;