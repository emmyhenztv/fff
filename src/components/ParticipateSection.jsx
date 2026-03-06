import React, { useState, useEffect } from 'react';
import { Clock, Users, Zap, Shield, Globe, Star } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

const DEFAULT_CARS = [
  {
    index: 0,
    name: "BYD Seal",
    year: "2025",
    tier: "Performance Sedan",
    fee: "$299",
    delivery: "7–10 Business Days",
    range: "570 km Range",
    power: "390 kW Dual Motor",
    color: "from-gray-900 to-gray-800",
    badge: "🏆 Most Popular",
    badgeColor: "bg-yellow-400 text-yellow-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/fc7c3ae25_IMG-20260306-WA0536.jpg",
  },
  {
    index: 1,
    name: "BYD Atto 3",
    tier: "Premium SUV",
    year: "2025",
    fee: "$349",
    delivery: "5–7 Business Days",
    range: "480 km Range",
    power: "150 kW Electric",
    color: "from-sky-800 to-sky-900",
    badge: "⚡ Express Delivery",
    badgeColor: "bg-blue-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/397f76f88_IMG-20260306-WA0533.jpg",
  },
  {
    index: 2,
    name: "BYD Han EV",
    tier: "Luxury Flagship",
    year: "2025",
    fee: "$399",
    delivery: "3–5 Business Days",
    range: "605 km Range",
    power: "380 kW Quad Motor",
    color: "from-red-800 to-red-900",
    badge: "👑 Premium",
    badgeColor: "bg-purple-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/3bf711821_IMG-20260306-WA0532.jpg",
  },
  {
    index: 3,
    name: "BYD Dolphin",
    tier: "Smart Compact",
    year: "2025",
    fee: "$249",
    delivery: "10–14 Business Days",
    range: "427 km Range",
    power: "130 kW Electric",
    color: "from-emerald-700 to-emerald-900",
    badge: "💚 Best Value",
    badgeColor: "bg-green-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/4a267b535_IMG-20260306-WA0530.jpg",
  },
  {
    index: 4,
    name: "BYD Sea Lion 07",
    tier: "Sport SUV",
    year: "2025",
    fee: "$379",
    delivery: "5–8 Business Days",
    range: "520 km Range",
    power: "310 kW AWD",
    color: "from-violet-800 to-violet-900",
    badge: "🔥 New Arrival",
    badgeColor: "bg-orange-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/2eaef0a2d_IMG-20260306-WA0529.jpg",
  },
  {
    index: 5,
    name: "BYD Yangwang U7",
    tier: "Ultra Luxury",
    year: "2025",
    fee: "$499",
    delivery: "3–5 Business Days",
    range: "680 km Range",
    power: "960 kW Quad Motor",
    color: "from-slate-800 to-slate-900",
    badge: "💎 Ultra Luxury",
    badgeColor: "bg-yellow-500 text-black",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/e8b958f38_IMG-20260306-WA0528.jpg",
  },
  {
    index: 6,
    name: "BYD Seagull",
    tier: "City EV",
    year: "2025",
    fee: "$199",
    delivery: "10–14 Business Days",
    range: "405 km Range",
    power: "55 kW Electric",
    color: "from-cyan-700 to-cyan-900",
    badge: "🌊 City Special",
    badgeColor: "bg-cyan-400 text-cyan-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/e9f6841f6_IMG-20260306-WA0531.jpg",
  },
  {
    index: 7,
    name: "BYD Sealion 6",
    tier: "Family SUV",
    year: "2025",
    fee: "$329",
    delivery: "7–10 Business Days",
    range: "500 km Range",
    power: "204 kW PHEV",
    color: "from-indigo-800 to-indigo-900",
    badge: "👨‍👩‍👧 Family Pick",
    badgeColor: "bg-pink-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/99f4dd363_IMG-20260306-WA0529.jpg",
  },
  {
    index: 8,
    name: "BYD Seal U",
    tier: "Executive SUV",
    year: "2025",
    fee: "$359",
    delivery: "5–7 Business Days",
    range: "543 km Range",
    power: "230 kW PHEV",
    color: "from-zinc-700 to-zinc-900",
    badge: "⭐ Top Rated",
    badgeColor: "bg-amber-400 text-amber-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/c66fcf75c_IMG-20260306-WA0534.jpg",
  },
  {
    index: 9,
    name: "BYD Ocean-X",
    tier: "Sports Coupe",
    year: "2025",
    fee: "$449",
    delivery: "5–8 Business Days",
    range: "600 km Range",
    power: "450 kW RWD",
    color: "from-rose-800 to-rose-900",
    badge: "🏎️ Sports",
    badgeColor: "bg-red-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/0d014f1ca_IMG-20260306-WA0535.jpg",
  },
  {
    index: 10,
    name: "BYD Seal Blue",
    tier: "Performance Sedan",
    year: "2025",
    fee: "$319",
    delivery: "7–10 Business Days",
    range: "570 km Range",
    power: "390 kW Dual Motor",
    color: "from-sky-700 to-sky-900",
    badge: "🔵 Ocean Blue",
    badgeColor: "bg-sky-400 text-sky-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/1b5a8a797_IMG-20260306-WA0517.jpg",
  },
  {
    index: 11,
    name: "BYD Seal Black",
    tier: "Performance Sedan",
    year: "2025",
    fee: "$339",
    delivery: "5–7 Business Days",
    range: "570 km Range",
    power: "390 kW Dual Motor",
    color: "from-gray-900 to-black",
    badge: "⚫ Midnight Edition",
    badgeColor: "bg-gray-700 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/23a40b761_IMG-20260306-WA0519.jpg",
  },
  {
    index: 12,
    name: "BYD Han Premium",
    tier: "Luxury Interior",
    year: "2025",
    fee: "$429",
    delivery: "3–5 Business Days",
    range: "605 km Range",
    power: "380 kW AWD",
    color: "from-slate-700 to-slate-900",
    badge: "👑 Luxury",
    badgeColor: "bg-amber-400 text-amber-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/07d6128a0_IMG-20260306-WA0521.jpg",
  },
  {
    index: 13,
    name: "BYD Han Matte",
    tier: "Stealth Edition",
    year: "2025",
    fee: "$459",
    delivery: "5–7 Business Days",
    range: "620 km Range",
    power: "380 kW AWD",
    color: "from-zinc-800 to-zinc-950",
    badge: "🖤 Stealth",
    badgeColor: "bg-zinc-600 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/9123cff4f_IMG-20260306-WA0523.jpg",
  },
  {
    index: 14,
    name: "BYD Seagull White",
    tier: "City EV",
    year: "2025",
    fee: "$219",
    delivery: "10–14 Business Days",
    range: "405 km Range",
    power: "55 kW Electric",
    color: "from-neutral-600 to-neutral-800",
    badge: "🤍 Clean White",
    badgeColor: "bg-white text-gray-800",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/191f5df61_IMG-20260306-WA0522.jpg",
  },
  {
    index: 15,
    name: "BYD Atto 3 Interior",
    tier: "Premium Interior",
    year: "2025",
    fee: "$359",
    delivery: "5–7 Business Days",
    range: "480 km Range",
    power: "150 kW Electric",
    color: "from-blue-800 to-blue-950",
    badge: "🏠 Premium Cabin",
    badgeColor: "bg-blue-400 text-blue-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/219e35b43_IMG-20260306-WA0524.jpg",
  },
  {
    index: 16,
    name: "BYD Dolphin Blue",
    tier: "Smart Compact",
    year: "2025",
    fee: "$259",
    delivery: "10–14 Business Days",
    range: "427 km Range",
    power: "130 kW Electric",
    color: "from-blue-600 to-blue-800",
    badge: "💙 Ocean Blue",
    badgeColor: "bg-blue-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/71926239e_IMG-20260306-WA0525.jpg",
  },
  {
    index: 17,
    name: "BYD e2",
    tier: "Urban EV",
    year: "2025",
    fee: "$189",
    delivery: "10–14 Business Days",
    range: "360 km Range",
    power: "70 kW Electric",
    color: "from-gray-600 to-gray-800",
    badge: "🏙️ Urban Pick",
    badgeColor: "bg-gray-400 text-gray-900",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/1878bf446_IMG-20260306-WA0526.jpg",
  },
  {
    index: 18,
    name: "BYD Dolphin Plus",
    tier: "Sport Compact",
    year: "2025",
    fee: "$279",
    delivery: "7–10 Business Days",
    range: "450 km Range",
    power: "160 kW Electric",
    color: "from-blue-700 to-indigo-900",
    badge: "➕ Plus Edition",
    badgeColor: "bg-indigo-500 text-white",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/8bdcfa757_IMG-20260306-WA0527.jpg",
  },
];

