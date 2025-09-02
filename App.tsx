import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import BusinessSection from './components/BusinessSection';
import WhyChooseUs from './components/WhyChooseUs';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ToolPage from './components/ToolPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import SignupPage from './pages/SignupPage';
import ToolsPage from './pages/ToolsPage';

import { type Tool, type Page } from './types';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<Tool | Page>('home');

  const handleNavigate = useCallback((page: Page) => {
    setActiveView(page);
    window.scrollTo(0, 0);
  }, []);

  const handleSelectTool = useCallback((tool: Tool) => {
    setActiveView(tool);
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    let content;
    let key;

    if (typeof activeView === 'object' && activeView !== null) {
      content = <ToolPage tool={activeView} onBack={() => handleNavigate('tools')} />;
      key = activeView.id;
    } else {
      key = activeView;
      switch (activeView) {
        case 'tools':
          content = <ToolsPage onSelectTool={handleSelectTool} />;
          break;
        case 'pricing':
          content = <PricingPage />;
          break;
        case 'about':
          content = <AboutPage />;
          break;
        case 'contact':
          content = <ContactPage />;
          break;
        case 'login':
          content = <LoginPage onNavigate={handleNavigate} />;
          break;
        case 'signup':
          content = <SignupPage onNavigate={handleNavigate} />;
          break;
        case 'home':
        default:
          content = (
            <main>
              <Hero onNavigate={() => handleNavigate('tools')} />
              <ToolsGrid
                title={<span>Most Popular <span className="text-brand-green">PDF Tools</span></span>}
                tools={TOOLS.slice(0, 8)} 
                onSelectTool={handleSelectTool} 
              />
              <BusinessSection />
              <WhyChooseUs />
              <Newsletter />
            </main>
          );
          break;
      }
    }

    return <div key={key} className="fade-in">{content}</div>;
  };

  const isHomePage = activeView === 'home';

  return (
    <div className="bg-white font-sans">
      <div className="relative">
        <div className={`absolute top-0 right-0 w-1/3 h-[600px] bg-brand-light-green rounded-bl-full z-0 max-lg:hidden ${!isHomePage && 'hidden'}`}></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Header onNavigate={handleNavigate} />
          {renderContent()}
        </div>
      </div>
      <Footer onNavigate={handleNavigate}/>
    </div>
  );
};

export default App;
