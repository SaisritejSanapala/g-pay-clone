const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    from: String,
    to: String,
    amount: Number,
    cashback: Number,
  });

mongoose.model('TransactionModel', transactionSchema)