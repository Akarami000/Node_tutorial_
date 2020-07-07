const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');
const favRouter = express.Router();
favRouter.use(bodyParser.json());

//all FAVORITES for a user
favRouter.route('/')
.options(cors.corsWithOption, (req, res) => {
    res.sendStatus(200);
})
.get(cors.corsWithOption,
    authenticate.verifyUser,
    (req, res, next) => {
        Favorites.findOne({user: req.user._id})
        .populate('user')
        .populate('dishes.dish')
        .then( (userFavs, err) => {
            
            if (userFavs != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(userFavs);
            }
            else {
                err = new Error('You no not have any favorites');
                status = 404;
                return next(err);
            }
        }, (err) => next(err))  
        .catch( (err) => next(err));
    })
.delete(cors.corsWithOption,
    authenticate.verifyUser,
    (req, res, next) => {
        Favorites.findOne({user: req.user._id})
        .then((userFavs) => {
            if (userFavs == null) {
                err = new Error('You no not have any favorites');
                status = 404;
                return next(err);
            }
            Favorites.findByIdAndRemove(userFavs._id)
            .then ((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(null);
            }, (err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })
.post(cors.corsWithOption,
    authenticate.verifyUser,
    (req, res, next) => {
        Favorites.findOne({user: req.user._id})
        .then((favorite) => {
            if (favorite == null) {
                //new user
                favorite = new Favorites({user: req.user._id});
            }
            //my future me will figure out the findById....
            for (var i = 0; i < req.body.length; i++) {
                var found = false;
                for (var j = 0; j < favorite.dishes.length; j++) {
                    if (favorite.dishes[j]._id.equals(req.body[i]._id))
                        found = true;
                }
                if (!found) {
                    favorite.dishes.push(req.body[i]._id);
                }
            }
            favorite.save()
            .then((userFavs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(userFavs);
            }, (err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err))
    })
    
;
//add single favorite
favRouter.route('/:dishId')
.options(cors.corsWithOption, (req, res) => {
    res.sendStatus(200);
})
.delete(cors.corsWithOption,
    authenticate.verifyUser,
    (req, res, next) => {
        Favorites.findOne({user: req.user._id})
        .then( (userFavs) => {
            if (userFavs != null
                && userFavs.dishes.id(req.params.dishId) != null) {
                userFavs.dishes.id(req.params.dishId).remove();
                userFavs.save()
                .then((userFavs) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(userFavs); 
                }, (err) => next(err));
            }
            else {
                err = new Error('You do not have that dish as a favorite');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))  
        .catch( (err) => next(err));
    })

.post(cors.corsWithOption, 
    authenticate.verifyUser,
    (req, res, next) => {

        Favorites.findOne({user: req.user._id}, (err, favorite) => {
            if (err) {
                return next(err, false);
            }
            if (!err && favorite !== null) {

                //check for duplicate dishId
                for (var i = 0; i < favorite.dishes.length; i++) {
                    if (favorite.dishes[i]._id.equals(req.params.dishId)) {         
                        err = new Error('You have already saved this dish!');
                        status = 404;
                        return next(err);
                    }
                }
                favorite.dishes.push(req.params.dishId);
                favorite.save((err, favorite) => {
                    if (err) return next(err);
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    };
                });
                
            }
            else {
                favorite = new Favorites({user: req.user._id});
                favorite.dishes.push(req.params.dishId);
                favorite.save((err, favorite) => {
                    if (err) return next(err);
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }
                })
            }
        });
});

module.exports = favRouter;