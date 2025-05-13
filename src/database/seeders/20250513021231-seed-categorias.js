module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      {
        nombre: 'Acción',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Comedia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Drama',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});
  },
};
