import { assets } from '../assets/assets';

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    description: "We offer a hassle-free exchange policy.",
  },
  {
    icon: assets.quality_icon,
    title: "7 Days Return Policy",
    description: "We provide a 7-day return policy.",
  },
  {
    icon: assets.support_img,
    title: "Best Customer Support",
    description: "We provide 24/7 customer support.",
  },
];

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-6 text-center py-20 px-6 text-gray-700">
      {policies.map((policy, index) => (
        <div key={index} className="max-w-xs">
          <img src={policy.icon} className="w-14 mx-auto mb-4" alt={policy.title} />
          <p className="font-semibold text-base">{policy.title}</p>
          <p className="text-gray-500 text-sm">{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
