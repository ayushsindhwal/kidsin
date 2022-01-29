const router=require('express').Router()
const { register, login ,logout, generateAccessToken, resetToken, resetPassword, emailToken, confirmEmail  }=require('../controllers/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/refresh_token',generateAccessToken)
router.post('/reset_token',resetToken)
router.post('/resetPassword',resetPassword)
router.put('/confirmtoken/:id',confirmEmail)
router.post('/resendemail',emailToken)

module.exports=router