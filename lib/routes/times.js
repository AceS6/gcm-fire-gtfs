var models  = require('../models');
var express = require('express');
var router  = express.Router();
var crypto = require("crypto");
var fs=require('fs');
var request = require('request');

var weekday = new Array(7);
weekday[0]=  "sunday";
weekday[1] = "monday";
weekday[2] = "tuesday";
weekday[3] = "wednesday";
weekday[4] = "thursday";
weekday[5] = "friday";
weekday[6] = "saturday";


router.use(function(req, res, next) {
        if(req.query.schema != null){
                next();
        }
        else{
                return res.status(403).send({
                        success: false,
                        message: 'Please provide a schema.'
                });
        }
});


router.get('/', function(req, res) {
        res.status(200).json({ success: true, message: 'Welcome to the pushtime api'});
});

router.get('/list', function(req, res) {
        if(req.query.route_id != null){
                if(req.query.stop_id != null){
                        if(req.query.date==null){
                                date = new Date();
                        }
                        else{
                                date = new Date(req.query.date);
			}
                        // day is the string name of the day
                        var day = weekday[date.getDay()];
                        service_id = "select service_id from "+req.query.schema+".gtfs_calendar where "+day+"=1 AND start_date < :date AND end_date > :date EXCEPT (select service_id from "+req.query.schema+".gtfs_calendar_dates where exception_date=:date)";
                        trips = "select trip_id from "+req.query.schema+".gtfs_trips where route_id = :route_id AND service_id in("+service_id+")";
			query = "SELECT departure_time, arrival_time from "+req.query.schema+".gtfs_stop_times where stop_id=:stop_id and trip_id in("+trips+") order by departure_time";
                        models.sequelize.query(query,
                        { replacements: {date: date, stop_id: req.query.stop_id, route_id: req.query.route_id}, type: models.sequelize.QueryTypes.SELECT})
                        .then(function(times) {
				console.log(times);
                                res.status(200).json({ success: true, message: 'Schedules for '+date, times: times});
                        });
                }
                else{
                        return res.status(403).send({
                                success: false,
                                message: 'Please provide a stop id.'
                        });
                }
                
        }
        else{
                return res.status(403).send({
                        success: false,
                        message: 'Please provide a trip id.'
                });
        }
        
});


module.exports = router;