function CarCard({ car }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Card Header */}
      <div className={`bg-gradient-to-br ${car.color} p-5 relative`}>
        <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${car.badgeColor}`}>
          {car.badge}
        </span>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">{car.tier}</p>
        <h3 className="text-white text-xl font-black mt-1">{car.name}</h3>
        <p className="text-white/60 text-sm">{car.year} Model</p>
        <img
          src={car.img}
          alt={car.name}
          className="w-full h-40 object-cover rounded-xl mt-3 border-2 border-white/20"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Power</p>
              <p className="text-xs font-bold text-gray-800">{car.power}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Range</p>
              <p className="text-xs font-bold text-gray-800">{car.range}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Ships To</p>
              <p className="text-xs font-bold text-gray-800">All Countries</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Delivery</p>
              <p className="text-xs font-bold text-gray-800">{car.delivery}</p>
            </div>
          </div>
        </div>

        {/* Delivery Fee */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 text-center">
          <p className="text-xs text-gray-500 mb-1">One-Time Delivery Fee</p>
          <p className="text-3xl font-black text-red-600">{car.fee}</p>
          <p className="text-xs text-gray-400 mt-1">Covers shipping, customs & logistics</p>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <button
            onClick={() => window.location.href = createPageUrl(`Participate?wallet=${car.index}`)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>🚗 Claim This BYD Now →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ParticipateSection() {
  const [timeLeft] = useState({ hours: 11, minutes: 42, seconds: 33 });
  const [cars, setCars] = useState(DEFAULT_CARS);

  useEffect(() => {
    base44.entities.SiteSettings.list().then(records => {
      if (records && records.length > 0) {
        const s = records[0];
        const dbCount = parseInt(s.car_count) || 0;
        // Use the larger of DB count or DEFAULT_CARS length so new cars always show
        const count = Math.max(dbCount, DEFAULT_CARS.length);
        const loaded = Array.from({ length: count }, (_, i) => ({
          ...DEFAULT_CARS[i],
          index: i,
          name: s[`car_${i + 1}_name`] || DEFAULT_CARS[i]?.name || '',
          tier: s[`car_${i + 1}_tier`] || DEFAULT_CARS[i]?.tier || '',
          fee: s[`car_${i + 1}_fee`] || DEFAULT_CARS[i]?.fee || '',
          delivery: s[`car_${i + 1}_delivery`] || DEFAULT_CARS[i]?.delivery || '',
          img: s[`car_${i + 1}_img`] || DEFAULT_CARS[i]?.img || '',
        }));
        setCars(loaded);
      }
    });
  }, []);

  return (
    <section id="participate" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-200 rounded-full px-4 py-1.5 mb-4">
            <Shield className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-bold uppercase tracking-wide">Official BYD Global Giveaway</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Choose Your <span className="text-red-600">BYD Electric Car</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            BYD is gifting brand new electric vehicles to participants worldwide. Select your model, pay the one-time delivery fee, and receive your car at your doorstep — anywhere in the world.
          </p>

          {/* Timer */}
          <div className="inline-flex items-center gap-6 mt-8 bg-white rounded-2xl px-8 py-4 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-sm">Event ends in:</span>
            </div>
            <div className="flex items-center gap-2">
              {[{ value: timeLeft.hours, label: "HRS" }, { value: timeLeft.minutes, label: "MIN" }, { value: timeLeft.seconds, label: "SEC" }].map((t, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-red-600 font-bold text-xl">:</span>}
                  <div className="text-center">
                    <div className="text-2xl font-black text-gray-900 w-12">{String(t.value).padStart(2, '0')}</div>
                    <div className="text-xs text-gray-400">{t.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">12,847 participants</span>
            </div>
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.index} car={car} />
          ))}
        </div>

        {/* Notice */}
        <div className="mt-10 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-8 text-center shadow-xl">
          <p className="font-black text-xl mb-2">⚡ BYD Electric — Built for the Future</p>
          <p className="text-red-100 text-base max-w-3xl mx-auto leading-relaxed">
            BYD is the world's <strong>#1 electric vehicle manufacturer</strong>, delivering industry-leading range, performance, and safety. Every giveaway vehicle is brand new, fully charged, and delivered with a full manufacturer's warranty. Each participant is eligible for <strong>one vehicle only</strong>. Your delivery fee covers all international shipping, customs clearance, and last-mile logistics. BYD guarantees safe, timely delivery to your door — anywhere in the world. 🌍🚗⚡
          </p>
        </div>

      </div>
    </section>
  );
}