/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, MapPin, Sparkles, Navigation, Award, BookOpen, Music, CheckCircle } from 'lucide-react';
import Envelope from './components/Envelope';
import Countdown from './components/Countdown';
import InvitationCard from './components/InvitationCard';
import RsvpForm from './components/RsvpForm';
import WishingWall from './components/WishingWall';
import GiftCorner from './components/GiftCorner';
import AudioPlayer from './components/AudioPlayer';
import CoupleProfile from './components/CoupleProfile';
import LoveStory from './components/LoveStory';
import FloatingMenu from './components/FloatingMenu';
import { Greeting, RSVP } from './types';

// Simple component for floating floral petals
function FallingPetals() {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${10 + Math.random() * 12}px`,
      opacity: 0.4 + Math.random() * 0.4,
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute rounded-full bg-rose-200/40 border border-rose-300/10"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            animationName: 'petal-fall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            opacity: petal.opacity,
            borderRadius: '100% 0% 100% 100% / 100% 0% 100% 100%', // Petal shape
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Quý khách');
  const [greetings, setGreetings] = useState<Greeting[]>([]);

  // Initialize and load greetings from localStorage
  useEffect(() => {
    const savedGreetings = localStorage.getItem('wedding_greetings_v1');
    if (savedGreetings) {
      setGreetings(JSON.parse(savedGreetings));
    } else {
      // Default warm Vietnamese wishes
      const defaultGreetings: Greeting[] = [
        {
          id: '1',
          name: 'Nguyễn Phương Thảo',
          message: 'Chúc mừng hạnh phúc hai bạn! Chúc Việt Anh và Quang Hiếu trăm năm hạnh phúc, đầu bạc răng long, sớm đón thiên thần nhỏ nhé! Tiếc quá mình đang đi công tác không về kịp nhưng nhất định sẽ có mặt tinh thần gửi quà mừng.',
          guestOf: 'bride',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
          likes: 8
        },
        {
          id: '2',
          name: 'Trần Anh Tuấn',
          message: 'Chúc mừng ngày song hỷ của chú em Quang Hiếu nhé! Chúc hai vợ chồng mãi mãi hạnh phúc, chia ngọt sẻ bùi cùng nhau đi hết cuộc đời. Cuối tuần này anh em công ty nhất định sẽ có mặt đông đủ chúc rượu hai đứa.',
          guestOf: 'groom',
          timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
          likes: 12
        },
        {
          id: '3',
          name: 'Cô Thúy (Họ hàng)',
          message: 'Chúc hai cháu trăm năm hạnh phúc, gia đình êm ấm thuận hòa, vạn sự như ý. Nhìn hai đứa thật là đẹp đôi và xứng lứa vừa thì.',
          guestOf: 'groom',
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
          likes: 5
        }
      ];
      setGreetings(defaultGreetings);
      localStorage.setItem('wedding_greetings_v1', JSON.stringify(defaultGreetings));
    }
  }, []);

  const handleOpenEnvelope = (name: string) => {
    setGuestName(name || 'Quý khách');
    setIsOpen(true);
  };

  const handleRsvpSubmit = (rsvp: RSVP) => {
    // Save to locally synchronized list
    const newGreeting: Greeting = {
      id: rsvp.id,
      name: rsvp.name,
      message: rsvp.message || (rsvp.attending === 'yes' ? 'Chúc mừng hạnh phúc đôi bạn trẻ!' : 'Tiếc quá không thể tham gia, chúc hai bạn trăm năm hạnh phúc!'),
      guestOf: rsvp.guestOf,
      timestamp: rsvp.timestamp,
      likes: 0
    };

    const updated = [newGreeting, ...greetings];
    setGreetings(updated);
    localStorage.setItem('wedding_greetings_v1', JSON.stringify(updated));
  };

  const handleLikeGreeting = (id: string) => {
    const updated = greetings.map((g) => {
      if (g.id === id) {
        return { ...g, likes: g.likes + 1 };
      }
      return g;
    });
    setGreetings(updated);
    localStorage.setItem('wedding_greetings_v1', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-wedding-cream text-wedding-charcoal selection:bg-wedding-burgundy/10 selection:text-wedding-burgundy overflow-x-hidden font-sans">
      {/* Removed AudioPlayer from top level */}
      
      <FloatingMenu />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="envelope" className="w-full">
            <Envelope onOpen={handleOpenEnvelope} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Elegant Floral falling animation overlays */}
            <FallingPetals />

            {/* HERO HERO SECTION */}
            <header id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden py-16">
              {/* Floral background visuals */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f2] via-wedding-cream to-wedding-cream -z-10" />
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-wedding-gold-light via-wedding-burgundy to-wedding-gold-light" />
              
              {/* Delicate ornamental floral elements */}
              <div className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-48 md:h-48 border-t border-l border-wedding-gold/20 rounded-tl-3xl pointer-events-none opacity-60" />
              <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-32 h-32 md:w-48 md:h-48 border-b border-r border-wedding-gold/20 rounded-br-3xl pointer-events-none opacity-60" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 max-w-2xl z-10"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-wedding-burgundy/5 border border-wedding-gold/20 rounded-full text-[10px] tracking-widest uppercase font-bold text-wedding-burgundy font-sans mb-8">
                  <Sparkles className="w-3.5 h-3.5 text-wedding-gold animate-spin" />
                  Save The Date • 19.07.2026
                </div>

                {/* Decorative Envelope with Photos */}
                <div className="relative w-56 h-36 md:w-72 md:h-48 mx-auto my-6 flex items-end justify-center z-10">
                  {/* Back of Envelope */}
                  <div className="absolute bottom-0 w-full h-24 md:h-32 bg-[#e8dbcc] rounded-b-md shadow-sm border border-wedding-gold/20" />
                  
                  {/* Envelope Flap (Open) */}
                  <div 
                    className="absolute bottom-24 md:bottom-32 w-full h-16 md:h-20 bg-[#f4ebe1] origin-bottom border-t border-wedding-gold/20"
                    style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
                  />

                  {/* Photo 1 (Left) */}
                  <motion.img 
                    src="/assets/img8.jpg" 
                    initial={{ y: 50, rotate: 0, opacity: 0 }}
                    animate={{ y: -35, rotate: -14, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 90 }}
                    className="absolute bottom-2 left-6 md:left-10 w-24 h-32 md:w-32 md:h-44 object-cover rounded-[2px] border-[4px] border-white shadow-lg z-10 pointer-events-none"
                  />

                  {/* Photo 2 (Right) */}
                  <motion.img 
                    src="/assets/img9.jpg" 
                    initial={{ y: 50, rotate: 0, opacity: 0 }}
                    animate={{ y: -20, rotate: 10, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 90 }}
                    className="absolute bottom-2 right-6 md:right-10 w-24 h-32 md:w-32 md:h-44 object-cover rounded-[2px] border-[4px] border-white shadow-lg z-10 pointer-events-none"
                  />

                  {/* Front of Envelope */}
                  <div 
                    className="absolute bottom-0 w-full h-24 md:h-32 bg-[#fdfbf7] shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20 border border-wedding-gold/20 flex items-center justify-center overflow-hidden rounded-b-md"
                  >
                     {/* Envelope folded details */}
                     <div className="absolute bottom-0 left-0 w-full h-full" style={{ background: 'linear-gradient(135deg, transparent 49.5%, rgba(179,138,85,0.2) 50%, transparent 50.5%)' }} />
                     <div className="absolute bottom-0 right-0 w-full h-full" style={{ background: 'linear-gradient(-135deg, transparent 49.5%, rgba(179,138,85,0.2) 50%, transparent 50.5%)' }} />
                     
                     {/* Wax seal */}
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-wedding-burgundy border-2 border-wedding-gold shadow-inner flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <Heart className="w-3 h-3 md:w-4 md:h-4 text-wedding-gold fill-wedding-gold" />
                     </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-sans tracking-widest uppercase text-xs block">Chào mừng {guestName} đến với lễ cưới của</span>
                  <h1 className="text-5xl md:text-7xl font-script text-wedding-burgundy py-3 select-none leading-none flex flex-col items-center justify-center">
                    <span>Quang Hiếu</span>
                    <span className="text-3xl md:text-5xl font-serif text-wedding-gold select-none font-normal my-2">&amp;</span>
                    <span>Việt Anh</span>
                  </h1>
                </div>

                <p className="text-xs md:text-sm tracking-widest uppercase text-wedding-gold-dark font-semibold font-sans">
                  LỄ THÀNH HÔN • TƯ GIA NHÀ TRAI • HÀ TĨNH
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-12 bg-wedding-gold/30" />
                  <Heart className="w-5 h-5 text-wedding-burgundy animate-pulse" />
                  <div className="h-[1px] w-12 bg-wedding-gold/30" />
                </div>

                {/* Countdown Timer */}
                <div className="pt-4">
                  <Countdown targetDateStr="2026-07-19T10:30:00" />
                </div>

                {/* Big Vinyl Record Audio Player */}
                <div className="pt-8">
                  <AudioPlayer />
                </div>

                {/* Scroll Indicator */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="pt-8 flex flex-col items-center gap-1 cursor-pointer"
                  onClick={() => {
                    document.getElementById('invitation-card-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="text-[10px] tracking-widest text-gray-400 font-sans uppercase">Cuộn xuống để xem thiệp</span>
                  <div className="w-5 h-8 border border-wedding-gold/40 rounded-full flex justify-center p-1.5">
                    <div className="w-1 h-1.5 bg-wedding-gold rounded-full animate-bounce" />
                  </div>
                </motion.div>
              </motion.div>
            </header>

            <CoupleProfile />
            <LoveStory />

            {/* INVITATION CARD CONTAINER SECTION */}
            <section id="invitation-card-section" className="bg-wedding-cream py-16 border-t border-wedding-gold/10 scroll-mt-6">
              <InvitationCard guestName={guestName} />
            </section>

            {/* INTERACTIVE TIMELINE / EVENT SECTION */}
            <section id="events" className="bg-white py-20 border-y border-wedding-gold/10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#b38a55_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                  <span className="text-wedding-gold font-script text-3xl block mb-2">Hành Trình Ngày Vui</span>
                  <h3 className="text-2xl font-serif text-wedding-burgundy font-semibold">Thời Gian &amp; Địa Điểm</h3>
                  <p className="text-xs text-gray-400 mt-1 font-sans">
                    Xin trân trọng thông báo chi tiết lịch trình tổ chức hai buổi lễ lớn bên gia đình chúng tôi.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Event 1: Lễ Vu Quy */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-wedding-cream/40 border border-wedding-gold/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs font-bold">1</span>
                        <h4 className="text-lg font-serif text-wedding-burgundy font-bold">Lễ Vu Quy (Nhà Gái)</h4>
                      </div>
                      
                      <div className="h-[1px] w-full bg-wedding-gold/10" />

                      <div className="space-y-3 text-xs font-sans">
                        <div className="flex gap-2.5 items-start">
                          <Calendar className="w-4 h-4 text-wedding-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-gray-400 text-[10px] uppercase font-semibold">Thời gian</span>
                            <span className="font-bold text-wedding-charcoal">17:00 • Thứ Sáu, Ngày 17/07/2026</span>
                            <span className="block text-gray-400 text-[10px] italic mt-0.5">(Tức ngày 04 tháng 06 năm Bính Ngọ)</span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-start">
                          <MapPin className="w-4 h-4 text-wedding-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-gray-400 text-[10px] uppercase font-semibold">Địa điểm</span>
                            <span className="font-bold text-wedding-charcoal">Tư Gia Nhà Gái - Nhà Ông Hùng Bà Giang</span>
                            <p className="text-gray-500 mt-1">Thôn Khang Thịnh - Xã Nghi Xuân (Xuân Viên cũ) - Hà Tĩnh</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      id="btn-navigate-vuquy"
                      onClick={() => window.open('https://maps.app.goo.gl/FyhASoHxTUCrYk3Y7', '_blank')}
                      className="w-full mt-6 py-2.5 border border-wedding-gold/30 hover:border-wedding-gold text-wedding-gold-dark rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-wedding-gold/5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Chỉ đường tới Nhà Gái
                    </button>
                  </motion.div>

                  {/* Event 2: Lễ Thành Hôn */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-wedding-cream/40 border border-wedding-gold/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">2</span>
                        <h4 className="text-lg font-serif text-wedding-burgundy font-bold">Lễ Thành Hôn (Nhà Trai)</h4>
                      </div>

                      <div className="h-[1px] w-full bg-wedding-gold/10" />

                      <div className="space-y-3 text-xs font-sans">
                        <div className="flex gap-2.5 items-start">
                          <Calendar className="w-4 h-4 text-wedding-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-gray-400 text-[10px] uppercase font-semibold">Thời gian</span>
                            <span className="font-bold text-wedding-charcoal">10:30 • Chủ Nhật, Ngày 19/07/2026</span>
                            <span className="block text-gray-400 text-[10px] italic mt-0.5">(Tức ngày 06 tháng 06 năm Bính Ngọ)</span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-start">
                          <MapPin className="w-4 h-4 text-wedding-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-gray-400 text-[10px] uppercase font-semibold">Địa điểm</span>
                            <span className="font-bold text-wedding-charcoal">Tư Gia Nhà Trai - Nhà Ông Quang Bà Nghệ</span>
                            <p className="text-gray-500 mt-1">Khối 7 - Xã Nghi Xuân (TT.Xuân An cũ) - Hà Tĩnh</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      id="btn-navigate-thanhhon"
                      onClick={() => window.open('https://maps.app.goo.gl/V4nLpmDPwZQbYT7d9', '_blank')}
                      className="w-full mt-6 py-2.5 border border-wedding-gold/30 hover:border-wedding-gold text-wedding-gold-dark rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-wedding-gold/5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Chỉ đường tới Nhà Trai
                    </button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* PHOTO ALBUM SECTION */}
            <section id="album" className="bg-wedding-cream py-20 relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-4 z-10 relative">
                <div className="text-center mb-12">
                  <span className="text-wedding-gold font-script text-3xl block mb-2">Khoảnh Khắc Hạnh Phúc</span>
                  <h3 className="text-2xl font-serif text-wedding-burgundy font-semibold">Album Ảnh Cưới</h3>
                  <p className="text-xs text-gray-400 mt-1 font-sans">
                    Nơi lưu giữ những kỷ niệm đẹp đẽ, chuẩn bị bước sang một hành trình hạnh phúc mới.
                  </p>
                </div>

                {/* Grid of beautifully designed wedding illustration placeholders */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: 'Tay Trong Tay', desc: 'Hành trình chung đôi', ratio: 'aspect-[3/4]', src: '/assets/img1.jpg' },
                    { title: 'Nụ Cười Hạnh Phúc', desc: 'Rạng ngời sắc hồng', ratio: 'aspect-[1/1]', src: '/assets/img2.jpg' },
                    { title: 'Lựa Chọn Định Mệnh', desc: 'Bến bờ yêu thương', ratio: 'aspect-[3/4]', src: '/assets/img3.jpg' },
                    { title: 'Ước Nguyện Trọn Đời', desc: 'Sự gắn kết vĩnh cửu', ratio: 'aspect-[1/1]', src: '/assets/img4.jpg' },
                    { title: 'Khoảnh Khắc Đẹp', desc: 'Lưu giữ nụ cười', ratio: 'aspect-[3/4]', src: '/assets/img5.jpg' },
                    { title: 'Chung Bước', desc: 'Hạnh phúc đong đầy', ratio: 'aspect-[1/1]', src: '/assets/img6.jpg' },
                    { title: 'Bên Nhau', desc: 'Trọn vẹn từng giây', ratio: 'aspect-[3/4]', src: '/assets/img7.jpg' },
                    { title: 'Duyên Phận', desc: 'Trăm năm tình viên mãn', ratio: 'aspect-[1/1]', src: '/assets/img8.jpg' },
                  ].map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group ${img.ratio} bg-wedding-cream flex items-center justify-center p-6 text-center border border-wedding-gold/15`}
                    >
                      <img src={img.src} alt={img.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                      
                      {/* Interactive hover overlay */}
                      <div className="absolute inset-0 bg-wedding-burgundy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-10" />
                      
                      <div className="z-20 opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity duration-300 flex flex-col items-center justify-center">
                        <Heart className="w-5 h-5 text-white fill-white/20 mx-auto mb-2 animate-pulse" />
                        <span className="block text-xs font-serif font-bold text-white uppercase tracking-wider">{img.title}</span>
                        <span className="block text-[9px] text-wedding-gold-light font-sans mt-0.5">{img.desc}</span>
                      </div>
                      
                      {/* Decorative corner leaves */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/40 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/40 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* RSVP FORM & GREETING WALL */}
            <section id="rsvp" className="bg-white py-20 border-t border-wedding-gold/10">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  
                  {/* Column 1: RSVP Form */}
                  <div className="space-y-6">
                    <RsvpForm onSubmit={handleRsvpSubmit} guestName={guestName} />
                  </div>

                  {/* Column 2: Wishing Wall */}
                  <div className="space-y-6">
                    <WishingWall greetings={greetings} onLike={handleLikeGreeting} />
                  </div>

                </div>
              </div>
            </section>

            {/* GIFT CORNER BOX */}
            <section id="gift" className="bg-wedding-cream py-16 border-t border-wedding-gold/10">
              <GiftCorner />
            </section>

            {/* DECORATIVE WEDDING WEDDING FOOTER */}
            <footer className="bg-white py-16 text-center border-t border-wedding-gold/10 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent" />
              
              <div className="max-w-md mx-auto space-y-6 px-4">
                <div className="font-script text-4xl text-wedding-burgundy select-none">
                  Quang Hiếu &amp; Việt Anh
                </div>
                
                <p className="text-xs text-gray-400 font-sans tracking-widest leading-relaxed uppercase">
                  Chân Thành Cảm Ơn Sự Hiện Diện Và Những Lời Chúc Phúc Tốt Đẹp Của Quý Vị Khách Quý!
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-8 bg-wedding-gold/20" />
                  <Heart className="w-4 h-4 text-wedding-burgundy fill-wedding-burgundy/10" />
                  <div className="h-[1px] w-8 bg-wedding-gold/20" />
                </div>

                <p className="text-[10px] text-gray-300 font-sans">
                  © 2026 Designed for Quang Hiếu &amp; Việt Anh Wedding • All Rights Reserved.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
