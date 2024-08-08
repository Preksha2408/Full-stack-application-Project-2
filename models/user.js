const { Model, DataTypes } = require("sequelize");
const sequelize = require("");
const bcrypt = require("bcrypt");
class User extends Model { }
class User extends Model { }
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
    },
    {
        sequelize,
        hooks: {
            beforeCreate: (userObj) => {
                userObj.password = bcrypt.hashSync(userObj.password, 5);
                return userObj;
            },
        },
    }
);

module.exports = User;
