import { ArrowRight, ShieldCheck, Sparkles, BarChart2 } from 'lucide-react';
import heroImage from '../../assets/landing-page-first.jpg'

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text Content */}
          <div className="space-y-8">

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Track Your{' '}
                <span className="text-blue-600">Finances</span>{' '}
                Smartly
              </h1>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
               Connect your bank accounts and our platform gives you insights by automatically categorizing your expenses.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href="/register"
                className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-3.5"
              >
                Get Started Free
                <ArrowRight size={18} />
              </a>
              <a
                href="#how-it-works"
                className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-3.5"
              >
                See How It Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: <ShieldCheck size={16} className="text-green-500" />, text: 'Bank-grade security' },
                { icon: <BarChart2 size={16} className="text-blue-500" />, text: 'Real-time insights' },
                { icon: <Sparkles size={16} className="text-purple-500" />, text: 'Gemini AI powered' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl">
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full opacity-15 blur-3xl" />

              <img
                src={heroImage}
                alt="Expense Tracker Dashboard"
                className="relative w-full shadow-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
