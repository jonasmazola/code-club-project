import Sequelize, { Model } from "sequelize";


class Categoria extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return 'http://localhost:3001/categoria-file/' + this.path
                }
            }

        },

            {
                sequelize,
            })

        return this
    }


}

export default Categoria