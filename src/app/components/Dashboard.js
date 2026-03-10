"use client";

import { useState } from "react";
import BudgetsTab from "./BudgetsTab";
import SavingsTab from "./SavingsTab";
import DebtsTab from "./DebtsTab";
import GoalsTab from "./GoalsTab";
import AIChatbot from "./AIChatbot";

export default function Dashboard({ 
  userData, 
  onLogout, 
  onBackToHome,
  budgets, setBudgets,
  debts, setDebts,
  goals, setGoals,
  planner, setPlanner,
  records, setRecords,
  formatPHP, formatDate,
  deleteBudget, deleteDebt, deleteGoal, deletePlannerItem
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I\'m your Money Pilot AI. How can I help with your finances today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

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
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Hi! I'm your Money Pilot AI. How can I help?" 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const totalIncome = records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <>
      {/* Header with buttons */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'white',
        padding: '8px 16px',
        borderRadius: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <button onClick={onBackToHome} style={{
          padding: '5px 12px',
          background: '#10B981',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500
        }}>
          <i className="fa-solid fa-home"></i> Home
        </button>
        <span style={{ color: '#1e293b', fontWeight: 600 }}>👋 Hi, {userData.fullName || 'Hans'}!</span>
        <button onClick={onLogout} style={{ 
          padding: '5px 12px', 
          background: '#ef4444', 
          color: 'white', 
          border: 'none', 
          borderRadius: '20px', 
          cursor: 'pointer', 
          fontSize: '13px', 
          fontWeight: 500 
        }}>
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar__top">
            <div className="logo">
              <img src="/icons/logo/logo.png" alt="Money Pilot Logo" />
            </div>
            <nav className="nav">
              <a href="#" className={`nav__item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>Dashboard</a>
              <a href="#" className={`nav__item ${activeTab === 'budgets' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('budgets'); }}>Budgets</a>
              <a href="#" className={`nav__item ${activeTab === 'savings' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('savings'); }}>Savings Planner</a>
              <a href="#" className={`nav__item ${activeTab === 'debts' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('debts'); }}>Debts</a>
              <a href="#" className={`nav__item ${activeTab === 'goals' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('goals'); }}>Goals</a>
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
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'budgets' && 'Budgets'}
              {activeTab === 'savings' && 'Savings Planner'}
              {activeTab === 'debts' && 'Debts'}
              {activeTab === 'goals' && 'Goals'}
            </h1>
          </header>

          <section className="main__content">
            {activeTab === 'dashboard' && (
              <section id="view-stats" className="view-section">
                {/* ONLY BALANCE TREND CARD - CLEAN AND SIMPLE */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="card-title" style={{ fontWeight: 700 }}>Balance Trend</span>
                    <span className="filter-badge" style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', border: '1px solid #e2e8f0' }}>Current Year</span>
                  </div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10B981', marginBottom: '0.5rem' }}>
                    {formatPHP(balance)}
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#10B981' }}>↑ 12%</span> vs last month
                  </p>
                  <div className="chart-wrapper" style={{ height: '400px', position: 'relative', width: '100%' }}>
                    <canvas id="trendCanvas" style={{ width: '100%', height: '100%' }}></canvas>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'budgets' && (
              <BudgetsTab 
                budgets={budgets} 
                setBudgets={setBudgets} 
                formatPHP={formatPHP} 
                deleteBudget={deleteBudget} 
              />
            )}

            {activeTab === 'savings' && (
              <SavingsTab 
                planner={planner}
                setPlanner={setPlanner}
                formatPHP={formatPHP}
                deletePlannerItem={deletePlannerItem}
              />
            )}

            {activeTab === 'debts' && (
              <DebtsTab 
                debts={debts}
                setDebts={setDebts}
                formatPHP={formatPHP}
                formatDate={formatDate}
                deleteDebt={deleteDebt}
              />
            )}

            {activeTab === 'goals' && (
              <GoalsTab 
                goals={goals}
                setGoals={setGoals}
                formatPHP={formatPHP}
                formatDate={formatDate}
                deleteGoal={deleteGoal}
              />
            )}
          </section>
        </main>
      </div>

      {/* AI Chatbot */}
      <AIChatbot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        input={chatInput}
        setInput={setChatInput}
        onSend={handleChatSend}
        isLoading={isChatLoading}
      />
    </>
  );
}
