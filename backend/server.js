const express = require('express');
const app = express();
app.use(express.json());
const PORT = 4000;

const cors = require('cors');
app.use(cors())

const mongoose = require('mongoose');
const {MONGODB_URL} = require('./config')

mongoose.connect(MONGODB_URL)

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})


require('./models/user_model')
require('./models/transaction_model')


app.use(require('./routes/user_route'))
app.use(require('./routes/transaction_route'))


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
