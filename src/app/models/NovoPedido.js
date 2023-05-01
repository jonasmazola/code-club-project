import Sequelize, { Model } from "sequelize";


class NovoPedido extends Model {
    static init(sequelize) {
        super.init({
            status: Sequelize.STRING,
            id_usuario: Sequelize.STRING,
            name_usuario: Sequelize.STRING

        },
            {
                sequelize,
            })

        return this
    }

    static associate(models) {
        this.hasMany(models.Ordem, {
            foreignKey: 'id_pedido',
            as: 'products'
        })

        this.belongsTo(models.User, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        })


    }



}

export default NovoPedido