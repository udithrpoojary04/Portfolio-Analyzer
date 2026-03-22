import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { LogIn, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="bg-primary-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Sign in to continue to DevInsight AI</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Username or Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none"
                placeholder="developer_pro"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/20 transition flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
          </div>
        </div>

        <GoogleLoginButton />

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-400 font-bold hover:text-primary-300 transition underline decoration-2 underline-offset-4">
            Sign Up Free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
