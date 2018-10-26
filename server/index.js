const express = require('express');

const app = express();
const port = 3003;
// const path = require('path');
// const bodyParser = require('body-parser');

app.use('/', express.static('public'));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
