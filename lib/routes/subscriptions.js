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
     	models.sequelize.query("SELECT DISTINCT * from time_subscriptions where schema = :schema",
        { replacements: {schema: req.query.schema}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(time_subscriptions) {
                res.status(200).json({ success: true, message: 'Subscriptions', time_subscriptions: time_subscriptions});
        });
});

router.get('/count', function(req, res) {
        models.sequelize.query("SELECT COUNT(*) from susbcriptions where schema = :schema",
        { replacements: {schema: req.query.schema}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(count) {
                res.status(200).json({ success: true, message: 'Counted available trips', count: count});
        })
});

module.exports = router;
