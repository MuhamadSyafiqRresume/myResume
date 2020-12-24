'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('rent',{
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4,
            },
            carId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            isPaid: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            guestId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            hostId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            dateFrom: {
                type: Sequelize.DATE,
                allowNull: false
            },
            dateTo: {
                type: Sequelize.DATE,
                allowNull: false
            },
            
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },        
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            status:{
                type: Sequelize.STRING,
                allowNull: true
            },
            rate:{
                type: Sequelize.STRING,
                allowNull: true
            },
            authorizedBy:{
                type: Sequelize.STRING,
                allowNull: true
            }
        }, 
        {
            freezeTableName: true
        });
    },
    down: (queryInterface,Sequelize) => {
        return queryInterface.dropTable('rent');
    }
};