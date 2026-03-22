import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="1092555158611-pao04iagc2o6k7p5k3mghk4pboh2afts.apps.googleusercontent.com">
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-primary-500/30">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/results/:id" element={<ResultsPage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
