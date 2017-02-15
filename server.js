var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var iotf = require('ibmiotf');
var db = require("./routes/db.js");
var bodyParser = require('body-parser');
var appConfig;

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var serverPort = 0;
var serverHost = '';

if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    appConfig = {
                   'org' : env["iotf-service"][0].credentials.org,
                   'id' : 'DashboardIOTs',
                   'auth-key' : env["iotf-service"][0].credentials.apiKey,
                   'auth-token' : env["iotf-service"][0].credentials.apiToken
                  };
    serverPort = appEnv.port;
    serverHost = '0.0.0.0';
} else {
    appConfig = require('./application.json');
    serverPort = 8080;
    serverHost = 'localhost';
}

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

var appClient = new iotf.IotfApplication(appConfig);
console.log(appConfig);

var kW_TOTAL_array = new Array();


var recordCounter = 0;
server.listen(serverPort, serverHost, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
    appClient.connect();
    
    appClient.on('connect', function() {
        appClient.subscribeToDeviceEvents();
    });
    
    appClient.on('deviceEvent', function(deviceType, deviceId, eventType, format, payload) {
        //console.log("Device event at " + new Date().toString() + " from " + deviceType +
        //                  ":" + deviceId + "; event = "+ eventType +", payload = " + payload);

                        
        if(deviceId == "EMSgateway"){
            
            try{
                sensorObj = JSON.parse(payload);
                io.emit("sensorObj", sensorObj);
                //console.log(sensorObj);

                if(!(sensorObj.d.kW_TOTAL === undefined))
                {
                    if(kW_TOTAL_array.length < 100){
                        kW_TOTAL_array.push({"Timestamp":timestamp_current = sensorObj.d.Timestamp.slice(11,19), "value1": sensorObj.d.kW_TOTAL});
                    } else {
                        kW_TOTAL_array.shift();
                    }
                    console.log(kW_TOTAL_array);
                
                }

                
            } catch(err){
                console.log(err);
            }
 

        }
    });
});


//transfer one time
io.on("connection", function (socket) {
   
    socket.emit("sensorObj_array", kW_TOTAL_array); 
    console.log(kW_TOTAL_array);
    
    socket.on('test', function (data) {  
        console.log(data);
    });
});

//continous transfer
io.on("connection", function () {

});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/realkw',function(req,res){
    var results = [];
    console.log("here");
    try{
            db.KwRealTimeQuery(function(data){
                console.log(data);
                res.send(data);
            });
        
    } catch (err) {
        console.log(err);
    }

    
    var data = [{"Data":"1"},{"Data":"2"}];
    
    //res.send(results);
});



