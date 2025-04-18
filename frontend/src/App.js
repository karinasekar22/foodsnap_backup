import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import UserLayout from './layouts/user'; 
import OwnerLayout from './layouts/owner';
import CustomerLayout from './layouts/customer';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import Unauthorized from './pages/Unauthorized'; 

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="user/*"
          element={
            <UserLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
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
        <Route
          path="customer/*"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner/*"
          element={
            <ProtectedRoute allowedRoles={['umkm']}>
              <OwnerLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </ProtectedRoute>
          }
        />
        
        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </ChakraProvider>
  );
}