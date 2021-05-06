const express = require('express');
const router = express.Router();

const bot = require('./controllers/bot')

router.get('/bot', bot.getBot)
router.post('/bot', bot.botsantista)

module.exports = router;