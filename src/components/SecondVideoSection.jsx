import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellRing, Check, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

// 50 testimonials - no Nigeria
const TESTIMONIALS = [
  { id: 1, name: "Mike Johnson", avatar: "MJ", color: "bg-blue-600", country: "🇺🇸 USA", time: "2 days ago", text: "I received my BYD car!! I can't believe it. I paid the delivery fee and within a week my brand new BYD Seal arrived at my door. This is so real! BYD is truly helping people 🚗⚡", likes: 4821, pinned: true },
  { id: 2, name: "Sarah Williams", avatar: "SW", color: "bg-pink-500", country: "🇺🇸 USA", time: "1 day ago", text: "Just received my BYD car after paying for the delivery fee. I can't believe it — I cried when I saw the car parked outside my house. BYD is genuinely helping people all over the world! 🙏", likes: 3244 },
  { id: 3, name: "Carlos Mendez", avatar: "CM", color: "bg-green-600", country: "🇲🇽 Mexico", time: "3 days ago", text: "From Mexico! I received my BYD car after paying the delivery fee. This giveaway is 100% real. BYD is so real, they shipped it all the way here. I am grateful every single day!", likes: 2918 },
  { id: 4, name: "David Chen", avatar: "DC", color: "bg-purple-600", country: "🇨🇳 China", time: "2 days ago", text: "I was skeptical at first but I paid the delivery fee and received my BYD EV. I can't believe how real this is! BYD is really helping ordinary people like me get a car. Amazing company!", likes: 2611 },
  { id: 5, name: "Amara Osei", avatar: "AO", color: "bg-yellow-500", country: "🇬🇭 Ghana", time: "1 day ago", text: "From Ghana 🇬🇭 I paid for the delivery fee and received my BYD car! I can't believe BYD is this real. They are truly helping people across Africa. God bless BYD!", likes: 2403 },
  { id: 6, name: "James Wilson", avatar: "JW", color: "bg-red-600", country: "🇬🇧 UK", time: "4 hours ago", text: "My wife didn't believe me when I told her I ordered a free BYD car. When it arrived at our home she burst into tears. BYD is so real — this company genuinely cares about people 😭❤️", likes: 2187 },
  { id: 7, name: "Priya Sharma", avatar: "PS", color: "bg-orange-500", country: "🇮🇳 India", time: "6 hours ago", text: "India 🇮🇳 here. I received my BYD car after paying for delivery. This way is just like testimonials I read online — completely real. BYD is really helping people. Thank you!", likes: 1983 },
  { id: 8, name: "Robert Taylor", avatar: "RT", color: "bg-cyan-600", country: "🇦🇺 Australia", time: "8 hours ago", text: "Third person in my neighborhood to receive a BYD car from this giveaway. Every single one of us got our car after paying delivery. Don't overthink it — BYD is 100% real.", likes: 1874 },
  { id: 9, name: "Emma Thompson", avatar: "ET", color: "bg-indigo-500", country: "🇬🇧 UK", time: "12 hours ago", text: "I paid the delivery fee and waited anxiously. One week later my BYD arrived! I can't believe how real this is. BYD is genuinely changing lives. I now have a brand new electric car!! 😱😱😱", likes: 1756 },
  { id: 10, name: "Ahmed Al-Rashid", avatar: "AA", color: "bg-teal-600", country: "🇦🇪 UAE", time: "1 day ago", text: "UAE 🇦🇪 – I received my BYD car after paying for the delivery fee. BYD is doing great things helping people worldwide. This is real and I am living proof!", likes: 1644 },
  { id: 11, name: "Lucas Oliveira", avatar: "LO", color: "bg-lime-600", country: "🇧🇷 Brazil", time: "1 day ago", text: "Brazil 🇧🇷! I received my BYD car! Paid delivery fee and the car arrived at my home. This is the biggest and most real car giveaway in history. BYD is really helping people!", likes: 1521 },
  { id: 12, name: "Jennifer Martinez", avatar: "JM", color: "bg-rose-500", country: "🇲🇽 Mexico", time: "2 days ago", text: "My brother and I both participated. We both received our BYD cars after paying for delivery! Family winning together 🙌 BYD is so real I still pinch myself every morning.", likes: 1498 },
  { id: 13, name: "Kevin Park", avatar: "KP", color: "bg-violet-600", country: "🇰🇷 South Korea", time: "2 days ago", text: "South Korea 🇰🇷 — I received my BYD car after paying for delivery fee. Fast shipping too, under 2 weeks! BYD is truly helping people in all countries. This is amazing!", likes: 1376 },
  { id: 14, name: "Fatima Nkosi", avatar: "FN", color: "bg-amber-600", country: "🇿🇦 South Africa", time: "3 days ago", text: "South Africa 🇿🇦 Never thought I'd receive a free BYD car. Paid the delivery fee and it arrived! BYD is really helping people across Africa. I can't believe how real this is!", likes: 1344 },
  { id: 15, name: "Thomas Brown", avatar: "TB", color: "bg-blue-800", country: "🇺🇸 USA", time: "3 days ago", text: "Former auto industry professional. I know when something is legitimate. I received my BYD car after paying delivery. BYD is verified and WORKS. Don't miss this opportunity!", likes: 1312 },
  { id: 16, name: "Olga Petrov", avatar: "OP", color: "bg-pink-700", country: "🇷🇺 Russia", time: "3 days ago", text: "Russia 🇷🇺 – I received my BYD car after paying the delivery fee! Even from here it worked perfectly. BYD is really helping people everywhere. No restrictions. Everyone can join!", likes: 1289 },
  { id: 17, name: "Anna Kowalski", avatar: "AK", color: "bg-fuchsia-600", country: "🇵🇱 Poland", time: "4 days ago", text: "Poland 🇵🇱 here. Received my BYD car! My hands were shaking when I saw it in my driveway 😂🚗 I can't believe this is real. BYD is genuinely helping people worldwide!", likes: 1143 },
  { id: 18, name: "Marcus Johnson", avatar: "MJ2", color: "bg-red-700", country: "🇺🇸 USA", time: "4 days ago", text: "BYD always delivers! I received my car after paying for the delivery fee. This company loves ALL people worldwide not just China. I am so grateful for this program!", likes: 1122 },
  { id: 19, name: "Sophie Dubois", avatar: "SD", color: "bg-blue-500", country: "🇫🇷 France", time: "5 days ago", text: "France 🇫🇷 ici! I received my BYD car after paying delivery! This is fantastique! BYD is really helping people — I received my car and I still can't believe it is real. Merci BYD!", likes: 1087 },
  { id: 20, name: "Isaac Mensah", avatar: "IM", color: "bg-yellow-600", country: "🇬🇭 Ghana", time: "5 days ago", text: "Ghana again 🇬🇭 I received my BYD car! Paid the delivery fee and my electric vehicle arrived. This is so real. BYD is truly helping people in Africa. I can't believe it!", likes: 1054 },
  { id: 21, name: "Victoria Adams", avatar: "VA", color: "bg-purple-700", country: "🇬🇧 UK", time: "6 days ago", text: "UK 🇬🇧 just received my BYD car! Paid the delivery fee and it arrived within 10 days. Best thing that ever happened to me. BYD is real and they are genuinely helping people!", likes: 1021 },
  { id: 22, name: "Yusuf Al-Mansoori", avatar: "YA", color: "bg-teal-700", country: "🇶🇦 Qatar", time: "6 days ago", text: "Qatar 🇶🇦 – I received my BYD car after paying for the delivery fee. Verified real delivery. BYD is truly helping people globally — this is something extraordinary!", likes: 998 },
  { id: 23, name: "Tyler Anderson", avatar: "TA", color: "bg-indigo-600", country: "🇺🇸 USA", time: "1 week ago", text: "Car enthusiast for many years. I received my BYD car after paying delivery fee. This is the most genuine car giveaway I've ever witnessed. BYD really helps people. Period.", likes: 954 },
  { id: 24, name: "Mei Zhang", avatar: "MZ", color: "bg-pink-600", country: "🇨🇳 China", time: "1 week ago", text: "China 🇨🇳 I received my BYD Seal! Paid the delivery fee. Car arrived fast and smooth! BYD is really helping people even here in their home country. I can't believe this is real!", likes: 932 },
  { id: 25, name: "Laura Schmidt", avatar: "LS", color: "bg-cyan-700", country: "🇩🇪 Germany", time: "1 week ago", text: "Germany 🇩🇪 Sehr gut! I received my BYD car after paying the delivery fee. Das ist fantastisch! BYD giveaway is worldwide and it's real — I can't believe how helpful they are!", likes: 889 },
  { id: 26, name: "Kwame Darko", avatar: "KD", color: "bg-lime-700", country: "🇬🇭 Ghana", time: "1 week ago", text: "Accra 🇬🇭 — I received my BYD car! Paid delivery fee and got my electric car. BYD is so real. They are genuinely helping people in developing countries. God bless BYD!", likes: 867 },
  { id: 27, name: "Nathan White", avatar: "NW", color: "bg-blue-700", country: "🇺🇸 USA", time: "1 week ago", text: "First BYD car giveaway that actually works. I paid the delivery fee and the car was delivered to my address. BYD is real. I can't believe they are helping so many people!", likes: 845 },
  { id: 28, name: "Elena Volkov", avatar: "EV", color: "bg-amber-700", country: "🇺🇦 Ukraine", time: "1 week ago", text: "Ukraine 🇺🇦 – Times have been hard. I received my BYD car after paying the delivery fee. I can't believe how real this is. BYD is really helping people through difficult times. Unbelievable blessing.", likes: 801 },
  { id: 29, name: "Rashid Mohammed", avatar: "RM", color: "bg-green-800", country: "🇰🇪 Kenya", time: "1 week ago", text: "Kenya 🇰🇪 I received my BYD car! Paid for delivery and the car arrived. This is not a joke — BYD is really helping people in Africa. I can't believe it, this is so real!", likes: 789 },
  { id: 30, name: "Chloe Bennett", avatar: "CB", color: "bg-pink-800", country: "🇦🇺 Australia", time: "1 week ago", text: "Australia 🇦🇺 I received my BYD car. Boyfriend didn't believe me. Showed him the car parked in our driveway. Now he applied too 😂🚗 BYD is genuinely helping people worldwide!", likes: 768 },
  { id: 31, name: "Ivan Sokolov", avatar: "IS", color: "bg-sky-700", country: "🇷🇺 Russia", time: "8 days ago", text: "Moscow 🇷🇺 — I received my BYD car after paying delivery! Working perfectly from Russia too. BYD is helping people globally with no restrictions. I can't believe this is real!", likes: 732 },
  { id: 32, name: "Sam Collins", avatar: "SC", color: "bg-fuchsia-700", country: "🇺🇸 USA", time: "8 days ago", text: "Texas 🇺🇸 – I received my BYD car after paying the delivery fee. BYD is doing this for the whole world! I can't believe how real this is. God bless BYD for helping people!", likes: 704 },
  { id: 33, name: "Felix Müller", avatar: "FM", color: "bg-blue-900", country: "🇨🇭 Switzerland", time: "9 days ago", text: "Switzerland 🇨🇭 I received my BYD car after paying delivery. Swiss precision confirmed 😄 BYD's program is flawless and genuinely helping people. I can't believe it's real!", likes: 678 },
  { id: 34, name: "Dmitri Volkov", avatar: "DV", color: "bg-teal-800", country: "🇷🇺 Russia", time: "9 days ago", text: "I received my BYD car. Paid delivery fee. Car arrived at my home. I can still barely believe this is real. BYD is truly helping people around the world. So grateful!", likes: 652 },
  { id: 35, name: "Chris Evans", avatar: "CE", color: "bg-indigo-700", country: "🇺🇸 USA", time: "10 days ago", text: "Boston USA 🇺🇸 – Huge BYD fan. Received my car after paying delivery fee. BYD is so real and genuinely helps people. I can't believe this company exists. Thank you BYD!", likes: 625 },
  { id: 36, name: "Sunita Patel", avatar: "SP", color: "bg-amber-800", country: "🇮🇳 India", time: "10 days ago", text: "Mumbai 🇮🇳 I received my BYD car! Paid delivery and it arrived. My husband thought I was crazy. He's not saying that anymore 😄🚗 BYD is really helping people and I can't believe it!", likes: 612 },
  { id: 37, name: "Hannah Schmidt", avatar: "HS", color: "bg-lime-800", country: "🇩🇪 Germany", time: "11 days ago", text: "Berlin 🇩🇪 – I'm a logistics professional. I verified the entire delivery process. BYD's giveaway is clean, legitimate and real. I received my car and I can't believe how real this is!", likes: 584 },
  { id: 38, name: "Paul Garcia", avatar: "PG", color: "bg-pink-900", country: "🇲🇽 Mexico", time: "11 days ago", text: "Mexico City 🇲🇽 – I received my BYD car after paying the delivery fee. BYD is a gift to the whole world. I can't believe it's real — but it IS! Viva BYD! 🚗🌍", likes: 558 },
  { id: 39, name: "Liam O'Brien", avatar: "LO2", color: "bg-green-900", country: "🇮🇪 Ireland", time: "12 days ago", text: "Ireland 🇮🇪 – I received my BYD car after paying delivery! BYD generosity is something else. I can't believe how real this is. Thank you BYD for helping ordinary people! 🍀🚗", likes: 532 },
  { id: 40, name: "Kenji Yamamoto", avatar: "KY", color: "bg-red-900", country: "🇯🇵 Japan", time: "12 days ago", text: "Tokyo 🇯🇵 I received my BYD car! Paid delivery fee and it arrived quickly. BYD is really helping people worldwide. I can't believe how real and genuine this entire program is!", likes: 504 },
  { id: 41, name: "Patrick Brennan", avatar: "PB", color: "bg-teal-900", country: "🇺🇸 USA", time: "13 days ago", text: "Chicago 🇺🇸 – I received my BYD car. As someone who was very skeptical at first, I'm now a true believer. BYD is genuinely helping people all over the world. This is incredible.", likes: 478 },
  { id: 42, name: "Nina Castillo", avatar: "NC", color: "bg-fuchsia-800", country: "🇨🇴 Colombia", time: "13 days ago", text: "Colombia 🇨🇴 – I received my BYD car after paying the delivery fee! BYD es genial. The best car giveaway ever seen globally — they really are helping people everywhere!", likes: 452 },
  { id: 43, name: "Marc Lefevre", avatar: "ML", color: "bg-amber-900", country: "🇫🇷 France", time: "2 weeks ago", text: "Paris 🇫🇷 – I received my BYD car! Paid delivery, car arrived at my apartment. This is not a scam — it's BYD's real campaign to help people worldwide. I can't believe it!", likes: 424 },
  { id: 44, name: "Alex Turner", avatar: "AT", color: "bg-violet-900", country: "🇬🇧 UK", time: "2 weeks ago", text: "London 🇬🇧 – I received my BYD car after paying for the delivery fee! I can't believe how real this is. BYD is genuinely helping people. Cheers BYD! 🎩🚗", likes: 398 },
  { id: 45, name: "Lars Eriksson", avatar: "LE", color: "bg-lime-900", country: "🇸🇪 Sweden", time: "2 weeks ago", text: "Sweden 🇸🇪 – I received my BYD car! Paid delivery and it arrived. BYD is helping people even in Scandinavia. I can't believe this is real. Tack BYD!", likes: 371 },
  { id: 46, name: "Carlos Silva", avatar: "CS", color: "bg-blue-800", country: "🇧🇷 Brazil", time: "2 weeks ago", text: "São Paulo 🇧🇷 – I received my BYD car! Paid the delivery fee and my EV arrived home. BYD is really helping people across Brazil. I can't believe how real and generous they are!", likes: 343 },
  { id: 47, name: "Ingrid Hansen", avatar: "IH", color: "bg-orange-900", country: "🇳🇴 Norway", time: "2 weeks ago", text: "Norway 🇳🇴 – I received my BYD car after paying the delivery fee! Even my friends are amazed. BYD is really helping people globally. I can't believe this is actually real!", likes: 316 },
  { id: 48, name: "Tariq Al-Farsi", avatar: "TF", color: "bg-green-700", country: "🇸🇦 Saudi Arabia", time: "2 weeks ago", text: "Saudi Arabia 🇸🇦 – I received my BYD car. Paid delivery fee and car arrived. Even from the Middle East this works perfectly. BYD is really helping people. Shukran BYD!", likes: 299 },
  { id: 49, name: "Zhang Wei", avatar: "ZW", color: "bg-red-800", country: "🇨🇳 China", time: "2 weeks ago", text: "Shanghai 🇨🇳 – I received my BYD car after paying delivery. Verified every step. I can't believe how real this is — BYD is genuinely helping people everywhere. Incredible company!", likes: 282 },
  { id: 50, name: "Yuki Tanaka", avatar: "YT", color: "bg-sky-800", country: "🇯🇵 Japan", time: "2 weeks ago", text: "Osaka 🇯🇵 – I received my BYD car! Paid delivery fee and the car arrived. BYD is truly helping people — I can't believe how real this is. Arigatou gozaimasu BYD!", likes: 268 },
];

