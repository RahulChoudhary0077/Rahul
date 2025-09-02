import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const FooterLink: React.FC<{ page: Page; onNavigate: (page: Page) => void; children: React.ReactNode }> = ({ page, onNavigate, children }) => {
  return (
    <li>
      <button onClick={() => onNavigate(page)} className="hover:text-brand-green transition-colors">{children}</button>
    </li>
  );
};

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center">
              <div className="bg-brand-green p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="ml-3 text-2xl font-bold text-white">Pdf-Converter</span>
            </div>
            <p className="mt-4 text-sm">
              Lorem Group is your dedicated online ads strategist. Grow your brand NOW!
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-brand-green transition-colors">Yt</a>
              <a href="#" className="hover:text-brand-green transition-colors">Fb</a>
              <a href="#" className="hover:text-brand-green transition-colors">In</a>
            </div>
            <div className="flex space-x-4 mt-6">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Get it on Google Play</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Download from App store</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white">Convert to PDF</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button className="hover:text-brand-green">Word to PDF</button></li>
              <li><button className="hover:text-brand-green">Excel to PDF</button></li>
              <li><button className="hover:text-brand-green">PowerPoint to PDF</button></li>
              <li><button className="hover:text-brand-green">Image to PDF</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Convert From PDF</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button className="hover:text-brand-green">PDF to Image</button></li>
              <li><button className="hover:text-brand-green">PDF to Word</button></li>
              <li><button className="hover:text-brand-green">PDF to PowerPoint</button></li>
              <li><button className="hover:text-brand-green">PDF to Excel</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <FooterLink page="contact" onNavigate={onNavigate}>Feedback</FooterLink>
              <FooterLink page="about" onNavigate={onNavigate}>Company</FooterLink>
              <FooterLink page="about" onNavigate={onNavigate}>About Us</FooterLink>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>© 2024, My Agency. All Rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
