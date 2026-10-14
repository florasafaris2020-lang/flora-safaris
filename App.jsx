import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, MapPin, Calendar, Users, Shield, Award, Heart, Star, ChevronDown, ChevronUp, 
  CheckCircle2, XCircle, CreditCard, Lock, ArrowRight, Filter, Search, Phone, Mail, 
  Clock, DollarSign, Camera, Info, Sparkles, Send, Download, Check, RefreshCw, Layers, Eye
} from 'lucide-react';

// --- INITIAL DATA & PACKAGES ---
const SAFARI_PACKAGES = [
  {
    id: 'maasai-mara-great-migration',
    title: 'The Great Wildebeest Migration Experience',
    location: 'Maasai Mara, Kenya',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    price: 1850,
    style: 'Luxury Tent',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    description: 'Witness the world-famous Great Migration across the Mara River. Unparalleled predator action, luxury tented camps, and scenic sundowners.',
    highlights: ['Mara River crossings', 'Big Five game drives', 'Hot air balloon safari option', 'Maasai cultural encounter'],
    includes: ['All park fees & game drives', 'Full board luxury lodge accommodation', 'Professional safari guide & 4x4 Land Cruiser', 'Airport transfers & bottled water'],
    excludes: ['International flights', 'Hot air balloon ($450 per person)', 'Personal tips & alcoholic drinks'],
    itinerary: [
      { day: 1, title: 'Arrival & Flight to Maasai Mara', desc: 'Touch down at Wilson Airport and board your scenic bush flight to the Mara. Sunset game drive.' },
      { day: 2, title: 'Full Day Mara River Game Drive', desc: 'Full day spent along the Mara River tracking big cats and crossing herds.' },
      { day: 3, title: 'Balloon Safari & Cultural Village', desc: 'Dawn balloon flight over the savannah followed by a champagne bush breakfast and Maasai village tour.' },
      { day: 4, title: 'Conservancy Night Safari', desc: 'Explore private conservancies with exclusive night game drives and off-road tracking.' },
      { day: 5, title: 'Farewell Bush Breakfast & Departure', desc: 'Morning game drive, bush breakfast, and return flight to Nairobi.' }
    ]
  },
  {
    id: 'serengeti-ngorongoro-unbound',
    title: 'Serengeti & Ngorongoro Crater Expedition',
    location: 'Serengeti & Ngorongoro, Tanzania',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    price: 2650,
    style: 'Mid-range',
    rating: 4.95,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the infinite plains of the Serengeti and descend into the natural wonder of Ngorongoro Crater, home to rare Black Rhinos.',
    highlights: ['Ngorongoro Crater floor descent', 'Serengeti endless plains', 'Olduvai Gorge historical tour', 'High rhino sighting chances'],
    includes: ['Crater entry fees', 'Mid-range safari lodge stays', 'Custom 4x4 pop-roof Land Cruiser', 'All meals on safari'],
    excludes: ['Tanzania Tourist Visa ($50-100)', 'Gratuities', 'Laundry service'],
    itinerary: [
      { day: 1, title: 'Arusha to Tarangire', desc: 'Drive to Tarangire, famous for ancient baobab trees and giant elephant herds.' },
      { day: 2, title: 'Tarangire to Central Serengeti', desc: 'Journey into the heart of the Serengeti with game viewing en route.' },
      { day: 3, title: 'Serengeti Deep Exploration', desc: 'Full day tracking lions, leopards, and vast herds across the central valley.' },
      { day: 4, title: 'Serengeti to Ngorongoro Rim', desc: 'Morning game drive followed by scenic transfer to the crater rim lodge.' },
      { day: 5, title: 'Ngorongoro Crater Floor Safari', desc: 'Descend 600m into the caldera for a day of extraordinary wildlife density.' },
      { day: 6, title: 'Lake Manyara Flamingos', desc: 'Visit Lake Manyara for tree-climbing lions and flamingo-filled shores.' },
      { day: 7, title: 'Return to Kilimanjaro Airport', desc: 'Leisurely breakfast and drop-off for evening flight home.' }
    ]
  },
  {
    id: 'amboseli-kilimanjaro-majesty',
    title: 'Amboseli Giants & Kilimanjaro Views',
    location: 'Amboseli National Park, Kenya',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    price: 980,
    style: 'Eco-budget',
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic views of Mount Kilimanjaro serving as the backdrop for Kenya’s largest elephant herds. Perfect short wildlife break.',
    highlights: ['Panoramic Kilimanjaro backdrop', 'Huge elephant herds up close', 'Observation Hill panorama', 'Eco-friendly tented camp'],
    includes: ['Park entrance permits', 'Eco-camp accommodations', 'Dedicated guide & 4x4 vehicle', 'Filtered water & meals'],
    excludes: ['Drinks at camp bar', 'Tips for drivers/guides', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Nairobi to Amboseli', desc: 'Morning pick up, scenic drive south. Afternoon game drive under Mount Kilimanjaro.' },
      { day: 2, title: 'Full Day in Amboseli Swamp Sanctuary', desc: 'Explore the marshes packed with hippos and elephants. Summit Observation Hill for lunch.' },
      { day: 3, title: 'Sunrise Drive & Return', desc: 'Catch sunrise over Kili with game viewing, then return to Nairobi by afternoon.' }
    ]
  },
  {
    id: 'diani-beach-bush-combo',
    title: 'Tsavo Wilderness & Diani Beach Escape',
    location: 'Tsavo West & Diani Beach, Kenya',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    price: 2400,
    style: 'Luxury Tent',
    rating: 4.88,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate contrast: dramatic red-soil wilderness in Tsavo followed by turquoise waters and white powder sands in Diani.',
    highlights: ['Mzima Springs hippo view', 'Red elephants of Tsavo', 'Private luxury beach resort', 'Dhow boat sailing & snorkeling'],
    includes: ['All safari game drives', 'Luxury beach resort stay with breakfast/dinner', 'Inter-park flights', 'Snorkeling gear hire'],
    excludes: ['Motorized water sports', 'Premium spirits & cocktails', 'Spa treatments'],
    itinerary: [
      { day: 1, title: 'Nairobi to Tsavo West', desc: 'Scenic journey into volcanic wilderness. Afternoon visit to Rhino Sanctuary.' },
      { day: 2, title: 'Mzima Springs Underwater Hut', desc: 'Watch hippos swim in underwater glass chambers. Evening game drive.' },
      { day: 3, title: 'Tsavo to Diani Beach Coast', desc: 'Transfer south to the Indian Ocean shore. Check-in to private beachfront villa.' },
      { day: 4, title: 'Relaxation on Diani Beach', desc: 'Free day for ocean lounge, spa, or beach volleyball.' },
      { day: 5, title: 'Kisite Marine Park Snorkeling', desc: 'Traditional dhow voyage to spot wild dolphins and dive with sea turtles.' },
      { day: 6, title: 'Coastal Culture & Sunset Cruise', desc: 'Explore Ukunda local markets and enjoy a sunset dhow cocktail sail.' },
      { day: 7, title: 'Beach Day & Seafood Gala', desc: 'Final relaxing day on the sand ending with a fresh seafood beachfront dinner.' },
      { day: 8, title: 'Fly back to Nairobi', desc: 'Short flight back to Nairobi for onward connections.' }
    ]
  }
];

