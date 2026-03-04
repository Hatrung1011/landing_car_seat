import { useState } from 'react';
import './Testimonials.css';

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

const Testimonials = () => {
    const [active, setActive] = useState(0);

    const next = () => setActive((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="testimonials" id="danh-gia">
            <div className="container">
                <div className="testimonials__header text-center">
                    <span className="section-label animate-on-scroll">Khách Hàng Nói Gì</span>
                    <h2 className="section-title animate-on-scroll delay-1">
                        Được <em>10,000+</em> Gia Đình Tin Dùng
                    </h2>
                </div>

                <div className="testimonials__carousel animate-on-scroll delay-2">
                    <div className="testimonials__card">
                        <div className="testimonials__quote-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>
                        <div className="testimonials__stars">
                            {[...Array(testimonials[active].rating)].map((_, i) => (
                                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>
                        <p className="testimonials__text">{testimonials[active].text}</p>
                        <div className="testimonials__author">
                            <img
                                src={testimonials[active].avatar}
                                alt={testimonials[active].name}
                                className="testimonials__avatar"
                            />
                            <div>
                                <strong className="testimonials__name">{testimonials[active].name}</strong>
                                <span className="testimonials__role">{testimonials[active].role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonials__nav">
                        <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <div className="testimonials__dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className="testimonials__nav-btn" onClick={next} aria-label="Next">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
