const route = require('express').Router()
const passport = require('passport')
const Users = require('../db').Users

route.get('/signup',(req,res)=>{
    res.render('../public/consumer')
})

route.post('/signup',(req,res)=>{
    console.log(req.body.username+" "+req.body.password+" "+req.body.email)
    Users.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        type:"Consumer"
    }).then(()=>{
        res.redirect('/user/login')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/user/signup')
    })
})

route.get('/login',(req,res)=>{
    res.render('../public/consumer')
})

route.post('/login',
    passport.authenticate('local',{
        successRedirect:'/user/profile',
        failureRedirect:'/user/login'
    })
)

route.get('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/user/login')
    }
    res.render('../public/profile',{
        user:req.user
    })
})

route.post('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/user/login')
    }
    res.render('../public/profile',{
        user:req.user
    })
})

route.get('/logout',function(req,res){
    console.log("Logging Out " + req.user.username);
    req.logout();
    res.send('Success');
});

module.exports={
    route
}