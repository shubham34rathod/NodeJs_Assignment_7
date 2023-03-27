let mongoose=require('mongoose')
let studentArray=require('./InitialData.js')

mongoose.connect('mongodb://localhost:27017/School_Student')

let schema1=new mongoose.Schema({
    id: {type:Number},
    name:{type:String},
    currentClass:{type:Number},
    division:{type:String}
})

let Model1= mongoose.model('model1',schema1)

// for(let x=0;x<studentArray.length;x++)
// {
//     let data=studentArray[x];
//     let doc1=new Model1({
//         id: data.id,
//         name:data.name,
//         currentClass:data.currentClass,
//         division:data.division
//     })

//     doc1.save();
// }



module.exports=Model1;