const LIVE_POOL = [
  { name: "CarFan_DE", avatar: "CF", color: "bg-yellow-600", country: "🇩🇪 Germany", text: "Just paid the delivery fee now... praying 🙏🙏 Will update when the car arrives!", likes: 8 },
  { name: "BYD_Lover_UK", avatar: "BL", color: "bg-blue-500", country: "🇬🇧 UK", text: "UPDATE: IT ARRIVED! I received my BYD car after paying delivery! I can't believe this is real 🔥🔥🔥", likes: 241 },
  { name: "EV_Fan_JP", avatar: "EF", color: "bg-red-500", country: "🇯🇵 Japan", text: "Tokyo here! I received my BYD car. Paid delivery, car came in 9 days. Posted proof online. BYD is SO REAL!", likes: 189 },
  { name: "BYD_Bull_AU", avatar: "BB", color: "bg-green-500", country: "🇦🇺 Australia", text: "Received my BYD car! Paid delivery fee and it arrived! My neighbor also applied — BYD really helps people. LETS GO 🚗", likes: 143 },
  { name: "ElecCar_FR", avatar: "EC", color: "bg-indigo-500", country: "🇫🇷 France", text: "Paris! I received my BYD car after paying the delivery fee. I can't believe how real this is. BYD is helping people REAL!", likes: 312 },
  { name: "CarMom_CA", avatar: "CM", color: "bg-pink-500", country: "🇨🇦 Canada", text: "I'm a 54yr old mom. My son helped me apply. I RECEIVED MY BYD CAR! I can't believe how real BYD is! 😂🚗", likes: 467 },
  { name: "BYD_Fan_BR", avatar: "BF", color: "bg-orange-500", country: "🇧🇷 Brazil", text: "Brazil! I received my BYD car after paying delivery fee! Obrigado BYD!! BYD is really helping people 🇧🇷⚡", likes: 198 },
  { name: "EV_Lover_KR", avatar: "EL", color: "bg-teal-500", country: "🇰🇷 South Korea", text: "Seoul 🇰🇷 — I received my BYD Seal! Paid delivery and car came in 8 days. I can't believe BYD is this real!", likes: 276 },
  { name: "BYD_UAE", avatar: "BU", color: "bg-amber-500", country: "🇦🇪 UAE", text: "Dubai! I received my BYD car after paying the delivery fee. BYD is genuinely helping people. This is real engineering of trust!", likes: 589 },
  { name: "BYD_PL", avatar: "BP", color: "bg-violet-500", country: "🇵🇱 Poland", text: "Warsaw 🇵🇱 – I received my BYD car! Every step was real. Paid delivery, car arrived. BYD is really helping people everywhere. God bless BYD!", likes: 334 },
];

