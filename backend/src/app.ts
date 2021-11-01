import express = require('express')
import * as createRouter from "./routes/create";
import * as getRouter from "./routes/get";
import * as insertRouter from "./routes/insert";
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/create', createRouter.index);
app.get('/get', getRouter.index);
app.post('/insert', insertRouter.index);
console.log("listen start ...")
app.listen(8080)