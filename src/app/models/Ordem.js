import Sequelize, { Model } from "sequelize";


class Ordem extends Model {
    static init(sequelize) {
        super.init({
            id_usuario: Sequelize.STRING,
            name_usuario: Sequelize.STRING,
            id_pedido: Sequelize.INTEGER,
            id_produto: Sequelize.STRING,
            name_produto: Sequelize.STRING,
            price: Sequelize.INTEGER,
            id_categoria: Sequelize.INTEGER,
            quantidade: Sequelize.INTEGER,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return 'http://localhost:3001/ordem-file' + this.path
                }
            }



        },
            {
                sequelize,
            })

        return this
    }

    static associate(models) {
        this.belongsTo(models.User,
            {
                foreignKey: 'id_usuario',
                as: 'usuario'
            })

        this.belongsTo(models.Product,
            {
                foreignKey: 'id_produto',
                as: 'produto'
            })

        this.belongsTo(models.Categoria, {
            foreignKey: 'id_categoria',
            as: 'categoria'
        })

    }



}

export default Ordem