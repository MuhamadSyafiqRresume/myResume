'use strict';
module.exports = (sequelize, DataTypes) => {
    var users = sequelize.define('users', {
        id: {
            type: DataTypes.STRING, //UUID
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ICNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        licenceClass: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expiryDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fullAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isGuest: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        isHost: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {
        freezeTableName: true
    });

    users.associate = (models) => {
        users.hasMany(models.car, {
            foreignKey: "ownerId",
            // required:true
        });
        users.hasMany(models.rent, {
            foreignKey: "guestId",
            // required:true
        });
    };

    // users.belongTo = (models) => {
    //     users.belongsTo(models.car, {foreignKey: 'ownerId'})
    // };
    return users;
}