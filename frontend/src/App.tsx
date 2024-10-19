import './App.css'
import ResponsiveAppBar from './UI/Header/AppToolBar.tsx';
import {Route, Routes} from 'react-router-dom';
import Register from './features/User/Register.tsx';
import Login from './features/User/Login.tsx';
import {Typography} from '@mui/material';
import PhotosPage from './features/Photo/PhotoPage.tsx';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute.tsx';
import {useAppSelector} from './app/hooks.ts';
import {selectUser} from './features/User/UserSlice.ts';
import PhotoForm from './features/Photo/components/PhotoForm.tsx';

const App = () => {
  const user = useAppSelector(selectUser)
  return (
    <>
      <header>
        <ResponsiveAppBar/>
      </header>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<PhotosPage/>}/>
        <Route
          path="/photos/new"
          element={
            <ProtectedRoute isAllowed={Boolean(user)}>
              <PhotoForm/>
            </ProtectedRoute>
          }
        />
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
