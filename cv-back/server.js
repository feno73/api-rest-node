const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const reportRoute = require('./routes/report.routes');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/report', reportRoute)

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
    console.log("Back ejecutandose en el puerto: " + port)
})

//404
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});