'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email_jatuh_tempo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  email_jatuh_tempo.init({
    id_remainder: DataTypes.INTEGER,
    jenis_remainder: DataTypes.STRING,
    status_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'email_jatuh_tempo',
  });
  return email_jatuh_tempo;
};