const router=require('express').Router()
const messageController=require('../controllers/message')

router.post('/message',messageController.createMessage)
router.get('/conversations',messageController.getConversations)
router.get('/message/:id',messageController.getMessages)




module.exports=router