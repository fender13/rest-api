const model = require('../models')
const comparePassword = require('../helpers/comparePassword')
const jwt = require('jsonwebtoken')
const ENV = require('dotenv')
ENV.config()

class UserController {
  static createUser(req, res) {
    const { firstName, lastName, email, username, password, role } = req.body

    model.User
      .create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        role: role
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server Error'
        })
      })
  }

  static findAll(req, res) {
    model.User
      .findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  static findOne(req, res) {
    model.User
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((data) => {
        console.log(req.username)
        if (req.username != data.username) {
          res.status(401).json({
            message: 'Dilarang melihat data orang lain'
          })
        } else {
          res.status(200).json(data)
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server Error'
        })
      })
  }

  static updateUser(req, res) {
    const { firstName, lastName, email, username, password, role } = req.body
    model.User
      .findOne(
        {
          where: {
            id: Number(req.params.id)
          }
        }
      ) 
      .then((data) => {
        if (req.username != data.username) {
          res.status(401).json({
            message: 'Dilarang update data orang lain'
          })
        } else {
          data.id = Number(req.params.id)
          data.firstName = firstName
          data.lastName = lastName
          data.email = email
          data.username = username
          data.password = password
          data.role = role
          return data.save()
        }
      })
      .then((user) => {  
        res.status(200).json(user)
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server Error'
        })
      })
  }

  static deleteUser(req, res) {
    model.User
      .destroy({
        where: {
          id: req.params.id,
        }
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((data) => {
        res.status(500).json({
          message: 'Internal server Error'
        })
      })
  }

  static userLogin(req, res) {
    const { username, password } = req.body
    let data

    model.User
      .findOne({
        where: {
          username: username
        }
      })
      .then((user) => {
        data = user
        if (!user) {
          res.status(400).json({
            message: 'Username atau Password anda salah'
          })
        } else {
          return comparePassword(password, user.password)
        }
      })
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: 'Username atau Password anda salah'
          })
        } else {
          const payload = {
            id: data.id,
            username: data.username,
            role: data.role
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET)
          res.status(200).json({
            token: token
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server Error'
        })
      })
  }

  static userSignUp(req, res) {
    const { firstName, lastName, email, username, password } = req.body

    model.User
      .create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        role: 'member'
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Internal server Error'
        })
      })
  }
}

module.exports = UserController