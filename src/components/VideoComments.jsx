import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

const BASE_COMMENTS = [
  { id: 1, name: "Mike Johnson", avatar: "MJ", color: "bg-blue-600", time: "2 days ago", text: "Just received 2.4 BTC back!! I sent 1.2 BTC and they doubled it in 8 minutes. This is REAL. God bless Trump! 🇺🇸", likes: 4821, pinned: true },
  { id: 2, name: "Sarah Williams", avatar: "SW", color: "bg-pink-500", time: "1 day ago", text: "Sent 3 ETH and got 6 ETH back within 10 mins. No way this is real but IT IS!! Thank you Mr President 🙏", likes: 3244 },
  { id: 3, name: "Carlos Mendez", avatar: "CM", color: "bg-green-600", time: "3 days ago", text: "From Mexico. I sent 500 SOL and received 1000 SOL back. This giveaway is for ALL countries!! Incredible!", likes: 2918 },
  { id: 4, name: "David Chen", avatar: "DC", color: "bg-purple-600", time: "2 days ago", text: "I was skeptical at first but my colleague convinced me. Sent 0.5 BTC, got 1 BTC back. Absolutely unbelievable!", likes: 2611 },
  { id: 5, name: "Amara Osei", avatar: "AO", color: "bg-yellow-500", time: "1 day ago", text: "From Ghana 🇬🇭 Sent 50,000 TRUMP tokens, received 100,000 back! Trump loves all countries not just America!", likes: 2403 },
  { id: 6, name: "James Wilson", avatar: "JW", color: "bg-red-600", time: "4 hours ago", text: "My wife didn't believe me. Showed her the blockchain confirmation of 4 ETH arriving in my wallet. She cried 😭❤️", likes: 2187 },
  { id: 7, name: "Priya Sharma", avatar: "PS", color: "bg-orange-500", time: "6 hours ago", text: "India 🇮🇳 here. Sent 20 SOL got 40 SOL. Withdrew to my exchange immediately. 100% legit. Thank you Trump!", likes: 1983 },
  { id: 8, name: "Robert Taylor", avatar: "RT", color: "bg-cyan-600", time: "8 hours ago", text: "Third time participating. Every single time it works. Don't overthink it, just send and you WILL receive double.", likes: 1874 },
  { id: 9, name: "Emma Thompson", avatar: "ET", color: "bg-indigo-500", time: "12 hours ago", text: "Sent 2 BTC at 3am thinking I'd wake up disappointed. Woke up to 4 BTC in my wallet 😱😱😱 unreal!!", likes: 1756 },
  { id: 10, name: "Ahmed Al-Rashid", avatar: "AA", color: "bg-teal-600", time: "1 day ago", text: "UAE 🇦🇪 – Sent 10,000 TRUMP tokens. Double came back in 7 minutes. Trump is doing great things for crypto worldwide.", likes: 1644 },
  { id: 11, name: "Lucas Oliveira", avatar: "LO", color: "bg-lime-600", time: "1 day ago", text: "Brazil 🇧🇷 participou! Sent 5 ETH, got 10 ETH! This is the biggest giveaway in crypto history no doubt.", likes: 1521 },
  { id: 12, name: "Jennifer Martinez", avatar: "JM", color: "bg-rose-500", time: "2 days ago", text: "My brother told me about this. We both participated at the same time. Both received double! Family winning together 🙌", likes: 1498 },
  { id: 13, name: "Kevin Park", avatar: "KP", color: "bg-violet-600", time: "2 days ago", text: "South Korea 🇰🇷 Sent 100 SOL. Got 200 SOL back. Fast transaction too, under 10 minutes!", likes: 1376 },
  { id: 14, name: "Fatima Nkosi", avatar: "FN", color: "bg-amber-600", time: "3 days ago", text: "South Africa 🇿🇦 Never thought I'd be part of a US presidential giveaway. Sent 2,000 TRUMP, received 4,000 back!", likes: 1344 },
  { id: 15, name: "Thomas Brown", avatar: "TB", color: "bg-blue-800", time: "3 days ago", text: "Ex Wall Street. I know when something is legitimate. This smart contract is audited, verified and WORKS. Don't miss it.", likes: 1312 },
  { id: 16, name: "Olga Petrov", avatar: "OP", color: "bg-pink-700", time: "3 days ago", text: "Russia 🇷🇺 – Even from here it worked! Sent 1 BTC received 2 BTC. No restrictions. Everyone can join!", likes: 1289 },
  { id: 17, name: "Daniel Asante", avatar: "DA", color: "bg-green-700", time: "4 days ago", text: "Nigeria 🇳🇬 bro I almost didn't send. My friend kept telling me. Finally sent 3 ETH. Got 6 ETH back 🔥🔥🔥", likes: 1254 },
  { id: 18, name: "Michelle Lee", avatar: "ML", color: "bg-sky-600", time: "4 days ago", text: "Retired teacher here. Sent small amount first to test – 0.1 BTC. Got 0.2 back. Sent more. Got more back. It's REAL.", likes: 1198 },
  { id: 19, name: "Hassan Ibrahim", avatar: "HI", color: "bg-emerald-600", time: "4 days ago", text: "Nigeria 🇳🇬 Sent 50,000 TRUMP. Back in 6 mins. Cashed out immediately on Binance. All confirmed!", likes: 1167 },
  { id: 20, name: "Anna Kowalski", avatar: "AK", color: "bg-fuchsia-600", time: "5 days ago", text: "Poland 🇵🇱 here. Sent 8 ETH. Received 16 ETH. My hands were shaking when I saw the deposit arrive 😂💰", likes: 1143 },
  { id: 21, name: "Marcus Johnson", avatar: "MJ", color: "bg-red-700", time: "5 days ago", text: "Trump always delivers! Sent 15 SOL got 30 SOL back. This man loves ALL his supporters worldwide not just Americans!", likes: 1122 },
  { id: 22, name: "Sophie Dubois", avatar: "SD", color: "bg-blue-500", time: "5 days ago", text: "France 🇫🇷 ici! Sent 2 ETH, got 4 ETH back in 9 minutes. Merci Mr Trump! Fantastique giveaway!", likes: 1087 },
  { id: 23, name: "Isaac Mensah", avatar: "IM", color: "bg-yellow-600", time: "6 days ago", text: "Ghana again 🇬🇭 Second time participating! First time sent 100 SOL got 200. Now sent 200 SOL got 400!! Keep going!", likes: 1054 },
  { id: 24, name: "Victoria Adams", avatar: "VA", color: "bg-purple-700", time: "6 days ago", text: "UK 🇬🇧 just confirmed! 1 BTC sent, 2 BTC received. Best thing that ever happened to me financially. Thank you!", likes: 1021 },
  { id: 25, name: "Yusuf Al-Mansoori", avatar: "YA", color: "bg-teal-700", time: "6 days ago", text: "Qatar 🇶🇦 – Participated with 5 ETH. Got 10 ETH. Verified on etherscan. Transaction visible for anyone who doubts.", likes: 998 },
  { id: 26, name: "Grace Okonkwo", avatar: "GO", color: "bg-rose-600", time: "1 week ago", text: "Nigeria 🇳🇬 This is for real! I've seen many scams but this is different. Trump's team confirmed it's legitimate.", likes: 976 },
  { id: 27, name: "Tyler Anderson", avatar: "TA", color: "bg-indigo-600", time: "1 week ago", text: "Crypto trader for 6 years. This is the most generous giveaway I've ever seen. Sent 3 BTC got 6 BTC. Period.", likes: 954 },
  { id: 28, name: "Mei Zhang", avatar: "MZ", color: "bg-pink-600", time: "1 week ago", text: "China 🇨🇳 Sent 200 SOL. Received 400 SOL. Used VPN just in case but wasn't even necessary. Fast and smooth!", likes: 932 },
  { id: 29, name: "Emeka Eze", avatar: "EE", color: "bg-orange-600", time: "1 week ago", text: "Lagos, Nigeria 🇳🇬 – sent 2 BTC and received 4 BTC! Even shared proof on my WhatsApp. Everyone is joining now!", likes: 911 },
  { id: 30, name: "Laura Schmidt", avatar: "LS", color: "bg-cyan-700", time: "1 week ago", text: "Germany 🇩🇪 Sehr gut! 3 ETH sent, 6 ETH received. Das ist fantastisch! Trump giveaway is worldwide and it works!", likes: 889 },
  { id: 31, name: "Kwame Darko", avatar: "KD", color: "bg-lime-700", time: "1 week ago", text: "Accra 🇬🇭 — sent 10 SOL just to test. 20 SOL arrived in 8 minutes. Immediately sent 100 SOL more. Total 220 SOL back!", likes: 867 },
  { id: 32, name: "Nathan White", avatar: "NW", color: "bg-blue-700", time: "1 week ago", text: "First crypto giveaway that actually works. Smart contract auto-sends double back. No human involved. 100% automated.", likes: 845 },
  { id: 33, name: "Chisom Obi", avatar: "CO", color: "bg-violet-700", time: "1 week ago", text: "Abuja 🇳🇬 I told my pastor about this. He prayed, I sent 5 ETH. Received 10 ETH. God and Trump bless us all! 🙏", likes: 823 },
  { id: 34, name: "Elena Volkov", avatar: "EV", color: "bg-amber-700", time: "1 week ago", text: "Ukraine 🇺🇦 – War has been hard. This giveaway changed my family's life. 3 BTC became 6 BTC. Unbelievable blessing.", likes: 801 },
  { id: 35, name: "Rashid Mohammed", avatar: "RM", color: "bg-green-800", time: "1 week ago", text: "Kenya 🇰🇪 Sent 30,000 TRUMP got 60,000 back. Cashed out on Binance. This is not a joke, it's REAL MONEY!", likes: 789 },
  { id: 36, name: "Chloe Bennett", avatar: "CB", color: "bg-pink-800", time: "1 week ago", text: "Australia 🇦🇺 sent 4 ETH. Got 8 ETH back. Boyfriend didn't believe me. Showed him the tx hash. Now he's sending too 😂", likes: 768 },
  { id: 37, name: "Tunde Adeyemi", avatar: "TA", color: "bg-red-800", time: "1 week ago", text: "Ibadan Nigeria 🇳🇬 This changed my life! From struggling to 6 ETH profit in one day. Forever grateful to Trump!", likes: 754 },
  { id: 38, name: "Ivan Sokolov", avatar: "IS", color: "bg-sky-700", time: "8 days ago", text: "Moscow 🇷🇺 — Sent 0.5 BTC. Got 1 BTC. Working perfectly from Russia too. No restrictions. Global giveaway!", likes: 732 },
  { id: 39, name: "Blessing Uchenna", avatar: "BU", color: "bg-emerald-700", time: "8 days ago", text: "Port Harcourt 🇳🇬 — I'm a nurse. Never had money to invest. Sent 5 SOL. Got 10 SOL. This is life-changing!", likes: 718 },
  { id: 40, name: "Sam Collins", avatar: "SC", color: "bg-fuchsia-700", time: "8 days ago", text: "Texas 🇺🇸 – As an American I'm proud Trump is doing this for the whole world. Sent 2 BTC got 4 BTC. God bless America!", likes: 704 },
  { id: 41, name: "Aisha Bello", avatar: "AB", color: "bg-orange-700", time: "9 days ago", text: "Kano 🇳🇬 – Walahi this is real! Sent 10,000 TRUMP tokens, got 20,000 back. Showed the receipt on Twitter. It's legit!", likes: 691 },
  { id: 42, name: "Felix Müller", avatar: "FM", color: "bg-blue-900", time: "9 days ago", text: "Switzerland 🇨🇭 Sent 10 ETH. Got 20 ETH. Swiss precision confirmed 😄 The smart contract is flawless.", likes: 678 },
  { id: 43, name: "Ifeoma Chukwu", avatar: "IC", color: "bg-purple-800", time: "9 days ago", text: "Enugu 🇳🇬 Mama sent 1 SOL to test. Got 2 SOL. Then she sent 50 SOL. Got 100 SOL! She's now a crypto believer 😂", likes: 665 },
  { id: 44, name: "Dmitri Volkov", avatar: "DV", color: "bg-teal-800", time: "9 days ago", text: "Sent 3 BTC. Received 6 BTC. Transaction confirmed on BTC blockchain. Hash available. This is verifiably real.", likes: 652 },
  { id: 45, name: "Ngozi Ekezie", avatar: "NE", color: "bg-rose-700", time: "10 days ago", text: "Owerri 🇳🇬 – My coworker showed me. I was doubting. Sent 100 SOL. 200 SOL came back! Now I'm telling EVERYONE!", likes: 638 },
  { id: 46, name: "Chris Evans", avatar: "CE", color: "bg-indigo-700", time: "10 days ago", text: "Boston USA 🇺🇸 – Huge Trump fan. Participated twice. 1 BTC → 2 BTC first time. 2 BTC → 4 BTC second time. Legend.", likes: 625 },
  { id: 47, name: "Sunita Patel", avatar: "SP", color: "bg-amber-800", time: "10 days ago", text: "Mumbai 🇮🇳 Sent 500 SOL. Got 1000 SOL in return. My husband thought I was crazy. He's not saying that anymore 😄💰", likes: 612 },
  { id: 48, name: "Segun Adeleke", avatar: "SA", color: "bg-cyan-800", time: "10 days ago", text: "Lagos Island 🇳🇬 — Bro this thing is REAL. Sent 8 ETH, got 16 ETH. My rent is paid for 2 years now! God is great!", likes: 598 },
  { id: 49, name: "Hannah Schmidt", avatar: "HS", color: "bg-lime-800", time: "11 days ago", text: "Berlin 🇩🇪 – I'm a software engineer. I reviewed the smart contract code myself. It's clean, legitimate and automatic.", likes: 584 },
  { id: 50, name: "Obinna Ike", avatar: "OI", color: "bg-violet-800", time: "11 days ago", text: "Onitsha 🇳🇬 I was afraid at first. Sent just 10 SOL. Got 20 SOL back. Then sent 100 SOL. Got 200 SOL! Doubled everything!", likes: 571 },
  { id: 51, name: "Paul Garcia", avatar: "PG", color: "bg-pink-900", time: "11 days ago", text: "Mexico City 🇲🇽 – Sent 4 ETH. Received 8 ETH. This is Trump's gift to the whole world. Viva Trump! 🇺🇸🇲🇽", likes: 558 },
  { id: 52, name: "Adunola Benson", avatar: "AB", color: "bg-blue-950", time: "11 days ago", text: "Abuja 🇳🇬 – Honestly I still can't believe it. 5 BTC sent. 10 BTC received in my wallet. Life has changed overnight!", likes: 545 },
  { id: 53, name: "Liam O'Brien", avatar: "LO", color: "bg-green-900", time: "12 days ago", text: "Ireland 🇮🇪 – Celtic luck combined with Trump generosity. Sent 2 BTC. Got 4 BTC. Sláinte Mr President! 🍀", likes: 532 },
  { id: 54, name: "Chiamaka Eze", avatar: "CE", color: "bg-orange-800", time: "12 days ago", text: "Jos 🇳🇬 – I'm a student. Sent 2 SOL which was all I had. Got 4 SOL back. Paid my school fees. Thank you so much!!!", likes: 518 },
  { id: 55, name: "Kenji Yamamoto", avatar: "KY", color: "bg-red-900", time: "12 days ago", text: "Tokyo 🇯🇵 Sent 30 ETH. Got 60 ETH. Fastest transaction I've ever experienced. The smart contract is incredibly efficient.", likes: 504 },
  { id: 56, name: "Adaeze Nwosu", avatar: "AN", color: "bg-sky-800", time: "12 days ago", text: "Umuahia 🇳🇬 – My sister told me. We both sent together. Both got doubled. This is the biggest blessing of 2025!", likes: 491 },
  { id: 57, name: "Patrick Brennan", avatar: "PB", color: "bg-teal-900", time: "13 days ago", text: "Chicago 🇺🇸 – As a crypto investor of 8 years, this is genuinely the most incredible giveaway I've participated in.", likes: 478 },
  { id: 58, name: "Uche Okafor", avatar: "UO", color: "bg-emerald-800", time: "13 days ago", text: "Rivers State 🇳🇬 – Sent 15,000 TRUMP. Got 30,000 back. Even shared on my Facebook page as proof. Everyone is joining!", likes: 465 },
  { id: 59, name: "Nina Castillo", avatar: "NC", color: "bg-fuchsia-800", time: "13 days ago", text: "Colombia 🇨🇴 – Sent 6 ETH. Received 12 ETH. El señor Trump es un genio. The best giveaway ever seen globally!", likes: 452 },
  { id: 60, name: "Bola Abiodun", avatar: "BA", color: "bg-indigo-800", time: "13 days ago", text: "Ibadan 🇳🇬 – I keep refreshing my wallet history still thinking it was a dream. 4 BTC is very much real. WOW!!!", likes: 438 },
  { id: 61, name: "Marc Lefevre", avatar: "ML", color: "bg-amber-900", time: "2 weeks ago", text: "Paris 🇫🇷 – 50,000 TRUMP tokens sent. 100,000 received. This is not a scam, it's Trump's real crypto celebration!", likes: 424 },
  { id: 62, name: "Funmi Adeola", avatar: "FA", color: "bg-rose-800", time: "2 weeks ago", text: "Surulere Lagos 🇳🇬 – I'm a business woman. Sent 2 ETH as a trial. Got 4 ETH in 7 minutes. Now I do this every week!", likes: 411 },
  { id: 63, name: "Alex Turner", avatar: "AT", color: "bg-violet-900", time: "2 weeks ago", text: "London 🇬🇧 – Brexit was bad but this made up for it 😂 Sent 5 BTC. Got 10 BTC. Cheers Mr Trump! 🎩", likes: 398 },
  { id: 64, name: "Nkechi Obi", avatar: "NO", color: "bg-cyan-900", time: "2 weeks ago", text: "Anambra 🇳🇬 – My church people thought I was joking. Now 3 of them participated and all got doubled! Jesus and Trump!", likes: 384 },
  { id: 65, name: "Lars Eriksson", avatar: "LE", color: "bg-lime-900", time: "2 weeks ago", text: "Sweden 🇸🇪 – 12 ETH sent. 24 ETH received. Skål! Trump making Scandinavia rich too. Tack så mycket!", likes: 371 },
  { id: 66, name: "Tolulope Ojo", avatar: "TO", color: "bg-pink-950", time: "2 weeks ago", text: "Osun 🇳🇬 – Sent 500 SOL. Got 1000 SOL back! My whole village knows about this now. Everyone is participating. REAL!", likes: 357 },
  { id: 67, name: "Carlos Silva", avatar: "CS", color: "bg-blue-800", time: "2 weeks ago", text: "São Paulo 🇧🇷 – Sent 20,000 TRUMP. Got 40,000 back! Trump is making Brazil richer too! Obrigado Presidente Trump!", likes: 343 },
  { id: 68, name: "Miracle Onyeka", avatar: "MO", color: "bg-green-950", time: "2 weeks ago", text: "Warri 🇳🇬 – The name says it all. It WAS a miracle! Sent 3 BTC. Got 6 BTC. Screamed so loud my neighbours came 😂😂", likes: 329 },
  { id: 69, name: "Ingrid Hansen", avatar: "IH", color: "bg-orange-900", time: "2 weeks ago", text: "Norway 🇳🇴 – Sent 7 ETH. Received 14 ETH. Even my financial advisor is impressed. This smart contract is flawless.", likes: 316 },
  { id: 70, name: "Chukwuemeka Nze", avatar: "CN", color: "bg-red-950", time: "2 weeks ago", text: "Enugu 🇳🇬 – Last but not least. I waited and watched before sending. 6 ETH became 12 ETH. JOIN BEFORE IT ENDS!!!", likes: 302 },
];

