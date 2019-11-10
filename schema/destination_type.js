const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const PlaceType = require('./place_type');
const Destination = mongoose.model('destination');

const DestinationType = new GraphQLObjectType({
  name:  'DestinationType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    places: {
      type: new GraphQLList(PlaceType),
      resolve(parentValue) {
        return Destination.findPlaces(parentValue.id);
      }
    }
  })
});

module.exports = DestinationType;
