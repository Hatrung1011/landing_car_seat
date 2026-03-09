import './ChatButton.css';

const ChatButton = () => {
    return (
        <a
            href="https://zalo.me/0368081193"
            target="_blank"
            rel="noopener noreferrer"
            className="chat-button"
            aria-label="Chat Zalo"
        >
            <div className="chat-button__pulse"></div>
            <div className="chat-button__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </div>
            <span className="chat-button__label">Chat ngay</span>
        </a>
    );
};

export default ChatButton;
