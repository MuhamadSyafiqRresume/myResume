'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('car',{
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            registrationNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            ownerId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            locationLatitude: {
                type: Sequelize.STRING,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true
            },
            locationLongitude: {
                type: Sequelize.STRING,
                allowNull: true
            },
            carImage: {
                type: Sequelize.BLOB,
                allowNull: true
            },
            carModel: {
                type: Sequelize.STRING,
                allowNull: true
            },
            gpsId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            ratePerDay: {
                type: Sequelize.NUMERIC,
                allowNull: false
            },
            availableFrom: {
                type: Sequelize.DATE,
                allowNull: true
            },
            availableTo: {
                type: Sequelize.DATE,
                allowNull: true
            },
            isapproved: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            authorizedbyid:{
                type: Sequelize.STRING,
                allowNull: true
            }
        }, 
        {
            freezeTableName: true
        });
    },
    down: (queryInterface,Sequelize) => {
        return queryInterface.dropTable('car');
    }
};