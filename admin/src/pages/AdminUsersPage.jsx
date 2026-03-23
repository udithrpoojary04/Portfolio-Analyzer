import { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import { Users, Mail, Github, Calendar, FileText, Loader2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data.results || data);
    } catch (err) {
      setError('Failed to fetch user list');
    } finally {
      setLoading(false);
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
            <Users className="w-6 h-6 text-primary-400" />
            User Management
          </h2>
        </div>
        <span className="text-sm text-slate-500">{users.length} Total Users</span>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-xl">{error}</div>}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">GitHub</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Reports</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-700/30 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.username}`} className="w-10 h-10 rounded-full border border-slate-700" alt="" />
                      <div>
                        <div className="font-bold text-white group-hover:text-primary-400">{u.username}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Github className="w-4 h-4 text-slate-500" />
                      {u.github_username || <span className="text-slate-600 italic">Not linked</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {u.is_staff ? (
                      <span className="px-2 py-1 text-[10px] font-black uppercase rounded bg-primary-500/10 text-primary-500 border border-primary-500/20">Admin</span>
                    ) : (
                      <span className="px-2 py-1 text-[10px] font-black uppercase rounded bg-slate-700 text-slate-400">User</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span className="font-bold text-white">{u.report_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(u.date_joined).toLocaleDateString()}
                    </div>
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

export default AdminUsersPage;
