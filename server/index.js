const express = require("express");
const api = require("./api");



const app = express();

app.use(express.json())
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/api/v1', api);

app.listen(8777, () => {
  console.log("listening on port 8777");
});