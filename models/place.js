const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: { type: String },
  from_date: { type: Number },
  to_date: { type: Number },
  expense: { type: Number },
  type: { type: String },
  waypoint: { type: String },
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'destination'
  }
});

mongoose.model('place', PlaceSchema);
