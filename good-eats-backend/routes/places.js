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

router.route('/add').post((req, res) => {
    Place.findOneAndUpdate({name: req.body.name, addr: req.body.addr}, 
        {
            name: req.body.name,
            addr: req.body.addr,
            hours: req.body.hours,
            phone: req.body.phone,
            website: req.body.website,
            isVeggie: req.body.isVeggie,
            description: req.body.description
        }).then(place => {
        if(!place){
            const lat = req.body.lat;
            const lng = req.body.lng;
            const name = req.body.name;
            const addr = req.body.addr;
            const hours = req.body.hours;
            const phone = req.body.phone;
            const website = req.body.website;
            const isVeggie = req.body.isVeggie;
            const description = req.body.description;

            const newPlace = new Place({
                lat,
                lng,
                name,
                addr,
                hours,
                phone,
                website,
                isVeggie,
                description
            });

            newPlace.save()
                .then(() => res.json('Place added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

module.exports = router;