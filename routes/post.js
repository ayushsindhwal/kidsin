const router = require('express').Router();
const { likePost, unLikePost } = require('../controllers/post');
const postController=require('../controllers/post')
router.route('/posts')
       .post(postController.createPost)
       .get(postController.getPost)

router.route('/post/:id')
      .get(postController.getpostsingle)
      .patch(postController.updatePost)
router.patch('/post/:id/like',likePost)
router.patch('/post/:id/unlike',unLikePost)

router.delete('/post/:id',postController.deletePost)
module.exports=router