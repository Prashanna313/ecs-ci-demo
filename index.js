const express = require('express');
const { response } = require('express');
const app = express();

app.use(express.static('static'));

const news = require('./routes/news');
app.use('/api', news);

const port = process.env.PORT ? process.env.PORT : '80';

app.listen(port, () => {
    console.log("Server is running...", port);
});
