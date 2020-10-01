
import path from 'path'
import express from 'express'

const app = express();
const routers = require('./routers');

app.use(express.static(path.join(__dirname, 'public')));

app.use(routers.authRouter);

app.get('/', function (req, res) {
    res.json('Dailyathon Serve Project');
});

app.use((req, res, next) => {
    res.send("404 NOT FOUND");
});

module.exports = app;