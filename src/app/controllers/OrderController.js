import * as Yup from 'yup'
import Product from '../models/Products'
import Categoria from '../models/Categoria'
import Order from '../schemas/Order'
import User from '../models/User'


class OrderController {



    async store(request, response) {

        const schema = Yup.object().shape({
            products: Yup.array().required().of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantidade: Yup.number().required(),
                })
            ),


        })



        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            console.log(err)
            return response.status(400).json({ error: err.errors })
        }





        const productsId = request.body.products
            .map(product => product.id)

        const orderProducts = await Product.findAll({
            where: {
                id: productsId
            },
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['name']
                }
            ]
        })


        const editedProduct = orderProducts
            .map(product => {

                const productIndex = request.body.products.findIndex(requestProduct => requestProduct.id === product.id)


                const newProduct = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    categoria: product.categoria.name,
                    url: product.url,
                    quantidade: request.body.products[productIndex].quantidade
                }

                return newProduct
            })






        const order = {
            user: {
                id: request.userId,
                name: request.userName
            },

            products: editedProduct,
            status: 'Pedido Realizado'
        }

        const orderPedido = await Order.create(order)

        return response.status(201).json(orderPedido)

    }

    async index(request, response) {
        const orders = await Order.find()

        return response.json(orders)
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            status: Yup.string().required(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            console.log(err)
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)
        if (!isAdmin) {
            return response.status(401).json()
        }


        const { id } = request.params
        const { status } = request.body



        try {

            await Order.updateOne({ _id: id }, { status: status })

        } catch (error) {

            return response.status(400).json({ error: error.message })
        }

        return response.json({ menssagem: "atualizado com sucesso" })
    }





}

export default new OrderController()