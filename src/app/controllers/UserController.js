import { v4 } from 'uuid'
import * as Yup from 'yup'


import User from '../models/User'

class UserController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(4),
            admin: Yup.boolean()

        })

        // if(!(await schema.isValid(request.body))){
        //     return  response.status(400).json({error: 'Errado ao cadastrar'})
        // }

        try {
            await schema.validateSync(request.body, { abortEarly: false })

        } catch (err) {
            console.log(err)
            return response.status(400).json({ error: err.errors })
        }


        const {
            name,
            email,
            password,
            admin
        } = request.body

        const userExist = await User.findOne({
            where: { email }
        })

        if(userExist){
            return response.status(400).json({ error: 'Esse email ja existe!'})
        }

        console.log(userExist)

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin
        })

        return response.status(201).json({ id: user.id, name, email, admin })


    }
}

export default new UserController()