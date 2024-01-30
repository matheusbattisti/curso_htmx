const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class File extends Model {
    static associate(models) {
      // Definindo a relação com o modelo User
      File.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  File.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      caminho: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "File",
    }
  );

  return File;
};
