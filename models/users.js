'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const salt = bcrypt.genSaltSync(15);
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  users.addHook('beforeCreate',(users, options) => {
    users.password = bcrypt.hashSync(users.password, salt);
  });
  users.addHook('beforeUpdate',(users, options) => {
    users.password = bcrypt.hashSync(users.password, salt);
  })
  return users;
};