const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var app = express();
var port = process.env.PORT;
app.use(express.static(publicPath));



app.listen(port || 3000, () => {
  console.log('You are listening on port 3000');
})