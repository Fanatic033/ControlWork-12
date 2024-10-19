import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Photo} from '../../../types';
import imageNotFound from '@/assets/image-not-found.png';
import {selectStatusOfDeletingPhoto} from '../photoSlice.ts';
import {deletePhoto} from '../photoThunks.ts';
import {API_URL} from '../../../../constants.ts';
import {selectUser} from '../../User/UserSlice.ts';

interface State {
  photo: Photo;
  onDialog: (url: string) => void;
  isOwner: boolean;
}

const PhotoCard: React.FC<State> = ({photo, onDialog, isOwner}) => {
  const user = useAppSelector(selectUser)
  const deleting = useAppSelector(selectStatusOfDeletingPhoto);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let cardImage = imageNotFound;
  if (photo.image) {
    cardImage = `${API_URL}/${photo.image}`;
  }

  const onDelete = async () => {
    await dispatch(deletePhoto(photo._id));
  };

  const onClickNavigate = () => {
    navigate('/photos/' + photo.user._id);
  };

  const canDelete = isOwner || user?.role === 'admin';

  return (
    <Card
      sx={{
        width: '300px',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardActionArea onClick={() => onDialog(cardImage)}>
        <CardMedia component="img" height="200" image={cardImage} alt="photo"/>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {photo.title}
        </Typography>
        <CardActionArea onClick={onClickNavigate}>
          <Typography gutterBottom variant="h5" component="div">
            created by: {photo.user?.displayName}
          </Typography>
        </CardActionArea>
        {canDelete && (
          <LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
            Delete
          </LoadingButton>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
