const express = require('express')
const db = require('./db').database
const session = require('express-session')
const passport = require('./passport')

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

app.use('/',express.static(__dirname+'/public/landing'))

app.use('/user',(require('./routes/user').route))
app.use('/admin',(require('./routes/admin').route))


app.listen(4321,()=>{
    console.log('Server started at http://localhost:4321')
})
