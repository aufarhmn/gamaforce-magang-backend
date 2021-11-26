var express = require('express');
var router = express.Router();
var path = require('path')
var db = require('../db/db')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'htmls', 'mymission.html'));
});

router.post('/updatemission', function(req,res){
    db.run('UPDATE MissionPlan SET g3wp=? WHERE planId=?', 
  [req.body.g3wp,req.body.planId],
  (err) => {
    if(err) {
      res.status(500).json({status: err})
      return
    };
    res.status(200).json({status: 'Ok'})
  })
})

module.exports = router;