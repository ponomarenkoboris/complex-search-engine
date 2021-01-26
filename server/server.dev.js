const express = require('express');
const path = require('path');
const findPeople = require('./middleware/FindPeople');

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(path.resolve('dist')));

// temporary full link: http://localhost:3000/api.users/:socialNetwork/:value 

app.get('/api.user/:socialNetwork/:value', async (req, res) => {
    const data = await findPeople(req);
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});