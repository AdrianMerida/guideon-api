const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')

// router.get('/', controller.base);
router.get('/', usersController.home)

//  CREAR LAS RUTAS & LOS CONTROLADORES

module.exports = router;