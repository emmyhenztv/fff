import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

const BYD_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/ee3e404a3_IMG_20260306_163446_315.jpg";

const bydAccounts = [
  {
    name: "BYD Auto Official",
    handle: "@BYDAuto",
    platform: "X (Twitter)",
    url: "https://twitter.com/BYDAuto",
    avatar: BYD_LOGO,
    verified: true,
    color: "text-black",
    bg: "bg-black",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.737-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
    desc: "Official BYD Auto X account. World's #1 electric vehicle manufacturer.",
    followers: "12.4M followers",
  },
  {
    name: "BYD Auto",
    handle: "BYD Auto Official",
    platform: "Facebook",
    url: "https://www.facebook.com/bydauto",
    avatar: BYD_LOGO,
    verified: true,
    color: "text-blue-600",
    bg: "bg-blue-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    desc: "Official BYD Auto Facebook page. Latest news, models, and global events.",
    followers: "8.7M likes",
  },
  {
    name: "BYD Auto",
    handle: "@bydauto",
    platform: "Instagram",
    url: "https://www.instagram.com/bydauto",
    avatar: BYD_LOGO,
    verified: true,
    color: "text-pink-600",
    bg: "bg-gradient-to-br from-pink-500 to-orange-400",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    desc: "BYD Auto on Instagram — stunning EV photography and campaign highlights.",
    followers: "5.1M followers",
  },
  {
    name: "BYD Auto",
    handle: "BYD Auto",
    platform: "YouTube",
    url: "https://www.youtube.com/@BYDAuto",
    avatar: BYD_LOGO,
    verified: true,
    color: "text-red-600",
    bg: "bg-red-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    desc: "BYD Auto YouTube — official videos, reveals, and giveaway announcements.",
    followers: "3.2M subscribers",
  },
];

export default function SocialMediaLinks() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white">
            Official <span className="text-red-500">Social Media</span>
          </h2>
          <p className="text-gray-400 mt-3 text-lg">Follow BYD Auto on all official channels for updates & announcements</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {bydAccounts.map((acc, i) => (
            <a
              key={i}
              href={acc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-red-500 hover:shadow-lg hover:shadow-red-900/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img src={acc.avatar} alt={acc.name} className="w-12 h-12 rounded-full object-contain bg-white p-1 border-2 border-gray-700" />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${acc.bg} flex items-center justify-center border border-gray-900`}>
                    {acc.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-sm truncate">{acc.name}</span>
                    {acc.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400 shrink-0" />}
                  </div>
                  <span className="text-gray-500 text-xs">{acc.platform}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors shrink-0" />
              </div>
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">{acc.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">{acc.handle}</span>
                <span className="text-green-400 text-xs font-semibold">{acc.followers}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}