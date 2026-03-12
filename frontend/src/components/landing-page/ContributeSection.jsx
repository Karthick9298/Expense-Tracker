import { Github, Bug, GitPullRequest, Star } from 'lucide-react';

const GITHUB_URL = 'https://github.com/your-username/expense-tracker';

const ContributeSection = () => {
  return (
    <section id="contribute" className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

        {/* GitHub icon */}
        <div className="flex justify-center">
          <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl">
            <Github size={40} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Facing Any Issue? <span className="text-blue-400">We're Open Source.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            ExpenseIQ is open source and community-driven. Found a bug, have a feature idea,
            or want to improve the code? We'd love your contribution.
          </p>
        </div>

        {/* Contribution options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Bug size={20} className="text-red-400" />,
              label: 'Report a Bug',
              desc: 'Something broken? Let us know.',
            },
            {
              icon: <GitPullRequest size={20} className="text-green-400" />,
              label: 'Contribute Code',
              desc: 'Fork, fix, and open a PR.',
            },
            {
              icon: <Star size={20} className="text-yellow-400" />,
              label: 'Star the Repo',
              desc: 'Show your support on GitHub.',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-left hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="text-white font-semibold text-sm">{item.label}</span>
              </div>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Github size={22} />
          Contribute on GitHub
        </a>

        <p className="text-gray-600 text-sm">
          {GITHUB_URL}
        </p>
      </div>
    </section>
  );
};

export default ContributeSection;
