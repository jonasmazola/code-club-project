import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
    async store(request, response) {


        const schema = Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        })

        const userEmailIncorrect = () => {
            return response.status(400).json({ error: 'Senha ou email invalidos, tente novamente!' })
        }

        if (!(await schema.isValid(request.body))) {
            userEmailIncorrect()
        }

        const { email, password } = request.body

        const user = await User.findOne({
            where: { email },
        })

        if (!user) {
            userEmailIncorrect()
        }

        if (!(await user.checkPassword(password))) {
            userEmailIncorrect()
        }

        return response.json(
            {
                id: user.id,
                email,
                name: user.name,
                admin: user.admin,
                token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                }),
            })
    }
}



export default new SessionController()