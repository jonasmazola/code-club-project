import * as Yup from 'yup'
import Ordem from '../models/Ordem'
import Produto from '../models/Products'
import Categoria from '../models/Categoria'
import Usuario from '../models/User'
import { sequelize } from 'sequelize'

class OrdemController {

    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array().required().of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),


        })


        try {
            await schema.validateSync(request.body, {
                abortEarly: false
            })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }



        
        
        // recuperando o ultimo ID
        const ultimoidSalvo = await Ordem.findAll({
            order: [['id', 'DESC']],
            limit: 1
          });
          
          const ultimoId = ultimoidSalvo.length > 0 ? ultimoidSalvo[0].id : null;
        console.log(ultimoId)


        // segunda tentativa de domingo funcionando
     
            const array = request.body.products;
            array.forEach(products => {
                Ordem.create({
                    id_produto: products.id,
                    quantidade: products.quantity,
                    id_pedido: ultimoId+1
                }).then(() => {
                    console.log('Elemento salvo com sucesso!');
                }).catch(err => {
                    console.error('Erro ao salvar o elemento:', err);
                });
            });

            response.send('Array recebido e salvando no banco de dados...');
        
        console.log(array)


    











        // const ordem = await Ordem.create({
        //     products: {
        //         id: request.body.products,
        //         quantidade: request.body.products
        //     }
        // })

        // return response.status(201).json(ordem)




    }



    async index(request, response) {
        const ordem = await Ordem.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'name']
                },

                {
                    model: Produto,
                    as: 'produto',
                    attributes: ['id', 'name']
                },

                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'name']
                },
            ]
        })

     
        return response.json(ordem)
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













export default new OrdemController()