var express = require('express');
var router = express.Router();
var path = require('path')
var db = require('../db/db')

// endpoint get buat dapetin misi yang ada di MissionPlan
// Hint: router.get(), 'SELECT * FROM MissionPlan', db.all (err dan rows) bakal muncul misi-misi
//localhost:3000/misi
router.get('/', (req, res, next) => {
    db.all('SELECT * FROM MissionPlan', (err, rows) =>{
        if(err) {
            console.log(err)
            res.status(500).json({status: 'error'})
            return
          };

        res.json(rows)
    })
})


router.post('/', function(req, res, next) {
  //console.log(req.body)
  db.run('INSERT INTO MissionPlan(planName, g3wp) VALUES (?, ?)', 
  [req.body.namaMisi, req.body.geoJSON],
  (err) => {
    if(err) {
      console.log(err)
      res.status(500).json({status: 'error'})
      return
    };
    res.status(200).json({status: 'Ok'})
  })
});

    router.get('/delete/:id', (req, res, next) => {
      db.run('DELETE FROM MissionPlan WHERE planId = ?',
      [req.params.id],
      (err) => {
        if(err) {
          console.log(err)
          res.status(500).json({status: 'error'})
          return
        };
        res.status(200).json({status: 'Ok'})
        console.log(`Row(s) deleted`);
      })
  })

    /*router.get('/delete/;id', (req, res, next) => {
      var planid = [];
      planid.push(String(req.params.planid));
      console.log(planid);
      var sql = 'DELETE FROM hotel WHERE planId = ?';
  
      conn.query(sql, idHotel, (err, result, field) => {
          if (err) {
              res.send({
                  'code': 400,
                  'faild': 'error ocurred Eliminar'
              });
          } else {
              console.log('deleted ' + result.affectedRows + ' rows');
              res.redirect('/root/hoteles/1');
          }
      });
  }); 
    */


    // perintah untuk delete plan dengan id tersebut
    // pakai query DELETE
    // db.run()

module.exports = router;