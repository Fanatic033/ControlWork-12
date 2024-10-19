import React from 'react';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Photo } from '../../../types';
import imageNotFound from '@/assets/image-not-found.png';
import { selectStatusOfDeletingPhoto } from '../photoSlice.ts';
import { deletePhoto } from '../photoThunks.ts';
import { API_URL } from '../../../../constants.ts';
import { selectUser } from '../../User/UserSlice.ts';

interface State {
  photo: Photo;
  onDialog: (url: string) => void;
  isOwner?: boolean;
}

const PhotoCard: React.FC<State> = ({ photo, onDialog, isOwner }) => {
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectStatusOfDeletingPhoto);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let cardImage = imageNotFound;
  if (photo.image) {
    cardImage = `${API_URL}/${photo.image}`;
  }

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      await dispatch(deletePhoto(photo._id));
    }
  };

  const onClickNavigate = () => {
    navigate('/photos/' + photo.user._id);
  };

  const canDelete = isOwner || user?.role === 'admin';

  return (
    <Card sx={{ width: 335, marginBottom: 4 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: 'pointer' }}
            aria-label="recipe"
            onClick={onClickNavigate}
          >
            {photo.user?.displayName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={photo.title}
        subheader={`Created by: ${photo.user?.displayName}`}
      />
      <CardActionArea onClick={() => onDialog(cardImage)}>
        <CardMedia
          component="img"
          height="200"
          image={cardImage}
          alt="photo"
        />
      </CardActionArea>
      <CardContent>
        {canDelete && (
          <LoadingButton
            variant="contained"
            onClick={onDelete}
            loading={deleting}
            sx={{ backgroundColor: 'red' }}
          >
            Delete
          </LoadingButton>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
