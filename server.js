const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const {Users,Complaints} = require('./db')

const app = express()
app.use(express.json({limit:'1mb'}))
app.use(express.urlencoded({extended:true,limit:'1mb'}))

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

app.use('/all',(require('./routes/all').route))
app.use('/personnel',(require('./routes/personnel').route))
app.use('/staff',(require('./routes/staff').route))
app.use('/student',(require('./routes/student').route))


app.listen(4422,()=>{
    console.log('Server started at http://localhost:4422')
})
