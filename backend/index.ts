import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import photoRouter from './routers/photo';

const app = express()

const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter)
app.use('/photos',photoRouter)


const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  process.on('exit', () => {
    mongoose.disconnect()
  })
}

run().catch((err) => {
  console.error(err);
})