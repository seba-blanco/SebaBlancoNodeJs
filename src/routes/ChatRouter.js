const express = require('express');

const {Router} = express;

const chatController = require('../controllers/chatController');


const SecurityMiddleware = require("../middlewares/securityMiddleware");
const chatRouter = Router();

chatRouter.get('/',  chatController.getChats);


chatRouter.get('/:email', chatController.getChatByEmail);


module.exports = chatRouter;