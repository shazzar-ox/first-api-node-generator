const router = require('express').Router()

const {
    getAllData,
    pushData,
    queryData,
    patchData,
    updateData,
    deleteData
} = require('../controllers/manage_employe')

router.route('/all').get(getAllData)
router.route('/').post(pushData).get(queryData)
router.route('/:id').patch(patchData).put(updateData).delete(deleteData)

module.exports = router