const TESTIMONIALS = [
  {
    name: 'Eleanor & Marcus Vance',
    country: 'United Kingdom',
    quote: 'Flora Safaris crafted the journey of a lifetime for our 10th anniversary. Seeing the migration while sipping champagne on the Mara plane was pure magic!',
    rating: 5,
    tour: 'Maasai Mara Migration'
  },
  {
    name: 'Dr. Julian Thorne',
    country: 'Australia',
    quote: 'Flawless execution from booking to the final drop-off. The luxury tented camps were top tier and our driver guide, Joseph, was an absolute expert spotter.',
    rating: 5,
    tour: 'Serengeti & Ngorongoro'
  },
  {
    name: 'Sarah Jenkins',
    country: 'United States',
    quote: 'As a solo female traveler, safety and comfort were paramount. Flora Safaris made me feel cared for every single step of the way!',
    rating: 5,
    tour: 'Amboseli Giants'
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // home, packages, customize, checkout, about
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter State (for Packages page & Home filter)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [maxBudget, setMaxBudget] = useState(3000);

  // Customize Trip Planner State
  const [customDestination, setCustomDestination] = useState('Maasai Mara, Kenya');
  const [customDays, setCustomDays] = useState(5);
  const [customTravelers, setCustomTravelers] = useState(2);
  const [customLodge, setCustomLodge] = useState('mid-range'); // luxury, mid-range, budget
  const [customAddons, setCustomAddons] = useState({
    balloon: false,
    village: true,
    bushwalk: false,
    nightdrive: false
  });

  // Stripe Checkout Form State
  const [bookingDetails, setBookingDetails] = useState({
    packageName: 'Customized Flora Safari',
    travelDate: '2026-11-15',
    travelers: 2,
    payType: 'deposit', // 'deposit' or 'full'
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    promoCode: '',
    discount: 0
  });

  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const [receiptData, setReceiptData] = useState(null);

  // Auto-scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Dynamic Price Calculations for Custom Trip Planner
  const calculatedCustomPrice = useMemo(() => {
    let baseRatePerDay = 220; // mid-range
    if (customLodge === 'luxury') baseRatePerDay = 420;
    if (customLodge === 'budget') baseRatePerDay = 150;

    let subtotal = baseRatePerDay * customDays * customTravelers;

    if (customAddons.balloon) subtotal += 450 * customTravelers;
    if (customAddons.village) subtotal += 50 * customTravelers;
    if (customAddons.bushwalk) subtotal += 80 * customTravelers;
    if (customAddons.nightdrive) subtotal += 120 * customTravelers;

    return subtotal;
  }, [customDays, customTravelers, customLodge, customAddons]);

  // Calculated Price for Checkout Page
  const currentCheckoutTotal = useMemo(() => {
    let raw = 0;
    if (selectedPackage) {
      raw = selectedPackage.price * bookingDetails.travelers;
    } else {
      raw = calculatedCustomPrice;
    }
    
    if (bookingDetails.discount > 0) {
      raw = raw - (raw * (bookingDetails.discount / 100));
    }

    return bookingDetails.payType === 'deposit' ? Math.round(raw * 0.3) : Math.round(raw);
  }, [selectedPackage, calculatedCustomPrice, bookingDetails.travelers, bookingDetails.payType, bookingDetails.discount]);

  const totalFullPrice = useMemo(() => {
    let raw = selectedPackage ? selectedPackage.price * bookingDetails.travelers : calculatedCustomPrice;
    if (bookingDetails.discount > 0) {
      raw = raw - (raw * (bookingDetails.discount / 100));
    }
    return Math.round(raw);
  }, [selectedPackage, calculatedCustomPrice, bookingDetails.travelers, bookingDetails.discount]);

  // Actions
  const handleQuickBook = (pkg) => {
    setSelectedPackage(pkg);
    setBookingDetails(prev => ({
      ...prev,
      packageName: pkg.title,
      travelers: 2
    }));
    setActiveTab('checkout');
    showToast(`Selected "${pkg.title}". Proceed to checkout below.`);
  };

  const handleApplyPromo = () => {
    if (bookingDetails.promoCode.toUpperCase() === 'FLORA10') {
      setBookingDetails(prev => ({ ...prev, discount: 10 }));
      showToast('🎉 Promo code FLORA10 applied! 10% discount added.');
    } else if (bookingDetails.promoCode.toUpperCase() === 'SAFARI20') {
      setBookingDetails(prev => ({ ...prev, discount: 20 }));
      showToast('🌟 VIP Promo code applied! 20% discount added.');
    } else {
      showToast('❌ Invalid promo code. Try "FLORA10"');
    }
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');

    setTimeout(() => {
      setPaymentStatus('success');
      setReceiptData({
        transactionId: 'FLR-' + Math.floor(100000 + Math.random() * 900000),
        amountPaid: currentCheckoutTotal,
        totalBalance: totalFullPrice,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        packageTitle: selectedPackage ? selectedPackage.title : `Custom ${customDestination} Safari`,
        travelerName: bookingDetails.fullName,
        email: bookingDetails.email,
        paymentType: bookingDetails.payType === 'deposit' ? '30% Refundable Deposit' : 'Full Payment (100%)'
      });
      showToast('✅ Payment successful! Check your booking receipt.');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans flex flex-col antialiased selection:bg-[#D97706] selection:text-white">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C3A27] text-amber-100 px-5 py-3.5 rounded-xl shadow-2xl border border-amber-500/30 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* --- HEADER / NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-[#1C3A27]/95 backdrop-blur-md text-amber-50 border-b border-amber-900/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-900 shadow-inner group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold tracking-tight text-amber-100 group-hover:text-amber-300 transition-colors">
                FLORA <span className="text-amber-500 font-sans font-light text-xl">SAFARIS</span>
              </span>
              <p className="text-[10px] text-amber-200/70 tracking-widest uppercase -mt-1">Luxury African Expeditions</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'packages', label: 'Safari Packages' },
              { id: 'customize', label: 'Custom Planner' },
              { id: 'checkout', label: 'Book & Pay' },
              { id: 'about', label: 'About & Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-600/90 text-white shadow-sm'
                    : 'text-amber-100/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('customize')}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold px-4 py-2 rounded-lg text-sm hover:from-amber-400 hover:to-amber-500 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tailor Your Safari</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="md:hidden flex justify-around bg-[#142B1D] py-2 px-1 border-t border-amber-900/40 text-xs overflow-x-auto">
          {[
            { id: 'home', label: 'Home' },
            { id: 'packages', label: 'Packages' },
            { id: 'customize', label: 'Customize' },
            { id: 'checkout', label: 'Checkout' },
            { id: 'about', label: 'About' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                activeTab === tab.id ? 'bg-amber-600 text-white font-bold' : 'text-amber-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT AREA CONTAINER */}
      <main className="flex-grow">

        {/* ========================================================= */}
        {/* PAGE 1: HOME PAGE */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="relative min-h-[620px] flex items-center justify-center bg-stone-900 text-white overflow-hidden py-20">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-10000 hover:scale-100"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A27] via-stone-950/40 to-transparent" />

              <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
                <span className="inline-block bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                  Authentic Eco-Luxury Expeditions
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-amber-50 leading-tight mb-6">
                  Experience the Soul of <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                    Untamed East Africa
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-stone-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  Immerse yourself in nature’s greatest spectacles with bespoke itineraries, private 4x4 Land Cruisers, and world-class wilderness lodges.
                </p>

                {/* Quick Search Filter Bar */}
                <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl text-stone-800 max-w-4xl mx-auto text-left border border-amber-900/10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Destination & Style</label>
                      <select 
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        className="w-full bg-stone-100 border border-stone-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="all">All Styles & Camps</option>
                        <option value="Luxury Tent">Luxury Tented Camp</option>
                        <option value="Mid-range">Mid-range Lodge</option>
                        <option value="Eco-budget">Eco-Budget Adventure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Duration</label>
                      <select 
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-full bg-stone-100 border border-stone-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="all">Any Length</option>
                        <option value="short">Short (3-4 Days)</option>
                        <option value="medium">Classic (5-7 Days)</option>
                        <option value="long">Extended (8+ Days)</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button 
                        onClick={() => setActiveTab('packages')}
                        className="w-full bg-[#1C3A27] hover:bg-[#142B1D] text-amber-100 font-semibold p-2.5 rounded-lg text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <Search className="w-4 h-4 text-amber-400" />
                        <span>Explore Safaris</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Popular Safari Packages Preview */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                <div>
                  <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Handcrafted Journeys</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">Popular Safari Expeditions</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('packages')} 
                  className="mt-4 sm:mt-0 text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-2 group text-sm"
                >
                  <span>View All Packages</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SAFARI_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col group">
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs px-2.5 py-1 rounded-full font-medium">
                        {pkg.duration}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-amber-600/90 text-white text-xs px-2.5 py-1 rounded-md font-semibold">
                        {pkg.style}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-amber-700 mb-1 font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{pkg.location}</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug mb-2 group-hover:text-amber-800 transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div>
                        <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">From</span>
                            <span className="text-xl font-serif font-bold text-stone-900">${pkg.price}</span>
                            <span className="text-xs text-stone-500"> /person</span>
                          </div>
                          <button
                            onClick={() => handleQuickBook(pkg)}
                            className="bg-[#1C3A27] hover:bg-[#142B1D] text-amber-100 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Banner */}
            <section className="bg-[#1C3A27] text-amber-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Uncompromised Standard</span>
                  <h2 className="text-3xl font-serif font-bold mt-1">Why Travel with Flora Safaris?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#244731] p-6 rounded-xl border border-amber-900/30 text-center">
                    <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold mb-2">100% Financial Protection</h3>
                    <p className="text-xs text-amber-200/70 leading-relaxed">
                      All bookings feature transparent zero-fee cancel policies and flexible 30% deposit payments secured via Stripe.
                    </p>
                  </div>

                  <div className="bg-[#244731] p-6 rounded-xl border border-amber-900/30 text-center">
                    <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold mb-2">Expert Local Guides</h3>
                    <p className="text-xs text-amber-200/70 leading-relaxed">
                      Native East African naturalists with 10+ years tracking experience ensuring intimate wildlife encounters.
                    </p>
                  </div>

                  <div className="bg-[#244731] p-6 rounded-xl border border-amber-900/30 text-center">
                    <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold mb-2">Conservation Pledge</h3>
                    <p className="text-xs text-amber-200/70 leading-relaxed">
                      5% of every safari ticket price directly funds local anti-poaching units and community education centers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Traveler Stories</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Unforgettable Memories</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-amber-500 mb-3">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-stone-700 italic mb-4 leading-relaxed">"{item.quote}"</p>
                    </div>
                    <div className="border-t border-stone-100 pt-3">
                      <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-stone-500">{item.country} • <span className="text-amber-800">{item.tour}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-stone-900 text-stone-100 py-16 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-bold text-amber-100 mb-4">Ready to Plan Your Dream Safari?</h2>
                <p className="text-stone-300 text-sm mb-8 max-w-xl mx-auto">
                  Customize every detail from luxury lodges to hot air balloons with our real-time price calculator.
                </p>
                <button
                  onClick={() => setActiveTab('customize')}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3.5 rounded-xl text-base shadow-lg transition-transform transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Launch Interactive Trip Planner</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: SAFARI PACKAGES / DESTINATIONS */}
        {/* ========================================================= */}
        {activeTab === 'packages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            {/* Header */}
            <div className="mb-8">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Curated Safaris</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">Multi-Day Safari Expeditions</h1>
              <p className="text-stone-600 text-sm mt-2 max-w-2xl">
                Choose from our iconic African safari itineraries. Each tour includes dedicated 4x4 vehicles, certified guide-trackers, and full board options.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Search Keywords</label>
                <input 
                  type="text" 
                  placeholder="e.g. Migration, Serengeti, Diani..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Accommodation Style</label>
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Lodge Styles</option>
                  <option value="Luxury Tent">Luxury Tented Camp</option>
                  <option value="Mid-range">Mid-range Lodge</option>
                  <option value="Eco-budget">Eco-budget</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 mb-1">Filter by Price Limit (${maxBudget})</label>
                <input 
                  type="range" 
                  min="800" 
                  max="4000" 
                  step="100"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {SAFARI_PACKAGES.filter(p => {
                const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStyle = selectedStyle === 'all' || p.style === selectedStyle;
                const matchesBudget = p.price <= maxBudget;
                return matchesSearch && matchesStyle && matchesBudget;
              }).map((pkg) => (
                <SafariPackageCard key={pkg.id} pkg={pkg} onBook={handleQuickBook} />
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: CUSTOMIZE / BOOK SAFARI PLANNER */}
        {/* ========================================================= */}
        {activeTab === 'customize' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Tailor-Made Experience</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">Interactive Safari Trip Builder</h1>
              <p className="text-stone-600 text-sm mt-2">
                Configure your bespoke African safari. Adjust nights, lodge styles, and optional activities to calculate instant pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Configuration Controls */}
              <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                
                {/* Step 1: Destination */}
                <div>
                  <label className="block font-serif font-bold text-stone-900 text-base mb-2">1. Select Primary Destination</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Maasai Mara, Kenya',
                      'Serengeti & Ngorongoro, Tanzania',
                      'Amboseli Kilimanjaro, Kenya',
                      'Diani Beach & Tsavo Combo'
                    ].map((dest) => (
                      <button
                        key={dest}
                        onClick={() => setCustomDestination(dest)}
                        className={`p-3 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                          customDestination === dest 
                            ? 'border-amber-600 bg-amber-50/50 text-amber-950 font-semibold ring-1 ring-amber-500' 
                            : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span>{dest}</span>
                        {customDestination === dest && <Check className="w-4 h-4 text-amber-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Duration & Travelers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                  <div>
                    <label className="block font-serif font-bold text-stone-900 text-base mb-2">2. Duration (Nights)</label>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setCustomDays(Math.max(2, customDays - 1))}
                        className="w-10 h-10 rounded-lg border border-stone-300 font-bold hover:bg-stone-100"
                      >-</button>
                      <span className="text-lg font-bold text-stone-900">{customDays} Days / {customDays - 1} Nights</span>
                      <button 
                        onClick={() => setCustomDays(Math.min(14, customDays + 1))}
                        className="w-10 h-10 rounded-lg border border-stone-300 font-bold hover:bg-stone-100"
                      >+</button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-stone-900 text-base mb-2">3. Number of Travelers</label>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setCustomTravelers(Math.max(1, customTravelers - 1))}
                        className="w-10 h-10 rounded-lg border border-stone-300 font-bold hover:bg-stone-100"
                      >-</button>
                      <span className="text-lg font-bold text-stone-900">{customTravelers} Guests</span>
                      <button 
                        onClick={() => setCustomTravelers(Math.min(12, customTravelers + 1))}
                        className="w-10 h-10 rounded-lg border border-stone-300 font-bold hover:bg-stone-100"
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Accommodation Comfort Tier */}
                <div className="pt-4 border-t border-stone-100">
                  <label className="block font-serif font-bold text-stone-900 text-base mb-2">4. Lodge & Accommodation Comfort</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'budget', label: 'Eco-Budget Camp', desc: '$150/p/day', tag: 'Comfortable tents' },
                      { id: 'mid-range', label: 'Classic Mid-Range', desc: '$220/p/day', tag: 'Pool & Private En-suite' },
                      { id: 'luxury', label: '5-Star Luxury Tented', desc: '$420/p/day', tag: 'Private Butler & Fine Dining' }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setCustomLodge(tier.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          customLodge === tier.id 
                            ? 'border-amber-600 bg-amber-50/50 text-amber-950 ring-1 ring-amber-500' 
                            : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div className="font-bold text-sm">{tier.label}</div>
                        <div className="text-xs text-amber-700 font-semibold">{tier.desc}</div>
                        <div className="text-[11px] text-stone-500 mt-1">{tier.tag}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Add-on Experiences */}
                <div className="pt-4 border-t border-stone-100">
                  <label className="block font-serif font-bold text-stone-900 text-base mb-2">5. Optional Safari Add-ons</label>
                  <div className="space-y-3">
                    {[
                      { key: 'balloon', name: 'Sunrise Hot Air Balloon Flight & Champagne Breakfast', cost: '$450 per person' },
                      { key: 'village', name: 'Authentic Maasai/Samburu Cultural Village Visit', cost: '$50 per person' },
                      { key: 'bushwalk', name: 'Guided Wilderness Walking Safari with Ranger', cost: '$80 per person' },
                      { key: 'nightdrive', name: 'Exclusive Night Game Drive with Thermal Optics', cost: '$120 per person' }
                    ].map((addon) => (
                      <label key={addon.key} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:bg-amber-50/30">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox"
                            checked={customAddons[addon.key]}
                            onChange={(e) => setCustomAddons({ ...customAddons, [addon.key]: e.target.checked })}
                            className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                          />
                          <span className="text-sm text-stone-800 font-medium">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-800">{addon.cost}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Real-time Summary Card */}
              <div className="bg-[#1C3A27] text-amber-50 p-6 rounded-2xl shadow-xl sticky top-28 border border-amber-900/40">
                <h3 className="text-xl font-serif font-bold mb-4 text-amber-200 border-b border-amber-800/60 pb-3 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>Trip Summary</span>
                </h3>

                <div className="space-y-3 text-xs text-amber-100/90 mb-6">
                  <div className="flex justify-between">
                    <span className="text-amber-200/60">Destination:</span>
                    <span className="font-semibold text-right">{customDestination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-200/60">Length:</span>
                    <span className="font-semibold">{customDays} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-200/60">Party Size:</span>
                    <span className="font-semibold">{customTravelers} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-200/60">Accommodation:</span>
                    <span className="font-semibold capitalize">{customLodge} tier</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-200/60">Add-ons Selected:</span>
                    <span className="font-semibold">{Object.values(customAddons).filter(Boolean).length} items</span>
                  </div>
                </div>

                <div className="bg-[#244731] p-4 rounded-xl border border-amber-800/40 mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 block mb-1">Estimated Total Price</span>
                  <div className="text-3xl font-serif font-bold text-white">
                    ${calculatedCustomPrice.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-amber-200/70">Includes all taxes, park permits & guide fees</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedPackage(null);
                    setBookingDetails(prev => ({
                      ...prev,
                      packageName: `Custom ${customDestination} Safari (${customDays} Days)`,
                      travelers: customTravelers
                    }));
                    setActiveTab('checkout');
                    showToast('Custom safari loaded into Checkout!');
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: STRIPE PAYMENT / CHECKOUT */}
        {/* ========================================================= */}
        {activeTab === 'checkout' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
              <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Complete Your Reservation</h1>
              <p className="text-stone-600 text-xs mt-1">
                Integrated Stripe Gateway. Test mock cards available. No real money required.
              </p>
            </div>

            {/* If payment finished, display digital receipt */}
            {paymentStatus === 'success' && receiptData ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xl text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">Payment Verified</span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">Safari Booking Confirmed!</h2>
                <p className="text-xs text-stone-500 mt-1 mb-6">A copy of your official itinerary and confirmation voucher has been sent to {receiptData.email}</p>

                <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-left text-xs space-y-2.5 mb-6 font-mono">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Receipt Ref:</span>
                    <span className="font-bold text-stone-800">{receiptData.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Expedition Title:</span>
                    <span className="font-bold text-stone-800">{receiptData.packageTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Lead Traveler:</span>
                    <span className="font-bold text-stone-800">{receiptData.travelerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Option:</span>
                    <span className="font-bold text-stone-800">{receiptData.paymentType}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-sans font-bold text-[#1C3A27]">
                    <span>Amount Charged Today:</span>
                    <span>${receiptData.amountPaid.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setPaymentStatus('idle');
                      setActiveTab('home');
                    }}
                    className="bg-[#1C3A27] text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#142B1D]"
                  >
                    Return to Homepage
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="border border-stone-300 text-stone-700 px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Receipt PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Form */
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                
                {/* Form Side */}
                <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
                  <form onSubmit={handleSimulatePayment} className="space-y-5">
                    
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">1. Traveler Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Full Legal Name</label>
                          <input 
                            type="text" 
                            required
                            value={bookingDetails.fullName}
                            onChange={(e) => setBookingDetails({...bookingDetails, fullName: e.target.value})}
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address</label>
                            <input 
                              type="email" 
                              required
                              value={bookingDetails.email}
                              onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Phone Number</label>
                            <input 
                              type="tel" 
                              required
                              value={bookingDetails.phone}
                              onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deposit vs Full Payment Toggle */}
                    <div className="pt-4 border-t border-stone-100">
                      <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">2. Payment Schedule</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setBookingDetails({...bookingDetails, payType: 'deposit'})}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            bookingDetails.payType === 'deposit'
                              ? 'border-amber-600 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-500'
                              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          <div className="text-xs uppercase font-bold text-amber-700">30% Deposit</div>
                          <div className="text-sm font-bold text-stone-900 mt-0.5">Pay Deposit Today</div>
                          <div className="text-[10px] text-stone-500">Balance due 30 days prior</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBookingDetails({...bookingDetails, payType: 'full'})}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            bookingDetails.payType === 'full'
                              ? 'border-amber-600 bg-amber-50 text-amber-950 font-semibold ring-1 ring-amber-500'
                              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          <div className="text-xs uppercase font-bold text-amber-700">100% Full</div>
                          <div className="text-sm font-bold text-stone-900 mt-0.5">Pay In Full</div>
                          <div className="text-[10px] text-stone-500">Instant final confirmation</div>
                        </button>
                      </div>
                    </div>

                    {/* Stripe Card Mock */}
                    <div className="pt-4 border-t border-stone-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-amber-700" />
                          <span>Card Details (Stripe Elements)</span>
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-stone-400">
                          <Lock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>256-Bit SSL</span>
                        </div>
                      </div>

                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-300 space-y-3">
                        <div>
                          <label className="block text-[11px] uppercase font-semibold text-stone-500 mb-1">Card Number</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              required
                              value={bookingDetails.cardNumber}
                              onChange={(e) => setBookingDetails({...bookingDetails, cardNumber: e.target.value})}
                              className="w-full bg-white border border-stone-300 rounded-md p-2 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                            <div className="absolute right-3 top-2.5 text-xs font-bold text-stone-400">VISA / MC</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase font-semibold text-stone-500 mb-1">Expiration</label>
                            <input 
                              type="text" 
                              required
                              value={bookingDetails.cardExp}
                              onChange={(e) => setBookingDetails({...bookingDetails, cardExp: e.target.value})}
                              className="w-full bg-white border border-stone-300 rounded-md p-2 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase font-semibold text-stone-500 mb-1">CVC Code</label>
                            <input 
                              type="text" 
                              required
                              value={bookingDetails.cardCvc}
                              onChange={(e) => setBookingDetails({...bookingDetails, cardCvc: e.target.value})}
                              className="w-full bg-white border border-stone-300 rounded-md p-2 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button
                      type="submit"
                      disabled={paymentStatus === 'processing'}
                      className="w-full bg-[#1C3A27] hover:bg-[#142B1D] text-amber-100 font-bold py-3.5 rounded-xl text-base shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {paymentStatus === 'processing' ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
                          <span>Processing Payment with Stripe...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-amber-400" />
                          <span>Pay ${currentCheckoutTotal.toLocaleString()} & Confirm Booking</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Pricing Breakdown Sidebar */}
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-md border border-stone-800">
                    <h3 className="font-serif font-bold text-amber-200 text-lg mb-4 border-b border-stone-800 pb-2">
                      Order Summary
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-stone-400 block">Safari Package:</span>
                        <span className="font-bold text-amber-100 text-sm leading-tight">{bookingDetails.packageName}</span>
                      </div>

                      <div className="flex justify-between border-t border-stone-800 pt-2">
                        <span className="text-stone-400">Travelers:</span>
                        <span className="font-semibold text-amber-100">{bookingDetails.travelers} Persons</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-stone-400">Safari Rate:</span>
                        <span className="font-semibold text-amber-100">${totalFullPrice.toLocaleString()}</span>
                      </div>

                      {bookingDetails.discount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Promo Discount:</span>
                          <span>-{bookingDetails.discount}%</span>
                        </div>
                      )}

                      <div className="border-t border-stone-800 pt-3 flex justify-between items-end">
                        <div>
                          <span className="text-stone-400 text-[10px] uppercase block">
                            {bookingDetails.payType === 'deposit' ? '30% Deposit Due Now' : 'Total Due Now'}
                          </span>
                          <span className="text-2xl font-serif font-bold text-amber-400">
                            ${currentCheckoutTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Promo Code Input */}
                    <div className="mt-6 pt-4 border-t border-stone-800">
                      <label className="block text-[11px] uppercase text-stone-400 font-semibold mb-1">Have Promo Code?</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Try FLORA10" 
                          value={bookingDetails.promoCode}
                          onChange={(e) => setBookingDetails({...bookingDetails, promoCode: e.target.value})}
                          className="bg-stone-800 border border-stone-700 rounded-md p-2 text-xs text-white uppercase focus:outline-none w-full"
                        />
                        <button 
                          type="button"
                          onClick={handleApplyPromo}
                          className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-3 py-2 rounded-md text-xs"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badge Box */}
                  <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-950">
                      <Shield className="w-4 h-4 text-amber-700" />
                      <span>Flora Safaris Deposit Guarantee</span>
                    </div>
                    <p className="text-[11px] text-amber-800/80 leading-relaxed">
                      Free cancellation up to 30 days before departure. Deposits are 100% refundable or transferrable to future dates.
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: ABOUT US & CONTACT */}
        {/* ========================================================= */}
        {activeTab === 'about' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn space-y-16">
            
            {/* Story & Heritage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Our Heritage</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1 mb-4">
                  Rooted in Conservation & Passion
                </h1>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Founded in 2012 by native Kenya conservationists, Flora Safaris was born from a desire to show travelers the authentic majesty of East Africa without disrupting its delicate ecosystems.
                </p>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  We specialize in high-end, low-impact luxury safaris across Kenya and Tanzania. Every vehicle in our fleet is customized for optimal photographer sightlines, and every lodge partner shares our commitment to solar power and zero single-use plastics.
                </p>

                <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-4 text-center">
                  <div>
                    <span className="text-2xl font-serif font-bold text-amber-800 block">12+</span>
                    <span className="text-[11px] text-stone-500 uppercase">Years Experience</span>
                  </div>
                  <div>
                    <span className="text-2xl font-serif font-bold text-amber-800 block">4.9 ★</span>
                    <span className="text-[11px] text-stone-500 uppercase">TripAdvisor Rating</span>
                  </div>
                  <div>
                    <span className="text-2xl font-serif font-bold text-amber-800 block">100%</span>
                    <span className="text-[11px] text-stone-500 uppercase">Carbon Offset</span>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 sm:h-96">
                <img 
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Flora Safaris Guide" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Form & Office Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Get in Touch with Our Concierge</h2>
                <p className="text-xs text-stone-600 mb-6">Have questions or want a customized multi-country itinerary? Send us a message.</p>

                <form onSubmit={(e) => { e.preventDefault(); showToast('📧 Message sent! Our team will respond within 2 hours.'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Your Name</label>
                    <input type="text" required placeholder="John Smith" className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address</label>
                    <input type="email" required placeholder="john@example.com" className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Inquiry Details</label>
                    <textarea rows="4" required placeholder="Tell us about your target travel dates, group size, or preferences..." className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm"></textarea>
                  </div>
                  <button type="submit" className="bg-[#1C3A27] text-amber-100 font-bold px-6 py-3 rounded-xl text-xs hover:bg-[#142B1D] transition-colors flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Direct Message</span>
                  </button>
                </form>
              </div>

              {/* Office Details & Simulated Map */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">Headquarter Offices</h3>
                  <div className="space-y-3 text-xs text-stone-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>Karen Wildlife Sanctuary Road, Suite 400, Nairobi, Kenya</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>+254 (0) 712 345 678 / +1 (800) 555-FLORA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>expeditions@florasafaris.com</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Map UI */}
                <div className="bg-stone-100 border border-stone-300 rounded-xl h-48 relative overflow-hidden flex items-center justify-center text-center p-4">
                  <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80')` }} />
                  <div className="relative z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-md border border-stone-200">
                    <MapPin className="w-6 h-6 text-amber-600 mx-auto mb-1 animate-bounce" />
                    <span className="font-bold text-xs block text-stone-900">Flora Safaris HQ - Nairobi</span>
                    <span className="text-[10px] text-stone-500">Interactive Map Location Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4 max-w-3xl mx-auto text-xs">
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm mb-1">What is the best time of year for the Wildebeest Migration?</h4>
                  <p className="text-stone-600 leading-relaxed">The river crossings in the Maasai Mara typically take place between July and October. However, large herds remain in the Serengeti year-round.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Are yellow fever vaccines required?</h4>
                  <p className="text-stone-600 leading-relaxed">Yellow fever vaccination certificates are required if arriving from an endemic country. We provide full health checklist documentation upon booking.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#142B1D] text-amber-100/80 border-t border-amber-900/40 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>FLORA SAFARIS</span>
            </div>
            <p className="text-[11px] text-amber-200/60 leading-relaxed">
              Pioneering eco-luxury safaris across Kenya & Tanzania. Designed with authentic African hospitality.
            </p>
          </div>

          <div>
            <h4 className="text-amber-300 font-bold uppercase tracking-wider mb-3 text-[11px]">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => setActiveTab('packages')} className="hover:text-white">Safari Packages</button></li>
              <li><button onClick={() => setActiveTab('customize')} className="hover:text-white">Custom Trip Builder</button></li>
              <li><button onClick={() => setActiveTab('checkout')} className="hover:text-white">Checkout Gateway</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-300 font-bold uppercase tracking-wider mb-3 text-[11px]">Popular Safaris</h4>
            <ul className="space-y-2 text-[11px]">
              <li>Maasai Mara Migration</li>
              <li>Serengeti & Ngorongoro</li>
              <li>Amboseli Elephant View</li>
              <li>Diani Beach & Bush Combo</li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-300 font-bold uppercase tracking-wider mb-3 text-[11px]">Payment & Trust</h4>
            <p className="text-[11px] text-amber-200/60 mb-3">Powered by Stripe integration simulation. 100% Client-side demo with $0.00 deployment cost.</p>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px]">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-amber-900/30 mt-8 pt-6 text-center text-[10px] text-amber-200/40">
          © {new Date().getFullYear()} Flora Safaris East Africa Ltd. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

// =========================================================
// HELPER COMPONENT: Safari Package Card with Itinerary Accordion
// =========================================================
function SafariPackageCard({ pkg, onBook }) {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-60">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs px-3 py-1 rounded-full font-medium">
          {pkg.duration}
        </span>
        <span className="absolute bottom-3 left-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-md font-semibold">
          {pkg.style}
        </span>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-amber-800 mb-1 font-semibold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {pkg.location}
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {pkg.rating} ({pkg.reviewsCount})
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 leading-snug">{pkg.title}</h3>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">{pkg.description}</p>

          {/* Highlights */}
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 mb-4">
            <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 block mb-2">Expedition Highlights</span>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
              {pkg.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Day-by-day Itinerary Accordion Button */}
          <button
            onClick={() => setShowItinerary(!showItinerary)}
            className="w-full text-left py-2 px-3 bg-amber-50/60 hover:bg-amber-100/60 rounded-lg text-amber-900 text-xs font-semibold flex items-center justify-between transition-colors mb-4"
          >
            <span>{showItinerary ? 'Hide Day-by-Day Itinerary' : 'View Full Day-by-Day Itinerary'}</span>
            {showItinerary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Accordion Content */}
          {showItinerary && (
            <div className="space-y-3 border-l-2 border-amber-500 pl-3 my-4 text-xs">
              {pkg.itinerary.map((item) => (
                <div key={item.day}>
                  <span className="font-bold text-amber-900">Day {item.day}: {item.title}</span>
                  <p className="text-stone-600 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-stone-400 block">Starting Rate</span>
              <span className="text-2xl font-serif font-bold text-stone-900">${pkg.price}</span>
              <span className="text-xs text-stone-500"> /person</span>
            </div>
            <button
              onClick={() => onBook(pkg)}
              className="bg-[#1C3A27] hover:bg-[#142B1D] text-amber-100 text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Book Expedition</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
