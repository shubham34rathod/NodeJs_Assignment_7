const express = require('express')
let studentArray=require('./InitialData.js')
let Model1=require('./DataBase.js')
const app = express()
const bodyParser = require("body-parser");
const { findByIdAndUpdate } = require('./DataBase.js');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

for(let x=0;x<studentArray.length;x++)
{
    let data=studentArray[x];
    // console.log(studentArray.length);
    let doc1=new Model1({
        id: data.id,
        name:data.name,
        currentClass:data.currentClass,
        division:data.division
    })

    doc1.save();
}

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.get('/api/student',async (req,res)=>{
    res.send(await Model1.find().sort({id:1}))
})

app.post('/api/student',async (req,res)=>{
    // res.setHeader({'content-type':'application/x-www-form-urlencoded'})
    let {id,name,currentClass,division}=req.body;
    if(!id || !name || !currentClass || !division)
    {
        res.status(400).send('incomplete details ')
    }
    else{
        let doc1=new Model1({
            id: id,
            name:name,
            currentClass:currentClass,
            division:division
        })
    
        await doc1.save();
        let data=await Model1.find({id});
        res.send(data[0]._id)
        // console.log(data[0]._id);
    }
})

app.put('/api/student/:id',async (req,res)=>{
    try{
        let {_id}=req.params;
        let {id,name,currentClass,division}=req.body;
        let data=await Model1.find({_id:_id})
        if(data){
            if(!id || !name || !currentClass || !division)
            {
                res.status(400).send('incomplete data')
            }
            else{
                    await Model1.findByIdAndUpdate(_id,{
                    id: id,
                    name:name,
                    currentClass:currentClass,
                    division:division
                })
            }
        }
    }
    catch{
        res.status(400).send('invalis id')
    }
})

app.delete('/api/student/:id',async (req,res)=>{
    try{
        let {id}=req.params;
        await Model1.findByIdAndDelete(id);
        res.send('data deleted');
    }
    catch{
        res.send('error')
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   