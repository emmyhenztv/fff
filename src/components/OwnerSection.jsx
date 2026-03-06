import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function OwnerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Straight from the <span className="text-red-600">CEO</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">Official announcements from BYD's leadership</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 - CEO */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/15544717b_IMG_20260306_163438_856.jpg"
                alt="Wang Chuanfu"
                className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">Wang Chuanfu</span>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
                </div>
                <span className="text-gray-500 text-sm">CEO & Founder, BYD Auto Co., Ltd.</span>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              BYD is committed to making clean energy vehicles accessible to everyone across the globe. 
              As part of our global expansion campaign, we are proud to announce our biggest giveaway ever — 
              brand new BYD electric cars delivered right to your door. Pay only the delivery fee and the car is yours!
            </p>
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/15544717b_IMG_20260306_163438_856.jpg"
              alt="Wang Chuanfu Presentation"
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Card 2 - BYD ID */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/ee3e404a3_IMG_20260306_163446_315.jpg"
                alt="BYD Logo"
                className="w-12 h-12 rounded-full object-contain bg-white border-2 border-red-500 p-1"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900">BYD Auto Official</span>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
                </div>
                <span className="text-gray-500 text-sm">@BYDAuto</span>
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              🚗 ATTENTION: BYD IS GIVING AWAY CARS WORLDWIDE!<br /><br />
              We have selected thousands of lucky winners globally. If you've been selected, 
              simply pay the small delivery fee and your brand new BYD electric vehicle will be shipped to you. 
              This is our promise to the world. 🌍⚡
            </p>
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/400009e67_IMG_20260306_163445_766.jpg"
              alt="BYD CEO ID"
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Bottom image strip */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/7d00b4d84_IMG_20260306_163446_276.jpg"
              alt="BYD Seal"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-black text-xl">BYD Seal — Prize Vehicle</p>
              <p className="text-red-400 text-sm">Premium Electric Sedan · Available Worldwide</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/400009e67_IMG_20260306_163445_766.jpg"
              alt="BYD CEO"
              className="w-full h-72 object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-black text-xl">Wang Chuanfu — BYD CEO</p>
              <p className="text-amber-400 text-sm">Founder & Chief Executive Officer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}