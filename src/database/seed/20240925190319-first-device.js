'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Device', [
      {
        name_device: '1º  Serv. JJ Nota Fiscais e WTA',
        access_code: 'ID:801564593',
        category: 'SERVER',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Device', null, {});
  }
};
