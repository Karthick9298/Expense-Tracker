import { UserPlus, Link2, LayoutDashboard } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: <UserPlus size={28} className="text-blue-600" />,
    bg: 'bg-blue-100',
    title: 'Create Your Account',
    description:
      'Sign up in seconds — no credit card required. Set up your profile and choose the categories that matter to you.',
  },
  {
    step: '02',
    icon: <Link2 size={28} className="text-sky-600" />,
    bg: 'bg-sky-100',
    title: 'Link Your Bank Account',
    description:
      'Securely connect your bank using Setu AA. Your transactions are fetched automatically — no manual entry needed.',
  },
  {
    step: '03',
    icon: <LayoutDashboard size={28} className="text-indigo-600" />,
    bg: 'bg-indigo-100',
    title: 'Track & Get Insights',
    description:
      'View your dashboard, receive AI-generated insights, set budgets, and watch your savings grow month over month.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            Simple Process
          </span>
          <h2 className="section-title">Get Started in 3 Easy Steps</h2>
          <p className="section-subtitle">
            No complex setup. Start tracking your finances in under 5 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-blue-200 z-0" />

          {steps.map((item, index) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center text-center space-y-4">
              {/* Step number badge */}
              <div className="relative">
                <div className={`w-20 h-20 ${item.bg} rounded-2xl flex items-center justify-center shadow-md`}>
                  {item.icon}
                </div>
                <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
