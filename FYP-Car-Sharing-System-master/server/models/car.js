'use strict';
module.exports = (sequelize, DataTypes) => {
    var car = sequelize.define('car', {
        id: {
            type: DataTypes.STRING, //UUID
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ownerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locationLatitude: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        locationLongitude: {
            type: DataTypes.STRING,
            allowNull: true
        },
        carImage: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        carModel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gpsId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        ratePerDay: {
            type: DataTypes.NUMERIC,
            allowNull: false
        },
        availableFrom: {
            type: DataTypes.DATE,
            allowNull: true
        },
        availableTo: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isapproved: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        authorizedbyid:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    // car.associate = (models) => {
    //     car.hasOne(models.users, {
    //         foreignKey: "id",
    //     });
    // };

    car.associate = (models) => {
        car.belongsTo(models.users, {
            foreignKey: "ownerId",
        });
        car.hasMany(models.rent, {
            foreignKey: "carId",
            required:true
        });
    };

    // car.belongTo = (models) => {
    //     car.belongsTo(models.users, {
    //         foreignKey: 'id',
    //     });
    // };

    return car;
}