const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const checkWork = require('../middlewares/checkWork');
const workCtrl = require('../controllers/works.controller');

router.post('/', auth, multer, checkWork, workCtrl.create);
router.get('/', workCtrl.findAll);
router.delete('/:id', auth, workCtrl.delete);

router.get('/test', (req, res) => {
    res.status(200).json({ message: '✅ API accessible depuis l’extérieur !' });
  });

module.exports = router;
