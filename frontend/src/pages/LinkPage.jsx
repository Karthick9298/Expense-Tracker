import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Landmark, ArrowRight, SkipForward, Loader2 } from 'lucide-react';


const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LinkPage = () => {
    const navigate = useNavigate();
    const { setHasLinkedBank } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { hasLinkedBank } = useAuth();

    useEffect(() => {
        if (hasLinkedBank) navigate('/dashboard');
    }, [hasLinkedBank]);

    const handleLinkBank = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API}/setu/consent/create`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to initiate bank linking.');

            // Redirect user to Setu's consent screens
            window.location.href = data.consentUrl;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-50 p-4 rounded-full">
                        <Landmark className="text-blue-600 w-10 h-10" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    Link Your Bank Account
                </h1>
                <p className="text-gray-500 text-center text-sm mb-8">
                    Securely connect your bank to automatically fetch and analyse your transactions.
                </p>

                {/* Trust points */}
                <div className="space-y-3 mb-8">
                    {[
                        'Bank-grade security powered by Setu AA',
                        'RBI licensed Account Aggregator framework',
                        'You can revoke access anytime',
                    ].map((point) => (
                        <div key={point} className="flex items-start gap-3">
                            <ShieldCheck className="text-green-500 w-5 h-5 mt-0.5 shrink-0" />
                            <p className="text-gray-600 text-sm">{point}</p>
                        </div>
                    ))}
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                {/* Buttons */}
                <button
                    onClick={handleLinkBank}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 mb-3"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Link Bank Account
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>

                <button
                    onClick={handleSkip}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-3 rounded-xl transition"
                >
                    <SkipForward className="w-4 h-4" />
                    Skip for now
                </button>
            </div>
        </div>
    );
};

export default LinkPage;