const Sequelize = require('sequelize')

const database = new Sequelize({
    dialect:'sqlite',
    storage: __dirname+'/database.db',
    transactionType: 'IMMEDIATE'
})

const Users = database.define('users',{
    idno:{
        type:Sequelize.STRING(30),
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    name:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    dob:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(50)
    },
    phone:{
        type:Sequelize.STRING(50)
    },
    gender:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    type:{
        type:Sequelize.STRING(15),
        allowNull:false
    }
})

database.sync().then(()=>{
    console.log('DataBase Structure Ready!!')
})

module.exports={
    Users
}