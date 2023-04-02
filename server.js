const fallback = require('express-history-api-fallback');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const root = path.join(__dirname, 'dist');
app.use(express.static(root));
app.use(fallback('index.html', {root: root}));

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}!`);
});
