const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const UserModel = mongoose.model('UserModel')


router.post('/login', async (req, res) => {
    const { phoneNum } = req.body;

    try {
        let user = await UserModel.findOne({ phoneNum });

        if (!user) {
            user = new UserModel({ phoneNum });
            await user.save();
        }

        res.json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/user/:phoneNum', async (req, res) => {
    const phoneNum = req.params.phoneNum;

    try {
        const user = await UserModel.findOne({ phoneNum });

        res.json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.put('/addmoney', async (req, res) => {
    const { money, phoneNum } = req.body
    try {
        const user = await UserModel.findOne({ phoneNum })
      
        user.availableAmount += Number(money)

        await user.save();

        res.json({ user });


    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error(error);
    }


})



module.exports = router