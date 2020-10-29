const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints} = require('../db')

route.get('/profile',(req,res)=>{
    console.log('In profile')
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

module.exports={
    route
}