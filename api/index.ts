import express from 'express';
import cors from 'cors';
import config from './config';
import * as mongoose from 'mongoose';
import linkRouter from './routers/link';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/links',linkRouter);

const run = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost/links');
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  process.on('exit', () => {
    console.log('Disconnecting from MongoDB...');
    mongoose.disconnect().then(() => console.log('Disconnected from MongoDB'));
  });
};

run().catch(console.error);
