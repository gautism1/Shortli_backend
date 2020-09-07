const express = require('express');
const router = express.Router();
const validurl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
let url = require('../module/url');
const bodyParser = require('body-parser');
//@route  POST /api.url.shorten
//@desc  Create short url
router.use(bodyParser.urlencoded({
    extended: true
}));
router.post('/shorten', async (req, res) => {
    // console.log("asadjada",req.body);
    const {
        longurl
    } = req.body;
    const baseurl = config.get('baseURL');
    if (!validurl.isUri(baseurl)) {
        return res.status(401).json('invalid base url');
    }
    let urlCode = shortid.generate();
    //check for longurl
    console.log("garjuus", urlCode);
    //running uptill here::
    if (validurl.isUri(longurl)) {
        try {
            let Url = url.findOne({
                longurl
            });
            // console.log('gasaa',Url);
            //running uptill here
            if (!Url) {
                res.json(Url);
            } else {
              let shorturl = baseurl + urlCode;
                url = new url({
                    longurl,
                    shorturl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('server error not running');
        }
    } else {
        res.status(401).json('Url wss not appropriate')
    }
});

module.exports = router;