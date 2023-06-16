const express = require('express')
const bodyParser = require('body-parser')
const {readFileSync,writeFileSync} = require('fs')
// const url = require('url')
// const writeDb = writeFileSync(db, )

let db = './db.json'
let read = JSON.parse(readFileSync(db, 'utf-8')) 
const app = express()



// GEt all data  GET http://localhost:4000/api/employees/all

const getAllData =  (req,res)=>{
    res.status(200).json({sucess:true, data:read})
}


let dataId = read.length-1
// console.log(dataId)
let autoId =  read[dataId].id



// push data to db  POST http://localhost:4000/api/employees
const pushData = (req,res)=>{
    autoId+=1
    readFileSync(db,'utf-8') ?  database = [...JSON.parse(readFileSync(db,'utf-8'))] : database = []
    // console.log(dataId)
    // const database = [...JSON.parse(readFileSync(db,'utf-8'))]
    const {name,sex, email, phone} = req.body
    const NewData = [{id:autoId, name:name,sex: sex, mail:email, phone: phone}]
    
    if (name && sex && email && phone){
        console.log(database)
        database.push(...NewData)
        console.log(database)
        writeFileSync(db, JSON.stringify(database, null, 2))
       
        res.status(200).json({success:true, data:NewData})
    }
    else{
        res.status(206).json({success:false, msg: 'Incomplete Data'})
    }
  
}


// GET http://localhost:4000/api/employees
const queryData = (req,res)=>{
    // console.log(url.req.query)
    console.log(req.query)
    const {id} = req.query  
    if (id)
    {require('')
        const newData = read.filter(each=> each.id === Number(id))
        res.status(200).json({success:true, data: newData})

    }
    res.status(401).json({succes:false, msg: 'invalid response'})
}




// update by id  PUT http://localhost:4000/api/employees/:id
const updateData = (req,res)=>{
    const {id} = req.params 
    const {name,sex, email, phone} = req.body
    const person = read.find(each=> each.id === Number(id))
    if (!person){
        res.status(206).json({success:false, msg: 'No such person'})
    }
    else{
        read.map(each=> {
            if(each.id=== Number(id))
            {
                each.name= name, each.sex = sex, each.mail=email, each.phone=phone
                const data = [...read]
                // console.log(data)
                writeFileSync(db, JSON.stringify(data,null, 2))
                res.status(200).json({success:true, msg:'update succesful' ,data: each})
            }
            
        })
        
    }
    
}

// patch same with put  PATCH http://localhost:4000/api/employees/;id
const patchData =  (req,res)=>{
    const {id} = req.params
    const {name,sex, email, phone} = req.body
    const person = read.find(each=> each.id === Number(id))
    if (!person){
        res.status(206).json({success:false, msg: 'No such person'})
    }
    else{
        read.map(each=> {
            if(each.id=== Number(id))
            {
                each.name= name
                // data = Number(each.id)
                // console.log(read.each)
                const data = [...read]
                // console.log(data)
                writeFileSync(db, JSON.stringify(data,null, 2))
                // console.log(read)
                res.status(200).json({success:true, msg:'Update succesful',  data: each})
            }
          
        })
        
    }
}


// delete by id  DELETE http://localhost:4000/api/employees/:id

const deleteData =  (req,res)=>{
    const {id} = req.params
    console.log(id)
    const person = read.find(each=> each.id === Number(id))
    if (!person)
    {
        res.status(400).json({success:false, msg: `Cant find  data for id ${id}`})
    }
    else{
        const filterData = read.filter(each=> each.id !== Number(id))
        writeFileSync(db, JSON.stringify(filterData, null,2 ))
        res.status(200).json({success:true, data: "Data succesfully deleted from data base"})
    }

}

module.exports ={
    getAllData,
    pushData,
    queryData,
    patchData,
    updateData,
    deleteData
}
