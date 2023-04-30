import express from "express"
import routes from "./routes"
import { resolve } from 'path'
import cors from 'cors'

import './database'

class App {
    constructor() {
        this.app = express()
        this.app.use(cors())

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')))
        this.app.use('/categoria-file', express.static(resolve(__dirname, '..', 'uploads')))
        this.app.use('/ordem-file', express.static(resolve(__dirname, '..', 'uploads')))
    }

    routes() {
        this.app.use(routes)
    }

}

export default new App().app