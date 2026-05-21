import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="lien-he" className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo_car_seat.png"
                alt="Nhật Hạ"
                className="size-8 rounded-full object-cover"
              />
              <div>
                <span className="font-heading block font-semibold">Nhật Hạ Store</span>
                <span className="text-xs text-primary-foreground/60">Premium Car Seats</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Cửa hàng ghế ô tô trẻ em cao cấp nhập khẩu chính hãng từ châu Âu. An toàn — Sang
              trọng — Đẳng cấp.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm tracking-wider uppercase">Thông Tin</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent">Về Chúng Tôi</a></li>
              <li><a href="#" className="hover:text-accent">Chính Sách Bảo Hành</a></li>
              <li><a href="#" className="hover:text-accent">Hướng Dẫn Chọn Ghế</a></li>
              <li><a href="#" className="hover:text-accent">Blog & Kiến Thức</a></li>
              <li><a href="#" className="hover:text-accent">Câu Hỏi Thường Gặp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm tracking-wider uppercase">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                Khu 7 (Thạch Đồng), Xã Đào Xá, Tỉnh Phú Thọ
              </li>
              <li className="flex gap-2">
                <Phone className="size-4 shrink-0 text-accent" />
                <a href="https://zalo.me/0368081193" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  0368 081 193 (Zalo)
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="size-4 shrink-0 text-accent" />
                nhathastore2024@gmail.com
              </li>
              <li className="flex gap-2">
                <Clock className="size-4 shrink-0 text-accent" />
                T2 - CN: 8:00 - 21:00
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm tracking-wider uppercase">Bản Đồ</h4>
            <div className="overflow-hidden rounded-xl">
              <iframe
                title="Bản đồ Nhật Hạ Store"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5982294577925!2d105.3088064!3d21.2081136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134871fbfe96a17%3A0x8fd5796b136f21ae!2zQmFieSBDYXIgU2VhdCBOaOG6rXQgSOG6oSBTdG9yZQ!5e0!3m2!1svi!2s!4v1773042211110!5m2!1svi!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-primary-foreground/60 md:flex-row">
          <p>© 2024 Nhật Hạ Store. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-3">
            <span>Thanh toán:</span>
            <div className="flex gap-2">
              {['VISA', 'MC', 'MOMO', 'COD'].map((p) => (
                <span key={p} className="rounded bg-white/10 px-2 py-0.5 text-xs">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
