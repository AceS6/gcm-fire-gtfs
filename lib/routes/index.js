var models  = require('../models');
var express = require('express');
var router  = express.Router();
var crypto = require("crypto");
var fs=require('fs');
var request = require('request');

var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

var clientSecret = "xGPv9odRY6QtHIPWu8Lyv0ui";
  var clientId = "678408438758-rnqkg06jnhucpktil56b9bc7iep52u6t.apps.googleusercontent.com"
  var redirectUrl = "http://mail.sauray.com/api/v1/callback";
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);



router.get('/', function(req, res) {
	res.status(200).json({ success: true, message: 'Welcome to the pushtime api'});
});

module.exports = router;