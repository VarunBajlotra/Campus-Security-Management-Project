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
        type:Sequelize.STRING(50),
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    gender:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    type:{
        type:Sequelize.STRING(15),
        allowNull:false
    },
    location:{
        type:Sequelize.STRING(30),
        allowNull:false
    }
})

const Complaints = database.define('complaints',{
    cidno:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    cname:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    location:{
        type:Sequelize.STRING(100)
    },
    description:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    time:{
        type:Sequelize.STRING(40),
        allowNull:false
    },   
    status:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    resolutiontime:{
        type:Sequelize.STRING(40)
    }
})

const HostelLog = database.define('hostellog',{
    idno:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    name:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    entrytime:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    predictedgender:{
        type:Sequelize.STRING(40)
    }
})

database.sync().then(()=>{
    console.log('DataBase Structure Ready!!')
})

module.exports={
    Users,Complaints,HostelLog
}