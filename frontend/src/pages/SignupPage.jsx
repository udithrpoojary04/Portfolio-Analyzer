import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { UserPlus, Mail, Lock, User, Github, Loader2, AlertCircle } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    github_username: '',
    password: '',
    password_confirm: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === 'object') {
        const firstError = Object.values(data)[0];
        setError(Array.isArray(firstError) ? firstError[0] : (typeof data.error === 'string' ? data.error : 'Registration failed.'));
      } else {
        setError('Registration failed. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 pb-12">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-white">Create Account</h2>
          <p className="text-slate-400 mt-2">Start your AI portfolio analysis today</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300">GitHub Username</label>
            <div className="relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                placeholder="github_handle"
                value={formData.github_username}
                onChange={(e) => setFormData({ ...formData, github_username: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-300">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-none"
                  placeholder="••••••••"
                  value={formData.password_confirm}
                  onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition" />
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
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition underline decoration-2 underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
