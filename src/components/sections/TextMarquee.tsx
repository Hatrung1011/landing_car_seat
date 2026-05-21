import { HorizontalScrollText } from '@/components/ui/scroll-text';

export default function TextMarquee() {
  return (
    <div className="overflow-hidden border-y border-accent/20 bg-primary py-4">
      <HorizontalScrollText
        speed={0.4}
        repeat={4}
        className="font-heading text-lg tracking-wide text-primary-foreground/80 md:text-xl"
      >
        <span className="mx-6 text-accent">★</span>
        Nhật Hạ Store
        <span className="mx-6 text-accent">★</span>
        Ghế Ô Tô Cao Cấp
        <span className="mx-6 text-accent">★</span>
        ECE R129 · Da Ý Nhập Khẩu
        <span className="mx-6 text-accent">★</span>
        Lắp Đặt Miễn Phí Tận Nhà
        <span className="mx-6 text-accent">★</span>
      </HorizontalScrollText>
    </div>
  );
}
