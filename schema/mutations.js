const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Destination = mongoose.model('destination');
const DestinationType = require('./destination_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDestination: {
      type: DestinationType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return (new Destination({ name })).save()
      }
    },
    addPlaceToDestination: {
      type: DestinationType,
      args: {
        destinationId: { type: GraphQLID },
        place_id: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parentValue, { destinationId, place_id, name, address }) {
        return Destination.addPlaces(destinationId, place_id, name, address );
      }
    },
    deleteDestination: {
      type: DestinationType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Destination.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
