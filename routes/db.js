module.exports = {
  HomeWeatherQuery: function(hours, callback) {
      var ibmdb = require('ibm_db');
      var ret ;

      if (process.env.VCAP_SERVICES) {
        var env = JSON.parse(process.env.VCAP_SERVICES);
	    
        hasConnect = true;
        if (env['dashDB']) {
            db2 = env['dashDB'][0].credentials;
	    } else {
            console.log("dashDB credentials not found")
        }
      } else
        db2 = require('../db.json');


        console.log(db2);
        var connString = "DRIVER={DB2};DATABASE=" + db2.db + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.hostname + ";port=" + db2.port;

        ibmdb.open(connString,function (err,conn) {
            if (err) return console.log(err);
            var offset_hours = (parseInt(hours) - 8); //off +8 due to US Timezone
            conn.query('select * from homeweatherdata_0 where (cast(payload_ts as timestamp) >= CURRENT_TIMESTAMP - ' + offset_hours  + ' HOUR) order by cast(payload_ts as timestamp) ASC', function (err, data) {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    //console.log(typeof data);
                   return callback(data);
                }

                conn.close(function () {
                    console.log('done');
                });
            });
        });
   
  },
       
  sayHelloInSpanish: function() {
    return "Hola";
  }
};



