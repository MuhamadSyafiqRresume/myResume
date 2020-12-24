'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('payment',{
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4,
            },
            rentId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            amount: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            billId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },      
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
        }, 
        {
            freezeTableName: true
        });
    },
    down: (queryInterface,Sequelize) => {
        return queryInterface.dropTable('payment');
    }
};