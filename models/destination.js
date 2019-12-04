const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  name: { type: String },
  from_date: { type: Number },
  to_date: { type: Number },
  places: [{
    type: Schema.Types.ObjectId,
    ref: 'place'
  }]
});

DestinationSchema.statics.addPlaces = function({ id, place_id, name, address, expense, type, from_date, to_date }) {
  const Place = mongoose.model('place');

  return this.findById(id)
    .then(destination => {
      const place = new Place({ place_id, name, address, destination, expense, type, from_date, to_date });
      destination.places.push(place);
      return Promise.all([destination.save(), place.save()])
        .then(([place, destination]) => destination)
    })
}

DestinationSchema.statics.findPlaces = function(id) {
  return this.findById(id)
    .populate('places')
    .then(destination => destination.places);
}

mongoose.model('destination', DestinationSchema);