let liveCounter = 2000;

function CommentItem({ c, likedIds, toggleLike, isNew }) {
  return (
    <div
      className="flex gap-3"
      style={{ animation: isNew ? 'slideInTop 0.5s ease-out' : 'none' }}
    >
      <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
        {c.avatar.slice(0, 2)}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">{c.name}</span>
          {c.country && <span className="text-xs text-gray-400">{c.country}</span>}
          {c.pinned && <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">📌 Pinned</span>}
          {isNew && <span className="text-xs bg-green-700/60 text-green-300 px-2 py-0.5 rounded-full animate-pulse">🔴 Just now</span>}
          <span className="text-gray-500 text-xs">{c.time || 'just now'}</span>
        </div>
        <p className="text-gray-300 text-sm mt-1 leading-relaxed">{c.text}</p>
        <div className="flex items-center gap-4 mt-2">
          <button onClick={() => toggleLike(c.id)} className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
            <ThumbsUp className={`w-3.5 h-3.5 ${likedIds[c.id] ? 'text-blue-400 fill-blue-400' : ''}`} />
            <span className="text-xs">{(c.likes + (likedIds[c.id] ? 1 : 0)).toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          <button className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Reply</button>
        </div>
      </div>
    </div>
  );
}

function LiveComments() {
  const [comments, setComments] = useState(TESTIMONIALS);
  const [totalCount, setTotalCount] = useState(TESTIMONIALS.length + 11420);
  const [showAll, setShowAll] = useState(false);
  const [likedIds, setLikedIds] = useState({});
  const [newIds, setNewIds] = useState(new Set());
  const poolRef = useRef(0);

  useEffect(() => {
    const timerRef = { current: null };
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      timerRef.current = setTimeout(() => {
        const template = LIVE_POOL[poolRef.current % LIVE_POOL.length];
        poolRef.current += 1;
        liveCounter += 1;
        const newC = { ...template, id: liveCounter, time: 'just now' };
        setComments(prev => [newC, ...prev]);
        setTotalCount(prev => prev + 1);
        setNewIds(prev => new Set([...prev, liveCounter]));
        setTimeout(() => {
          setNewIds(prev => { const n = new Set(prev); n.delete(newC.id); return n; });
        }, 8000);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timerRef.current);
  }, []);

  const displayed = showAll ? comments : comments.slice(0, 8);
  const toggleLike = (id) => setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-gray-950 border-t border-gray-800 pt-5 pb-2">
      <style>{`
        @keyframes slideInTop {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-white font-bold text-lg">{totalCount.toLocaleString()} Comments</span>
        <span className="flex items-center gap-1 text-xs text-green-400 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Live
        </span>
      </div>
      <div className="space-y-5">
        {displayed.map(c => (
          <CommentItem key={c.id} c={c} likedIds={likedIds} toggleLike={toggleLike} isNew={newIds.has(c.id)} />
        ))}
      </div>
      <button
        onClick={() => setShowAll(v => !v)}
        className="mt-5 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        {showAll
          ? <><ChevronUp className="w-4 h-4" /> Show less</>
          : <><ChevronDown className="w-4 h-4" /> Show {comments.length - 8} more testimonials</>}
      </button>
    </div>
  );
}

export default function SecondVideoSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [bellOn, setBellOn] = useState(false);
  const [showBellMsg, setShowBellMsg] = useState(false);

  return (
    <section className="py-20 bg-gray-950 border-t border-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500" />
            </span>
            <span className="text-red-400 text-sm font-bold uppercase tracking-wide">🔴 Live Broadcast</span>
          </div>
          <h2 className="text-4xl font-black text-white">
            BYD's <span className="text-red-500">Live Car</span> Giveaway Broadcast
          </h2>
          <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
            Watch the latest official BYD broadcast — car giveaway update for all countries worldwide.
          </p>
        </div>

        <div className="max-w-sm mx-auto md:max-w-md">
          {/* New video embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30 border border-gray-800 bg-black">
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/BM6Jm_MsLRQ?rel=0&modestbranding=1&fs=1&playsinline=1"
                title="BYD Live Car Giveaway Broadcast"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video info */}
          <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-bold text-sm leading-snug">🔴 LIVE – BYD's Official Car Giveaway – Watch & Claim Your Free Electric Car NOW!</h3>
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <div className="flex items-center gap-3 text-gray-400 text-xs">
                <span>8.4M views</span>
                <span>•</span>
                <span>Streaming live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-800 rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">👍 612K</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-800 rounded-full px-3 py-1">
                  <span className="text-white text-sm">Share</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-800 flex-wrap">
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">BYD</div>
              <div>
                <p className="text-white font-semibold text-sm">BYD Auto Official</p>
                <p className="text-gray-500 text-xs">12.4M subscribers • @BYDAuto</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {!subscribed ? (
                  <button
                    onClick={() => setSubscribed(true)}
                    className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Subscribe
                  </button>
                ) : (
                  <>
                    <button className="flex items-center gap-1.5 bg-gray-700 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                      <Check className="w-3.5 h-3.5 text-green-400" /> Subscribed
                    </button>
                    <button
                      onClick={() => { setBellOn(true); setShowBellMsg(true); setTimeout(() => setShowBellMsg(false), 3500); }}
                      className={`p-1.5 rounded-full transition-colors ${bellOn ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                      title="Turn on notifications"
                    >
                      {bellOn ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </button>
                  </>
                )}
              </div>
            </div>

            {subscribed && !bellOn && (
              <div className="mt-3 bg-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                Subscribed! Tap 🔔 to get notifications for all new announcements.
              </div>
            )}
            {showBellMsg && (
              <div className="mt-3 bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-3 py-2 text-xs text-yellow-300 flex items-center gap-2">
                <BellRing className="w-3.5 h-3.5 shrink-0" />
                🔔 Notifications are ON! You'll be alerted for every new giveaway broadcast.
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Watching Live", value: "🔴 48,291" },
              { label: "Cars Given Away", value: "10,000 BYD EVs" },
              { label: "Event Status", value: "🔴 LIVE NOW" },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
                <p className="text-white font-black text-sm">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Live comments / testimonials */}
          <div className="mt-6">
            <LiveComments />
          </div>
        </div>
      </div>
    </section>
  );
}