import React, { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../AuthContext';


interface SignupPageProps {
    onNavigate: (page: Page) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Registration successful! Please check your email to verify your account.');
    }
    setLoading(false);
  };


  return (
    <div className="py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-brand-dark">
            Create an Account
            </h1>
            <p className="text-lg text-gray-600 mt-2">
            Get started with our full suite of PDF tools.
            </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={handleSignup}>
            {error && <p className="mb-4 text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            {message && <p className="mb-4 text-center text-green-700 bg-green-100 p-3 rounded-md">{message}</p>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
            </div>
             <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
            </div>
            <button type="submit" disabled={loading} className="w-full px-8 py-3 bg-brand-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg disabled:bg-gray-400">
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="font-medium text-brand-green hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
