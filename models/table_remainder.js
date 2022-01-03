'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class table_remainder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  table_remainder.init({
    jenis_remainder: DataTypes.STRING,
    nama_remainder: DataTypes.STRING,
    tagihan: DataTypes.STRING,
    tgl_tagihan_telah_lunas: DataTypes.STRING,
    tgl_jatuh_tempo: DataTypes.STRING,
    status: DataTypes.STRING,
    keterlambatan_bayar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'table_remainder',
  });
  return table_remainder;
};