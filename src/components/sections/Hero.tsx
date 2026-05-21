import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { Grid2x2, MessageCircle, Shield, Heart, Check, ChevronDown } from 'lucide-react';
import { HighlightText } from '@/components/ui/highlight-text';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { RotatingText } from '@/components/ui/rotate-text';
import { ScrollReveal } from '@/components/ui/scroll-text';
import { cn } from '@/lib/utils';

const trustItems = [
  { icon: Shield, title: 'An toàn ECE R129', sub: 'Chuẩn châu Âu' },
  { icon: Heart, title: 'Chất liệu cao cấp', sub: 'Da Ý nhập khẩu' },
  { icon: Check, title: 'Bảo hành 5 năm', sub: 'Hỗ trợ trọn đời' },
];

const headlineHighlights = ['Hoàn Hảo', 'An toàn'];

export default function Hero() {
  const [headlineWordIndex, setHeadlineWordIndex] = useState(0);
  const handleHeadlineWordChange = useCallback((_word: string, index: number) => {
    setHeadlineWordIndex(index);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-primary pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.45_0.08_265)_0%,transparent_50%),radial-gradient(ellipse_at_70%_80%,oklch(0.55_0.06_75/0.25)_0%,transparent_45%)]" />
      <div className="absolute inset-0 bg-primary/40" />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-2 rounded-full bg-accent/30"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="container-page relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-primary-foreground/90 backdrop-blur-sm"
        >
          <span className="size-2 animate-pulse rounded-full bg-accent" />
          Nhập khẩu chính hãng từ Châu Âu
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading max-w-4xl text-4xl leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
        >
          Bảo Vệ{' '}
          <HighlightText
            variant="underline"
            color="accent"
            className="text-accent"
            measureKey={headlineWordIndex}
          >
            <RotatingText
              words={headlineHighlights}
              interval={2800}
              className="font-heading font-semibold text-accent"
              onWordChange={handleHeadlineWordChange}
            />
          </HighlightText>
          <br />
          Cho Hành Trình Của Bé
        </motion.h1>

        <ScrollReveal direction="up" delay={0.15} distance={40}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
            Ghế ô tô trẻ em cao cấp với chất liệu da Ý, thiết kế công thái học và đạt chuẩn an toàn
            ECE R129 — Mang đến sự an toàn tuyệt đối cho thiên thần nhỏ của bạn.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <RainbowButton
            type="button"
            colors={['#C9A96E', '#1B2A4A', '#d4bb8a', '#253a63', '#C9A96E']}
            className="shadow-lg"
            onClick={() => document.getElementById('san-pham')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Grid2x2 className="size-4" />
            Khám Phá Bộ Sưu Tập
          </RainbowButton>
          <a
            href="#dich-vu"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/40 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-white/10"
          >
            <MessageCircle className="size-4" />
            Đặt Lịch Tư Vấn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:gap-0"
        >
          {trustItems.map((item, i) => (
            <div key={item.title} className={cn('flex flex-1 items-center gap-4', i > 0 && 'sm:pl-8')}>
              {i > 0 && <div className="hidden h-12 w-px bg-white/20 sm:block" />}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <item.icon className="size-6" />
              </div>
              <div>
                <strong className="block text-sm text-primary-foreground">{item.title}</strong>
                <span className="text-xs text-primary-foreground/60">{item.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#gioi-thieu"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-primary-foreground/50"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Cuộn xuống
        <ChevronDown className="size-5" />
      </motion.a>
    </section>
  );
}
