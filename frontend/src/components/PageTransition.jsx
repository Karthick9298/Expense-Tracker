import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';

/**
 * PageTransition — wraps route content and shows a branded loading
 * screen briefly whenever the URL path changes.
 *
 * Flow:  old page → PageLoader (brief) → new page fades in
 */
const TRANSITION_MS = 700; // how long the loader is shown

const PageTransition = ({ children }) => {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const prevPath = useRef(location.pathname);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the very first render (initial page load)
        if (isFirstRender.current) {
            isFirstRender.current = false;
            prevPath.current = location.pathname;
            return;
        }

        // Only trigger on actual path changes
        if (location.pathname === prevPath.current) return;
        prevPath.current = location.pathname;

        // Show loader
        setIsTransitioning(true);

        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsTransitioning(false);
        }, TRANSITION_MS);

        return () => clearTimeout(timer);
    }, [location.pathname, children]);

    // Keep displayChildren in sync when children change without path change
    useEffect(() => {
        if (!isTransitioning) {
            setDisplayChildren(children);
        }
    }, [children, isTransitioning]);

    if (isTransitioning) {
        return <PageLoader message="Loading…" />;
    }

    return (
        <div className="loader-fade-in">
            {displayChildren}
        </div>
    );
};

export default PageTransition;
