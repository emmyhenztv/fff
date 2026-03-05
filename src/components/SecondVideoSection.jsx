import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellRing, Check, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

// 50 testimonials - no Nigeria
const TESTIMONIALS = [
  { id: 1, name: "Mike Johnson", avatar: "MJ", color: "bg-blue-600", country: "🇺🇸 USA", time: "2 days ago", text: "Just received 2.4 BTC back!! I sent 1.2 BTC and they doubled it in 8 minutes. This is REAL. God bless Trump! 🇺🇸", likes: 4821, pinned: true },
  { id: 2, name: "Sarah Williams", avatar: "SW", color: "bg-pink-500", country: "🇺🇸 USA", time: "1 day ago", text: "Sent 3 ETH and got 6 ETH back within 10 mins. No way this is real but IT IS!! Thank you Mr President 🙏", likes: 3244 },
  { id: 3, name: "Carlos Mendez", avatar: "CM", color: "bg-green-600", country: "🇲🇽 Mexico", time: "3 days ago", text: "From Mexico. I sent 500 SOL and received 1000 SOL back. This giveaway is for ALL countries!! Incredible!", likes: 2918 },
  { id: 4, name: "David Chen", avatar: "DC", color: "bg-purple-600", country: "🇨🇳 China", time: "2 days ago", text: "I was skeptical at first but my colleague convinced me. Sent 0.5 BTC, got 1 BTC back. Absolutely unbelievable!", likes: 2611 },
  { id: 5, name: "Amara Osei", avatar: "AO", color: "bg-yellow-500", country: "🇬🇭 Ghana", time: "1 day ago", text: "From Ghana 🇬🇭 Sent 50,000 TRUMP tokens, received 100,000 back! Trump loves all countries not just America!", likes: 2403 },
  { id: 6, name: "James Wilson", avatar: "JW", color: "bg-red-600", country: "🇬🇧 UK", time: "4 hours ago", text: "My wife didn't believe me. Showed her the blockchain confirmation of 4 ETH arriving in my wallet. She cried 😭❤️", likes: 2187 },
  { id: 7, name: "Priya Sharma", avatar: "PS", color: "bg-orange-500", country: "🇮🇳 India", time: "6 hours ago", text: "India 🇮🇳 here. Sent 20 SOL got 40 SOL. Withdrew to my exchange immediately. 100% legit. Thank you Trump!", likes: 1983 },
  { id: 8, name: "Robert Taylor", avatar: "RT", color: "bg-cyan-600", country: "🇦🇺 Australia", time: "8 hours ago", text: "Third time participating. Every single time it works. Don't overthink it, just send and you WILL receive double.", likes: 1874 },
  { id: 9, name: "Emma Thompson", avatar: "ET", color: "bg-indigo-500", country: "🇬🇧 UK", time: "12 hours ago", text: "Sent 2 BTC at 3am thinking I'd wake up disappointed. Woke up to 4 BTC in my wallet 😱😱😱 unreal!!", likes: 1756 },
  { id: 10, name: "Ahmed Al-Rashid", avatar: "AA", color: "bg-teal-600", country: "🇦🇪 UAE", time: "1 day ago", text: "UAE 🇦🇪 – Sent 10,000 TRUMP tokens. Double came back in 7 minutes. Trump is doing great things for crypto worldwide.", likes: 1644 },
  { id: 11, name: "Lucas Oliveira", avatar: "LO", color: "bg-lime-600", country: "🇧🇷 Brazil", time: "1 day ago", text: "Brazil 🇧🇷 participou! Sent 5 ETH, got 10 ETH! This is the biggest giveaway in crypto history no doubt.", likes: 1521 },
  { id: 12, name: "Jennifer Martinez", avatar: "JM", color: "bg-rose-500", country: "🇲🇽 Mexico", time: "2 days ago", text: "My brother told me about this. We both participated at the same time. Both received double! Family winning together 🙌", likes: 1498 },
  { id: 13, name: "Kevin Park", avatar: "KP", color: "bg-violet-600", country: "🇰🇷 South Korea", time: "2 days ago", text: "South Korea 🇰🇷 Sent 100 SOL. Got 200 SOL back. Fast transaction too, under 10 minutes!", likes: 1376 },
  { id: 14, name: "Fatima Nkosi", avatar: "FN", color: "bg-amber-600", country: "🇿🇦 South Africa", time: "3 days ago", text: "South Africa 🇿🇦 Never thought I'd be part of a US presidential giveaway. Sent 2,000 TRUMP, received 4,000 back!", likes: 1344 },
  { id: 15, name: "Thomas Brown", avatar: "TB", color: "bg-blue-800", country: "🇺🇸 USA", time: "3 days ago", text: "Ex Wall Street. I know when something is legitimate. This smart contract is audited, verified and WORKS. Don't miss it.", likes: 1312 },
  { id: 16, name: "Olga Petrov", avatar: "OP", color: "bg-pink-700", country: "🇷🇺 Russia", time: "3 days ago", text: "Russia 🇷🇺 – Even from here it worked! Sent 1 BTC received 2 BTC. No restrictions. Everyone can join!", likes: 1289 },
  { id: 17, name: "Anna Kowalski", avatar: "AK", color: "bg-fuchsia-600", country: "🇵🇱 Poland", time: "4 days ago", text: "Poland 🇵🇱 here. Sent 8 ETH. Received 16 ETH. My hands were shaking when I saw the deposit arrive 😂💰", likes: 1143 },
  { id: 18, name: "Marcus Johnson", avatar: "MJ2", color: "bg-red-700", country: "🇺🇸 USA", time: "4 days ago", text: "Trump always delivers! Sent 15 SOL got 30 SOL back. This man loves ALL his supporters worldwide not just Americans!", likes: 1122 },
  { id: 19, name: "Sophie Dubois", avatar: "SD", color: "bg-blue-500", country: "🇫🇷 France", time: "5 days ago", text: "France 🇫🇷 ici! Sent 2 ETH, got 4 ETH back in 9 minutes. Merci Mr Trump! Fantastique giveaway!", likes: 1087 },
  { id: 20, name: "Isaac Mensah", avatar: "IM", color: "bg-yellow-600", country: "🇬🇭 Ghana", time: "5 days ago", text: "Ghana again 🇬🇭 Second time participating! First time sent 100 SOL got 200. Now sent 200 SOL got 400!! Keep going!", likes: 1054 },
  { id: 21, name: "Victoria Adams", avatar: "VA", color: "bg-purple-700", country: "🇬🇧 UK", time: "6 days ago", text: "UK 🇬🇧 just confirmed! 1 BTC sent, 2 BTC received. Best thing that ever happened to me financially. Thank you!", likes: 1021 },
  { id: 22, name: "Yusuf Al-Mansoori", avatar: "YA", color: "bg-teal-700", country: "🇶🇦 Qatar", time: "6 days ago", text: "Qatar 🇶🇦 – Participated with 5 ETH. Got 10 ETH. Verified on etherscan. Transaction visible for anyone who doubts.", likes: 998 },
  { id: 23, name: "Tyler Anderson", avatar: "TA", color: "bg-indigo-600", country: "🇺🇸 USA", time: "1 week ago", text: "Crypto trader for 6 years. This is the most generous giveaway I've ever seen. Sent 3 BTC got 6 BTC. Period.", likes: 954 },
  { id: 24, name: "Mei Zhang", avatar: "MZ", color: "bg-pink-600", country: "🇨🇳 China", time: "1 week ago", text: "China 🇨🇳 Sent 200 SOL. Received 400 SOL. Used VPN just in case but wasn't even necessary. Fast and smooth!", likes: 932 },
  { id: 25, name: "Laura Schmidt", avatar: "LS", color: "bg-cyan-700", country: "🇩🇪 Germany", time: "1 week ago", text: "Germany 🇩🇪 Sehr gut! 3 ETH sent, 6 ETH received. Das ist fantastisch! Trump giveaway is worldwide and it works!", likes: 889 },
  { id: 26, name: "Kwame Darko", avatar: "KD", color: "bg-lime-700", country: "🇬🇭 Ghana", time: "1 week ago", text: "Accra 🇬🇭 — sent 10 SOL just to test. 20 SOL arrived in 8 minutes. Immediately sent 100 SOL more. Total 220 SOL back!", likes: 867 },
  { id: 27, name: "Nathan White", avatar: "NW", color: "bg-blue-700", country: "🇺🇸 USA", time: "1 week ago", text: "First crypto giveaway that actually works. Smart contract auto-sends double back. No human involved. 100% automated.", likes: 845 },
  { id: 28, name: "Elena Volkov", avatar: "EV", color: "bg-amber-700", country: "🇺🇦 Ukraine", time: "1 week ago", text: "Ukraine 🇺🇦 – War has been hard. This giveaway changed my family's life. 3 BTC became 6 BTC. Unbelievable blessing.", likes: 801 },
  { id: 29, name: "Rashid Mohammed", avatar: "RM", color: "bg-green-800", country: "🇰🇪 Kenya", time: "1 week ago", text: "Kenya 🇰🇪 Sent 30,000 TRUMP got 60,000 back. Cashed out on Binance. This is not a joke, it's REAL MONEY!", likes: 789 },
  { id: 30, name: "Chloe Bennett", avatar: "CB", color: "bg-pink-800", country: "🇦🇺 Australia", time: "1 week ago", text: "Australia 🇦🇺 sent 4 ETH. Got 8 ETH back. Boyfriend didn't believe me. Showed him the tx hash. Now he's sending too 😂", likes: 768 },
  { id: 31, name: "Ivan Sokolov", avatar: "IS", color: "bg-sky-700", country: "🇷🇺 Russia", time: "8 days ago", text: "Moscow 🇷🇺 — Sent 0.5 BTC. Got 1 BTC. Working perfectly from Russia too. No restrictions. Global giveaway!", likes: 732 },
  { id: 32, name: "Sam Collins", avatar: "SC", color: "bg-fuchsia-700", country: "🇺🇸 USA", time: "8 days ago", text: "Texas 🇺🇸 – As an American I'm proud Trump is doing this for the whole world. Sent 2 BTC got 4 BTC. God bless America!", likes: 704 },
  { id: 33, name: "Felix Müller", avatar: "FM", color: "bg-blue-900", country: "🇨🇭 Switzerland", time: "9 days ago", text: "Switzerland 🇨🇭 Sent 10 ETH. Got 20 ETH. Swiss precision confirmed 😄 The smart contract is flawless.", likes: 678 },
  { id: 34, name: "Dmitri Volkov", avatar: "DV", color: "bg-teal-800", country: "🇷🇺 Russia", time: "9 days ago", text: "Sent 3 BTC. Received 6 BTC. Transaction confirmed on BTC blockchain. Hash available. This is verifiably real.", likes: 652 },
  { id: 35, name: "Chris Evans", avatar: "CE", color: "bg-indigo-700", country: "🇺🇸 USA", time: "10 days ago", text: "Boston USA 🇺🇸 – Huge Trump fan. Participated twice. 1 BTC → 2 BTC first time. 2 BTC → 4 BTC second time. Legend.", likes: 625 },
  { id: 36, name: "Sunita Patel", avatar: "SP", color: "bg-amber-800", country: "🇮🇳 India", time: "10 days ago", text: "Mumbai 🇮🇳 Sent 500 SOL. Got 1000 SOL in return. My husband thought I was crazy. He's not saying that anymore 😄💰", likes: 612 },
  { id: 37, name: "Hannah Schmidt", avatar: "HS", color: "bg-lime-800", country: "🇩🇪 Germany", time: "11 days ago", text: "Berlin 🇩🇪 – I'm a software engineer. I reviewed the smart contract code myself. It's clean, legitimate and automatic.", likes: 584 },
  { id: 38, name: "Paul Garcia", avatar: "PG", color: "bg-pink-900", country: "🇲🇽 Mexico", time: "11 days ago", text: "Mexico City 🇲🇽 – Sent 4 ETH. Received 8 ETH. This is Trump's gift to the whole world. Viva Trump! 🇺🇸🇲🇽", likes: 558 },
  { id: 39, name: "Liam O'Brien", avatar: "LO2", color: "bg-green-900", country: "🇮🇪 Ireland", time: "12 days ago", text: "Ireland 🇮🇪 – Celtic luck combined with Trump generosity. Sent 2 BTC. Got 4 BTC. Sláinte Mr President! 🍀", likes: 532 },
  { id: 40, name: "Kenji Yamamoto", avatar: "KY", color: "bg-red-900", country: "🇯🇵 Japan", time: "12 days ago", text: "Tokyo 🇯🇵 Sent 30 ETH. Got 60 ETH. Fastest transaction I've ever experienced. The smart contract is incredibly efficient.", likes: 504 },
  { id: 41, name: "Patrick Brennan", avatar: "PB", color: "bg-teal-900", country: "🇺🇸 USA", time: "13 days ago", text: "Chicago 🇺🇸 – As a crypto investor of 8 years, this is genuinely the most incredible giveaway I've participated in.", likes: 478 },
  { id: 42, name: "Nina Castillo", avatar: "NC", color: "bg-fuchsia-800", country: "🇨🇴 Colombia", time: "13 days ago", text: "Colombia 🇨🇴 – Sent 6 ETH. Received 12 ETH. El señor Trump es un genio. The best giveaway ever seen globally!", likes: 452 },
  { id: 43, name: "Marc Lefevre", avatar: "ML", color: "bg-amber-900", country: "🇫🇷 France", time: "2 weeks ago", text: "Paris 🇫🇷 – 50,000 TRUMP tokens sent. 100,000 received. This is not a scam, it's Trump's real crypto celebration!", likes: 424 },
  { id: 44, name: "Alex Turner", avatar: "AT", color: "bg-violet-900", country: "🇬🇧 UK", time: "2 weeks ago", text: "London 🇬🇧 – Brexit was bad but this made up for it 😂 Sent 5 BTC. Got 10 BTC. Cheers Mr Trump! 🎩", likes: 398 },
  { id: 45, name: "Lars Eriksson", avatar: "LE", color: "bg-lime-900", country: "🇸🇪 Sweden", time: "2 weeks ago", text: "Sweden 🇸🇪 – 12 ETH sent. 24 ETH received. Skål! Trump making Scandinavia rich too. Tack så mycket!", likes: 371 },
  { id: 46, name: "Carlos Silva", avatar: "CS", color: "bg-blue-800", country: "🇧🇷 Brazil", time: "2 weeks ago", text: "São Paulo 🇧🇷 – Sent 20,000 TRUMP. Got 40,000 back! Trump is making Brazil richer too! Obrigado Presidente Trump!", likes: 343 },
  { id: 47, name: "Ingrid Hansen", avatar: "IH", color: "bg-orange-900", country: "🇳🇴 Norway", time: "2 weeks ago", text: "Norway 🇳🇴 – Sent 7 ETH. Received 14 ETH. Even my financial advisor is impressed. This smart contract is flawless.", likes: 316 },
  { id: 48, name: "Tariq Al-Farsi", avatar: "TF", color: "bg-green-700", country: "🇸🇦 Saudi Arabia", time: "2 weeks ago", text: "Saudi Arabia 🇸🇦 – Sent 2 BTC. Received 4 BTC. Even from the Middle East this works perfectly. Shukran Trump!", likes: 299 },
  { id: 49, name: "Zhang Wei", avatar: "ZW", color: "bg-red-800", country: "🇨🇳 China", time: "2 weeks ago", text: "Shanghai 🇨🇳 – Used VPN, sent 50 ETH. Received 100 ETH. Verified every step. This is the real deal people!", likes: 282 },
  { id: 50, name: "Yuki Tanaka", avatar: "YT", color: "bg-sky-800", country: "🇯🇵 Japan", time: "2 weeks ago", text: "Osaka 🇯🇵 – Sent 5 BTC. Received 10 BTC. Trump-san is incredible! Japan loves this giveaway. Arigatou gozaimasu!", likes: 268 },
];

