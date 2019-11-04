const mongoose = require('mongoose');
const app = require('../../utils/app');
const ProjectSchema = require('../../models/Project');

app.get('*', async (req, res) => {
  try {
    /*
      Create a new mongoose connection to MongoDB Atlas with connection string,
      which we will close before sending a response back to client.
    */
    const connection = await mongoose.createConnection(
      process.env.MONGODB_URI,
      {
        /*
          Buffering allows Mongoose to queue up operations if MongoDB
          gets disconnected, and to send them upon reconnection.
          With serverless, it is better to fail fast when not connected.
        */
        bufferCommands: false,
        bufferMaxEntries: 0
      }
    );

    const Project = connection.model('Project', ProjectSchema);

    Project.find({}, (error, docs) => {
      if (error) {
        connection.close();
        res.status(500).json({ error });
        return;
      }
      res.set('cache-control', 's-maxage=1, maxage=0, stale-while-revalidate');
      res.json({ docs });
      connection.close();
    });
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || 'uh oh ' });
  }
});

module.exports = app;
