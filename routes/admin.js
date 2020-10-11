const route = require('express').Router()
const passport = require('passport')

route.get('/login',(req,res)=>{
    console.log('In admin login')
    res.render('../public/admin')
})

route.post('/login',
    passport.authenticate('local',{
        successRedirect:'/admin/profile',
        failureRedirect:'/admin/abcd'
    })
    ,function(req,res){
        console.log("Logging In User: ")
        console.log(req.user)
        return res.redirect('/')
    }
)

route.get('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/admin/login')
    }
    res.render('../public/profile',{
        user:req.user
    })
})

route.post('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/admin/login')
    }
    res.render('../public/profile',{
        user:req.user
    })
})

module.exports={
    route
}