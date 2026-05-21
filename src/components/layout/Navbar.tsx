import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MessageCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { id: 'gioi-thieu', label: 'Giới Thiệu' },
  { id: 'san-pham', label: 'Sản Phẩm' },
  { id: 'an-toan', label: 'An Toàn' },
  { id: 'danh-gia', label: 'Đánh Giá' },
  { id: 'dich-vu', label: 'Dịch Vụ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const solid = !isHome || scrolled;
  const onHero = isHome && !scrolled;

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        solid
          ? 'border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md'
          : 'bg-primary/20 backdrop-blur-sm',
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo_car_seat.png"
            alt="Nhật Hạ"
            className={cn(
              'h-9 w-9 rounded-full object-cover ring-2',
              onHero ? 'ring-accent/60' : 'ring-accent/40',
            )}
          />
          <div className="hidden flex-col sm:flex">
            <span
              className={cn(
                'font-heading text-base font-semibold',
                onHero ? 'text-primary-foreground' : 'text-primary',
              )}
            >
              Nhật Hạ Store
            </span>
            <span
              className={cn(
                'text-xs tracking-wider uppercase',
                onHero ? 'text-primary-foreground/65' : 'text-muted-foreground',
              )}
            >
              Premium Car Seats
            </span>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'text-sm font-medium transition-colors',
                  onHero
                    ? 'text-primary-foreground/90 hover:text-accent'
                    : 'text-foreground/80 hover:text-accent',
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: 'default' }),
              'hidden shadow-md sm:inline-flex',
              'bg-accent text-accent-foreground shadow-md hover:bg-accent/90',
            )}
          >
            <MessageCircle className="size-4" />
            Liên Hệ
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                'lg:hidden',
                onHero &&
                'border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20',
              )}
              aria-label="Mở menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="font-heading text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-base font-medium hover:text-accent"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants(),
                    'mt-4 bg-accent text-accent-foreground hover:bg-accent/90',
                  )}
                >
                  Liên Hệ Facebook
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
