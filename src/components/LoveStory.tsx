import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const STORY_EVENTS = [
  {
    id: 1,
    date: '14 Tháng 02, 2023',
    title: 'Lần Đầu Gặp Gỡ',
    content: 'Một buổi chiều xuân nhẹ nhàng, định mệnh đã sắp đặt để chúng ta lướt qua nhau. Một nụ cười vô tình đã khiến trái tim xao xuyến, để rồi từ đó một hạt mầm tình yêu bắt đầu nảy nở.',
    image: '/assets/img3.jpg'
  },
  {
    id: 2,
    date: '08 Tháng 08, 2023',
    title: 'Lời Tỏ Tình Ngại Ngùng',
    content: 'Dưới ánh hoàng hôn lãng mạn, một lời tỏ tình ngại ngùng nhưng vô cùng chân thành đã được nói ra. Kể từ khoảnh khắc cái gật đầu ấy, chúng ta chính thức thuộc về nhau.',
    image: '/assets/img4.jpg'
  },
  {
    id: 3,
    date: '20 Tháng 10, 2025',
    title: 'Khoảnh Khắc Cầu Hôn',
    content: '"Làm vợ anh nhé!" - Khoảnh khắc chiếc nhẫn được trao tay cùng nụ cười rạng rỡ và những giọt nước mắt hạnh phúc. Một chương mới của cuộc đời chính thức bắt đầu từ đây.',
    image: '/assets/img5.jpg'
  }
];

export default function LoveStory() {
  return (
    <section id="story" className="bg-wedding-cream py-20 border-b border-wedding-gold/10 relative overflow-hidden">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#b38a55_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-wedding-gold font-script text-3xl md:text-4xl block mb-2">Chuyện Tình Yêu</span>
          <h3 className="text-2xl md:text-3xl font-serif text-wedding-burgundy font-semibold">Hành Trình Của Chúng Ta</h3>
          <p className="text-sm text-gray-500 mt-2 font-sans max-w-lg mx-auto">
            Mỗi câu chuyện tình yêu đều có những cột mốc đáng nhớ. Hãy cùng nhìn lại những khoảnh khắc tuyệt vời mà chúng tôi đã trải qua.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Center Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-wedding-gold/20 -translate-x-1/2" />
          
          {/* Vertical Left Line for Mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-[1px] bg-wedding-gold/20" />

          <div className="space-y-16">
            {STORY_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-wedding-cream border-2 border-wedding-gold flex items-center justify-center -translate-x-1/2 shadow-md z-10">
                    <Heart className="w-3.5 h-3.5 text-wedding-burgundy fill-wedding-burgundy/20" />
                  </div>

                  {/* Image Content */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-wedding-gold/20 shadow-lg bg-white relative group">
                      <img src={event.image} alt={event.title} className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-wedding-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                    <span className="inline-block px-3 py-1 bg-wedding-gold/10 text-wedding-gold-dark text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                      {event.date}
                    </span>
                    <h4 className="text-xl md:text-2xl font-serif text-wedding-burgundy font-bold mb-3">{event.title}</h4>
                    <p className="text-sm text-gray-600 font-sans leading-relaxed">
                      {event.content}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
