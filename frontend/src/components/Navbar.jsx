import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout, LogOut, User, BarChart2, Github } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-400">
          <Layout className="w-8 h-8" />
          <span>DevInsight AI</span>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center space-x-1 hover:text-primary-400 transition">
                <BarChart2 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-700">
                <span className="text-slate-400 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary-400 transition">Login</Link>
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg transition font-medium"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
