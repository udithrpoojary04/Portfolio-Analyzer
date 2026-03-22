import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Github, RefreshCw, Plus, FileText, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports/');
      setReports(response.data.results || response.data);
    } catch (err) {
      setError('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    let githubUsername = user.github_username;
    
    if (!githubUsername) {
      githubUsername = prompt("Please enter your GitHub username:");
      if (!githubUsername) return;
    }

    setIsSyncing(true);
    setError('');
    try {
      await api.post('/github/sync/', { github_username: githubUsername });
      window.location.reload(); // Refresh to get updated user info
    } catch (err) {
      setError(err.response?.data?.error || 'GitHub sync failed. Check your username and token.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setError('');
    try {
      const response = await api.post('/ai/analyze/');
      // Redirect to fresh report or polling? For now, refresh list
      fetchReports();
      alert("Analysis started! It will appear in the list shortly.");
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary-500" /></div>;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Developer Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user?.username}. Monitor your growth and insights.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync GitHub</span>
          </button>
          <button
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Stats Summary */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Github className="w-5 h-5 text-primary-400" />
                    GitHub Profile
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <img src={user?.avatar_url || 'https://github.com/identicons/default.png'} className="w-12 h-12 rounded-full border-2 border-slate-700" alt="avatar" />
                        <div>
                            <div className="font-bold">{user?.github_username}</div>
                            <div className="text-xs text-slate-400">Linked Account</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-600 to-emerald-600 p-6 rounded-2xl text-white">
                <h3 className="text-lg font-bold mb-2">Ready for Hire?</h3>
                <p className="text-sm opacity-90 mb-4 text-primary-50">Our AI consistently rates your portfolio to help you improve marketability.</p>
                <div className="text-3xl font-black">
                    {reports.length > 0 ? reports[0].overall_score : '--'}
                    <span className="text-sm font-normal opacity-70 ml-1">Overall Score</span>
                </div>
            </div>
        </div>

        {/* Right: Reports History */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold">Analysis History</h3>
              <span className="text-xs text-slate-400">{reports.length} Reports Found</span>
            </div>
            <div className="divide-y divide-slate-700">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => navigate(`/results/${report.id}`)}
                    className="p-4 hover:bg-slate-700/50 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${report.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700 text-slate-400'}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          Report #{report.id}
                          {report.status !== 'COMPLETED' && (
                            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 font-bold">
                              {report.status}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          Created on {new Date(report.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {report.status === 'COMPLETED' && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{report.overall_score}</div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Score</div>
                        </div>
                      )}
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary-400 transition" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No analysis reports found. Start your first analysis!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
