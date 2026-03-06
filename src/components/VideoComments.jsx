import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

const BASE_COMMENTS = [
  { id: 1, name: "Mike Johnson", avatar: "MJ", color: "bg-blue-600", time: "2 days ago", text: "Just received my BYD Seal 2024!! I paid the delivery fee and within 9 days the car was at my door. This is REAL. I can't believe BYD is doing this for people! 🚗⚡", likes: 4821, pinned: true },
  { id: 2, name: "Sarah Williams", avatar: "SW", color: "bg-pink-500", time: "1 day ago", text: "I received my BYD Atto 3 2025 after paying the delivery fee. I can't believe it — I cried when I saw the car parked outside my house. BYD is genuinely helping people! 🙏", likes: 3244 },
  { id: 3, name: "Carlos Mendez", avatar: "CM", color: "bg-green-600", time: "3 days ago", text: "From Mexico! I received my BYD Dolphin 2024 after paying the delivery fee. This giveaway is 100% real. BYD shipped it all the way here. I am so grateful!", likes: 2918 },
  { id: 4, name: "David Chen", avatar: "DC", color: "bg-purple-600", time: "2 days ago", text: "I was skeptical at first but I paid the delivery fee and received my BYD Han EV 2025. I can't believe how real this is! BYD is really helping ordinary people like me get a car!", likes: 2611 },
  { id: 5, name: "Amara Osei", avatar: "AO", color: "bg-yellow-500", time: "1 day ago", text: "From Ghana 🇬🇭 I paid the delivery fee and received my BYD Seal 2025! I can't believe BYD is this real. They are truly helping people across Africa. God bless BYD!", likes: 2403 },
  { id: 6, name: "James Wilson", avatar: "JW", color: "bg-red-600", time: "4 hours ago", text: "My wife didn't believe me when I told her I got a free BYD car. When the BYD Atto 3 arrived at our home she burst into tears. BYD is so real — this company genuinely cares! 😭❤️", likes: 2187 },
  { id: 7, name: "Priya Sharma", avatar: "PS", color: "bg-orange-500", time: "6 hours ago", text: "India 🇮🇳 here. I received my BYD Dolphin 2025 after paying for delivery. Completely real. BYD is really helping people worldwide. Thank you BYD!", likes: 1983 },
  { id: 8, name: "Robert Taylor", avatar: "RT", color: "bg-cyan-600", time: "8 hours ago", text: "Third person in my neighborhood to receive a BYD car! We all got our cars after paying delivery fees. Don't overthink it — BYD is 100% real. Mine is a BYD Seal U 2025!", likes: 1874 },
  { id: 9, name: "Emma Thompson", avatar: "ET", color: "bg-indigo-500", time: "12 hours ago", text: "I paid the delivery fee and waited anxiously. One week later my BYD Han EV 2024 arrived! I can't believe how real this is. BYD is genuinely changing lives! 😱😱😱", likes: 1756 },
  { id: 10, name: "Ahmed Al-Rashid", avatar: "AA", color: "bg-teal-600", time: "1 day ago", text: "UAE 🇦🇪 – I received my BYD Seal 2024 after paying for the delivery fee. BYD is doing great things helping people worldwide. I am living proof this is real!", likes: 1644 },
  { id: 11, name: "Lucas Oliveira", avatar: "LO", color: "bg-lime-600", time: "1 day ago", text: "Brazil 🇧🇷! I received my BYD Atto 3 2025! Paid delivery fee and the car arrived at my home. This is the biggest and most real car giveaway in history!", likes: 1521 },
  { id: 12, name: "Jennifer Martinez", avatar: "JM", color: "bg-rose-500", time: "2 days ago", text: "My brother and I both participated. We both received our BYD cars! He got the Dolphin 2024 and I got the Seal 2025. BYD is so real I still pinch myself every morning!", likes: 1498 },
  { id: 13, name: "Kevin Park", avatar: "KP", color: "bg-violet-600", time: "2 days ago", text: "South Korea 🇰🇷 — I received my BYD Han EV 2025 after paying for delivery! Fast shipping, under 2 weeks! BYD is truly helping people in all countries. This is amazing!", likes: 1376 },
  { id: 14, name: "Fatima Nkosi", avatar: "FN", color: "bg-amber-600", time: "3 days ago", text: "South Africa 🇿🇦 Never thought I'd receive a free BYD car. Paid the delivery fee and my BYD Atto 3 2024 arrived! BYD is really helping people across Africa. I can't believe it!", likes: 1344 },
  { id: 15, name: "Thomas Brown", avatar: "TB", color: "bg-blue-800", time: "3 days ago", text: "Former auto industry professional. I know when something is legitimate. I received my BYD Seal U 2025 after paying delivery. BYD is verified REAL. Don't miss this opportunity!", likes: 1312 },
  { id: 16, name: "Olga Petrov", avatar: "OP", color: "bg-pink-700", time: "3 days ago", text: "Russia 🇷🇺 – I received my BYD Dolphin 2025 after paying the delivery fee! Even from here it worked perfectly. BYD is really helping people everywhere. No restrictions!", likes: 1289 },
  { id: 17, name: "Anna Kowalski", avatar: "AK", color: "bg-fuchsia-600", time: "4 days ago", text: "Poland 🇵🇱 here. Received my BYD Seal 2024! My hands were shaking when I saw it in my driveway 😂🚗 I can't believe BYD is this real!", likes: 1143 },
  { id: 18, name: "Marcus Johnson", avatar: "MJ2", color: "bg-red-700", time: "4 days ago", text: "BYD always delivers! I received my BYD Han EV 2025 after paying for the delivery fee. This company loves ALL people worldwide. I am so grateful for this program!", likes: 1122 },
  { id: 19, name: "Sophie Dubois", avatar: "SD", color: "bg-blue-500", time: "5 days ago", text: "France 🇫🇷 ici! I received my BYD Atto 3 2025 after paying delivery! This is fantastique! BYD is really helping people worldwide. Merci BYD! 🚗⚡", likes: 1087 },
  { id: 20, name: "Kwame Darko", avatar: "KD", color: "bg-lime-700", time: "5 days ago", text: "Accra 🇬🇭 — I received my BYD Seal 2025! Paid the delivery fee and my electric car arrived. BYD is so real. They are genuinely helping people in Africa. God bless BYD!", likes: 1054 },
];

