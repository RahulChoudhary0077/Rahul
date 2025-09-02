
import React from 'react';

const BusinessSection: React.FC = () => {
  return (
    <section className="bg-brand-dark text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold">
              Grow Your <span className="text-brand-green">Business with Us</span>
            </h2>
            <p className="mt-4 text-gray-300">
              Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
            </p>
            <p className="mt-4 text-gray-300">
              Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
            </p>
          </div>
          <div>
            <img src="https://picsum.photos/seed/business/600/400" alt="Business Growth Illustration" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
