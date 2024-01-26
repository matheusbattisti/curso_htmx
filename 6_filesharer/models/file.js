const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class File extends Model {}

  File.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      caminho: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "File",
    }
  );

  return File;
};