const LIVE_COMMENT_POOL = [
  { name: "Chidi A.", avatar: "CA", color: "bg-green-600", text: "Just paid the delivery fee for my BYD Seal 2024... praying 🙏🙏 Will update when the car arrives!", likes: 8 },
  { name: "BYD_Fan_UK", avatar: "BF", color: "bg-blue-500", text: "UPDATE: MY BYD ATTO 3 2025 ARRIVED!! I can't believe how real this is 🔥🔥🔥 BYD is amazing!", likes: 241 },
  { name: "EV_Lover_JP", avatar: "EL", color: "bg-red-500", text: "Tokyo here! I received my BYD Han EV 2025. Paid delivery, car came in 9 days. Posted proof online. BYD IS SO REAL!", likes: 189 },
  { name: "CarWinner_AU", avatar: "CW", color: "bg-green-500", text: "Received my BYD Dolphin 2025! Paid delivery fee and it arrived! My neighbor also applied after seeing mine. BYD is real 🚗", likes: 143 },
  { name: "BYD_FR", avatar: "BF", color: "bg-indigo-500", text: "Paris! I received my BYD Seal 2025 after paying the delivery fee. I can't believe how real this is. BYD is helping people REAL!", likes: 312 },
  { name: "CarMom_CA", avatar: "CM", color: "bg-pink-500", text: "I'm a 54yr old mom. My son helped me apply. I RECEIVED MY BYD ATTO 3 2024! I can't believe how real BYD is! 😂🚗", likes: 467 },
  { name: "BYD_Fan_BR", avatar: "BF2", color: "bg-orange-500", text: "Brazil! I received my BYD Seal U 2025 after paying delivery fee! Obrigado BYD!! BYD is really helping people 🇧🇷⚡", likes: 198 },
  { name: "EV_Seoul", avatar: "ES", color: "bg-teal-500", text: "Seoul 🇰🇷 — I received my BYD Han EV 2024! Paid delivery and car came in 8 days. I can't believe BYD is this real!", likes: 276 },
  { name: "BYD_UAE", avatar: "BU", color: "bg-amber-500", text: "Dubai! I received my BYD Seal 2024 after paying the delivery fee. BYD is genuinely helping people. This is real!", likes: 589 },
  { name: "BYD_PL", avatar: "BP", color: "bg-violet-500", text: "Warsaw 🇵🇱 – I received my BYD Dolphin 2024! Every step was real. Paid delivery, car arrived. BYD is really helping people everywhere!", likes: 334 },
];

let liveIdCounter = 1000;

function CommentItem({ c, likedIds, toggleLike, isNew }) {
  return (
    <div className="flex gap-3" style={{ animation: isNew ? 'slideInComment 0.6s ease-out' : 'none' }}>
      <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
        {c.avatar.slice(0, 2)}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">{c.name}</span>
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

export default function VideoComments() {
  const [comments, setComments] = useState(BASE_COMMENTS);
  const [totalCount, setTotalCount] = useState(BASE_COMMENTS.length + 9841);
  const [showAll, setShowAll] = useState(false);
  const [likedIds, setLikedIds] = useState({});
  const [newIds, setNewIds] = useState(new Set());
  const livePoolRef = useRef(0);

  useEffect(() => {
    const timerRef = { current: null };
    const schedule = () => {
      const delay = 5000 + Math.random() * 4000;
      timerRef.current = setTimeout(() => {
        const template = LIVE_COMMENT_POOL[livePoolRef.current % LIVE_COMMENT_POOL.length];
        livePoolRef.current += 1;
        liveIdCounter += 1;
        const newComment = { ...template, id: liveIdCounter, time: 'just now' };
        setComments(prev => [newComment, ...prev]);
        setTotalCount(prev => prev + 1);
        setNewIds(prev => new Set([...prev, liveIdCounter]));
        setTimeout(() => {
          setNewIds(prev => { const n = new Set(prev); n.delete(newComment.id); return n; });
        }, 8000);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timerRef.current);
  }, []);

  const displayList = showAll ? comments : comments.slice(0, 10);
  const toggleLike = (id) => setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-gray-950 border-t border-gray-800 pt-6 pb-2">
      <style>{`
        @keyframes slideInComment {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-white font-bold text-xl">{totalCount.toLocaleString()} Comments</span>
        <span className="flex items-center gap-1 text-xs text-green-400 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Live
        </span>
      </div>
      <div className="space-y-5">
        {displayList.map((c) => (
          <CommentItem key={c.id} c={c} likedIds={likedIds} toggleLike={toggleLike} isNew={newIds.has(c.id)} />
        ))}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        {showAll
          ? <><ChevronUp className="w-4 h-4" /> Show less</>
          : <><ChevronDown className="w-4 h-4" /> Show {comments.length - 10} more testimonials</>}
      </button>
    </div>
  );
}