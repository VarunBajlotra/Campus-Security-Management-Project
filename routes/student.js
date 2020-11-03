const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints} = require('../db')
const request = require('request');
const fs = require('fs')
const shorturl = require('shorturl')

async function download(url, dest) {

    const file = fs.createWriteStream(dest);

    await new Promise((resolve, reject) => {
        request({
            uri: url,
            gzip: true,
        })
        .pipe(file)
        .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        });
    })
    .catch((error) => {
        console.log(`Something happened: ${error}`);
    });
}

route.get('/profile',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='student'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/student/profile',{
        user:req.user
    })
})

route.get('/enterhostel',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='student'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/student/hostelentry')
})

route.post('/enterhostel',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='student'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    console.log('Hello');
    // (async () => {
    //     const data = await download(req.body.url, './public/student/hostelentry/imageslog/image.jpg');
    // })();
    // console.log(req.body)
    var spawn = require("child_process").spawn; 

	// var process = spawn('python',['./PythonData/genderPrediction.py', 'https://images.unsplash.com/photo-1602710208570-e227323b0ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'] ) 
    var process = spawn('python',['./PythonData/genderPrediction.py', 'data:image/jpeg;base64,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'] ) 
    
    process.stdout.on('data', function(data) {
        console.log(data.toString())
        // if(data.toString()=='female'){
        //     console.log('In here')
        //     return res.redirect('/student/hostelsuccess')
        // }
        // else{
            res.send(data.toString())
        // }
    }) 
})

route.get('/hostelsuccess',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='student'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    console.log('Success entry')
    res.render('../public/student/hostelsuccess')
})

route.get('/url',(req,res)=>{
    shorturl('http://bethesignal.org/', function(result) {
        console.log(result);
        res.send(result)
    });
})

module.exports={
    route
}