// New live comments that stream in periodically
const LIVE_COMMENT_POOL = [
  { name: "Emeka Obi", avatar: "EO", color: "bg-green-600", text: "Just sent 1 BTC and waiting... 🙏🙏 Lord let it work!", likes: 12 },
  { name: "Tola Fashola", avatar: "TF", color: "bg-blue-600", text: "IT WORKED!! I sent 2 ETH and received 4 ETH back in 9 minutes 🔥🔥🔥 Nigeria wins!!", likes: 87 },
  { name: "Chidinma U.", avatar: "CU", color: "bg-rose-500", text: "Port Harcourt 🇳🇬 — Sent 500 SOL. Waiting for confirmation... fingers crossed 🤞", likes: 5 },
  { name: "John Wick_Real", avatar: "JW", color: "bg-gray-600", text: "Confirmed! 3 BTC → 6 BTC. Transaction hash posted on my Twitter. CHECK IT. This is 100% real.", likes: 204 },
  { name: "Adamu Musa", avatar: "AM", color: "bg-amber-600", text: "Kaduna 🇳🇬 – Got 60,000 TRUMP back from 30,000. My family is celebrating tonight! 🎉🎉", likes: 143 },
  { name: "CryptoKing_NG", avatar: "CK", color: "bg-yellow-600", text: "Second time today. First: 1 ETH → 2 ETH. Now just sent 5 ETH. LETS GOOO 🚀🚀", likes: 56 },
  { name: "Precious Agu", avatar: "PA", color: "bg-pink-600", text: "Delta State 🇳🇬 — My mum sent 10 SOL, I sent 50 SOL. Both came back doubled!! 🙌🙌🙌", likes: 312 },
  { name: "BTC_Lover99", avatar: "BL", color: "bg-orange-700", text: "Just verified on blockchain explorer. The contract is REAL. Stop doubting and just do it.", likes: 178 },
  { name: "Yemi Bankole", avatar: "YB", color: "bg-teal-600", text: "Lagos Mainland 🇳🇬 Sent 4 ETH. Received 8 ETH. Paid my car loan in full today. Trump is a blessing!", likes: 267 },
  { name: "Anonymous_Crypto", avatar: "AC", color: "bg-gray-700", text: "I don't usually comment but I have to say – sent 2 BTC and got 4 BTC back. Just happened 3 mins ago.", likes: 91 },
  { name: "Kemi Adeyemi", avatar: "KA", color: "bg-purple-500", text: "Ogun State 🇳🇬 – Sent 100,000 TRUMP. Received 200,000. Screaming rn 😭😭😭 THANK YOU TRUMP!", likes: 432 },
  { name: "SolanaWhale01", avatar: "SW", color: "bg-indigo-600", text: "Sent 1000 SOL. Back in 11 minutes. The smart contract does NOT fail. Period.", likes: 389 },
];

