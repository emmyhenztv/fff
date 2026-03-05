import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const claims = [
  { name: "James O.", country: "🇺🇸 United States", amount: "2.5 BTC", value: "$127,500" },
  { name: "Sophie M.", country: "🇬🇧 United Kingdom", amount: "5,000 USDT", value: "$5,000" },
  { name: "Carlos R.", country: "🇲🇽 Mexico", amount: "8 ETH", value: "$24,000" },
  { name: "Yuki T.", country: "🇯🇵 Japan", amount: "500 SOL", value: "$75,000" },
  { name: "Ahmed K.", country: "🇳🇬 Nigeria", amount: "1,000 TRUMP", value: "$12,000" },
  { name: "Emma W.", country: "🇨🇦 Canada", amount: "1.2 BTC", value: "$61,200" },
  { name: "Lucas B.", country: "🇧🇷 Brazil", amount: "3 ETH", value: "$9,000" },
  { name: "Fatima A.", country: "🇦🇪 UAE", amount: "10,000 USDT", value: "$10,000" },
  { name: "Wang L.", country: "🇸🇬 Singapore", amount: "200 SOL", value: "$30,000" },
  { name: "Pierre D.", country: "🇫🇷 France", amount: "4 ETH", value: "$12,000" },
  { name: "Amara N.", country: "🇿🇦 South Africa", amount: "500 USDT", value: "$500" },
  { name: "Hans M.", country: "🇩🇪 Germany", amount: "0.8 BTC", value: "$40,800" },
  { name: "Isabella F.", country: "🇮🇹 Italy", amount: "2,000 TRUMP", value: "$24,000" },
  { name: "Raj P.", country: "🇮🇳 India", amount: "300 SOL", value: "$45,000" },
  { name: "Maria G.", country: "🇦🇷 Argentina", amount: "1.5 ETH", value: "$4,500" },
  { name: "Kevin O.", country: "🇰🇪 Kenya", amount: "2,500 USDT", value: "$2,500" },
  { name: "Chidi U.", country: "🇳🇬 Nigeria", amount: "0.5 BTC", value: "$25,500" },
  { name: "Anna S.", country: "🇷🇺 Russia", amount: "6 ETH", value: "$18,000" },
  { name: "David C.", country: "🇦🇺 Australia", amount: "1,000 SOL", value: "$150,000" },
  { name: "Priya V.", country: "🇮🇳 India", amount: "5,000 TRUMP", value: "$60,000" },
  { name: "Miguel T.", country: "🇪🇸 Spain", amount: "1 BTC", value: "$51,000" },
  { name: "Lily C.", country: "🇨🇳 China", amount: "7,500 USDT", value: "$7,500" },
  { name: "Felix O.", country: "🇬🇭 Ghana", amount: "200 SOL", value: "$30,000" },
  { name: "Chloe H.", country: "🇳🇿 New Zealand", amount: "3 ETH", value: "$9,000" },
  { name: "Omar A.", country: "🇸🇦 Saudi Arabia", amount: "2 BTC", value: "$102,000" },
  { name: "Nadia B.", country: "🇲🇦 Morocco", amount: "1,000 USDT", value: "$1,000" },
  { name: "Tunde A.", country: "🇳🇬 Nigeria", amount: "4 ETH", value: "$12,000" },
  { name: "Erik L.", country: "🇸🇪 Sweden", amount: "800 SOL", value: "$120,000" },
  { name: "Zoe K.", country: "🇬🇷 Greece", amount: "3,000 TRUMP", value: "$36,000" },
  { name: "Musa D.", country: "🇹🇿 Tanzania", amount: "500 USDT", value: "$500" },
  { name: "Jin W.", country: "🇰🇷 South Korea", amount: "1.8 BTC", value: "$91,800" },
  { name: "Sara E.", country: "🇸🇪 Sweden", amount: "5 ETH", value: "$15,000" },
  { name: "Pablo M.", country: "🇨🇴 Colombia", amount: "400 SOL", value: "$60,000" },
  { name: "Aisha M.", country: "🇵🇰 Pakistan", amount: "2,000 USDT", value: "$2,000" },
  { name: "Thomas B.", country: "🇧🇪 Belgium", amount: "0.9 BTC", value: "$45,900" },
  { name: "Grace A.", country: "🇿🇲 Zambia", amount: "1,500 TRUMP", value: "$18,000" },
  { name: "Noah J.", country: "🇳🇴 Norway", amount: "6 ETH", value: "$18,000" },
  { name: "Layla H.", country: "🇯🇴 Jordan", amount: "300 SOL", value: "$45,000" },
  { name: "Victor N.", country: "🇺🇦 Ukraine", amount: "0.4 BTC", value: "$20,400" },
  { name: "Mei L.", country: "🇹🇼 Taiwan", amount: "10,000 USDT", value: "$10,000" },
  { name: "Kwame A.", country: "🇬🇭 Ghana", amount: "2 ETH", value: "$6,000" },
  { name: "Olga P.", country: "🇵🇱 Poland", amount: "700 SOL", value: "$105,000" },
  { name: "Ahmed S.", country: "🇪🇬 Egypt", amount: "4,000 TRUMP", value: "$48,000" },
  { name: "Liam M.", country: "🇮🇪 Ireland", amount: "1.1 BTC", value: "$56,100" },
  { name: "Nina R.", country: "🇷🇴 Romania", amount: "8 ETH", value: "$24,000" },
  { name: "Kofi B.", country: "🇨🇮 Ivory Coast", amount: "1,000 USDT", value: "$1,000" },
  { name: "Santiago V.", country: "🇵🇪 Peru", amount: "250 SOL", value: "$37,500" },
  { name: "Hana K.", country: "🇨🇿 Czech Republic", amount: "0.7 BTC", value: "$35,700" },
  { name: "Emeka O.", country: "🇳🇬 Nigeria", amount: "3 ETH", value: "$9,000" },
  { name: "Yuna P.", country: "🇰🇷 South Korea", amount: "5,000 TRUMP", value: "$60,000" },
  { name: "Rafael C.", country: "🇵🇹 Portugal", amount: "600 SOL", value: "$90,000" },
  { name: "Amina D.", country: "🇸🇳 Senegal", amount: "3,000 USDT", value: "$3,000" },
  { name: "Lucas V.", country: "🇳🇱 Netherlands", amount: "2 BTC", value: "$102,000" },
  { name: "Sana M.", country: "🇧🇩 Bangladesh", amount: "4 ETH", value: "$12,000" },
  { name: "Elias N.", country: "🇳🇴 Norway", amount: "100 SOL", value: "$15,000" },
  { name: "Celine F.", country: "🇨🇭 Switzerland", amount: "2,000 TRUMP", value: "$24,000" },
  { name: "Abebe G.", country: "🇪🇹 Ethiopia", amount: "500 USDT", value: "$500" },
  { name: "Ivan K.", country: "🇧🇬 Bulgaria", amount: "1.3 BTC", value: "$66,300" },
  { name: "Diana C.", country: "🇨🇱 Chile", amount: "9 ETH", value: "$27,000" },
  { name: "Bayo A.", country: "🇳🇬 Nigeria", amount: "400 SOL", value: "$60,000" },
  { name: "Hana T.", country: "🇯🇵 Japan", amount: "8,000 USDT", value: "$8,000" },
  { name: "Mark S.", country: "🇺🇸 United States", amount: "3 BTC", value: "$153,000" },
  { name: "Rosa M.", country: "🇵🇭 Philippines", amount: "7 ETH", value: "$21,000" },
  { name: "Yaw A.", country: "🇬🇭 Ghana", amount: "3,000 TRUMP", value: "$36,000" },
  { name: "Nour B.", country: "🇹🇳 Tunisia", amount: "200 SOL", value: "$30,000" },
  { name: "Leo D.", country: "🇩🇰 Denmark", amount: "0.6 BTC", value: "$30,600" },
  { name: "Chioma E.", country: "🇳🇬 Nigeria", amount: "5 ETH", value: "$15,000" },
  { name: "Ali R.", country: "🇮🇷 Iran", amount: "6,000 USDT", value: "$6,000" },
  { name: "Sofia K.", country: "🇫🇮 Finland", amount: "500 SOL", value: "$75,000" },
  { name: "Marco R.", country: "🇮🇹 Italy", amount: "4,000 TRUMP", value: "$48,000" },
];

