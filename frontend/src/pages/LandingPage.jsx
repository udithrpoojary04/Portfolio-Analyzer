import { Link } from 'react-router-dom';
import { Github, Zap, BarChart3, Target } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
          Unlock Your Developer Potential with AI
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Analyze your GitHub portfolio, discover skill gaps, and get personalized project recommendations to land your dream job.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/signup"
            className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all border border-slate-700"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Github className="w-8 h-8 text-primary-400" />}
          title="GitHub Sync"
          description="One-click synchronization with your GitHub profile to analyze your repositories and contributions."
        />
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-emerald-400" />}
          title="AI Analysis"
          description="Deep analysis of your code quality, language proficiency, and technical impact using GPT-4."
        />
        <FeatureCard
          icon={<Target className="w-8 h-8 text-orange-400" />}
          title="Skill Gap Detection"
          description="Identify exactly what technologies you're missing to reach the next level in your career."
        />
      </section>

      {/* Stats/Social Proof (Mock) */}
      <section className="bg-slate-800/50 rounded-3xl p-12 border border-slate-700 text-center">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-slate-400">Analysis Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">10k+</div>
            <div className="text-slate-400">Developers Analyzed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">GPT-4</div>
            <div className="text-slate-400">Powered Engine</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-primary-500/50 transition-colors group">
    <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
