const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints} = require('../db')

route.get('/profile',(req,res)=>{
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
        type:req.body.type,
        location:'Outside Campus'
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
    entries1 = []
    Users.findAll({
        where:{
            location:'Inside Campus'
        }
    }).then((entries)=>{
        entries1 = entries
        Users.findAll({

        }).then((entries2)=>{
            res.render('../public/personnel/viewdb',{
                entries1,entries2
            })
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

route.get('/viewcomplaints',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Complaints.findAll({
        where:{
            status:'Pending'
        }
    }).then((pending)=>{
        Complaints.findAll({
            where:{
                status:'Resolved'
            }
        }).then((resolved)=>{
            res.render('../public/personnel/viewcomplaints',{
                pending,resolved
            })
        })
    })
})

route.post('/resolvecomplaint',(req,res)=>{
    Complaints.update({
        resolutiontime:new Date().toLocaleString(),
        status:'Resolved'
    },{
        where:{
            id:req.body.id
        }
    }).then(()=>{
        res.redirect('/personnel/viewcomplaints')
    })
})

module.exports={
    route
}