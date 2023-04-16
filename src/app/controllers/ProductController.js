import * as Yup from 'yup'
import Product from '../models/Products'
import Categoria from '../models/Categoria'
import User from '../models/User'


class ProductController {

    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            categoria_id: Yup.number().required(),
            offer: Yup.boolean(),
        })





        try {
            await schema.validateSync(request.body, {
                abortEarly: false
            })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }


        const { admin: isAdmin } = await User.findByPk(request.userId)
        if (!isAdmin) {
            return response.status(401).json()
        }

        const { filename: path } = request.file
        const { name, price, categoria_id, offer } = request.body


        const product = await Product.create({
            name,
            price,
            categoria_id,
            path,
            offer,

        })


        return response.json(product)

    }


    async index(request, response) {

        const products = await Product.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'name']
                }
            ]
        })
       
        return response.json(products)
    }





    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            categoria_id: Yup.number(),
            offer: Yup.boolean(),
        })


        try {
            await schema.validateSync(request.body, {
                abortEarly: false
            })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }


        const { admin: isAdmin } = await User.findByPk(request.userId)
        if (!isAdmin) {
            return response.status(401).json()
        }

        const { id } = request.params
        const product = await Product.findByPk(id)
        if (!product) {
            return response.json(401).json({ error: "erro no produto e no id" })
        }


        let path
        if (request.file) {
            path = request.file.filename
        }

        const { name, price, categoria_id, offer } = request.body


        await Product.update({
            name,
            price,
            categoria_id,
            path,
            offer,

        },
            { where: { id } }
        )


        return response.status(200).json({message: "Atualizacao com sucesso"})

    }











}



export default new ProductController()