var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

/* GET home page. */
function routerInit(db){
   var todoCollection = db.collection("todos");

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.post('/newtodo', function(req,res,next){
        console.log(req.body);
          var todoText = req.body.text || "" ;
          var newTodo = {
             message:todoText,
             tododate:new Date(),
              done:false,
              selected:false
        }
          if(req.body.geodata){
            newTodo.geodata = req.body.geodata;
          }
          todoCollection.insert(newTodo, function(err, rslt){
              if(err) return res.status(403).json({error:"No se pudo ingresar Todo"});
              todoCollection.find({}).toArray(function(err, todos){
                if(err){
                  console.log(err);
                  return res.status(200).json([]);
                }
                return res.status(200).json(todos);
              }); // find
          });

    })// end newtodo

    router.post('/todo/done', function(req,res,next){
        console.log(req.body);
          var todoID = new ObjectID(req.body.id ||"");
          var query = {
             "_id":todoID
          };
          var update = {
              "$set":{"done":true}
          }
          todoCollection.update(query, update, {}, function(err ,rst){
              if(err) {
                console.log(err);
                res.status(402).json({"error":"No se pudo actualizar"});
              }
              todoCollection.find({}).toArray(function(err, todos){
                if(err) return res.json([]);
                return res.status(200).json(todos);
              }); // end find
          })// en update
        }); //todo/done

  router.get('/todos', function(req,res,next){
      todoCollection.find({}).toArray(function(err, todos){
        if(err){
          console.log(err);
          return res.status(200).json([]);
        }
        return res.status(200).json(todos);
      }) // find

  }) // end todos

  router.get('/geotodos/:long/:lati', function(req,res,next){

      todoCollection.find({geodata:{
                                "$near":{
                                            "$geometry":
                                                  {"type":"Point",
                                                  "coordinates":[parseFloat(req.params.long), parseFloat(req.params.lati)]
                                                },
                                              "$maxDistance":10000
                                              }
                                            }
                                 }).toArray(function(err, todos){
        if(err){
          console.log(err);
          return res.status(200).json([]);
        }
        return res.status(200).json(todos);
      }) // find

  }) // end todos

  return router;
}// end routerInit

module.exports = routerInit;
