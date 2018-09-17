const express = require('express');

const { Url } = require('../models/url');
const { authenticateUser } = require('../middlewares/authentication');
const _ = require('lodash');

const router = express.Router();

router.get('/', authenticateUser, (req,res) => {
    Url.find()
    .then((urls) => {
        res.send({
            urls,
            notice: 'Displaying all the urls'
        });
    })
    .catch((err) => {
        res.send(err);
    });
});

router.get('/:id', authenticateUser, (req,res) => {
    let id = req.params.id;
    
    Url.findById(id)
    .then((urls) => {
        res.send({
            urls,
            notice: 'Displaying the particular url'
        });
    })
    .catch((err) => {
        res.send(err);
    });
});

router.get('/tags', authenticateUser, (req,res) => {
    let names = req.query.names;
    
    let values = names.split(',');

    Url.find({tags: {"$all": values }})
    .then((urls) => {
        res.send(urls);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.get('/tags/:name', authenticateUser, (req,res) => {
    let name = req.params.name;

    Url.find({ tags: name})
    .then((urls) => {
        res.send({
            urls
        })
    })
    .catch((err) => {
        res.send(err);
    })
});

// authenticateUser middleware is not required, should be treated as publicly accessible

// Response is redirected to original_url
// router.get('hashed_url/:hash', (req,res) => {
//     let hash = req.params.hash;

//     Url.findOne({hashed_url: hash})
//     .then((url) => {
//         res.redirect(`${url.original_url}`);
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// });

// Mongo-db's array update method: $PUSH
router.get('/hashed_url/:hash', (req,res) => {
    let hash = req.params.hash;
    let body = {
        ipAddress: req.ip,
        browserName: req.useragent.browser,
        osType: req.useragent.os,
        deviceType: req.useragent.isDesktop ? 'Desktop' : 'Mobile'
    }
    Url.findOneAndUpdate({hashed_url: hash}, {$push: {clicks: body }}, {new: true})
    .then((url) => {
        res.send(url);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/', authenticateUser, (req,res) => {
    let body = _.pick(req.body, ['title','original_url','tags','clicks']);
    let url = new Url(body);
    url.user = req.locals.user._id;
    
    url.save()
    .then((url) => {
        res.send({
            url,
            notice: 'Successfully created an url record'
        })
    })
    .catch((err) => {
        res.send(err);
    })
});

router.put('/:id', authenticateUser, (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body,['title','tags','clicks']);
    
    Url.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((url) => {
        res.send({
            url,
            notice: 'Successfully updated an url record'
        })
    })
    .catch((err) => {
        res.send(err);
    })
});

router.delete('/:id', authenticateUser, (req,res) => {
    let id = req.params.id;
    
    Url.findByIdAndRemove(id)
    .then((url) => {
        res.send({
            url,
            notice: 'Successfully deleted an url record'
        })
    })
    .catch((err) => {
        res.send(err);
    })
});

module.exports = {
    urlsController: router
}