import React from 'react';

const BYD_SEAL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/7d00b4d84_IMG_20260306_163446_276.jpg";

const prizes = [
  { label: "BYD Seal 2025", amount: "Electric Sedan", sub: "530km range · 523hp", color: "from-red-50 to-red-100", badge: "Most Popular" },
  { label: "BYD Atto 3 2025", amount: "Electric SUV", sub: "480km range · 204hp", color: "from-blue-50 to-blue-100", badge: "Best SUV" },
  { label: "BYD Han EV 2025", amount: "Luxury Sedan", sub: "605km range · 517hp", color: "from-gray-50 to-gray-100", badge: "Premium" },
  { label: "BYD Dolphin 2024", amount: "Compact EV", sub: "427km range · 177hp", color: "from-green-50 to-green-100", badge: "Eco Pick" },
];

export default function GiveawayInfo() {
  return (
    <section id="info" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Available <span className="text-red-600">BYD Cars</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Choose your preferred BYD electric car. All models are brand new{' '}
            <strong className="text-red-600">2024–2025</strong> editions delivered straight to your door.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => (
            <div key={index} className={`bg-gradient-to-br ${prize.color} rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center relative`}>
              <div className="absolute top-3 right-3">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{prize.badge}</span>
              </div>
              <div className="flex justify-center mb-2">
                <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" />
                  </span>
                  <span className="text-green-700 text-xs font-bold">AVAILABLE</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white border border-gray-100 p-1 shadow">
                <img src={BYD_SEAL} alt={prize.label} className="w-full h-full object-cover rounded-xl" />
              </div>
              <h3 className="text-gray-900 font-black text-base mb-1">{prize.label}</h3>
              <p className="text-red-600 font-bold text-sm">{prize.amount}</p>
              <p className="text-gray-500 text-xs mt-1">{prize.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 border border-red-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How the Giveaway Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-3xl font-black text-red-600">1</span>
              <p>Register your details and choose the BYD electric car model you'd like to receive.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl font-black text-red-600">2</span>
              <p>Pay the small one-time delivery fee to cover international shipping and logistics costs.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl font-black text-red-600">3</span>
              <p>Your brand new BYD electric car is <strong>delivered to your door</strong> within 7–14 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}