const route = require('express').Router()
const passport = require('passport')
const Users = require('../db').Users

route.get('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/personnel/profile',{
        user:req.user
    })
})

route.post('/profile',(req,res)=>{
    console.log('In profile')
    if(!req.user){
        return res.redirect('/login')
    }
    res.render('../public/profile',{
        user:req.user
    })
})

route.get('/adduser',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/personnel/adduser')
})

route.post('/adduser',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Users.create({
        idno:req.body.idno,
        name:req.body.name,
        password:req.body.password,
        dob:req.body.dob,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        type:req.body.type
    }).then(()=>{
        res.redirect('/personnel/profile')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/personnel/profile')
    })
})

route.get('/viewdb',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Users.findAll({

    }).then((entries)=>{
        res.render('../public/personnel/viewdb',{
            entries
        })
    })
})

route.post('/updaterec',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Users.findOne({
        where:{
            idno:req.body.idno
        }
    }).then((entry)=>{
        res.render('../public/personnel/updaterecord',{
            entry
        })
    })
})

route.post('/updaterecord',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Users.update({
        name:req.body.name,
        password:req.body.password,
        dob:req.body.dob,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        type:req.body.type
    },{
        where:{
            idno:req.body.idno
        }
    }).then(()=>{
        res.redirect('/personnel/viewdb')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/personnel/viewdb')
    })
})

route.post('/deleterecord',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Users.destroy({
        where:{
            idno:req.body.idno
        }
    }).then(()=>{
        res.redirect('/personnel/viewdb')
    })
})

module.exports={
    route
}