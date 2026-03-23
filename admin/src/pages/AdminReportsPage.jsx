import { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import { FileText, User, Github, CheckCircle, XCircle, Clock, Loader2, ChevronLeft, Calendar, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await adminService.getReports();
      setReports(data.results || data);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold uppercase border border-emerald-500/20"><CheckCircle className="w-3 h-3" /> COMPLETED</span>;
      case 'FAILED':
        return <span className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs font-bold uppercase border border-red-500/20"><XCircle className="w-3 h-3" /> FAILED</span>;
      case 'PROCESSING':
        return <span className="flex items-center gap-1 text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded text-xs font-bold uppercase border border-cyan-500/20"><Loader2 className="w-3 h-3 animate-spin" /> PROCESSING</span>;
      default:
        return <span className="flex items-center gap-1 text-slate-400 bg-slate-400/10 px-2 py-1 rounded text-xs font-bold uppercase border border-slate-400/20"><Clock className="w-3 h-3" /> {status}</span>;
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary-400" />
            Analysis Reports
          </h2>
        </div>
        <span className="text-sm text-slate-500">{reports.length} Total Reports</span>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-xl">{error}</div>}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Report ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">GitHub Profile</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Score</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-700/30 transition group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-slate-400 text-sm">#{r.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-white">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="font-medium">{r.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Github className="w-4 h-4 text-slate-500" />
                      {r.github_username}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {r.status === 'COMPLETED' ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-black text-white">{r.overall_score}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-black">/ 100</span>
                      </div>
                    ) : (
                      <span className="text-slate-600">--</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(r.status)}
                  </td>
                  <td className="px-6 py-4">
                    {/* Note: Redirecting to main frontend for report details might need absolute URL if on different domain */}
                    <a
                      href={`http://localhost:5173/results/${r.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block p-2 bg-slate-700 hover:bg-primary-600 text-slate-300 hover:text-white rounded-lg transition-all group-hover:shadow-lg group-hover:shadow-primary-600/20"
                      title="View Report (Opens in main app)"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
