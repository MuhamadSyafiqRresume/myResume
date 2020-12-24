'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('session',{
            sid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4,
            },
            expire: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            sess: {
                allowNull: false,
                type: Sequelize.JSON,
            },
        }, 
        {
            freezeTableName: true
        });
    },
    down: (queryInterface,Sequelize) => {
        return queryInterface.dropTable('session');
    }
};