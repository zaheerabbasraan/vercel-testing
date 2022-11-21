'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const hashedPwd = await bcrypt.hash('admin123',10);
      await queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        email: 'admin@snowfun.com',
        password: hashedPwd,
        roles: '{"admin": 5150}',
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
