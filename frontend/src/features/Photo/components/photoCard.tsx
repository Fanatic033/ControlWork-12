import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Photo} from '../../../types';
import imageNotFound from '@/assets/image-not-found.png'
import {selectUser} from '../../User/UserSlice.ts';
import {selectStatusOfDeletingPhoto} from '../photoSlice.ts';
import {deletePhoto} from '../photoThunks.ts';
import {API_URL} from '../../../../constants.ts';

interface state {
  photo: Photo;
  onDialog: (url: string) => void;
}

const PhotoCard: React.FC<state> = ({photo, onDialog}) => {
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectStatusOfDeletingPhoto);
  const dispatch = useAppDispatch();
  let cardImage = imageNotFound;
  if (cardImage) {
    cardImage = `${API_URL}/${photo.image}`;
  }
  const navigate = useNavigate();

  const onDelete = async () => {
    await dispatch(deletePhoto(photo._id));
  };

  const onClickNavigate = () => {
    navigate('/photos/' + photo.user._id);
  };

  return (
    <Card sx={{
      width: '300px',
      height: '100%',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
    }>
      <CardActionArea onClick={() => onDialog(cardImage)}>
        <CardMedia component="img" height="200" image={cardImage} alt="photo"/>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {photo.title}
        </Typography>
        <CardActionArea onClick={onClickNavigate}>
          <Typography gutterBottom variant="h5" component="div">
            created by : {photo.user.displayName}
          </Typography>
        </CardActionArea>
        {user?.role === 'admin' ? (
          <LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
            Delete
          </LoadingButton>
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoCard;