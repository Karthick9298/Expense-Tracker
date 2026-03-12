import { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#stats' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-gray-900">Expense<span className="text-blue-600">IQ</span></span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Login
            </a>
            <a
              href="/register"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Sign Up Free
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
            <a href="/login" className="text-center text-blue-600 font-semibold py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
              Login
            </a>
            <a href="/register" className="btn-primary text-center text-sm">
              Sign Up Free
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
