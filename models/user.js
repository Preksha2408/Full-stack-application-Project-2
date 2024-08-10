const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  async hashPassword () {
    this.password = await bcrypt.hash(this.password, 10)        
  }
async checkPassword(password) {
  return bcrypt.compare(password, this.password)
} 
}

User.init(
  {
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    hooks: {
      async beforeSave(user){
        if (!user.changed("password"))
          return;
      await user.hashPassword()   
      }
    }
  }
);

module.exports = User;
