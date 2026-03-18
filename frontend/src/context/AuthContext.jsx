import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while we verify cookie with /me

    // ------------------------------------------------------------------
    // On mount: verify auth by calling /api/auth/me (cookie sent automatically)
    // ------------------------------------------------------------------
    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetch(`${API}/auth/me`, {
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
                // If not ok (401, etc.), user stays null — not authenticated
            } catch {
                // Network error — user stays null
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    // ------------------------------------------------------------------
    // Login — called after successful OTP verification
    // Cookie is already set by the backend, we just store user in state
    // ------------------------------------------------------------------
    const login = useCallback((newUser) => {
        setUser(newUser);
    }, []);

    // ------------------------------------------------------------------
    // Logout — calls backend to clear the httpOnly cookie
    // ------------------------------------------------------------------
    const logout = useCallback(async () => {
        try {
            await fetch(`${API}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch {
            // Even if the request fails, clear local state
        }
        setUser(null);
    }, []);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook — gives any component access to auth state.
 *
 * Usage:
 *   const { user, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an <AuthProvider>');
    }
    return context;
};