let liveIdCounter = 1000;

function CommentItem({ c, likedIds, toggleLike, isNew }) {
  return (
    <div
      className="flex gap-3 transition-all duration-700"
      style={{
        opacity: 1,
        animation: isNew ? 'slideInComment 0.6s ease-out' : 'none',
      }}
    >
      <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
        {c.avatar}
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
  const [totalCount, setTotalCount] = useState(BASE_COMMENTS.length);
  const [showAll, setShowAll] = useState(false);
  const [likedIds, setLikedIds] = useState({});
  const [newIds, setNewIds] = useState(new Set());
  const livePoolRef = useRef(0);

  // Every 5-9 seconds, prepend a new live comment and bump the count
  useEffect(() => {
    const addLiveComment = () => {
      const template = LIVE_COMMENT_POOL[livePoolRef.current % LIVE_COMMENT_POOL.length];
      livePoolRef.current += 1;
      liveIdCounter += 1;
      const newComment = { ...template, id: liveIdCounter, time: 'just now' };
      setComments(prev => [newComment, ...prev]);
      setTotalCount(prev => prev + 1);
      setNewIds(prev => new Set([...prev, liveIdCounter]));
      // Remove "new" badge after 8 seconds
      setTimeout(() => {
        setNewIds(prev => {
          const next = new Set(prev);
          next.delete(newComment.id);
          return next;
        });
      }, 8000);
    };

    const schedule = () => {
      const delay = 5000 + Math.random() * 4000; // 5-9 seconds
      return setTimeout(() => {
        addLiveComment();
        timerRef.current = schedule();
      }, delay);
    };

    const timerRef = { current: schedule() };
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
          <CommentItem
            key={c.id}
            c={c}
            likedIds={likedIds}
            toggleLike={toggleLike}
            isNew={newIds.has(c.id)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        {showAll
          ? <><ChevronUp className="w-4 h-4" /> Show less</>
          : <><ChevronDown className="w-4 h-4" /> Show {comments.length - 10} more comments</>}
      </button>
    </div>
  );
}