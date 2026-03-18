import { TrendingUp } from 'lucide-react';

/**
 * PageLoader — full-screen branded loading component.
 *
 * @param {string}  message   Text shown below the logo (e.g. "Signing you in…")
 * @param {boolean} minimal   If true, renders a compact inline version (no full screen)
 */
const PageLoader = ({ message = 'Loading…' }) => {
    return (
        <div className="loader-fade-in min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="flex flex-col items-center gap-6">
                {/* Logo with pulse ring */}
                <div className="relative">
                    {/* Animated ring */}
                    <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 loader-pulse" />
                    <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-lg shadow-blue-200">
                        <TrendingUp size={32} />
                    </div>
                </div>

                {/* Brand text */}
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    Expense<span className="text-blue-600">IQ</span>
                </h1>

                {/* Shimmer progress bar */}
                <div className="w-48 h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full loader-shimmer" />
                </div>

                {/* Message */}
                <p className="text-sm text-gray-400 font-medium">{message}</p>
            </div>
        </div>
    );
};

export default PageLoader;
