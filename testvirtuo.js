"use strict";
const express     =   require("express");
const app         =   express();
const bodyParser  =   require("body-parser");
const vehicle     =   require("./models/vehicle");
const router      =   express.Router();
const infotypes   =   ["fuel","mileage","coordinates"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/vehicles")
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
router.route("/vehicle")
    .post(function(req,res){
        let db = new vehicle(req.body);
        let response = {};
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data : " + err};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
router.route("/vehicle/:plate/:infotype")
    .get(function(req,res){
        let infotype = req.params.infotype;
        if(infotypes.indexOf(infotype)===-1){
            res.json({"error" : true,"message" : "Error infotype : " + infotype});
        }else{
            let response = {};
            if (infotype==="coordinates") infotype = "gps";
            vehicle.find({"plate" : req.params.plate}, infotype + " capture_at" ,function(err,data){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data : " + err};
                } else {
                    response =  data;
                }
                res.json(response);
            });
        }
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
