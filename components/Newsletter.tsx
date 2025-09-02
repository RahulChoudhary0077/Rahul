
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-brand-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-dark">Subscribe For Our Newsletter</h2>
          <p className="mt-3 text-gray-500">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter Your email Address" 
              className="w-full sm:w-80 px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-brand-green text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
