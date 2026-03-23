import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../services/adminService';
import { Users, FileText, CheckCircle, XCircle, Clock, Loader2, BarChart3, TrendingUp } from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      setError('Failed to fetch admin statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-4" />
        <p className="text-slate-400 animate-pulse">Loading administrative data...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats?.total_users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Reports', value: stats?.total_reports, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Completed', value: stats?.completed_reports, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Failed', value: stats?.failed_reports, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Pending', value: stats?.pending_reports, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Processing', value: stats?.processing_reports, icon: Loader2, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary-500" />
          Admin Overview
        </h1>
        <p className="text-slate-400 mt-2">System-wide statistics and management console.</p>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-primary-500/50 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-slate-600 group-hover:text-primary-400 transition" />
            </div>
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Link 
          to="/users" 
          className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:bg-slate-750 transition flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Manage Users</h3>
          <p className="text-slate-400 mt-2 text-sm italic">View all registered developers and their activity.</p>
        </Link>

        <Link 
          to="/reports" 
          className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:bg-slate-750 transition flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 bg-purple-500/20 text-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Analysis Reports</h3>
          <p className="text-slate-400 mt-2 text-sm italic">Monitor AI analysis status and results across the platform.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
