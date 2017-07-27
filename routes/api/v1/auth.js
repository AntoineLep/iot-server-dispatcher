'use strict';

var express = require('express');
var jwt     = require('jsonwebtoken');
var appRepo = require ('../../../repositories/appRepository')
var gatewayRepo = require ('../../../repositories/gatewayRepository')

var router  = express.Router();

//Authentication 
router.post('/', (req, res) => {
  if(req.body.appname !== undefined && req.body.apikey !== undefined) {
    appRepo.findAppByNameAndApiKey(req.body.appname, req.body.apikey)
    .then((matchingApp) => {
      if(matchingApp != null) {
        console.log("App id: " + matchingApp.id + " got a new token");
        let jwtToken = jwt.sign(
          {
            appId: matchingApp.id,
            appName: matchingApp.name,
            isGateway: false
          },
          process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_LIFETIME}
        );

        return res.json({success: true, token: jwtToken});
      } 
      else {
        gatewayRepo.findGatewayByNameAndApiKey(req.body.appname, req.body.apikey).then((matchingGateway) => {
          if(matchingGateway != null) {
            console.log("Gateway id: " + matchingGateway.id + " got a new token");
            let jwtToken = jwt.sign(
              {
                appId: matchingGateway.id,
                appName: matchingGateway.name,
                isGateway: true
              },
              process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_LIFETIME}
            );

            return res.json({success: true, token: jwtToken});
          } 
          else {
            return res.status(400).json({succes: false, message: "appname / apikey is not valid"});
          }
        });
      }
    });
  } 
  else {
    return res.status(400).json({succes: false, message: "appname / apikey fields required"}); 
  }
});

module.exports = router;