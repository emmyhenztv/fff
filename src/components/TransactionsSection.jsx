import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BYD_MODELS = [
  "BYD Seal 2024",
  "BYD Atto 3 2024",
  "BYD Han EV 2025",
  "BYD Dolphin 2024",
  "BYD Seal U 2025",
  "BYD Atto 3 2025",
  "BYD Seal 2025",
  "BYD Han EV 2024",
  "BYD Dolphin 2025",
  "BYD Shark 2025",
];

const NAMES = [
  { name: "James O.", country: "🇺🇸 USA" },
  { name: "Sophie M.", country: "🇬🇧 UK" },
  { name: "Carlos R.", country: "🇲🇽 Mexico" },
  { name: "Yuki T.", country: "🇯🇵 Japan" },
  { name: "Emma W.", country: "🇨🇦 Canada" },
  { name: "Lucas B.", country: "🇧🇷 Brazil" },
  { name: "Fatima A.", country: "🇦🇪 UAE" },
  { name: "Pierre D.", country: "🇫🇷 France" },
  { name: "Amara N.", country: "🇿🇦 South Africa" },
  { name: "Hans M.", country: "🇩🇪 Germany" },
  { name: "Raj P.", country: "🇮🇳 India" },
  { name: "Maria G.", country: "🇦🇷 Argentina" },
  { name: "Kevin O.", country: "🇰🇪 Kenya" },
  { name: "Anna S.", country: "🇷🇺 Russia" },
  { name: "David C.", country: "🇦🇺 Australia" },
  { name: "Liam M.", country: "🇮🇪 Ireland" },
  { name: "Jin W.", country: "🇰🇷 South Korea" },
  { name: "Mei L.", country: "🇸🇬 Singapore" },
  { name: "Thomas B.", country: "🇧🇪 Belgium" },
  { name: "Ingrid H.", country: "🇳🇴 Norway" },
];

const DELIVERY_FEES = ["$299", "$349", "$399", "$249", "$329", "$289", "$319"];

const STATUS_VARIANTS = [
  "Delivery confirmed ✓",
  "Car dispatched 🚚",
  "Payment verified ✓",
  "Shipment confirmed ✓",
  "Delivery in transit 🚗",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeEntry() {
  const person = getRandom(NAMES);
  return {
    id: Math.random(),
    name: person.name,
    country: person.country,
    car: getRandom(BYD_MODELS),
    fee: getRandom(DELIVERY_FEES),
    status: getRandom(STATUS_VARIANTS),
    time: `${Math.floor(Math.random() * 4) + 1} min ago`,
  };
}

function buildInitial() {
  return Array.from({ length: 8 }, makeEntry);
}

export default function TransactionsSection() {
  const [visible, setVisible] = useState(() => buildInitial());

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => {
        const next = [...prev];
        const replaceIdx = Math.floor(Math.random() * next.length);
        next[replaceIdx] = makeEntry();
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="transactions" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
            </span>
            <span className="text-green-700 text-sm font-bold uppercase tracking-wide">Live Feed</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900">
            Recent <span className="text-red-600">Delivery Confirmations</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">Live feed of people who just paid their delivery fee and confirmed their BYD car</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wide">
            <span>Recipient</span>
            <span>BYD Model</span>
            <span>Delivery Fee Paid</span>
            <span>Status</span>
          </div>

          <AnimatePresence initial={false}>
            {visible.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, backgroundColor: "#dcfce7" }}
                animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                transition={{ duration: 0.9 }}
                className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-50 text-sm items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{tx.name}</p>
                  <p className="text-gray-400 text-xs">{tx.country}</p>
                </div>
                <span className="font-semibold text-red-700">{tx.car}</span>
                <span className="font-bold text-gray-800">{tx.fee}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <CheckCircle className="w-4 h-4 text-green-500 fill-green-500 shrink-0" />
                  <span className="text-green-600 font-medium text-xs">{tx.status}</span>
                  <span className="text-gray-400 text-xs ml-auto">{tx.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}