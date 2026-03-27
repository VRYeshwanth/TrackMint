import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { authService } from '../services/authService';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.register({ name, email, password });
      // Redirect to login upon successful registration
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError('Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Account</h2>
        {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm text-center font-medium">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <Input 
            label="Full Name" 
            type="text" 
            id="name" 
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            label="Email Address" 
            type="email" 
            id="email" 
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            id="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-8"
          />
          <Button variant="primary" type="submit" className="w-full py-3 text-lg shadow-md" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to={ROUTES.LOGIN} className="text-primary font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
