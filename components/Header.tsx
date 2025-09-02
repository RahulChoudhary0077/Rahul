import React from 'react';
import { type Page } from '../types';
import { useAuth } from '../AuthContext';

interface HeaderProps {
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-brand-green p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="ml-3 text-2xl font-bold text-brand-dark">Pdf-Converter</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-brand-dark font-medium">
          <button onClick={() => onNavigate('tools')} className="hover:text-brand-green transition-colors">Tools</button>
          <button onClick={() => onNavigate('pricing')} className="hover:text-brand-green transition-colors">Pricing</button>
          <button onClick={() => onNavigate('about')} className="hover:text-brand-green transition-colors">About</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-brand-green transition-colors">Contact</button>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
              <button onClick={handleLogout} className="px-5 py-2 rounded-md bg-brand-green text-white font-semibold hover:opacity-90 transition-opacity">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => onNavigate('login')} className="px-5 py-2 rounded-md text-brand-dark font-semibold hover:bg-gray-100 transition-colors">Login</button>
              <button onClick={() => onNavigate('signup')} className="px-5 py-2 rounded-md bg-brand-green text-white font-semibold hover:opacity-90 transition-opacity">Signup</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
