const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'client/div')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));