import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: "Michael R.", country: "🇺🇸 USA", text: "I received my BYD Seal 2024! I paid the delivery fee and the car arrived at my door in 9 days. I can't believe how real this is. BYD is genuinely helping people worldwide!", car: "BYD Seal 2024 🚗" },
  { name: "Sofia K.", country: "🇩🇪 Germany", text: "My BYD Atto 3 2025 arrived last week. I was so nervous but after paying the delivery fee the car just showed up! BYD is truly changing lives. Danke BYD!", car: "BYD Atto 3 2025 🚗" },
  { name: "James T.", country: "🇬🇧 UK", text: "BYD Han EV 2025 is now parked outside my house. I paid for delivery and 11 days later this beautiful electric car arrived. BYD is 100% real and genuinely helping people!", car: "BYD Han EV 2025 🚗" },
  { name: "Anya M.", country: "🇷🇺 Russia", text: "I received my BYD Dolphin 2024! Even from Russia the delivery worked perfectly. Paid the fee and my car arrived in under 2 weeks. BYD is amazing — I can't believe it!", car: "BYD Dolphin 2024 🚗" },
  { name: "Carlos P.", country: "🇧🇷 Brazil", text: "BYD Seal 2025 delivered to my home in São Paulo! I told my family and now three of them have applied too. BYD is real and helping people all over South America!", car: "BYD Seal 2025 🚗" },
  { name: "Yuki T.", country: "🇯🇵 Japan", text: "I received my BYD Seal U 2025 in Tokyo! I paid the delivery fee and within 10 days a brand new electric car was at my doorstep. BYD is so real — arigatou gozaimasu!", car: "BYD Seal U 2025 🚗" },
  { name: "Amara N.", country: "🇿🇦 South Africa", text: "South Africa! I received my BYD Atto 3 2024 after paying the delivery fee. This is the most real thing I've experienced. BYD is helping people in Africa too!", car: "BYD Atto 3 2024 🚗" },
  { name: "Liam M.", country: "🇮🇪 Ireland", text: "My BYD Dolphin 2025 arrived in Dublin. Paid the delivery fee, waited 8 days, and a brand new EV was parked outside. BYD is genuinely helping people — I can't believe it's real!", car: "BYD Dolphin 2025 🚗" },
];

const stats = [
  { value: "10,000+", label: "Cars Delivered" },
  { value: "12,847", label: "Participants" },
  { value: "99.8%", label: "Success Rate" },
  { value: "~9 days", label: "Avg. Delivery Time" },
];

export default function SocialProof() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
              <p className="text-3xl font-black text-red-500">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white">What <span className="text-red-500">BYD Car Winners</span> Are Saying</h2>
          <p className="text-gray-500 mt-2 text-sm">Real people. Real BYD cars. Verified deliveries worldwide.</p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-2xl mx-auto relative h-52">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                  {testimonials[active].name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-white font-bold">{testimonials[active].name}</span>
                    <span className="text-gray-500 text-sm">{testimonials[active].country}</span>
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-semibold">{testimonials[active].car}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">"{testimonials[active].text}"</p>
                  <div className="flex mt-2 gap-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-red-500' : 'bg-gray-700'}`} />
          ))}
        </div>

        {/* Verified badge row - BYD themed */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "BYD Seal — Delivered", emoji: "🚗" },
            { label: "BYD Atto 3 — Delivered", emoji: "🚙" },
            { label: "BYD Han EV — Delivered", emoji: "⚡" },
          ].map((n, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2">
              <span className="text-xl">{n.emoji}</span>
              <span className="text-gray-400 text-sm font-medium">{n.label}</span>
              <div className="flex items-center gap-1">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
                </span>
                <span className="text-green-400 text-xs font-bold">Live</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}