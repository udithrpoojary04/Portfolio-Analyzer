import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import SkillChart from '../components/SkillChart';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Loader2
} from 'lucide-react';

const ResultsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await api.get(`/reports/${id}/`);
      setReport(response.data);
    } catch (err) {
      setError('Failed to load analysis results');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="flex flex-col items-center justify-center py-40 gap-4">
    <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
    <p className="text-slate-400 animate-pulse">Fetching AI Insights...</p>
  </div>;
  
  if (error || !report) return <div className="text-center py-20 text-red-500">{error || 'Report not found'}</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-10">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              AI Analysis Report
            </span>
            <span className="text-slate-500 text-sm">{new Date(report.created_at).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">Portfolio Insights</h1>
          <p className="text-lg text-slate-400 italic">"{report.summary}"</p>
        </div>
        <div className="flex items-center gap-6 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="relative text-center">
            <div className="text-5xl font-black text-primary-400">{report.overall_score}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Global Score</div>
          </div>
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Analysis Column */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Skill Matrix */}
          <section className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              Technical Skill Matrix
            </h2>
            <div className="h-[300px]">
              <SkillChart data={report.technical_skills} />
            </div>
          </section>

          {/* Project Recommendations */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              Project Recommendations
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {report.project_recommendations.map((project, idx) => (
                <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition group">
                  <div className="bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-primary-400 group-hover:scale-110 transition">
                    {idx + 1}
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed">{project}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          {/* Skill Gaps */}
          <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">
            <h3 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Skills to Master
            </h3>
            <ul className="space-y-3">
              {report.skill_gaps.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Resume Feedback */}
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-400" />
              Career & Resume Tips
            </h3>
            <div className="space-y-4">
              {report.resume_feedback.map((tip, idx) => (
                <div key={idx} className="text-sm text-slate-400 border-l-2 border-slate-700 pl-4 py-1">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
