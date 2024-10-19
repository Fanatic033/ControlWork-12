import express from 'express';
import {auth, RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer'
import Photo from '../Models/Photo';
import {publicGet} from '../middleware/public';
import mongoose from 'mongoose';


const photoRouter = express.Router();


photoRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const photoData = await Photo.create({
      user: req.user?._id,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
    })
    return res.send(photoData);
  } catch (e) {
    next(e)
  }
})

photoRouter.get('/', publicGet, async (req: RequestWithUser, res, next) => {
  try {
    const queryUser = req.query.user;
    if (queryUser) {
      const photos = await Photo.find({user: queryUser}).populate('user', 'displayName');
      return res.send(photos);
    }
    const photos = await Photo.find().populate('user', 'displayName')
    return res.send(photos);
  } catch (e) {
    next(e)
  }
})

photoRouter.get('/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id).populate('user', 'displayName');

    if (!result) return res.status(404).send({error: 'Photo not found!'});

    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

photoRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const photo_id = req.params.id;
    const photo = await Photo.findOne({_id: photo_id});

    if (!photo) {
      return res.status(404).send({error: 'Not found!'});
    }
    await Photo.deleteOne({_id: photo_id});
    return res.send('deleted');
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});


export default photoRouter