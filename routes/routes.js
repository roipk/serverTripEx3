const express = require('express'),
    ShuruTuru = require('./ShuruTuru');

var router = express.Router();

router.get('/shuruturu', ShuruTuru.read_tour);
router.post('/shuruturu', ShuruTuru.createTour);
router.put('/shuruturu/:id', ShuruTuru.updateTour);
router.delete('/shuruturu/:id', ShuruTuru.deleteTour);


module.exports = router;
