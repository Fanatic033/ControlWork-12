import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { getPhotosByAuthor } from './photoThunks';
import { selectStateOfPhoto, selectStatusOfPhoto } from './photoSlice';
import PhotoCard from './components/photoCard.tsx';
import { CircularProgress, Container, Typography } from '@mui/material';
import Modal from '../../UI/Modal/Modal.tsx';
import { selectUser } from '../User/UserSlice.ts';

const UserPhotos = () => {
  const { authorId } = useParams();
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

  useEffect(() => {
    if (authorId) {
      dispatch(getPhotosByAuthor(authorId));
    }
  }, [dispatch, authorId]);

  if (!photos.length)
    return (
      <Typography textAlign="center" variant="h2">
        There are no photos yet
      </Typography>
    );
  return (
    <div>
      <Modal open={open} onClose={handleClose} url={selectedValue} />
      <Container
        sx={{ display: 'flex', gap: 5, marginTop: '100px', flexWrap: 'wrap' }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          photos.map((el) => (
            <PhotoCard
              onDialog={handleClickOpen}
              key={Math.random()}
              photo={el}
              isOwner={el.user?._id === user?._id}
            />
          ))
        )}
      </Container>
    </div>
  );
};

export default UserPhotos;
