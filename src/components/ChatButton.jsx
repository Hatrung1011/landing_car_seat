import './ChatButton.css';
import zaloIcon from '../assets/Icon_of_Zalo.png';

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
                <img src={zaloIcon} alt="Zalo" width="28" height="28" />
            </div>
            <span className="chat-button__label">Chat ngay</span>
        </a>
    );
};

export default ChatButton;
