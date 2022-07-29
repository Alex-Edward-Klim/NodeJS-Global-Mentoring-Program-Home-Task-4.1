const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const t = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('user', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });

      await queryInterface.createTable('group', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        permissions: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
      });

      await queryInterface.createTable('UserGroup', {
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        groupId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    const t = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('user');
      await queryInterface.dropTable('group');
      await queryInterface.dropTable('UserGroup');

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
