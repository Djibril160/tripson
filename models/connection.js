const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_MDB;

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected bro 🥳!'))
  .catch(error => console.error(error));