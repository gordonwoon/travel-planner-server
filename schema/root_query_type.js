const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const DestinationType = require('./destination_type');
const PlaceType = require('./place_type');
const Destination = mongoose.model('destination');
const Place = mongoose.model('place');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    destinations: {
      type: new GraphQLList(DestinationType),
      resolve() {
        return Destination.find({});
      }
    },
    destination: {
      type: DestinationType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Destination.findById(id);
      }
    },
    place: {
      type: PlaceType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Place.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
