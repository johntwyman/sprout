import 'dotenv/config';

import cors from 'cors';
import express, { Express } from 'express';
import mongoose from 'mongoose';

import router from './routes';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use([express.static('frontend/build'), express.json(), cors()]);
app.use(router);

const uri: string = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
