const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const schema = require('./schema/schema');
const keys = require('./config/keys');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = keys.mongoURI;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(cors());

app.options('/graphql', cors())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
