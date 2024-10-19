import {useCallback, useEffect, useState} from 'react';
import {CircularProgress, Container, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectStateOfPhoto, selectStatusOfPhoto} from './photoSlice.ts';
import {getPhotos} from './photoThunks.ts';
import {useParams} from 'react-router-dom';
import PhotoCard from './components/photoCard.tsx';
import Modal from '../../UI/Modal/Modal.tsx';
import {selectUser} from '../User/UserSlice.ts';

const PhotosPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectStateOfPhoto);
  const loading = useAppSelector(selectStatusOfPhoto);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const user = useAppSelector(selectUser);

  const handleClickOpen = (url: string) => {
    setSelectedValue(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const callBack = useCallback(async () => {
    await dispatch(getPhotos());
  }, [dispatch, id]);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return (
    <Container fixed>
      <Modal open={open} onClose={handleClose} url={selectedValue} />
      {photos.length ? (
        <>
          <Typography textAlign="center" variant="h2">
            Gallery
          </Typography>
          <Container sx={{display: 'flex', gap: 5, marginTop: '100px', flexWrap: 'wrap'}}>
            {loading ? <CircularProgress /> : photos.map((el) => (
              <PhotoCard
                onDialog={handleClickOpen}
                key={el._id}
                photo={el}
                isOwner={el.user?._id === user?._id}
              />
            ))}
          </Container>
        </>
      ) : (
        <Typography textAlign="center" variant="h2">There are no photos yet</Typography>
      )}
    </Container>
  );
};

export default PhotosPage;
