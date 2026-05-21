import { ShieldCheck, Heart, Smile } from 'lucide-react';
import { BentoGrid } from '@/components/ui/bento-grid';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: ShieldCheck,
    title: 'Chuẩn An Toàn Châu Âu',
    description:
      'Đạt chứng nhận ECE R129 (i-Size) cao nhất châu Âu, vượt qua các bài kiểm tra va chạm khắt khe nhất với điểm số xuất sắc.',
    className: 'md:col-span-2',
  },
  {
    icon: Heart,
    title: 'Chất Liệu Da Ý Cao Cấp',
    description:
      'Sử dụng da Ý cao cấp nhập khẩu, mềm mại, thoáng khí và an toàn cho làn da nhạy cảm của trẻ. Không chứa chất gây dị ứng.',
  },
  {
    icon: Smile,
    title: 'Thiết Kế Công Thái Học',
    description:
      'Được thiết kế bởi chuyên gia y tế hàng đầu, đảm bảo tư thế ngồi đúng, hỗ trợ cột sống và mang lại sự thoải mái tối ưu cho bé.',
    className: 'md:col-span-2',
  },
];

export default function WhyUs() {
  return (
    <section id="gioi-thieu" className="bg-secondary/50 py-24">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="section-label animate-on-scroll">Vì Sao Chọn Nhật Hạ Store</span>
          <h2 className="animate-on-scroll scroll-delay-1 mt-3 font-heading text-3xl md:text-4xl">
            Sự Lựa Chọn <em className="text-accent not-italic">Hoàn Hảo</em> Cho Con Bạn
          </h2>
          <p className="animate-on-scroll scroll-delay-2 mt-4 text-muted-foreground">
            Chúng tôi không chỉ bán ghế ô tô — chúng tôi mang đến sự an tâm tuyệt đối cho mỗi chuyến
            đi của gia đình bạn.
          </p>
        </div>

        <BentoGrid className="animate-on-scroll scroll-delay-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={cn(
                'group border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                feature.className,
              )}
            >
              <CardContent className="flex h-full flex-col p-8">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/20 group-hover:text-accent">
                  <feature.icon className="size-7" />
                </div>
                <h3 className="font-heading text-xl">{feature.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-6 h-1 w-12 rounded-full bg-accent/60 transition-all group-hover:w-full" />
              </CardContent>
            </Card>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
