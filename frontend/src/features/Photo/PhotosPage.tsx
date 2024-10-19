import {useCallback, useEffect, useState} from 'react';
import {CircularProgress, Container, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectStateOfPhoto, selectStatusOfPhoto} from './photoSlice.ts';
import {getPhotos, getPhotosByAuthor} from './photoThunks.ts';
import {useParams} from 'react-router-dom';
import PhotoCard from './components/photoCard.tsx';
import Modal from '../../UI/Modal/Modal.tsx';

const PhotosPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const photo = useAppSelector(selectStateOfPhoto);
  const loading = useAppSelector(selectStatusOfPhoto);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = (url: string) => {
    setSelectedValue(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const callBack = useCallback(async () => {
    if (id?.length) {
      await dispatch(getPhotosByAuthor(id));
    } else {
      await dispatch(getPhotos());
    }
  }, [dispatch, id]);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return (
    <Container fixed>
      <Modal open={open} onClose={handleClose} url={selectedValue}/>
      {photo.length ? <>
          <Typography textAlign="center" variant="h2">
            {id ? photo[0].user.displayName + '\'s Gallery' : 'Gallery'}
          </Typography>
          <Container sx={{display: 'flex', gap: 5, marginTop: '100px',flexWrap:'wrap'}}>
            {loading ? <CircularProgress/> : photo.map((el) => <PhotoCard onDialog={handleClickOpen} key={Math.random()}
                                                                          photo={el}/>)}
          </Container>
        </> :
        <Typography textAlign="center" variant="h2">There is no Photos yet</Typography>
      }
    </Container>
  );
};

export default PhotosPage;