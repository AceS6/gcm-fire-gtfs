var models  = require('../models');
var express = require('express');
var router  = express.Router();

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
        res.status(200).json({ success: true, message: 'Welcome to the trip section of the pushtime api'});
});

router.get('/list', function(req, res) {
        if(req.query.trip_id != null){
                models.sequelize.query("SELECT * from "+req.query.schema+".gtfs_stops where stop_id IN(SELECT stop_id from "+req.query.schema+".gtfs_stop_times WHERE trip_id=:trip_id ORDER BY arrival_time)",
                { replacements: {trip_id: req.query.trip_id}, type: models.sequelize.QueryTypes.SELECT})
                .then(function(stops) {
                        res.status(200).json({ success: true, message: 'Stops', stops: stops});
                });
        }
        else{
                return res.status(403).send({
                        success: false,
                        message: 'Please provide a trip id.'
                });
        }
        
});

router.get('/count', function(req, res) {
        models.sequelize.query("SELECT COUNT(*) from "+req.query.schema+".gtfs_stops",
        { replacements: {}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(count) {
                res.status(200).json({ success: true, message: 'Counted available stops', count: count});
        })
});

module.exports = router;