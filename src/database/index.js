import Sequelize from 'sequelize'
import User from '../app/models/User'
import configDataBase from '../config/database'
import Product from '../app/models/Products'
import Categoria from '../app/models/Categoria'
import mongoose from 'mongoose'


const models = [User, Product, Categoria]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }



    init() {
        this.connection = new Sequelize(configDataBase)
        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/codebuger',
        {
           useNewUrlParser: true,
           useUnifiedTopoLogy: true, 
        })
    }
}


export default new Database()