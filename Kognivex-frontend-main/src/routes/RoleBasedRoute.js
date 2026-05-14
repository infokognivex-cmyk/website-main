import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function RoleBasedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user || user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RoleBasedRoute;
