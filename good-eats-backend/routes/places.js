const router = require('express').Router();
let Place = require('../models/place.model');

router.route('/').get((req, res) => {
    Place.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Place.findById(req.params.id)
        .then(place => res.json(place))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Place.findByIdAndDelete(req.params.id)
        .then(() => res.json('Place deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Place.findById(req.params.id)
        .then(place => {
            place.name = req.body.name;
            place.addr = req.body.addr;
            place.hours = req.body.hours;
            place.phone = req.body.phone;
            place.website = req.body.website;
            place.isVeggie = req.body.isVeggie;

            place.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const addr = req.body.addr;
    const hours = req.body.hours;
    const phone = req.body.phone;
    const website = req.body.website;
    const isVeggie = req.body.isVeggie;

    const newPlace = new Place({
        name,
        addr,
        hours,
        phone,
        website,
        isVeggie
    });

    newPlace.save()
        .then(() => res.json('Place added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;