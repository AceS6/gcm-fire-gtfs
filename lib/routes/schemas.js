var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
        res.status(200).json({ success: true, message: 'Welcome to the trip section of the pushtime api'});
});

router.get('/list', function(req, res) {
        models.sequelize.query("select schema_name from information_schema.schemata where schema_owner != 'postgres'",
        { replacements: {}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(schemas) {
		console.log(schemas);
        	res.status(200).json({ success: true, message: 'Schemas', schemas: schemas});
    	});
        
});

router.get('/count', function(req, res) {
        models.sequelize.query("SELECT COUNT(*) from information_schema.schemata where schema_owner != 'postgres'",
        { replacements: {}, type: models.sequelize.QueryTypes.SELECT})
        .then(function(count) {
                res.status(200).json({ success: true, message: 'Counted available schemas', count: count});
        })
});

module.exports = router;
