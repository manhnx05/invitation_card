import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Heart, Users, Compass } from 'lucide-react';

interface InvitationCardProps {
  guestName?: string;
}

export default function InvitationCard({ guestName = 'Quý khách' }: InvitationCardProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'thanhhon' | 'vuquy'>('both');

  const openMapLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Decorative intro */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="mb-6 mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-wedding-gold/20 shadow-md overflow-hidden relative">
          <img src="/assets/img10.jpg" alt="Wedding Couple" className="absolute inset-0 w-full h-full object-cover object-[center_top]" />
        </div>
        <span className="text-wedding-gold font-script text-4xl block mb-2">Trân Trọng Kính Mời</span>
        <h3 className="text-3xl md:text-4xl font-serif text-wedding-burgundy font-semibold tracking-wide">
          {guestName}
        </h3>
        <p className="text-sm text-gray-500 mt-2 font-sans max-w-md mx-auto leading-relaxed">
          Đến chung vui cùng gia đình và chúc phúc cho hai chúng tôi trong ngày trọng đại này.
        </p>
      </motion.div>

      {/* Tabs for mobile or screen preference */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 border border-wedding-gold/20 shadow-sm flex gap-1 z-10">
          <button
            id="tab-both"
            onClick={() => setActiveTab('both')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-wedding-burgundy text-white shadow-sm'
                : 'text-gray-500 hover:text-wedding-burgundy'
            }`}
          >
            Xem cả hai
          </button>
          <button
            id="tab-thanhhon"
            onClick={() => setActiveTab('thanhhon')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === 'thanhhon'
                ? 'bg-wedding-burgundy text-white shadow-sm'
                : 'text-gray-500 hover:text-wedding-burgundy'
            }`}
          >
            Lễ Thành Hôn
          </button>
          <button
            id="tab-vuquy"
            onClick={() => setActiveTab('vuquy')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
              activeTab === 'vuquy'
                ? 'bg-wedding-burgundy text-white shadow-sm'
                : 'text-gray-500 hover:text-wedding-burgundy'
            }`}
          >
            Lễ Vu Quy
          </button>
        </div>
      </div>

      {/* Cards Render Area */}
      <div className={`grid grid-cols-1 ${activeTab === 'both' ? 'lg:grid-cols-2 max-w-5xl' : 'max-w-md'} gap-8 items-stretch justify-center mx-auto`}>
        
        {/* CARD 1: LỄ THÀNH HÔN (NHÀ TRAI) */}
        <AnimatePresence mode="popLayout">
          {(activeTab === 'both' || activeTab === 'thanhhon') && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative bg-[#fdfbf7] border border-wedding-gold/20 rounded-2xl p-6 md:p-10 shadow-xl wedding-card-glow overflow-hidden flex flex-col justify-between h-full min-h-[650px] w-full mx-auto"
            >
              {/* Top-Left Floral Background illustration */}
              <div className="absolute -top-6 -left-6 w-36 h-36 opacity-25 pointer-events-none text-wedding-gold">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10,10 Q25,-5 40,10 T70,10 T80,40 T60,70 T10,10 Z" />
                  <circle cx="25" cy="25" r="5" />
                </svg>
              </div>
              
              {/* Delicate Gold Inner Frame */}
              <div className="absolute inset-4 border border-wedding-gold/10 rounded-xl pointer-events-none" />
              <div className="absolute inset-4.5 border border-wedding-gold/5 rounded-xl pointer-events-none" />

              {/* Groom & Bride Frame */}
              <div className="text-center pt-4 z-10 flex flex-col items-center">
                <div className="relative mb-2">
                  {/* Circular wreath drawing */}
                  <div className="w-28 h-28 rounded-full border border-dashed border-wedding-gold/40 flex items-center justify-center p-2 relative animate-[spin_60s_linear_infinite]">
                    <div className="w-full h-full rounded-full border border-wedding-gold/15 flex items-center justify-center">
                      {/* Inner leaves accent */}
                    </div>
                  </div>
                  {/* Names centered in wreath */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-cursive text-[#c2843d] font-bold leading-tight">Quang Hiếu</span>
                    <span className="text-base font-serif text-[#a88d63] leading-none my-0.5">&amp;</span>
                    <span className="text-lg font-cursive text-[#c2843d] font-bold leading-tight">Việt Anh</span>
                  </div>
                </div>

                <h4 className="text-3xl font-script text-wedding-charcoal mt-4 font-semibold">
                  Lễ Thành Hôn
                </h4>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-sans mt-1">
                  Được tổ chức vào hồi
                </p>
              </div>

              {/* Date Block */}
              <div className="my-8 text-center z-10">
                <div className="flex items-center justify-center gap-6 md:gap-8 border-y border-wedding-gold/20 py-5 max-w-sm mx-auto">
                  <div className="text-right">
                    <span className="block text-sm md:text-base text-gray-500 font-sans tracking-wider mb-1">THÁNG 07</span>
                    <span className="block text-base md:text-lg font-semibold text-wedding-gold font-sans">2026</span>
                  </div>
                  <div className="relative px-4 md:px-6">
                    <span className="text-6xl md:text-7xl font-serif text-wedding-gold font-bold leading-none block pb-2 relative -top-2 md:-top-3">19</span>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white border border-wedding-gold/30 px-5 py-1.5 rounded text-xs md:text-sm font-bold font-sans text-wedding-burgundy whitespace-nowrap shadow-sm">
                      CHỦ NHẬT
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block text-sm md:text-base text-gray-500 font-sans tracking-wider mb-1">10:30 PHÚT</span>
                    <span className="block text-xs md:text-sm font-semibold text-wedding-burgundy font-sans uppercase">SÁNG</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic mt-8 font-serif">
                  ( Tức ngày 06 tháng 06 năm Bính Ngọ )
                </p>
              </div>

              {/* Location Details */}
              <div className="text-center z-10 px-2 flex-grow flex flex-col justify-center">
                <span className="text-sm uppercase tracking-widest text-wedding-burgundy font-bold font-sans block mb-1">
                  Tại: Tư Gia Nhà Trai - Nhà Ông Quang Bà Nghệ
                </span>
                <p className="text-sm md:text-base text-wedding-charcoal font-sans font-medium mb-3">
                  Khối 7 - Xã Nghi Xuân (TT.Xuân An cũ) - Hà Tĩnh
                </p>
                
                <button
                  id="btn-map-thanhhon"
                  onClick={() => openMapLink('https://maps.app.goo.gl/V4nLpmDPwZQbYT7d9')}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-wedding-gold/10 hover:bg-wedding-gold/20 text-wedding-gold-dark text-xs font-sans font-semibold rounded-full border border-wedding-gold/20 transition-all mx-auto cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Xem bản đồ
                </button>
              </div>

              {/* Invitation footer text */}
              <div className="text-center pt-4 border-t border-wedding-gold/10 z-10">
                <p className="text-sm md:text-base font-script text-wedding-gold leading-relaxed">
                  Sự hiện diện của Quý vị là niềm vinh hạnh cho gia đình chúng tôi!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CARD 2: LỄ VU QUY (NHÀ GÁI) */}
        <AnimatePresence mode="popLayout">
          {(activeTab === 'both' || activeTab === 'vuquy') && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative bg-[#fdfbf7] border border-wedding-gold/20 rounded-2xl p-6 md:p-10 shadow-xl wedding-card-glow overflow-hidden flex flex-col justify-between h-full min-h-[650px] w-full mx-auto"
            >
              {/* Delicate Gold Inner Frame */}
              <div className="absolute inset-4 border border-wedding-gold/10 rounded-xl pointer-events-none" />
              <div className="absolute inset-4.5 border border-wedding-gold/5 rounded-xl pointer-events-none" />

              {/* Groom & Bride Frame */}
              <div className="text-center pt-2 z-10 flex flex-col items-center">
                <span className="text-[13px] md:text-sm uppercase tracking-widest text-wedding-charcoal font-bold font-serif mb-2">
                  Trân Trọng Kính Mời
                </span>
                <p className="text-xs text-gray-500 font-sans italic max-w-xs mb-4">
                  Tới dự bữa cơm thân mật mừng Lễ Vu Quy của hai chúng tôi
                </p>

                {/* Couple Names */}
                <div className="space-y-2 w-full">
                  <div>
                    <h5 className="text-2xl md:text-3xl font-cursive text-[#c2843d] font-bold">Nguyễn Quang Hiếu</h5>
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-sans">Trưởng Nam</span>
                  </div>
                  
                  {/* Decorative intertwined hearts */}
                  <div className="flex items-center justify-center gap-2 py-0.5">
                    <div className="h-[1px] w-12 bg-wedding-gold/20" />
                    <Heart className="w-4 h-4 text-wedding-burgundy fill-wedding-burgundy/10 animate-pulse" />
                    <div className="h-[1px] w-12 bg-wedding-gold/20" />
                  </div>

                  <div>
                    <h5 className="text-2xl md:text-3xl font-cursive text-[#c2843d] font-bold">Nguyễn Thị Việt Anh</h5>
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-sans">Trưởng Nữ</span>
                  </div>
                </div>
              </div>

              {/* Location of ceremony */}
              <div className="text-center z-10 mt-4 px-2">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-sans block mb-1">
                  Được tổ chức tại
                </span>
                <span className="text-sm uppercase tracking-widest text-wedding-burgundy font-bold font-sans block mb-1">
                  Nhà Ông Hùng - Bà Giang
                </span>
                <p className="text-sm text-wedding-charcoal font-sans font-medium mb-3">
                  Thôn Khang Thịnh - Xã Nghi Xuân (Xuân Viên cũ) - Hà Tĩnh
                </p>
                <button
                  id="btn-map-vuquy"
                  onClick={() => openMapLink('https://maps.app.goo.gl/FyhASoHxTUCrYk3Y7')}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-wedding-gold/10 hover:bg-wedding-gold/20 text-wedding-gold-dark text-xs font-sans font-semibold rounded-full border border-wedding-gold/20 transition-all mx-auto cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Xem bản đồ
                </button>
              </div>

              {/* Time block */}
              <div className="my-4 text-center z-10 px-2">
                <div className="border border-wedding-gold/20 rounded-lg p-3 max-w-xs mx-auto bg-wedding-cream/40 flex items-center gap-3">
                  <div className="text-right border-r border-wedding-gold/20 pr-3 w-1/3">
                    <span className="text-xs text-gray-400 font-sans block uppercase">Vào lúc</span>
                    <span className="text-xl md:text-2xl font-serif font-bold text-wedding-burgundy">17:00</span>
                  </div>
                  <div className="text-left w-2/3">
                    <span className="text-xs font-bold text-wedding-gold font-sans block">THỨ SÁU - 17/07/2026</span>
                    <span className="text-[10px] text-gray-500 italic font-serif">( 04/06 Lịch Âm - Bính Ngọ )</span>
                  </div>
                </div>
                <p className="text-base font-script text-wedding-burgundy mt-3 font-medium">
                  Rất hân hạnh được đón tiếp!
                </p>
              </div>

              {/* Parent Info Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-wedding-gold/20 pt-4 z-10 text-[10px] md:text-xs text-left leading-relaxed">
                {/* Groom's Parents */}
                <div className="border-r border-wedding-gold/10 pr-2">
                  <span className="font-bold text-wedding-burgundy uppercase block mb-1 font-sans">NHÀ TRAI</span>
                  <p className="font-medium text-gray-700">Ông: Nguyễn Xuân Quang</p>
                  <p className="font-medium text-gray-700">Bà: Trần Thị Nghệ</p>
                  <p className="text-gray-400 mt-1 font-sans leading-tight">Khối 7 - Xã Nghi Xuân - Hà Tĩnh</p>
                </div>

                {/* Bride's Parents */}
                <div className="pl-1">
                  <span className="font-bold text-wedding-burgundy uppercase block mb-1 font-sans">NHÀ GÁI</span>
                  <p className="font-medium text-gray-700">Ông: Nguyễn Xuân Hùng</p>
                  <p className="font-medium text-gray-700">Bà: Lê Thị Lam Giang</p>
                  <p className="text-gray-400 mt-1 font-sans leading-tight">Thôn Khang Thịnh - Xã Nghi Xuân - Hà Tĩnh</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
