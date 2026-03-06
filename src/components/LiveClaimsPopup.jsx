import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const claims = [
  { name: "James O.", country: "🇺🇸 USA", car: "BYD Seal 2024", fee: "$299" },
  { name: "Sophie M.", country: "🇬🇧 UK", car: "BYD Atto 3 2025", fee: "$349" },
  { name: "Carlos R.", country: "🇲🇽 Mexico", car: "BYD Dolphin 2024", fee: "$249" },
  { name: "Yuki T.", country: "🇯🇵 Japan", car: "BYD Han EV 2025", fee: "$399" },
  { name: "Emma W.", country: "🇨🇦 Canada", car: "BYD Seal 2025", fee: "$329" },
  { name: "Lucas B.", country: "🇧🇷 Brazil", car: "BYD Atto 3 2024", fee: "$289" },
  { name: "Fatima A.", country: "🇦🇪 UAE", car: "BYD Han EV 2024", fee: "$399" },
  { name: "Pierre D.", country: "🇫🇷 France", car: "BYD Dolphin 2025", fee: "$249" },
  { name: "Amara N.", country: "🇿🇦 South Africa", car: "BYD Seal U 2025", fee: "$319" },
  { name: "Hans M.", country: "🇩🇪 Germany", car: "BYD Seal 2024", fee: "$299" },
  { name: "Raj P.", country: "🇮🇳 India", car: "BYD Atto 3 2025", fee: "$349" },
  { name: "Maria G.", country: "🇦🇷 Argentina", car: "BYD Dolphin 2024", fee: "$249" },
  { name: "Kevin O.", country: "🇰🇪 Kenya", car: "BYD Seal 2025", fee: "$329" },
  { name: "Anna S.", country: "🇷🇺 Russia", car: "BYD Han EV 2025", fee: "$399" },
  { name: "David C.", country: "🇦🇺 Australia", car: "BYD Shark 2025", fee: "$319" },
  { name: "Liam M.", country: "🇮🇪 Ireland", car: "BYD Atto 3 2024", fee: "$289" },
  { name: "Jin W.", country: "🇰🇷 South Korea", car: "BYD Seal 2024", fee: "$299" },
  { name: "Thomas B.", country: "🇧🇪 Belgium", car: "BYD Dolphin 2025", fee: "$249" },
  { name: "Ingrid H.", country: "🇳🇴 Norway", car: "BYD Han EV 2024", fee: "$399" },
  { name: "Mei L.", country: "🇸🇬 Singapore", car: "BYD Seal U 2025", fee: "$319" },
  { name: "Pablo M.", country: "🇨🇴 Colombia", car: "BYD Atto 3 2025", fee: "$349" },
  { name: "Olga P.", country: "🇵🇱 Poland", car: "BYD Seal 2025", fee: "$329" },
  { name: "Lars E.", country: "🇸🇪 Sweden", car: "BYD Dolphin 2024", fee: "$249" },
  { name: "Sara F.", country: "🇩🇰 Denmark", car: "BYD Han EV 2025", fee: "$399" },
  { name: "Kwame D.", country: "🇬🇭 Ghana", car: "BYD Seal 2024", fee: "$299" },
  { name: "Nadia B.", country: "🇲🇦 Morocco", car: "BYD Atto 3 2024", fee: "$289" },
  { name: "Rafael C.", country: "🇵🇹 Portugal", car: "BYD Shark 2025", fee: "$319" },
  { name: "Hana K.", country: "🇨🇿 Czech Republic", car: "BYD Seal U 2025", fee: "$319" },
  { name: "Viktor N.", country: "🇺🇦 Ukraine", car: "BYD Dolphin 2025", fee: "$249" },
  { name: "Celine F.", country: "🇨🇭 Switzerland", car: "BYD Han EV 2024", fee: "$399" },
];

export default function LiveClaimsPopup() {
  const [visible, setVisible] = useState(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    setQueue([...claims].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (queue.length === 0) return;
    let index = 0;

    const show = () => {
      setVisible(queue[index % queue.length]);
      index++;
      const hideTimer = setTimeout(() => setVisible(null), 4000);
      const nextDelay = 6000 + Math.random() * 4000;
      const nextTimer = setTimeout(show, nextDelay);
      return () => { clearTimeout(hideTimer); clearTimeout(nextTimer); };
    };

    const startTimer = setTimeout(show, 2000);
    return () => clearTimeout(startTimer);
  }, [queue]);

  return (
    <div className="fixed top-24 left-6 z-50 max-w-xs w-full pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={visible.name + visible.car}
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">{visible.name}</span>
                  <span className="text-xs text-gray-500">{visible.country}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Just paid delivery fee for{' '}
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    {visible.car}
                  </span>
                </p>
                <p className="text-green-600 font-bold text-sm mt-1">🚗 Car confirmed & dispatched! ({visible.fee} fee paid)</p>
              </div>
            </div>
            <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
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