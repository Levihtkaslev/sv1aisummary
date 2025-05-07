const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const port = 6001;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



app.listen(port, () => console.log('Now listening at',port,'port'))

mongoose.connect("mongodb://localhost:27017/summary").then(() => {
    console.log("MongoDB Connected Successfully")
    }).catch((err) => {
        console.log("Error conncting with db :",err)
    })


const drafto = require("./bridge/draft");
const usero = require("./bridge/user");
const locato = require("./bridge/location");
const rolo = require("./bridge/role");
const summario = require("./bridge/summary")
const kranium = require("./bridge/kranium")


app.use('/sv1/ai-summary', drafto);
app.use('/sv1/ai-summary', usero);
app.use('/sv1/ai-summary', locato);
app.use('/sv1/ai-summary', rolo);
app.use('/sv1/ai-summary', summario);
app.use('/sv1/ai-summary', kranium);


app.use(express.static(path.join(__dirname, '../front_end/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front_end/dist/index.html'))
})




