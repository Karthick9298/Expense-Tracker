import { Link2, BrainCircuit, Bell, PieChart } from 'lucide-react';

const features = [
  {
    icon: <Link2 size={28} className="text-blue-600" />,
    bg: 'bg-blue-100',
    title: 'Bank Account Sync',
    description:
      'Securely connect your bank accounts using Setu Account Aggregator. Auto-import all your transactions in real time without sharing your credentials.',
  },
  {
    icon: <BrainCircuit size={28} className="text-purple-600" />,
    bg: 'bg-purple-100',
    title: 'Gemini AI Insights',
    description:
      'Our AI engine powered by Google Gemini automatically categorizes transactions, detects spending anomalies, and delivers weekly financial insights.',
  },
  {
    icon: <Bell size={28} className="text-orange-600" />,
    bg: 'bg-orange-100',
    title: 'Smart Budget Alerts',
    description:
      'Set monthly budgets per category. Get instant alerts when you are close to the limit or overspending, so you are always in control.',
  },
  {
    icon: <PieChart size={28} className="text-green-600" />,
    bg: 'bg-green-100',
    title: 'Visual Reports & Charts',
    description:
      'Beautiful donut charts, bar charts, and line graphs show your spending breakdown, 6-month trends, and budget vs actual projections.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            Why ExpenseIQ?
          </span>
          <h2 className="section-title">Everything You Need to Manage Money</h2>
          <p className="section-subtitle">
            From bank sync to AI-powered insights — all your financial tools in one clean dashboard.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 bg-white hover:bg-blue-50/30 cursor-default"
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
