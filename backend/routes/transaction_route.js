const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TransactionModel = mongoose.model('TransactionModel')

const UserModel = mongoose.model('UserModel')


router.post('/transfer', async (req, res) => {
    const { from, to, amount } = req.body;
  
    try {
      const sender = await UserModel.findOne({ phoneNum: from });
      const recipient = await UserModel.findOne({ phoneNum: to });
  
      if (!sender || !recipient) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (sender.availableAmount < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      sender.availableAmount -= amount;
      recipient.availableAmount += amount;
  
      // Cashback Handling
      let cashback = 0;
      if (amount % 500 !== 0) {
        if (amount < 1000) {
          cashback = amount * 0.05;
        } else {
          cashback = amount * 0.02;
        }
      }
  
    
      const transaction = new TransactionModel({
        from,
        to,
        amount,
        cashback,
      });
      await transaction.save();
  
    
      await sender.save();
      await recipient.save();
  
      res.json({ success: true, cashback });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.get('/transactions/:phoneNum', async (req, res) => {
    const { phoneNum } = req.params;
  
    try {
      const transactions = await TransactionModel.find({
        $or: [{ from: phoneNum }, { to: phoneNum }],
      });
  
      res.json({ transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  module.exports = router;