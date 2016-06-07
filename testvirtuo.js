"use strict";
const express     =   require("express");
const app         =   express();
const bodyParser  =   require("body-parser");
const vehicle     =   require("./models/vehicle");
const router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/vehicle")
    .get(function(req,res){
        let response = {};
        vehicle.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data : " + err};
            } else {
                response =  data;
            }
            res.json(response);
        });
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
