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
     	models.sequelize.query("SELECT DISTINCT * from "+req.query.schema+".subscriptions",
        { replacements: {}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(subscriptions) {
                res.status(200).json({ success: true, message: 'Subscriptions', subscriptions: subscriptions});
        });
});

router.get('/count', function(req, res) {
        models.sequelize.query("SELECT COUNT(*) from "+req.query.schema+".susbcriptions",
        { replacements: {}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(count) {
                res.status(200).json({ success: true, message: 'Counted available trips', count: count});
        })
});

module.exports = router;
