const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints,HosteLog, HostelLog} = require('../db')
const request = require('request');
const fs = require('fs')
const moveFile = require('move-file');

// Download file from Back End
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

route.get('/verifyentry',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='student'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    console.log('Hello you are in Get Hostel');
    HostelLog.create({
        idno:req.user.idno,
        name:req.user.name,
        entrytime:new Date().toLocaleString()
    }).then((entry)=>{
        (async () => {
            await moveFile('C:/Users/varun/Downloads/entryphoto.jpg', './public/personnel/hostellog/images/'+entry.dataValues.id+'.jpg')
            console.log('The file has been moved')
            var spawn = require("child_process").spawn; 
            var process = spawn('python',['./PythonData/genderPrediction.py', entry.dataValues.id+'.jpg'] ) 
            
            process.stdout.on('data', function(data) {
                console.log(data.toString())
                HostelLog.update({
                    predictedgender:data.toString()
                },{
                    where:{
                        id:entry.dataValues.id
                    }
                }).then(()=>{
                    res.send(data.toString())
                })
            }) 
        })();
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
    // res.send('success')
})

module.exports={
    route
}