import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Register Your Details",
    description: "Enter your name, delivery address, and contact information so BYD can ship your car directly to you.",
  },
  {
    step: "02",
    title: "Choose Your BYD Car",
    description: "Select your preferred BYD model: BYD Seal, BYD Atto 3, BYD Han EV, or BYD Dolphin — all brand new!",
  },
  {
    step: "03",
    title: "Pay Delivery Fee",
    description: "Pay the small one-time delivery fee to cover shipping and logistics. This is the only fee required.",
  },
  {
    step: "04",
    title: "Receive Your BYD Car",
    description: "Your brand new BYD electric car will be delivered to your door within 7–14 business days. Enjoy!",
  },
];

export default function InstructionSection() {
  return (
    <section id="instruction" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            How to Claim Your <span className="text-red-600">BYD Car</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
            Follow these simple steps to receive your brand new BYD electric car giveaway
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-red-300" />
                </div>
              )}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-5xl font-black text-red-100 mb-4">{step.step}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold rounded-md"
            onClick={() => document.getElementById('participate')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Claim Your BYD Car Giveaway Now →
          </Button>
        </div>
      </div>
    </section>
  );
}