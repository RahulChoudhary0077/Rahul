import React from 'react';

interface PlanProps {
  name: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
}

const PlanCard: React.FC<PlanProps> = ({ name, price, features, isFeatured }) => {
  return (
    <div className={`border rounded-lg p-8 flex flex-col ${isFeatured ? 'bg-brand-dark text-white' : 'bg-white'}`}>
      <h3 className={`text-2xl font-bold ${isFeatured ? 'text-brand-green' : 'text-brand-dark'}`}>{name}</h3>
      <p className="text-4xl font-extrabold my-4">{price}<span className="text-base font-medium">/month</span></p>
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${isFeatured ? 'text-brand-green' : 'text-brand-dark'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 font-bold rounded-lg transition-colors ${isFeatured ? 'bg-brand-green text-white hover:opacity-90' : 'bg-brand-light-green text-brand-dark hover:bg-brand-green hover:text-white'}`}>
        Choose Plan
      </button>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const plans: PlanProps[] = [
    {
      name: 'Free',
      price: '$0',
      features: ['5 Merges per day', '10 Splits per day', '5MB max file size', 'Basic Conversions', 'Community Support'],
    },
    {
      name: 'Pro',
      price: '$9',
      features: ['Unlimited Merges & Splits', '100MB max file size', 'All Conversions', 'OCR for PDFs', 'Priority Support', 'No Ads'],
      isFeatured: true,
    },
    {
      name: 'Business',
      price: '$19',
      features: ['All Pro features', 'Team collaboration', 'API Access', 'Batch Processing', 'Dedicated Support'],
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-light-gray">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-brand-dark text-center mb-4">
          Our <span className="text-brand-green">Pricing</span> Plans
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Choose the plan that's right for you.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map(plan => <PlanCard key={plan.name} {...plan} />)}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
