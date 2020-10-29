const path = require('path');
const express = require('express');

const app = express();
const routers = require('./routers');

app.use(express.static(path.join(__dirname, 'public')));

app.use(routers.authRouter);
app.use(routers.surveyRouter);
app.use(routers.announcementRouter);
app.use(routers.categoryRouter);
app.use(routers.tagRouter);
app.use(routers.newsRouter);
app.use(routers.entertainmentRouter);
app.use(routers.sportRouter);
app.use(routers.leagueRouter);
app.use(routers.logRouter);
app.use(routers.statisticRouter);

app.get('/', function (req, res) {
    res.json('Dailyathon Serve Project');
});

app.use((req, res, next) => {
    res.send("404 NOT FOUND");
});

module.exports = app;