const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } = graphql;
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
        expense: { type: GraphQLFloat },
        type: { type: GraphQLString },
        from_date: { type: GraphQLInt },
        to_date: { type: GraphQLInt }
      },
      resolve(parentValue, { destinationId, place_id, name, address, expense, type, from_date, to_date }) {
        return Destination.addPlaces({ id: destinationId, place_id, name, address, expense, type, from_date, to_date });
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
