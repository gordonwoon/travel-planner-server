const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Place = mongoose.model('place');

const PlaceType = new GraphQLObjectType({
  name:  'PlaceType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    from_date: { type: GraphQLInt },
    to_date: { type: GraphQLInt },
    expense: { type: GraphQLInt },
    type: { type: GraphQLString },
    waypoint: { type: GraphQLString },
    destination: {
      type: require('./destination_type'),
      resolve(parentValue) {
        return Place.findById(parentValue).populate('destination')
          .then(place => {
            return place.destination
          });
      }
    }
  })
});

module.exports = PlaceType;
