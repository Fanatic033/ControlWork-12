import express from 'express';
import {auth, RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import Photo from '../Models/Photo';
import {publicGet} from '../middleware/public';


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


export default photoRouter