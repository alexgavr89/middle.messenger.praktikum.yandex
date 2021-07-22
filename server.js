const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.get('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
