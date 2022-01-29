const router=require('express').Router()
const commentController=require('../controllers/comment')


router.post('/comment',commentController.createComment)
router.patch('/comment/:id',commentController.updateComment)
router.patch('/comment/:id/like',commentController.likeComment)
router.patch('/comment/:id/unlike',commentController.unLikeComment)
router.delete('/comment/:id',commentController.deleteComment)

module.exports=router