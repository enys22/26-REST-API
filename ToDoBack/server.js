const express = require('express')
const {MongoClient,ObjectID} = require('mongodb')
const bodyParser = require ('body-parser')
const assert = require('assert');
const cors = require('cors')

const app = express()

const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'items-db'
const collectionName = 'todolist'

//app.use(cors())
app.use(bodyParser.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

const client = MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });


client.connect((err,client)=>{
    assert.equal(err,null,'Loading database failed')
    const db = client.db(dbName)


    ///ADD-ITEM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!
    app.post('/additem',(req,res)=>{
        db.collection(collectionName).insertOne(req.body,(err,data)=>{
            {err ? res.send(err) : res.send(data)}
        })
    })
    ///ADD-ITEM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!

    app.get('/getitems',(req,res)=>{
        db.collection(collectionName).find({}).toArray((err,data)=>{
            {err ? res.send(err) : res.send(data)}
        })
    })
    
    ///GET-ITEM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!
    app.get('/getitem/:id',(req,res)=>{
        console.log("access to getitem by ID : " + req.params.id)
        db.collection(collectionName).findOne({_id : ObjectID(req.params.id)} , req.body,(err,data)=>{
            {err ? res.send(err) : res.send(data)}
        })
    })
    ///GET-ITEM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!

    ///DELETE-ITEM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!
    app.delete('/deleteitem/:id',(req,res)=>{
        console.log("Acces to DeleteItem with ID : " + req.params.id)
        db.collection(collectionName).deleteOne( {_id : ObjectID(req.params.id)} , ( (err,data)=>{
            {err ? res.send(err) : res.send(data)}
        }))
    })
    ///DELETE-ITEM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!

    ///TOGGLE-CONFIRM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!
    app.put('/toggleconfirm/:id',(req,res)=>{
        db.collection(collectionName).findOne({_id : ObjectID(req.params.id)},(err,data)=>{
            db.collection(collectionName).updateOne({_id : ObjectID(req.params.id)},{$set : {checked : !data.checked}},(err,data)=>{
                {err ? res.send(err) : res.send(data)}
            })
        })
    })
    ///TOGGLE-CONFIRM WORK PERFECTLY      !!!!!!!!!!!DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!

})

app.listen(3001,(err)=>{
    if(err) console.log("Error on running server",err)
    else console.log("Server running on port 3001")
})