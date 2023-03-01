const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = require('./Api/route/image.routes');

const mongoDB = require('./Api/helper/db.connection')
mongoDB();
const app = express();
app.use(express.json());
app.use('/Api' , router);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});