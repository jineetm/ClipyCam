module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists before adding it
    const table = await queryInterface.describeTable('users');

    if (!table.first_name) {
      await queryInterface.addColumn('users', 'first_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!table.last_name) {
      await queryInterface.addColumn('users', 'last_name', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Safely remove columns if they exist
    const table = await queryInterface.describeTable('users');

    if (table.first_name) {
      await queryInterface.removeColumn('users', 'first_name');
    }

    if (table.last_name) {
      await queryInterface.removeColumn('users', 'last_name');
    }
  },
};
