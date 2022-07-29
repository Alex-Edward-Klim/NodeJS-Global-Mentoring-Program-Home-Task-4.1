import { DataTypes } from 'sequelize';
import dataBase from '../data-access/dataBase';

const UserGroup = dataBase.define(
  'UserGroup',
  {
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

export default UserGroup;
