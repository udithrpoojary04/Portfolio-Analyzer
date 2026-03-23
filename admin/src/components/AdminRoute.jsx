import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if user is logged in AND is staff
  if (!user || !user.is_staff) {
    // If it's a separate app, we might redirect to a different domain or just a login page
    // For now, let's assume we redirect to the login page of this app if not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
