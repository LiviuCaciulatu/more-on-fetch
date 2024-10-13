const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())

app.get("/welcome", (req, res)=>{
    res.send("Welcome!")
})



app.listen(3001, ()=>{
    console.log("server is listening to port 3001.")
})
