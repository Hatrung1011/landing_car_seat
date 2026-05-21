import { MessageCircle, ShoppingCart, Wrench, BookOpen, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const STEP_DELAYS = ['scroll-delay-2', 'scroll-delay-3', 'scroll-delay-4', 'scroll-delay-5'] as const;

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
          <div className="animate-on-scroll relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
              alt="Dịch vụ lắp đặt chuyên nghiệp"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute right-6 bottom-6 rounded-2xl bg-primary px-6 py-4 text-center text-primary-foreground shadow-xl">
              <span className="font-heading text-3xl font-bold text-accent">100%</span>
              <span className="mt-1 block text-xs tracking-wide uppercase">Miễn phí lắp đặt</span>
            </div>
          </div>

          <div>
            <span className="section-label animate-on-scroll">Dịch Vụ Trọn Gói</span>
            <h2 className="animate-on-scroll scroll-delay-1 mt-3 font-heading text-3xl md:text-4xl">
              Lắp Đặt Chuyên Nghiệp
              <br />
              Tận Nhà <em className="text-accent not-italic">Miễn Phí</em>
            </h2>
            <p className="animate-on-scroll scroll-delay-2 mt-4 text-muted-foreground">
              Chúng tôi không chỉ bán sản phẩm — chúng tôi mang đến trải nghiệm dịch vụ 5 sao, từ tư
              vấn đến lắp đặt.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <Card
                  key={step.number}
                  className={cn(
                    'animate-on-scroll border-border/60 transition-colors hover:border-accent/40',
                    STEP_DELAYS[index],
                  )}
                >
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
              ))}
            </div>

            <a
              href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                'animate-on-scroll scroll-delay-5 mt-8 bg-accent text-accent-foreground hover:bg-accent/90',
              )}
            >
              Đặt Lịch Ngay
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
