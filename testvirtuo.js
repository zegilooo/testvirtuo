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
router.route("/vehicle/:plate/mileage")
    .get(function(req,res){
        let response = {};
        vehicle.find({"plate" : req.params.plate}, "mileage capture_at" ,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data : " + err};
            } else {
                response =  data;
            }
            res.json(response);
        });
    });
router.route("/vehicle/:plate/fuel")
    .get(function(req,res){
        let response = {};
        vehicle.find({"plate" : req.params.plate}, "fuel capture_at" ,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data : " + err};
            } else {
                response =  data;
            }
            res.json(response);
        });
    });
router.route("/vehicle/:plate/coordinates")
    .get(function(req,res){
        let response = {};
        vehicle.find({"plate" : req.params.plate}, "gps capture_at" ,function(err,data){
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
