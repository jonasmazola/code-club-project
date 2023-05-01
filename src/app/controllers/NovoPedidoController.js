import * as Yup from 'yup'
import Ordem from '../models/Ordem'
import User from '../models/User'
import Produto from '../models/Products'
import Categoria from '../models/Categoria'
import Usuario from '../models/User'
import NovoPedido from '../models/NovoPedido'
import { where } from 'sequelize'

class NovoPedidoController {

    async index(request, response) {
        const novoPedido = await NovoPedido.findAll({
            include: [

                {
                    model: Ordem,
                    as: 'products',
                    attributes: ['id', 'id_pedido', 'name_produto', 'price', 'quantidade', 'id_categoria', 'path' ]
                },

                {
                    model: User,
                    as: 'usuario',
                    attributes: ['id', 'name']
                },

                

            ]
        })



     
        return response.json(novoPedido)
    }




    async update(request, response) {
        const schema = Yup.object().shape({
            id_usuario: Yup.string(),
            id_produto: Yup.string(),
            price: Yup.number(),
            id_categoria: Yup.string(),
            quantidade: Yup.number()
        })

        const { filename: path } = request.file
        const {
            id_usuario,
            id_produto,
            price,
            id_categoria,
            quantidade
        } = request.body

        const { id } = request.params

        const validarOrdem = await Ordem.findOne({
            where: { id }
        })

        const validarCategoria = await Categoria.findOne({
            where: { id: id_categoria }
        })

        const validarUser = await Usuario.findOne({
            where: { id: id_usuario }
        })

        const validarProduto = await Produto.findOne({
            where: { id: id_produto }
        })


        // console.log(id)
        const { admin: isAdmin } = await Usuario.findByPk(request.userId)
        if (!isAdmin) {
            return response.status(400).json({ messagem: "Voce nao tem autorizacao para esta mudanca" })
        }

        if (!validarOrdem) {
            return response.status(400).json({ message: "esta Ordem de pedido nao existe, selecione outra porfavor!" })
        }

        if (!validarUser) {
            return response.status(400).json({ message: "usuario nao existe, selecione outro!" })
        }

        if (!validarCategoria) {
            return response.status(400).json({ message: "Esta categoria nao existe, porfavor selecione outra" })
        }

        if (!validarProduto) {
            return response.status(400).json({ message: "produto nao existe, selecione outro!" })
        }


        await Ordem.update({
            id_usuario,
            id_produto,
            price,
            id_categoria,
            quantidade,
            path
        },

            { where: { id } }

        )


        return response.status(200).json({ message: "Atualizado com sucesso!" })

    }




}













export default new NovoPedidoController()