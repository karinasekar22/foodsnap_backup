import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  // Ambil token dan role dari localStorage atau sessionStorage
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Cek keduanya

  // Jika token tidak ada, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // Jika role tidak sesuai dengan allowedRoles, arahkan ke halaman Unauthorized
  if (!user?.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Jika token ada dan role sesuai, tampilkan konten yang dilindungi
  return children;
}
