const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints} = require('../db')

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
        res.redirect('/'+req.user.type+'/profile')
    })
})


module.exports={
    route
}