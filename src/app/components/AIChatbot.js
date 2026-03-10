"use client";

export default function AIChatbot({ 
  isOpen, 
  onClose, 
  messages, 
  input, 
  setInput, 
  onSend, 
  isLoading 
}) {
  if (!isOpen) return null;

  return (
    <div className="ai-chat-container">
      <div className="chat-header">
        <div>
          <h3>Money Pilot AI</h3>
          <span>● Online</span>
        </div>
        <button className="close-chat" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-avatar">
              <i className={`fa-solid ${msg.role === 'assistant' ? 'fa-robot' : 'fa-user'}`}></i>
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Ask about your finances..."
          disabled={isLoading}
        />
        <button onClick={onSend} disabled={isLoading || !input.trim()}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>

      <style jsx>{`
        .ai-chat-container {
          position: fixed;
          bottom: 100px;
          left: 280px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-header {
          background: #10B981;
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 { margin: 0; font-size: 18px; }
        .chat-header span { font-size: 12px; opacity: 0.9; }
        
        .close-chat {
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
        }

        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .message.assistant .message-avatar {
          background: #ECFDF5;
          color: #10B981;
        }

        .message.user .message-avatar {
          background: #e2e8f0;
          color: #64748b;
        }

        .message-content {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .message.assistant .message-content {
          background: white;
          border: 1px solid #e2e8f0;
          border-top-left-radius: 4px;
        }

        .message.user .message-content {
          background: #10B981;
          color: white;
          border-top-right-radius: 4px;
        }

        .chat-input-area {
          padding: 20px;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 10px;
        }

        .chat-input-area input {
          flex: 1;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
        }

        .chat-input-area input:focus {
          border-color: #10B981;
        }

        .chat-input-area button {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #10B981;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .chat-input-area button:hover:not(:disabled) {
          transform: scale(1.1);
          background: #047857;
        }

        .chat-input-area button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        @media screen and (max-width: 768px) {
          .ai-chat-container {
            left: 5% !important;
            width: 90% !important;
            bottom: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}