import React, { useState } from 'react';
import { Check, Send, Users, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RSVP } from '../types';

interface RsvpFormProps {
  onSubmit: (rsvp: RSVP) => void;
  guestName?: string;
}

export default function RsvpForm({ onSubmit, guestName = '' }: RsvpFormProps) {
  const [name, setName] = useState(guestName);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestOf, setGuestOf] = useState<'groom' | 'bride'>('groom');
  const [count, setCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const rsvpData: RSVP = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      attending,
      guestOf,
      count: attending === 'yes' ? count : 0,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    setTimeout(() => {
      onSubmit(rsvpData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-xl mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-2xl border border-wedding-gold/20 p-6 md:p-8 shadow-xl relative overflow-hidden wedding-card-glow">
        {/* Border Deco */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-gold-light via-wedding-burgundy to-wedding-gold-light" />
        
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full bg-wedding-burgundy/10 flex items-center justify-center mx-auto mb-2">
            <Heart className="w-5 h-5 text-wedding-burgundy animate-pulse" />
          </div>
          <h3 className="text-xl font-serif text-wedding-burgundy font-semibold">Xác Nhận Tham Dự (RSVP)</h3>
          <p className="text-xs text-gray-400 mt-1 font-sans">
            Để gia đình chuẩn bị đón tiếp chu đáo nhất, xin vui lòng phản hồi trước ngày 12/07/2026.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              id="form-rsvp"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold text-wedding-gold uppercase tracking-wider mb-1.5 font-sans">
                  Họ &amp; Tên Quý Khách
                </label>
                <input
                  id="input-rsvp-name"
                  type="text"
                  required
                  placeholder="Nhập tên của bạn..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-wedding-cream/30 rounded-lg border border-wedding-gold/20 text-sm font-sans text-wedding-charcoal focus:outline-none focus:border-wedding-burgundy transition-all"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-[11px] font-bold text-wedding-gold uppercase tracking-wider mb-1.5 font-sans">
                  Bạn Sẽ Đến Chung Vui Chứ?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="btn-rsvp-yes"
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`p-3 rounded-xl border text-xs font-sans font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'border-wedding-burgundy bg-wedding-burgundy/5 text-wedding-burgundy shadow-sm font-bold'
                        : 'border-wedding-gold/10 bg-white text-gray-500 hover:border-wedding-gold/30'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${attending === 'yes' ? 'opacity-100' : 'opacity-0'}`} />
                    Chắc Chắn Tham Gia
                  </button>
                  <button
                    id="btn-rsvp-no"
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`p-3 rounded-xl border text-xs font-sans font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      attending === 'no'
                        ? 'border-wedding-burgundy bg-wedding-burgundy/5 text-wedding-burgundy shadow-sm font-bold'
                        : 'border-wedding-gold/10 bg-white text-gray-500 hover:border-wedding-gold/30'
                    }`}
                  >
                    <span className="text-sm">😔</span>
                    Tiếc Quá, Không Thể Tham Gia
                  </button>
                </div>
              </div>

              {/* Guest Of */}
              <div>
                <label className="block text-[11px] font-bold text-wedding-gold uppercase tracking-wider mb-1.5 font-sans">
                  Bạn Là Khách Của
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="btn-rsvp-groom"
                    type="button"
                    onClick={() => setGuestOf('groom')}
                    className={`py-2 rounded-lg border text-xs font-sans font-semibold transition-all cursor-pointer ${
                      guestOf === 'groom'
                        ? 'bg-wedding-gold text-white border-wedding-gold'
                        : 'bg-white text-wedding-gold-dark border-wedding-gold/20'
                    }`}
                  >
                    Nhà Trai (Quang Hiếu)
                  </button>
                  <button
                    id="btn-rsvp-bride"
                    type="button"
                    onClick={() => setGuestOf('bride')}
                    className={`py-2 rounded-lg border text-xs font-sans font-semibold transition-all cursor-pointer ${
                      guestOf === 'bride'
                        ? 'bg-wedding-gold text-white border-wedding-gold'
                        : 'bg-white text-wedding-gold-dark border-wedding-gold/20'
                    }`}
                  >
                    Nhà Gái (Việt Anh)
                  </button>
                </div>
              </div>

              {/* Number of attendees (conditional) */}
              <AnimatePresence>
                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-[11px] font-bold text-wedding-gold uppercase tracking-wider mb-1.5 font-sans">
                      Số Lượng Người Tham Gia
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          id={`btn-count-${num}`}
                          type="button"
                          onClick={() => setCount(num)}
                          className={`w-10 h-10 rounded-lg border text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-center ${
                            count === num
                              ? 'bg-wedding-burgundy text-white border-wedding-burgundy font-bold shadow-sm'
                              : 'bg-white text-gray-500 border-wedding-gold/20 hover:border-wedding-gold/40'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom Wishes */}
              <div>
                <label className="block text-[11px] font-bold text-wedding-gold uppercase tracking-wider mb-1.5 font-sans">
                  Lời Chúc Phúc Gửi Đến Cô Dâu &amp; Chú Rể
                </label>
                <div className="relative">
                  <span className="absolute right-3.5 bottom-3 text-wedding-gold/50">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <textarea
                    id="input-rsvp-message"
                    rows={3}
                    placeholder="Viết lời chúc tốt đẹp nhất gửi tới cô dâu & chú rể nhé..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 bg-wedding-cream/30 rounded-lg border border-wedding-gold/20 text-sm font-sans text-wedding-charcoal focus:outline-none focus:border-wedding-burgundy transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-rsvp-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-wedding-burgundy hover:bg-wedding-burgundy-dark text-white rounded-lg py-3 text-xs font-sans uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Gửi Xác Nhận &amp; Lời Chúc
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-wedding-gold/10 flex items-center justify-center mx-auto text-wedding-gold">
                <Sparkles className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-lg font-serif text-wedding-burgundy font-bold">Xác Nhận Thành Công!</h4>
              <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
                {attending === 'yes'
                  ? `Cảm ơn bạn ${name} đã xác nhận tham dự với ${count} người. Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng tôi!`
                  : `Cảm ơn bạn ${name} đã gửi lời chúc tốt đẹp tới hai chúng tôi. Hẹn gặp bạn vào dịp gần nhất!`}
              </p>
              <button
                id="btn-rsvp-reset"
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="px-4 py-2 border border-wedding-gold/30 hover:border-wedding-gold text-wedding-gold-dark rounded-full text-xs font-sans font-semibold transition-all cursor-pointer"
              >
                Gửi phản hồi khác
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
