'use strict';
const Op = require('sequelize').Op
const bcrypt = require('bcrypt')
const ENV = require('dotenv')
ENV.config()
const saltrounds = Number(process.env.SALTROUNDS)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: {
          args: true,
          msg: 'EMAIL CAN\'T EMPTY'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'USERNAME CAN\'T EMPTY'
        },
        cekUnique(getUsername) {
            return User.findOne(
              {
                where: {            
                  username: getUsername,
                  id: { [Op.ne]: this.id }
                }
              }
            )
              .then((data) => {
                if (data) {
                  throw new Error('This username already exists!!')
                }
              })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'PASSWORD CAN\'T EMPTY'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        return bcrypt.hash(user.password, saltrounds)
          .then(function(hash) {
            user.password = hash
              // Store hash in your password DB.
          })
      },
      beforeUpdate: (user) => {
        console.log('masuk')
        return bcrypt.hash(user.password, saltrounds)
          .then(function(hash) {
            user.password = hash
              // Store hash in your password DB.
          })
      },
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};