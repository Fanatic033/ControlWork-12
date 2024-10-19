import React, {useState} from 'react';
import {Avatar, Menu, MenuItem} from '@mui/material';
import {User} from '../../types.ts';
import Box from '@mui/material/Box';
import {green} from '@mui/material/colors';
import {useAppDispatch} from '../../app/hooks.ts';
import Image from '@/assets/image-not-found.png';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {API_URL} from '../../../constants.ts';
import {logout} from '../../features/User/UserThunks.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  let cardImage = Image;

  if (cardImage) {
    cardImage = `${API_URL}/${user.avatar}`;
  }

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <>
      <Box>
        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
          <Avatar
            onClick={handleClick}
            sx={{bgcolor: green[500], width: 56, height: 56}}
            src={cardImage}
            alt={user.displayName}
          />
          <Typography sx={{color: 'white'}}>{user.displayName}</Typography>
        </Box>
        <Menu
          open={isOpen}
          anchorEl={anchorEl}
          keepMounted={true}
          onClose={handleClose}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/photos/' + user._id);
            }}
          >
            My gallery
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/photos/new');
            }}
          >
            Add Photo
          </MenuItem>
          <MenuItem>My Account {user.displayName}</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;