const Sequelize = require('sequelize')

const database = new Sequelize({
    dialect:'sqlite',
    storage: __dirname+'/database.db',
    transactionType: 'IMMEDIATE'
})

const Users = database.define('users',{
    username:{
        type:Sequelize.STRING(30),
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    type:{
        type:Sequelize.STRING(15)
    }
})

database.sync().then(()=>{
    console.log('DataBase Structure Ready Bancho')
})

module.exports={
    database,Users
}