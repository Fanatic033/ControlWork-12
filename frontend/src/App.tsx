import './App.css'
import ResponsiveAppBar from './UI/Header/AppToolBar.tsx';
import {Route, Routes} from 'react-router-dom';
import Register from './features/User/Register.tsx';
import Login from './features/User/Login.tsx';
import {Typography} from '@mui/material';
import PhotosPage from './features/Photo/PhotoPage.tsx';

const App = () => {
  return (
    <>
      <header>
        <ResponsiveAppBar/>
      </header>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<PhotosPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route
          path="*"
          element={<Typography variant="h1" sx={{textAlign: 'center'}}>Not found</Typography>}
        />
      </Routes>
    </>
  )
};

export default App
