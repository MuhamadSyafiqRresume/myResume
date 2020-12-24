'use strict';
module.exports = (sequelize, DataTypes) => {
    var rent = sequelize.define('rent', {
        id: {
            type: DataTypes.STRING, //UUID
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        carId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        guestId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hostId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateFrom: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateTo: {
            type: DataTypes.DATE,
            allowNull: false
        },
        
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },        
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: true
        },
        rate:{
            type: DataTypes.STRING,
            allowNull: true
        },
        authorizedBy:{
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        freezeTableName: true
    });

    rent.associate = (models) => {
        rent.hasMany(models.payment, {
            foreignKey: "rentId",
        });
        rent.belongsTo(models.car, {
            foreignKey: "carId",
        });
        rent.belongsTo(models.rent, {
            foreignKey: "guestId",
        });
    };

    return rent;
}