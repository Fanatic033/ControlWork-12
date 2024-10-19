import {useCallback, useEffect} from 'react';
import {CircularProgress, Container, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {selectStateOfPhoto, selectStatusOfPhoto} from './photoSlice.ts';
import {getPhotos, getPhotosByAuthor} from './photoThunks.ts';
import PhotoCard from './components/photoCard.tsx';

const PhotosPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const photo = useAppSelector(selectStateOfPhoto);
  const loading = useAppSelector(selectStatusOfPhoto);

  const callBack = useCallback(async () => {
    if (id) {
      await dispatch(getPhotosByAuthor(id));
    } else {
      await dispatch(getPhotos());
    }
  }, [dispatch, id]);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return (
    <Container>
      {photo.length ? <>
          <Typography textAlign="center" variant="h2">
            {id ? photo[0].user.displayName + '\'s Gallery' : 'Gallery'}
          </Typography>
          <Container sx={{display: 'flex', gap: 5, marginTop: '100px'}}>
            {loading ? <CircularProgress/> : photo.map((el) => <PhotoCard key={Math.random()}
                                                                          photo={el}/>)}
          </Container>
        </> :
        <Typography textAlign="center" variant="h2">There is no Photos yet</Typography>
      }
    </Container>
  );
};

export default PhotosPage;