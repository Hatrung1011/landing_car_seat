import './Installation.css';

const steps = [
    {
        number: '01',
        title: 'Tư Vấn Miễn Phí',
        description: 'Đội ngũ chuyên gia tư vấn giúp bạn lựa chọn ghế phù hợp nhất với dòng xe và độ tuổi của bé.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Chọn Sản Phẩm',
        description: 'Trải nghiệm và lựa chọn ghế ô tô cao cấp tại showroom hoặc qua tư vấn trực tuyến.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Lắp Đặt Tận Nơi',
        description: 'Kỹ thuật viên chuyên nghiệp đến tận nhà lắp đặt miễn phí, đảm bảo an toàn tuyệt đối.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Hướng Dẫn Sử Dụng',
        description: 'Hướng dẫn chi tiết cách sử dụng và bảo quản để ghế luôn trong tình trạng tốt nhất.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
];

const Installation = () => {
    return (
        <section className="installation" id="dich-vu">
            <div className="container">
                <div className="installation__layout">
                    <div className="installation__image animate-on-scroll">
                        <img
                            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
                            alt="Dịch vụ lắp đặt chuyên nghiệp"
                        />
                        <div className="installation__image-badge">
                            <span className="installation__image-badge-value">100%</span>
                            <span className="installation__image-badge-label">Miễn phí lắp đặt</span>
                        </div>
                    </div>
                    <div className="installation__content">
                        <span className="section-label animate-on-scroll">Dịch Vụ Trọn Gói</span>
                        <h2 className="section-title animate-on-scroll delay-1">
                            Lắp Đặt Chuyên Nghiệp<br />Tận Nhà <em>Miễn Phí</em>
                        </h2>
                        <p className="installation__desc animate-on-scroll delay-2">
                            Chúng tôi không chỉ bán sản phẩm — chúng tôi mang đến trải nghiệm dịch vụ 5 sao, từ tư vấn đến lắp đặt.
                        </p>
                        <div className="installation__steps">
                            {steps.map((step, index) => (
                                <div key={index} className={`installation__step animate-on-scroll delay-${index + 2}`}>
                                    <div className="installation__step-icon">{step.icon}</div>
                                    <div className="installation__step-content">
                                        <div className="installation__step-number">{step.number}</div>
                                        <h4 className="installation__step-title">{step.title}</h4>
                                        <p className="installation__step-desc">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="btn btn-primary animate-on-scroll delay-5" style={{ marginTop: '32px' }}>
                            Đặt Lịch Ngay
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Installation;
