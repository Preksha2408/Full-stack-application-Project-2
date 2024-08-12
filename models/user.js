const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {

  async checkPassword(password) {
    console.log(password);
    console.log(this.password);
    let check = await bcrypt.compare(password, this.password);
    console.log(check);
  return check
  // await bcrypt.compare(password, this.password)
  
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
      unique: false,
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
      async beforeCreate(user){
        user.password = await bcrypt.hash(user.password, 10)      
      return user;
      }
    }
  }
);

module.exports = User;
