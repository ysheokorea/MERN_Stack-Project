const router = require('express').Router();
const Conversation = require('../model/Conversation');
const {
    createConversation,
    getConversation,
    getTwoConversation,
} = require('../controller/conversation')

// create Conversation


router.post('/', createConversation)

// get conversation of a user

router.get('/:userId', getConversation)

// get Conversation includes two userId
router.get('/find/:firstUserId/:secondUserId', getTwoConversation)

module.exports = router;