const cryptoColors = {
  BTC: "bg-orange-100 text-orange-700",
  ETH: "bg-blue-100 text-blue-700",
  SOL: "bg-purple-100 text-purple-700",
  USDT: "bg-green-100 text-green-700",
  TRUMP: "bg-red-100 text-red-700",
};

function getCryptoTag(amount) {
  const sym = amount.split(' ')[1];
  return cryptoColors[sym] || "bg-gray-100 text-gray-700";
}

export default function LiveClaimsPopup() {
  const [visible, setVisible] = useState(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // Shuffle and build queue
    const shuffled = [...claims].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
  }, []);

  useEffect(() => {
    if (queue.length === 0) return;

    let index = 0;

    const show = () => {
      setVisible(queue[index % queue.length]);
      index++;

      // Hide after 4 seconds
      const hideTimer = setTimeout(() => {
        setVisible(null);
      }, 4000);

      // Show next after 6–10 seconds
      const nextDelay = 6000 + Math.random() * 4000;
      const nextTimer = setTimeout(show, nextDelay);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(nextTimer);
      };
    };

    // Initial delay
    const startTimer = setTimeout(show, 2000);
    return () => clearTimeout(startTimer);
  }, [queue]);

  return (
    <div className="fixed top-24 left-6 z-50 max-w-xs w-full pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={visible.name + visible.amount}
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">{visible.name}</span>
                  <span className="text-xs text-gray-500">{visible.country}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Just claimed{' '}
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getCryptoTag(visible.amount)}`}>
                    {visible.amount}
                  </span>
                </p>
                <p className="text-green-600 font-bold text-sm mt-1">≈ {visible.value} received ✓</p>
              </div>
            </div>
            <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}