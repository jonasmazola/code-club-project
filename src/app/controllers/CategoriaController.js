import * as Yup from 'yup'
import Categoria from '../models/Categoria'
import User from '../models/User'


class CategoriaController {

    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required()
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
            return response.status(401).json({ error: "Voce nao tem autoridade para fazer isso" })
        }


        const { name } = request.body
        const { filename: path } = request.file

        const categoriaExistente = await Categoria.findOne({
            where: { name },
        })

        if (categoriaExistente) {
            return response.status(400).json({ error: 'Categoria existente.! Porfavor selcione outra categoria.!' })
        }

        const { id } = await Categoria.create({ name, path })


        return response.json({ id, name })

    } catch(err) {

    }



    async index(request, response) {
        const categoria = await Categoria.findAll()

        return response.json(categoria)
    }





    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string()
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
            return response.status(401).json({ error: "Voce nao tem autoridade para fazer isso" })
        }


        const { name } = request.body

        const { id } = request.params

        const categoria = await Categoria.findByPk(id)


        if (!categoria) {
            return response.status(400).json({ error: 'Categoria não existente.! Porfavor selcione outra categoria.!' })
        }

        console.log(request.file)
        let path
        if (request.file) {
            path = request.file.filename
        }

        await Categoria.update({ name, path }, {
            where: { id }
        })


        return response.json({ id, name })

    } catch(err) {
        console.log(err)
    }


}



export default new CategoriaController()