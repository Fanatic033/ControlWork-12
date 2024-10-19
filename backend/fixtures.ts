import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './Models/User';
import Photo from './Models/Photo';


const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;


  try {
    await db.dropCollection('users')
    await db.dropCollection('photos')
  } catch (e) {
    console.log('skipping drop..')
  }

  const [user1, user2, admin1, admin2] = await User.create(
    {
      email: 'user@gmail.com',
      password: '12345',
      token: crypto.randomUUID(),
      displayName: 'User',
      role: 'user',
      avatar: 'fixtures/user.png'
    }, {
      email: 'user2@gmail.com',
      password: '12345',
      token: crypto.randomUUID(),
      displayName: 'User2',
      role: 'user',
      avatar: 'fixtures/user.png'
    }, {
      email: 'admin@gmail.com',
      password: '12345',
      token: crypto.randomUUID(),
      displayName: 'Admin',
      role: 'admin',
      avatar: 'fixtures/admin.png'
    }, {
      email: 'admin2@gmail.com',
      password: '12345',
      token: crypto.randomUUID(),
      displayName: 'Admin2',
      role: 'admin',
      avatar: 'fixtures/admin.png'
    },
  );

  await Photo.create({
      user: admin1._id,
      image: 'fixtures/eagle.jpeg',
      title: 'Eagle 3d',
    }, {
      user: user1._id,
      image: 'fixtures/cat.jpeg',
      title: 'Cat',
    }, {
      user: user1._id,
      image: 'fixtures/afterhours.jpeg',
      title: 'The Weeknd',
    }, {
      user: user2._id,
      image: 'fixtures/prince.jpeg',
      title: 'Rapper Prince',
    }, {
      user: admin2._id,
      image: 'fixtures/fruits.jpeg',
      title: 'fruits',
    },
  );

  await db.close();
};

void run();