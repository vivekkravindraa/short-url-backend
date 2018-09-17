const express = require('express');

const { urlsController } = require('../app/controllers/urls_controller');
const { usersController } = require('../app/controllers/users_controller');

const router = express.Router();

router.use('/urls',urlsController);
router.use('/users',usersController);

module.exports = { router }