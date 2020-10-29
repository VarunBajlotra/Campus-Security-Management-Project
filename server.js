const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const Users = require('./db').Users

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'bhjcdvdkbzckdsbscsjvsh',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(__dirname+'/public'))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.render('../public/landing')
})

app.get('/hello',(req,res)=>{
    console.log('Hello User')
})

app.post('/login',passport.authenticate('local',{
        failureRedirect:'/'
    }),(req,res)=>{
    res.redirect('/'+req.user.type+'/profile')
})

app.use('/user',(require('./routes/user').route))
app.use('/personnel',(require('./routes/personnel').route))


app.listen(4422,()=>{
    console.log('Server started at http://localhost:4422')
})
