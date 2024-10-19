import React from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

const Modal: React.FC<SimpleDialogProps> = ({ open, onClose, url }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      fullWidth
  sx={{
    width: '100%',
    height: 'auto'
  }}
    >
      <img src={url} alt="photo" style={{
        width: '100%',
        height: 'auto',
        maxHeight: '80vh',
        objectFit: 'contain',
      }} />
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
