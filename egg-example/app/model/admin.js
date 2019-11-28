'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Admin = app.model.define('admin', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(30),
        username: STRING(30),
        password: STRING(30),
        created_at: DATE,
        updated_at: DATE
    }, {
        timestamps: false,
    });

    return Admin;
};