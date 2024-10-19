import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {getPhotosByAuthor} from './photoThunks';
import {selectStateOfPhoto, selectStatusOfPhoto} from './photoSlice';
import PhotoCard from './components/photoCard.tsx';
import {CircularProgress, Container} from '@mui/material';
import Modal from '../../UI/Modal/Modal.tsx';

const UserPhotos = () => {
  const {authorId} = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectStateOfPhoto);
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

  useEffect(() => {
    if (authorId) {
      dispatch(getPhotosByAuthor(authorId));
    }
  }, [dispatch, authorId]);

  return (
    <div>
      <Modal open={open} onClose={handleClose} url={selectedValue}/>
      <Container sx={{display: 'flex', gap: 5, marginTop: '100px', flexWrap: 'wrap'}}>
        {loading ? <CircularProgress/> : photos.map((el) => <PhotoCard onDialog={handleClickOpen} key={Math.random()}
                                                                       photo={el}/>)}
      </Container>
    </div>
  );
};

export default UserPhotos;

