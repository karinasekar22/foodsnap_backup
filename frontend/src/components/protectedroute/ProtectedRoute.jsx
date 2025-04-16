import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    // Ambil user dan token dari localStorage atau sessionStorage
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Cek keduanya

    // Jika tidak ada token, user, atau role tidak sesuai
    if (!token || !user?.role || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Return children jika semuanya valid
    return children;
};

export default ProtectedRoute;
