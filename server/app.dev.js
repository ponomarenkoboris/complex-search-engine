const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve('dist')));
app.get('/', (req, res) => {
    res.sendFile('index');
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});