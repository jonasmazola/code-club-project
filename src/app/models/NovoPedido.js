import Sequelize, { Model } from "sequelize";


class NovoPedido extends Model {
    static init(sequelize) {
        super.init({
            status: Sequelize.STRING,

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


    }



}

export default NovoPedido