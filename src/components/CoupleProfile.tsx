import { motion } from 'motion/react';
import { Heart, Facebook, Instagram } from 'lucide-react';

export default function CoupleProfile() {
  return (
    <section id="couple" className="bg-white py-20 border-y border-wedding-gold/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-wedding-gold font-script text-3xl md:text-4xl block mb-2">Cô Dâu &amp; Chú Rể</span>
          <h3 className="text-2xl md:text-3xl font-serif text-wedding-burgundy font-semibold">Tình Yêu Đích Thực</h3>
          <p className="text-sm text-gray-400 mt-2 font-sans max-w-xl mx-auto">
            "Hạnh phúc không phải là điểm đến, mà là hành trình chúng ta đang đi cùng nhau."
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          
          {/* GROOM */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center max-w-xs text-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-t-full rounded-b-xl overflow-hidden border-4 border-wedding-gold/20 shadow-xl mb-6 relative">
              <img src="/assets/img11.jpg" alt="Chú Rể Quang Hiếu" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-wedding-burgundy/10 pointer-events-none" />
            </div>
            <h4 className="text-2xl font-serif text-wedding-charcoal font-bold mb-1">Quang Hiếu</h4>
            <span className="text-xs tracking-widest uppercase text-wedding-gold font-semibold mb-3">Chú Rể</span>
            <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4">
              Chàng trai hiền lành, trầm tính nhưng luôn mang lại cảm giác ấm áp và an toàn. Luôn tin rằng tình yêu đích thực là sự bình dị chân thành nhất.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-wedding-cream flex items-center justify-center text-wedding-burgundy hover:bg-wedding-gold hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-wedding-cream flex items-center justify-center text-wedding-burgundy hover:bg-wedding-gold hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* MIDDLE HEART */}
          <div className="hidden md:flex flex-col items-center justify-center gap-4">
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-gold/40 to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-wedding-cream border border-wedding-gold/20 flex items-center justify-center shadow-md"
            >
              <Heart className="w-5 h-5 text-wedding-burgundy fill-wedding-burgundy/20" />
            </motion.div>
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-gold/40 to-transparent" />
          </div>

          {/* BRIDE */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center max-w-xs text-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-t-full rounded-b-xl overflow-hidden border-4 border-wedding-gold/20 shadow-xl mb-6 relative">
              <img src="/assets/img12.jpg" alt="Cô Dâu Việt Anh" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-wedding-burgundy/10 pointer-events-none" />
            </div>
            <h4 className="text-2xl font-serif text-wedding-charcoal font-bold mb-1">Việt Anh</h4>
            <span className="text-xs tracking-widest uppercase text-wedding-gold font-semibold mb-3">Cô Dâu</span>
            <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4">
              Cô gái vui vẻ, hay cười và luôn lan toả năng lượng tích cực. Đối với cô, gia đình là nơi bão dừng sau cánh cửa.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-wedding-cream flex items-center justify-center text-wedding-burgundy hover:bg-wedding-gold hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-wedding-cream flex items-center justify-center text-wedding-burgundy hover:bg-wedding-gold hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
