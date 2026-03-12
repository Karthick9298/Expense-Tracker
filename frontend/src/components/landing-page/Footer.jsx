import { TrendingUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <TrendingUp size={18} />
            </div>
            Expense<span className="text-blue-400">IQ</span>
          </a>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {['Features', 'How It Works', 'Contribute'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {currentYear} ExpenseIQ &nbsp;•&nbsp; Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

