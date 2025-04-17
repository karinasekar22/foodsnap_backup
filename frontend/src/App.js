import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import UserLayout from './layouts/user'; 
import {
  ChakraProvider,
} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import Unauthorize from './pages/Unauthorize';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="rtl/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD
        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
=======
        <Route
          path="user/*"
          element={
            <UserLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
>>>>>>> feature/homepage
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </ChakraProvider>
  );
}