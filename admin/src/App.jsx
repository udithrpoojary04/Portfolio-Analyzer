import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminReportsPage from './pages/AdminReportsPage';
import LoginPage from './pages/LoginPage';
import { Layout, LogOut, ShieldCheck } from 'lucide-react';

const AdminApp = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-primary-500/30">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-400">
            <ShieldCheck className="w-8 h-8" />
            <span>DevInsight Admin</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user && (
              <>
                <div className="flex items-center space-x-4 pr-4 border-r border-slate-700">
                  <span className="text-slate-400 text-sm">Logged in as <span className="text-white font-bold">{user.username}</span></span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition text-slate-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/" element={<AdminDashboardPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/reports" element={<AdminReportsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
