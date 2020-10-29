const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints} = require('../db')

route.get('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='staff'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/staff/profile',{
        user:req.user
    })
})

route.get('/staffonly',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='staff'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/staff/staffonly')
})

module.exports={
    route
}