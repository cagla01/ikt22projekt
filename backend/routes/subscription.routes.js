const express = require('express');
const webpush = require('web-push');
const router = express.Router();

const publicVapidKey = 'BM8oZZuUzCbrrBLou5ALaLvDqFoZ-spsUse8B_HYgLF0iA6NGYXIWMRrtEPZ4foBIYj2GiJOHsDTW1aq9RKdyag';
const privateVapidKey = 'Rk-rutEWKJc1PECEWeGj-dEQ5jc3r7DtnZ6vWFaLkww';

router.post('/', async(req, res) => {
    const subscription = req.body;
    console.log('subscription', subscription);
    res.status(201).json({ message: 'subscription received'});

    webpush.setVapidDetails('mailto:Cagla.Karaman@Student.HTW-Berlin.de', publicVapidKey, privateVapidKey);
});

module.exports = router;