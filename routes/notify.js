const router=require('express').Router()
const notifyController = require('../controllers/notify')


router.post('/notify',notifyController.createNotify)
router.delete('/notify/:id',notifyController.removeNotify)
router.get('/notifies',notifyController.getNotifies)

router.patch('/isReadNotify/:id',notifyController.isRead)

router.delete('/deleteAllNotify',notifyController.deleteAllNotifies)



module.exports=router