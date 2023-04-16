import { Router } from "express"
import UserController from "./app/controllers/UserController"
import multer from "multer"
import multerConfig from './config/multer'


import User from './app/models/User'
import SessionController from "./app/controllers/SessionController"
import ProductController from "./app/controllers/ProductController"
import authMiddleware from './app/middlewares/auth'
import CategoriaController from "./app/controllers/CategoriaController"
import OrderController from "./app/controllers/OrderController"

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)


routes.use(authMiddleware)

routes.get('/products', ProductController.index)
routes.post('/products', upload.single('file'), ProductController.store)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.get('/categorias', CategoriaController.index)
routes.post('/categorias', upload.single('file'), CategoriaController.store)
routes.put('/categorias/:id', upload.single('file'), CategoriaController.update)


routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)


export default routes

