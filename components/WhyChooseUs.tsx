
import React from 'react';

const FeatureCard: React.FC<{ icon: JSX.Element; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-brand-light-green/50 p-8 rounded-lg text-center">
      <div className="inline-block bg-white p-4 rounded-full text-brand-green">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark mt-4">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-dark">Why Choose <span className="text-brand-green">Us</span></h2>
          <p className="mt-4 text-gray-600">
            Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            title="People Trust Us"
            description="It is a long established fact that a reader will be lorem the.It is a long established fact that a reader will be lorem distracted that."
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="24/7 Customer Support"
            description="It is a long established fact that a reader will be lorem the.It is a long established fact that a reader will be lorem distracted that."
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            title="Security Standards"
            description="It is a long established fact that a reader will be lorem the.It is a long established fact that a reader will be lorem distracted that."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
