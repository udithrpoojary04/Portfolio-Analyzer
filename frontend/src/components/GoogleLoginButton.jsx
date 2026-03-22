import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      await loginWithGoogle(response.credential);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Login Error:', err);
      alert('Google login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
        useOneTap
        theme="filled_blue"
        shape="pill"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
