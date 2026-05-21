import { MessageCircle, ShoppingCart, Wrench, BookOpen, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotatingText } from '@/components/ui/rotate-text';
import { ScrollReveal } from '@/components/ui/scroll-text';
import { HighlightText } from '@/components/ui/highlight-text';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Tư Vấn Miễn Phí',
    description:
      'Đội ngũ chuyên gia tư vấn giúp bạn lựa chọn ghế phù hợp nhất với dòng xe và độ tuổi của bé.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Chọn Sản Phẩm',
    description:
      'Trải nghiệm và lựa chọn ghế ô tô cao cấp tại showroom hoặc qua tư vấn trực tuyến.',
    icon: ShoppingCart,
  },
  {
    number: '03',
    title: 'Lắp Đặt Tận Nơi',
    description:
      'Kỹ thuật viên chuyên nghiệp đến tận nhà lắp đặt miễn phí, đảm bảo an toàn tuyệt đối.',
    icon: Wrench,
  },
  {
    number: '04',
    title: 'Hướng Dẫn Sử Dụng',
    description:
      'Hướng dẫn chi tiết cách sử dụng và bảo quản để ghế luôn trong tình trạng tốt nhất.',
    icon: BookOpen,
  },
];

export default function Installation() {
  return (
    <section id="dich-vu" className="py-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left" className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
              alt="Dịch vụ lắp đặt chuyên nghiệp"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute right-6 bottom-6 rounded-2xl bg-primary px-6 py-4 text-center text-primary-foreground shadow-xl">
              <span className="font-heading text-3xl font-bold text-accent">100%</span>
              <span className="mt-1 block text-xs tracking-wide uppercase">Miễn phí lắp đặt</span>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <span className="section-label">Dịch Vụ Trọn Gói</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mt-3 font-heading text-3xl md:text-4xl">
                Lắp Đặt Chuyên Nghiệp
                <br />
                Tận Nhà{' '}
                <RotatingText
                  words={['Miễn Phí', 'Tận Tâm', 'Chuyên Nghiệp']}
                  interval={2500}
                  className="text-accent"
                />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-muted-foreground">
                Chúng tôi không chỉ bán sản phẩm — chúng tôi mang đến trải nghiệm dịch vụ 5 sao với{' '}
                <HighlightText variant="underline" color="accent">
                  lắp đặt tận nơi
                </HighlightText>
                .
              </p>
            </ScrollReveal>

            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <ScrollReveal key={step.number} delay={index * 0.08} direction="right">
                  <Card className="border-border/60 transition-colors hover:border-accent/40">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <step.icon className="size-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-widest text-accent">
                          {step.number}
                        </span>
                        <h4 className="font-heading text-base">{step.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <a
                href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants(),
                  'mt-8 bg-accent text-accent-foreground shadow-md hover:bg-accent/90',
                )}
              >
                Đặt Lịch Ngay
                <ArrowRight className="size-4" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
