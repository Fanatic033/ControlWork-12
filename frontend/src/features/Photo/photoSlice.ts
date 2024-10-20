import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Photo } from '../../types';
import {
  createPhoto,
  deletePhoto,
  getPhotos,
  getPhotosByAuthor,
} from './photoThunks.ts';

interface Initial {
  photos: Photo[];
  loading: boolean;
  posting: boolean;
  deleting: boolean;
}

const initialState: Initial = {
  photos: [],
  loading: false,
  posting: false,
  deleting: false,
};

export const PhotoSlice = createSlice({
  name: 'Photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos = action.payload;
      state.loading = false;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPhotosByAuthor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPhotosByAuthor.fulfilled, (state, action) => {
      state.photos = action.payload;
      state.loading = false;
    });
    builder.addCase(getPhotosByAuthor.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createPhoto.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(createPhoto.rejected, (state) => {
      state.posting = false;
    });

    builder.addCase(deletePhoto.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.deleting = false;
      state.photos = state.photos.filter(
        (photo) => photo._id !== action.meta.arg,
      );
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deleting = false;
    });
  },
});

export const PhotoReducer = PhotoSlice.reducer;
export const selectStateOfPhoto = (state: RootState) => state.photos.photos;
export const selectStatusOfPhoto = (state: RootState) => state.photos.loading;
export const selectStatusOfPosting = (state: RootState) => state.photos.posting;
export const selectStatusOfDeletingPhoto = (state: RootState) =>
  state.photos.deleting;
