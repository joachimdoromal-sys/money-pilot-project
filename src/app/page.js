"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Home() {
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I\'m your Money Pilot AI. How can I help with your finances today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    async function loadScriptsSequentially() {
      window.supabase = supabase;
  
      const scripts = [
        "/js/core/supabaseData.js",
        "/js/core/dashboard.js",
        "/js/features/budgets/budgets.js",
        "/js/features/debts/debts.js",
        "/js/features/goals/goals.js",
        "/js/features/savings/savings.js" 
      ];
  
      for (const src of scripts) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }
    }
    loadScriptsSequentially();
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (!fullName || !dob || !email || !password) {
        setAuthError('Please fill in all fields');
        return;
      }
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      if (email === 'hans@example.com' && password === 'password123') {
        setIsLoggedIn(true);
        setAuthError('');
        setFullName('Hans');
      } else {
        setAuthError('Invalid email or password');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSignUp(false);
    setFullName('');
    setDob('');
    setEmail('');
    setPassword('');
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage]
        }),
      });

      const data = await response.json();
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Hi! I'm your Money Pilot AI. How can I help with your finances today?" 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <main>
      <link rel="stylesheet" href="/css/features/core_dash_board_design/core.css" />
      <link rel="stylesheet" href="/css/features/budgets/budgets.css" />
      <link rel="stylesheet" href="/css/features/debts/debts.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="stylesheet" href="/css/features/savings/savings.css" />

      {!isLoggedIn ? (
        // LOGIN SCREEN
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#f9fafb'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            padding: '32px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              {isSignUp ? 'Sign up' : 'Sign in'}
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              {isSignUp ? 'Create an account' : 'Welcome back!'}
            </p>

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isSignUp && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                      Full Name
                    </label>
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px'
                      }}
                      required={isSignUp}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                      Date of Birth
                    </label>
                    <input 
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px'
                      }}
                      required={isSignUp}
                    />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  Email
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  Password
                </label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                  required
                />
              </div>

              {authError && (
                <div style={{ color: '#ef4444', fontSize: '14px' }}>
                  {authError}
                </div>
              )}

              <button type="submit" style={{
                width: '100%',
                padding: '12px',
                background: '#1e293b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '8px'
              }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <p style={{ marginTop: '24px', textAlign: 'center' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                  setAuthError('');
                }}
                style={{ color: '#2563eb', textDecoration: 'none' }}
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </a>
            </p>

            {!isSignUp && (
              <p style={{ marginTop: '16px', fontSize: '12px', textAlign: 'center', color: '#94a3b8' }}>
                Demo: hans@example.com / password123
              </p>
            )}
          </div>
        </div>
      ) : (
        // DASHBOARD (Logged In)
        <>
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'white',
            padding: '10px 20px',
            borderRadius: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <span>👋 Hi, {fullName || 'Hans'}!</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '5px 15px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>

          <div className="app-layout">
            <aside className="sidebar">
              <div className="sidebar__top">
                <div className="logo">
                  <img src="/icons/logo/logo.png" alt="Money Pilot Logo" />
                </div>
                <nav className="nav">
                  <a href="#" className="nav__item active" data-tab="dashboard">Dashboard</a>
                  <a href="#" className="nav__item" data-tab="budgets">Budgets</a>
                  <a href="#" className="nav__item" data-tab="savings">Savings Planner</a>
                  <a href="#" className="nav__item" data-tab="debts">Debts</a>
                  <a href="#" className="nav__item" data-tab="goals">Goals</a>
                </nav>
              </div>
              <div className="sidebar__bottom">
                <button className="ai-button" onClick={() => setIsChatOpen(true)}>
                  <i className="fa-solid fa-robot"></i> Money Pilot AI
                </button>
              </div>
            </aside>

            <main className="main">
              <header className="main__header">
                <h1 className="page-title">Dashboard</h1>
              </header>

              <section className="main__content">
                <div className="tab active" id="dashboard">
                  <section id="view-stats" className="view-section">
                    <div style={{ padding: '20px', background: 'white', borderRadius: '12px', marginBottom: '20px' }}>
                      <h2>Welcome to Money Pilot!</h2>
                      <p>Your dashboard will appear here. The other tabs (Budgets, Savings, Debts, Goals) will load their content from the JavaScript files.</p>
                    </div>
                  </section>
                </div>
                <div className="tab" id="budgets"></div>
                <div className="tab" id="savings"></div>
                <div className="tab" id="debts"></div>
                <div className="tab" id="goals"></div>
              </section>
            </main>
          </div>

          {/* AI Chatbot */}
          {isChatOpen && (
            <div className="ai-chat-container" style={{
              position: 'fixed',
              bottom: '100px',
              left: '280px',
              width: '350px',
              height: '500px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000
            }}>
              <div style={{
                background: '#10B981',
                color: 'white',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: 0 }}>Money Pilot AI</h3>
                  <span style={{ fontSize: '12px' }}>● Online</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc' }}>
                {chatMessages.map((msg, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    marginBottom: '15px',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                  }}>
                    <div style={{
                      padding: '10px 15px',
                      background: msg.role === 'assistant' ? 'white' : '#10B981',
                      color: msg.role === 'assistant' ? '#1e293b' : 'white',
                      borderRadius: '18px',
                      maxWidth: '70%'
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div style={{ padding: '10px' }}>Typing...</div>
                )}
              </div>

              <div style={{ padding: '20px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask about your finances..."
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '25px',
                    outline: 'none'
                  }}
                />
                <button onClick={handleChatSend} style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}