'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users',{
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
            username: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: true
            },
            ICNumber: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            licenceClass: {
                type: Sequelize.STRING,
                allowNull: true
            },
            expiryDate: {
                type: Sequelize.STRING,
                allowNull: true
            },
            fullAddress: {
                type: Sequelize.STRING,
                allowNull: true
            },
            isGuest: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            isHost: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            isApproved: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface,Sequelize) => {
        return queryInterface.dropTable('users');
    }
}