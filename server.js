const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/deploy'));

app.get('/', (req, res) => {
    res
        .status(200)
        .sendFile(__dirname + '/deploy/index.html')
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
