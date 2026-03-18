import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from './PageLoader';

/**
 * ProtectedRoute — wraps any route element that requires authentication.
 * Shows a branded loading screen while auth state is being resolved,
 * then redirects to /login if the user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <PageLoader message="Loading your dashboard…" />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
