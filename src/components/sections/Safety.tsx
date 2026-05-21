import { Shield } from 'lucide-react';
import { NumberCounter } from '@/components/ui/number-counter';
import { Card, CardContent } from '@/components/ui/card';
import ShutterText from '@/components/ui/shutter-text';
import { ScrollReveal } from '@/components/ui/scroll-text';
const stats = [
  { value: 10000, suffix: '+', label: 'Gia đình tin dùng' },
  { value: 0, suffix: '', label: 'Sự cố an toàn' },
  { value: 5, suffix: ' năm', label: 'Bảo hành chính hãng' },
  { value: 15, suffix: '+', label: 'Thương hiệu đối tác' },
];

const certifications = [
  { name: 'ECE R129 (i-Size)', desc: 'Tiêu chuẩn an toàn cao nhất của Liên minh Châu Âu' },
  { name: 'ADAC Tested', desc: 'Kiểm nghiệm bởi câu lạc bộ ô tô lớn nhất châu Âu' },
  { name: 'OEKO-TEX® 100', desc: 'Chứng nhận vải an toàn cho làn da trẻ nhỏ' },
  { name: 'ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng quốc tế' },
];

export default function Safety() {
  return (
    <section id="an-toan" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.55_0.06_75/0.15)_0%,transparent_40%)]" />
      <div className="container-page relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <ScrollReveal>
            <span className="section-label text-accent">An Toàn Là Ưu Tiên Hàng Đầu</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-3 flex justify-center">
            <ShutterText
              text="Chứng Nhận An Toàn Quốc Tế"
              trigger="scroll"
              textClassName="font-heading inline-block text-3xl font-semibold text-primary-foreground md:text-4xl"
              sliceClassName="text-accent"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-primary-foreground/70">
              Mỗi chiếc ghế đều trải qua hàng trăm bài kiểm tra nghiêm ngặt trước khi đến tay khách
              hàng.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={0.15}
          className="mb-16 grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0 text-center">
              <div className="font-heading text-2xl font-bold text-accent sm:text-4xl md:text-5xl">
                <NumberCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="mt-1 text-[10px] leading-tight text-primary-foreground/70 sm:mt-2 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.name} delay={index * 0.06} direction="up">
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Shield className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary-foreground">{cert.name}</h4>
                    <p className="mt-1 text-sm text-primary-foreground/65">{cert.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
