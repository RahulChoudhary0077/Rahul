import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-brand-dark text-center mb-4">
          About <span className="text-brand-green">Pdf-Converter</span>
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Your one-stop solution for all PDF-related tasks. We believe in simplicity, security, and efficiency.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            At Pdf-Converter, our mission is to provide powerful, user-friendly, and accessible tools to everyone. We understand that dealing with documents can be a hassle, and we're here to streamline that process. Whether you're a student, a professional, or just someone who needs to manage documents occasionally, our suite of tools is designed to make your life easier.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Why We Built This</h2>
          <p className="text-gray-700 mb-6">
            The idea for Pdf-Converter was born out of frustration. We were tired of clunky software, expensive subscriptions, and services that compromised user privacy. We envisioned a platform that was not only free and easy to use but also respected user data by performing as many operations as possible directly in the browser. This commitment to client-side processing means your files stay on your computer, providing an unparalleled level of security and privacy.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Our Technology</h2>
          <p className="text-gray-700">
            We leverage cutting-edge web technologies like React, Tailwind CSS, and WebAssembly-powered libraries like pdf-lib to deliver a fast and reliable experience. By running complex operations in your browser, we minimize server costs and pass those savings on to you—by keeping our core tools free. For more intensive tasks that require server power, we are building a secure and scalable backend infrastructure to handle them efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
