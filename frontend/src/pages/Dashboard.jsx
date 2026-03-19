import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, hasLinkedBank } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">ExpenseIQ</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, {user?.fullName}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Link bank banner — shown if not linked */}
        {!hasLinkedBank && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Landmark className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-semibold text-blue-800">No bank account linked</p>
                <p className="text-sm text-blue-600">Link your bank to see your transactions and insights.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/link-bank')}
              className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Link Now
            </button>
          </div>
        )}

        {/* Empty state */}
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">Dashboard coming soon</p>
          <p className="text-sm mt-1">Charts and insights will appear here after linking your bank.</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;