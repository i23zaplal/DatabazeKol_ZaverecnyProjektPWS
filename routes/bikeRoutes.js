const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');
const upload = require('../middlewares/upload');


router.get('/', bikeController.getAllBikes);


router.get('/add', bikeController.getAddBikeForm);


router.post('/add', upload.single('image'), bikeController.createBike);


router.get('/edit/:id', bikeController.getEditForm);
router.get('/bike/:id', bikeController.getBikeDetails);
router.post('/edit/:id', upload.single('image'), bikeController.updateBike);


router.post('/delete/:id', bikeController.deleteBike);

router.get('/bike/:id', bikeController.getBikeDetails);

module.exports = router;

