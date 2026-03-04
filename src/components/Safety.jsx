import { useState, useEffect, useRef } from 'react';
import './Safety.css';

const stats = [
    { value: 10000, suffix: '+', label: 'Gia đình tin dùng' },
    { value: 0, suffix: '', label: 'Sự cố an toàn', prefix: '' },
    { value: 5, suffix: ' năm', label: 'Bảo hành chính hãng' },
    { value: 15, suffix: '+', label: 'Thương hiệu đối tác' },
];

const certifications = [
    { name: 'ECE R129 (i-Size)', desc: 'Tiêu chuẩn an toàn cao nhất của Liên minh Châu Âu' },
    { name: 'ADAC Tested', desc: 'Kiểm nghiệm bởi câu lạc bộ ô tô lớn nhất châu Âu' },
    { name: 'OEKO-TEX® 100', desc: 'Chứng nhận vải an toàn cho làn da trẻ nhỏ' },
    { name: 'ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng quốc tế' },
];

const CountUp = ({ value, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const start = performance.now();
                    const animate = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(ease * value));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

const Safety = () => {
    return (
        <section className="safety" id="an-toan">
            <div className="safety__bg-pattern"></div>
            <div className="container">
                <div className="safety__header text-center">
                    <span className="section-label animate-on-scroll" style={{ color: 'var(--color-gold)' }}>An Toàn Là Ưu Tiên Hàng Đầu</span>
                    <h2 className="section-title animate-on-scroll delay-1" style={{ color: 'var(--color-white)' }}>
                        Chứng Nhận An Toàn Quốc Tế
                    </h2>
                    <p className="section-subtitle centered animate-on-scroll delay-2" style={{ color: 'var(--color-white-alpha-70)' }}>
                        Mỗi chiếc ghế đều trải qua hàng trăm bài kiểm tra nghiêm ngặt trước khi đến tay khách hàng.
                    </p>
                </div>

                <div className="safety__stats animate-on-scroll delay-3">
                    {stats.map((stat, index) => (
                        <div key={index} className="safety__stat">
                            <div className="safety__stat-value">
                                <CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <div className="safety__stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="safety__certs">
                    {certifications.map((cert, index) => (
                        <div key={index} className={`safety__cert animate-on-scroll delay-${index + 2}`}>
                            <div className="safety__cert-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <polyline points="9 12 11 14 15 10" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="safety__cert-name">{cert.name}</h4>
                                <p className="safety__cert-desc">{cert.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Safety;
