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
        name: { type: GraphQLString },
        destinationId: { type: GraphQLID }
      },
      resolve(parentValue, { name, destinationId }) {
        return Destination.addPlaces(destinationId, name);
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
