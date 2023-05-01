import { Router } from "express"
import UserController from "./app/controllers/UserController"
import multer from "multer"
import multerConfig from './config/multer'


import User from './app/models/User'
import SessionController from "./app/controllers/SessionController"
import ProductController from "./app/controllers/ProductController"
import authMiddleware from './app/middlewares/auth'
import CategoriaController from "./app/controllers/CategoriaController"
import OrdemController from "./app/controllers/OrdemController"
import NovoPedidoController from './app/controllers/NovoPedidoController'


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

routes.get('/ordem', OrdemController.index)
routes.post('/ordem',upload.single('file'), OrdemController.store)
routes.put('/ordem/:id',upload.single('file'), OrdemController.update)

routes.get('/novoPedido', NovoPedidoController.index)

export default routes

