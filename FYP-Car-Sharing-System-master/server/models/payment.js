'use strict';
module.exports = (sequelize, DataTypes) => {
    var payment = sequelize.define('payment', {
        id: {
            type: DataTypes.STRING, //UUID
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        rentId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        billId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },      
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

    }, {
        freezeTableName: true
    });

    payment.associate = (models) => {
        // payment.hasMany(models.car, {
        //     foreignKey: "ownerId",
        //     // required:true
        // });
        payment.belongsTo(models.car, {
            foreignKey: "carId",
        });
        payment.belongsTo(models.rent, {
            foreignKey: "rentId",
        });
    };

    return payment;
}