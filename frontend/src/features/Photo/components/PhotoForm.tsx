import React, {useState} from 'react';
import {Box, Container, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {PhotoMutation} from '../../../types.ts';
import {createPhoto} from '../photoThunks.ts';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import {selectStatusOfDeletingPhoto} from '../photoSlice.ts';

const PhotoForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectStatusOfDeletingPhoto)

  const onSubmit = async (photoMutation: PhotoMutation) => {
    try {
      await dispatch(createPhoto(photoMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };


  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };


  return (
    <Container maxWidth="sm" sx={{height: '600px', marginTop: '100px'}}>
      < Box component="form" onSubmit={submitFormHandler}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '600px',
            }}>
        <TextField
          sx={{width: '100%', marginBottom: 2}}
          label="Title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          required
        />
        <FileInput label="Image" onChange={fileInputChangeHandler} name="image"/>
        <LoadingButton loading={loading} type="submit" color="primary" variant="contained" sx={{marginTop: 2}}>
          Create
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default PhotoForm;