import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from './PageLoader';

/**
 * PublicRoute — wraps routes that should NOT be accessible to logged-in users.
 * If authenticated, redirects to /dashboard.
 * If not authenticated, renders children normally.
 */
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <PageLoader message="Checking authentication…" />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
