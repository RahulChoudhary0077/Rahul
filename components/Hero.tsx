import React from 'react';

interface HeroProps {
  onNavigate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="pt-16 pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-dark leading-tight">
            Your All-in-One <br/>
            Online <span className="text-brand-green">PDF Tools</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
          <button 
            onClick={onNavigate}
            className="mt-8 px-8 py-4 bg-brand-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Get Started
          </button>
        </div>
        <div>
          <img src="https://picsum.photos/seed/pdfhero/600/450" alt="PDF Tools Illustration" className="rounded-lg shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