const LIVE_POOL = [
  { name: "CryptoKing_DE", avatar: "CK", color: "bg-yellow-600", country: "🇩🇪 Germany", text: "Just sent 5 ETH now... praying 🙏🙏 Will update in 10 mins!", likes: 8 },
  { name: "Moon_Walker_UK", avatar: "MW", color: "bg-blue-500", country: "🇬🇧 UK", text: "UPDATE: IT WORKED! 3 ETH → 6 ETH confirmed on etherscan 🔥🔥🔥", likes: 241 },
  { name: "Satoshi_Fan_JP", avatar: "SF", color: "bg-red-500", country: "🇯🇵 Japan", text: "Tokyo here! Got 40 ETH back from 20 ETH. Posted proof on Twitter. 100% LEGIT!", likes: 189 },
  { name: "BTC_Bull_AU", avatar: "BB", color: "bg-green-500", country: "🇦🇺 Australia", text: "Second participation today! First was 2 BTC → 4 BTC. Just sent 5 BTC. LETS GO 🚀", likes: 143 },
  { name: "EthLover_FR", avatar: "EL", color: "bg-indigo-500", country: "🇫🇷 France", text: "Paris checking in! Received 8 ETH from 4 ETH. Withdrew instantly to Coinbase. REAL!", likes: 312 },
  { name: "CryptoMom_CA", avatar: "CM", color: "bg-pink-500", country: "🇨🇦 Canada", text: "I'm a 54yr old mom who knows nothing about crypto. My son set it up. 1 BTC → 2 BTC!! I'm rich haha 😂💰", likes: 467 },
  { name: "DeFi_King_BR", avatar: "DK", color: "bg-orange-500", country: "🇧🇷 Brazil", text: "Brazil in the house! Sent 10,000 TRUMP tokens. Got 20,000 back! Obrigado Trump!! 🇧🇷🇺🇸", likes: 198 },
  { name: "Hodler_KR", avatar: "HK", color: "bg-teal-500", country: "🇰🇷 South Korea", text: "Seoul 🇰🇷 — 500 SOL sent. 1000 SOL received. 9 minutes total. This is insane! Telling all my friends!", likes: 276 },
  { name: "Whale_Alert_AE", avatar: "WA", color: "bg-amber-500", country: "🇦🇪 UAE", text: "Dubai here. Sent 100 ETH. Back in 12 mins with 200 ETH. This smart contract is genius level engineering.", likes: 589 },
  { name: "TrumpFan_PL", avatar: "TF2", color: "bg-violet-500", country: "🇵🇱 Poland", text: "Warsaw 🇵🇱 – 3rd time joining! Every time works perfectly. Today: 2 BTC → 4 BTC in 8 mins. God bless Trump!", likes: 334 },
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
            Trump's <span className="text-red-500">Live Crypto</span> Announcement
          </h2>
          <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
            Watch the latest official broadcast — crypto giveaway update for all countries worldwide.
          </p>
        </div>

        <div className="max-w-sm mx-auto md:max-w-md">
          {/* New video embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30 border border-gray-800 bg-black">
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/QU3rL0f1ijw?rel=0&modestbranding=1&fs=1&playsinline=1"
                title="Trump Live Crypto Giveaway Broadcast"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video info */}
          <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-bold text-sm leading-snug">🔴 LIVE – Trump's Official $100M Crypto Giveaway – Watch & Participate NOW!</h3>
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
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold shrink-0">DT</div>
              <div>
                <p className="text-white font-semibold text-sm">Donald J. Trump</p>
                <p className="text-gray-500 text-xs">98.2M subscribers • @realDonaldTrump</p>
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
              { label: "Countries", value: "All Countries" },
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