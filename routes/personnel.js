const route = require('express').Router()
const passport = require('passport')
const {Users,Complaints,HostelLog} = require('../db')
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
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    Complaints.update({
        resolutiontime:new Date().toLocaleString(),
        status:'Resolved'
    },{
        where:{
            id:req.body.id
        }
    }).then((entry)=>{
        console.log(entry)
        Complaints.findOne({
            where:{
                id:req.body.id
            }
        }).then((entry1)=>{
            Users.findOne({
                where:{
                    idno:entry1.dataValues.cidno
                }
            }).then((entry2)=>{
                const message = {
                    from: 'varunbajlotra@gmail.com',
                    to: entry2.dataValues.email,
                    subject: 'Complaint Resolved At Campus Security Portal',
                    text: 'You filed a complaint with the following details:\n'+
                          'Place : '+entry1.dataValues.location+'\n'+
                          'Description : '+entry1.dataValues.description+'\n'+
                          "Complainant's ID : "+entry1.dataValues.cidno+'\n'+
                          "Complainant's Name : "+entry1.dataValues.cname+'\n\n'+
                          'This is to inform you that your complaint has been resolved.'+'\n\n'+
                          'Regards\n'+
                          'Campus Security'
                };
                transport.sendMail(message, function(err, info) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log(info);
                    }
                });
                // msg.form({
                //     "sender_id": "CAMPUS SECURITY",
                //     "message":'\nYou filed a complaint with the following details:\n'+
                //               'Place : '+entry1.dataValues.location+'\n'+
                //               'Description : '+entry1.dataValues.description+'\n'+
                //               "Complainant's ID : "+entry1.dataValues.cidno+'\n'+
                //               "Complainant's Name : "+entry1.dataValues.cname+'\n\n'+
                //               'This is to inform you that your complaint has been resolved.'+'\n\n'+
                //               'Regards\n'+
                //               'Campus Security',
                //     "language": "english",
                //     "route": "p",
                //     "numbers": entry2.dataValues.phone,
                // })
                // msg.end(function (res) {
                //     if(res.error){
                //         console.log(res.error)
                //     }
                //     console.log(res.body)
                // })
                res.redirect('/personnel/viewcomplaints')
            })
        })
    })
})

route.get('/viewhostellog',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    HostelLog.findAll({
        where:{

        }
    }).then((hostellog)=>{
        res.render('../public/personnel/hostellog',{
            hostellog
        })
    })
})

route.get('/viewcctv',(req,res)=>{
    if(!req.user){
        return res.redirect('/')
    }
    if(req.user.type!='personnel'){
        return res.redirect('/'+req.user.type+'/profile')
    }
    res.render('../public/personnel/cctv')
})

module.exports={
    route
}