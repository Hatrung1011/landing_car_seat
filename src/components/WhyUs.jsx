import './WhyUs.css';

const features = [
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: 'Chuẩn An Toàn Châu Âu',
        description: 'Đạt chứng nhận ECE R129 (i-Size) cao nhất châu Âu, vượt qua các bài kiểm tra va chạm khắt khe nhất với điểm số xuất sắc.',
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
        title: 'Chất Liệu Da Ý Cao Cấp',
        description: 'Sử dụng da Ý cao cấp nhập khẩu, mềm mại, thoáng khí và an toàn cho làn da nhạy cảm của trẻ. Không chứa chất gây dị ứng.',
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        title: 'Thiết Kế Công Thái Học',
        description: 'Được thiết kế bởi chuyên gia y tế hàng đầu, đảm bảo tư thế ngồi đúng, hỗ trợ cột sống và mang lại sự thoải mái tối ưu cho bé.',
    },
];

const WhyUs = () => {
    return (
        <section className="whyus" id="gioi-thieu">
            <div className="container">
                <div className="whyus__header text-center">
                    <span className="section-label animate-on-scroll">Vì Sao Chọn Nhật Hạ Store</span>
                    <h2 className="section-title animate-on-scroll delay-1">
                        Sự Lựa Chọn <em>Hoàn Hảo</em> Cho Con Bạn
                    </h2>
                    <p className="section-subtitle centered animate-on-scroll delay-2">
                        Chúng tôi không chỉ bán ghế ô tô — chúng tôi mang đến sự an tâm tuyệt đối cho mỗi chuyến đi của gia đình bạn.
                    </p>
                </div>
                <div className="whyus__grid">
                    {features.map((feature, index) => (
                        <div key={index} className={`whyus__card animate-on-scroll delay-${index + 2}`}>
                            <div className="whyus__card-icon">{feature.icon}</div>
                            <h3 className="whyus__card-title">{feature.title}</h3>
                            <p className="whyus__card-desc">{feature.description}</p>
                            <div className="whyus__card-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
