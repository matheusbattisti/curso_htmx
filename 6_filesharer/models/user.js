const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      nome: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
