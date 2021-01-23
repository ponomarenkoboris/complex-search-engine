const express = require('express');
const path = require('path');
const findPeople = require('./middleware/FindPeople');

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use(express.static(path.resolve('dist')));

// app.get('/', (req, res) => {
//     res.sendFile('index');
// });


app.get('/user/:socialNetwork/:value', async (req, res) => {
    console.log('request sended');
    const data = await findPeople(req, res);
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});