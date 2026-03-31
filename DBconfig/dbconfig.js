// const mongoose=require('mongoose')
// const connURL='mongodb://localhost:27017/BeeDoc'
// mongoose.connect(connURL)
// .then((res)=>console.log('connection is sucess'))
// .catch((err)=>console.log(err))

const mongoose = require('mongoose');
require('dotenv').config();
const connURL = process.env.MONGO_URI;
// Optional: strictQuery (recommended in newer versions)
mongoose.set('strictQuery', true);
mongoose.connect(connURL)
  .then(() => {
    console.log('MongoDB Atlas connected');
  })
  .catch((err) => {
    console.log('DB Error:', err);
  });
module.exports = mongoose;