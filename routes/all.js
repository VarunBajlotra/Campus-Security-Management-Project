const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints} = require('../db')
const nodemailer = require('nodemailer')
const unirest = require("unirest");

const msg = unirest("POST", "https://www.fast2sms.com/dev/bulk");

msg.headers({
    "authorization": "WbM7xc63KHfjYelvOLhBATNmzEoUygr2QS941pqVD80tIaRwdXwfHq6tCMLu8hFg1PVoWBEzbsx07QTO"
});

let transport = nodemailer.createTransport({
    service:'gmail',
    auth: {
       user: 'varunbajlotra@gmail.com',
       pass: '17102000vb'
    }
});

route.post('/login',passport.authenticate('local',{
    failureRedirect:'/'
}),
(req,res)=>{
    Users.update({
        location:'Inside Campus'
    },{
        where:{
            idno:req.body.idno
        }
    })
    res.redirect('/'+req.user.type+'/profile')
})

route.get('/logout',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    Users.update({
        location:'Outside Campus'
    },{
        where:{
            idno:req.user.idno
        }
    })
    req.logout()
    res.redirect('/')
})

route.get('/filecomplaint',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    res.render('../public/filecomplaint')
})

route.post('/filecomplaint',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    Complaints.create({
        cidno:req.user.idno,
        cname:req.user.name,
        location:req.body.location,
        description:req.body.description,
        time:new Date().toLocaleString(),
        status:'Pending'
    }).then(()=>{
        // const message = {
        //     from: 'varunbajlotra@gmail.com',
        //     to: req.user.email,
        //     subject: 'Complaint Filed At Campus Security Portal',
        //     text: 'We have received a complaint from ' + req.user.name + ' with ID No. : ' + req.user.idno + ' with the following details:\n'+
        //           'Place : '+req.body.location+'\n'+
        //           'Description : '+req.body.description+'\n\n'+
        //           'We have started working on your complaint. We will get back to you soon.'+'\n\n'+
        //           'Regards\n'+
        //           'Campus Security'
        // };
        // transport.sendMail(message, function(err, info) {
        //     if (err) {
        //       console.log(err)
        //     } else {
        //       console.log(info);
        //     }
        // });
        // msg.form({
        //     "sender_id": "CAMPUS SECURITY",
        //     "message":'\nWe have received a complaint from ' + req.user.name + ' with ID No. : ' + req.user.idno + ' with the following details:\n'+
        //               'Place : '+req.body.location+'\n'+
        //               'Description : '+req.body.description+'\n\n'+
        //               'We have started working on your complaint. We will get back to you soon.'+'\n\n'+
        //               'Regards\n'+
        //               'Campus Security',
        //     "language": "english",
        //     "route": "p",
        //     "numbers": req.user.phone,
        // })
        // msg.end(function (res) {
        //     if(res.error){
        //         console.log(res.error)
        //     }
        //     console.log(res.body)
        // })
        res.redirect('/'+req.user.type+'/profile')
    })
})

module.exports={
    route
}