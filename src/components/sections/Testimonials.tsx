import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HighlightText } from '@/components/ui/highlight-text';
import { ScrollReveal } from '@/components/ui/scroll-text';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Chị Nguyễn Thanh Hà',
    role: 'Mẹ bé Gia Hân, 8 tháng tuổi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    text: 'Ghế Nhật Hạ Cocoon thực sự tuyệt vời! Bé nhà mình ngủ rất ngon mỗi khi lên xe. Chất liệu da mềm mại, thơm lừng. Dịch vụ lắp đặt tận nhà rất chuyên nghiệp.',
  },
  {
    id: 2,
    name: 'Anh Trần Minh Đức',
    role: 'Bố bé Minh Anh, 3 tuổi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    text: 'Là một người cha, an toàn của con là ưu tiên số 1. Ghế Explorer của Nhật Hạ Store có đầy đủ chứng nhận an toàn châu Âu, cho mình sự an tâm tuyệt đối.',
  },
  {
    id: 3,
    name: 'Chị Lê Phương Thảo',
    role: 'Mẹ bé Bảo Nam, 6 tuổi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
    text: 'Đã dùng ghế Guardian được 2 năm, chất lượng vẫn như mới. Bé rất thích ngồi và luôn đòi lên xe. Giá hợp lý cho chất lượng cao cấp như vậy.',
  },
  {
    id: 4,
    name: 'Chị Phạm Thu Trang',
    role: 'Mẹ 2 bé, 1 tuổi và 4 tuổi',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80',
    rating: 5,
    text: 'Mình mua 2 ghế cho 2 bé, được tư vấn rất tận tình. Nhân viên kiên nhẫn giải thích từng tính năng. Sẽ giới thiệu cho tất cả bạn bè có con nhỏ!',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="danh-gia" className="bg-secondary/40 py-24">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <ScrollReveal>
            <span className="section-label">Khách Hàng Nói Gì</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl">
              Được{' '}
              <HighlightText variant="marker" color="accent">
                10,000+
              </HighlightText>{' '}
              Gia Đình Tin Dùng
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15} className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-border/60 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <Quote className="mb-4 size-10 text-accent/30" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <span key={i} className="text-accent">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/90 italic">
                    &ldquo;{current.text}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="size-14 rounded-full object-cover ring-2 ring-accent/40"
                    />
                    <div>
                      <strong className="block font-heading">{current.name}</strong>
                      <span className="text-sm text-muted-foreground">{current.role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Trước">
              <ChevronLeft className="size-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'size-2.5 rounded-full transition-all',
                    i === active ? 'w-8 bg-accent' : 'bg-border hover:bg-accent/50',
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Sau">
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
