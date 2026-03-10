"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I\'m your Money Pilot AI. How can I help with your finances today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Sample data for tabs
  const [budgets, setBudgets] = useState([
    { id: 1, name: "Monthly Food", limit_amount: 8000, category: "Food", period: "Month", spent: 4500 },
    { id: 2, name: "Transportation", limit_amount: 3000, category: "Transport", period: "Month", spent: 1200 },
    { id: 3, name: "Shopping", limit_amount: 5000, category: "Shopping", period: "Month", spent: 2500 },
    { id: 4, name: "Utilities", limit_amount: 4000, category: "Utilities", period: "Month", spent: 3800 }
  ]);

  const [debts, setDebts] = useState([
    { id: 1, name: "Credit Card", amount: 15000, due_date: "2024-12-01" },
    { id: 2, name: "Student Loan", amount: 50000, due_date: "2025-01-15" },
    { id: 3, name: "Car Loan", amount: 250000, due_date: "2026-06-30" }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, name: "New Laptop", target: 60000, saved: 15000, date: "2024-06-01", icon: "fa-laptop" },
    { id: 2, name: "Emergency Fund", target: 100000, saved: 25000, date: "2024-12-31", icon: "fa-piggy-bank" },
    { id: 3, name: "Vacation", target: 50000, saved: 5000, date: "2024-08-15", icon: "fa-plane" }
  ]);

  const [planner, setPlanner] = useState({
    mainGoal: 50000,
    period: "Monthly",
    items: [
      { id: 1, name: "Standing Desk", cost: 15000 },
      { id: 2, name: "New Monitor", cost: 12000 },
      { id: 3, name: "Ergonomic Chair", cost: 8000 }
    ]
  });

  const [records, setRecords] = useState([
    { id: 1, type: 'income', amount: 45000, category: 'Salary', date: '2024-03-01', desc: 'Monthly Salary' },
    { id: 2, type: 'expense', amount: 2500, category: 'Food', date: '2024-03-02', desc: 'Groceries' },
    { id: 3, type: 'expense', amount: 500, category: 'Transport', date: '2024-03-03', desc: 'Gas' },
    { id: 4, type: 'expense', amount: 3500, category: 'Utilities', date: '2024-03-05', desc: 'Electricity Bill' },
    { id: 5, type: 'income', amount: 5000, category: 'Freelance', date: '2024-03-10', desc: 'Project Payment' }
  ]);

  // Modal states
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showDebtModal, setShowDebtModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  
  // Form states
  const [recType, setRecType] = useState('expense');
  const [recAmount, setRecAmount] = useState('');
  const [recDate, setRecDate] = useState(new Date().toISOString().split('T')[0]);
  const [recCategory, setRecCategory] = useState('Food');
  const [recNote, setRecNote] = useState('');
  
  const [budgetName, setBudgetName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('All');
  const [budgetPeriod, setBudgetPeriod] = useState('Month');
  
  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtDate, setDebtDate] = useState('');
  
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDate, setGoalDate] = useState('');

  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    async function loadScriptsSequentially() {
      window.supabase = supabase;
      
      // Make data and functions available globally
      window.appData = {
        budgets,
        debts,
        goals,
        records,
        planner
      };
      
      window.openModal = (modalName) => {
        if (modalName === 'recordModal') setShowRecordModal(true);
        if (modalName === 'budgetModal') setShowBudgetModal(true);
        if (modalName === 'debtModal') setShowDebtModal(true);
        if (modalName === 'goalModal') setShowGoalModal(true);
      };
      
      window.closeModal = (modalName) => {
        if (modalName === 'recordModal') setShowRecordModal(false);
        if (modalName === 'budgetModal') setShowBudgetModal(false);
        if (modalName === 'debtModal') setShowDebtModal(false);
        if (modalName === 'goalModal') setShowGoalModal(false);
      };
      
      window.toggleFab = () => setFabOpen(!fabOpen);
      window.updateCategories = () => {};
      window.addRecord = (e) => {
        e.preventDefault();
        const newRecord = {
          id: Date.now(),
          type: recType,
          amount: parseFloat(recAmount),
          date: recDate,
          category: recCategory,
          desc: recNote
        };
        setRecords([newRecord, ...records]);
        setShowRecordModal(false);
        setRecAmount('');
        setRecNote('');
      };
      
      window.addBudget = (e) => {
        e.preventDefault();
        const newBudget = {
          id: Date.now(),
          name: budgetName,
          limit_amount: parseFloat(budgetLimit),
          category: budgetCategory,
          period: budgetPeriod,
          spent: 0
        };
        setBudgets([...budgets, newBudget]);
        setShowBudgetModal(false);
        setBudgetName('');
        setBudgetLimit('');
      };
      
      window.addDebt = (e) => {
        e.preventDefault();
        const newDebt = {
          id: Date.now(),
          name: debtName,
          amount: parseFloat(debtAmount),
          due_date: debtDate
        };
        setDebts([...debts, newDebt]);
        setShowDebtModal(false);
        setDebtName('');
        setDebtAmount('');
        setDebtDate('');
      };
      
      window.addGoal = (e) => {
        e.preventDefault();
        const newGoal = {
          id: Date.now(),
          name: goalName,
          target: parseFloat(goalTarget),
          date: goalDate,
          saved: 0,
          icon: "fa-star"
        };
        setGoals([...goals, newGoal]);
        setShowGoalModal(false);
        setGoalName('');
        setGoalTarget('');
        setGoalDate('');
      };
      
      window.addPlannerItem = () => {
        if (newItemName && newItemCost && planner.items.length < 3) {
          const newItem = {
            id: Date.now(),
            name: newItemName,
            cost: parseFloat(newItemCost)
          };
          setPlanner({
            ...planner,
            items: [...planner.items, newItem]
          });
          setNewItemName('');
          setNewItemCost('');
        }
      };
  
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

  // Update window.appData when state changes
  useEffect(() => {
    if (window.appData) {
      window.appData.budgets = budgets;
      window.appData.debts = debts;
      window.appData.goals = goals;
      window.appData.records = records;
      window.appData.planner = planner;
    }
  }, [budgets, debts, goals, records, planner]);

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

  const deleteBudget = (id) => {
    if (confirm('Delete this budget?')) {
      setBudgets(budgets.filter(b => b.id !== id));
    }
  };

  const deleteDebt = (id) => {
    if (confirm('Mark this debt as paid?')) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const deleteGoal = (id) => {
    if (confirm('Delete this goal?')) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const deletePlannerItem = (id) => {
    setPlanner({
      ...planner,
      items: planner.items.filter(i => i.id !== id)
    });
  };

  const formatPHP = (num) => {
    return '₱' + parseFloat(num).toLocaleString('en-PH', { minimumFractionDigits: 2 });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Tab switching functionality
  useEffect(() => {
    const handleTabClick = (e) => {
      e.preventDefault();
      const target = e.currentTarget.dataset.tab;
      
      document.querySelectorAll('.nav__item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      
      e.currentTarget.classList.add('active');
      const tab = document.getElementById(target);
      if (tab) tab.classList.add('active');
    };

    const navItems = document.querySelectorAll('.nav__item');
    navItems.forEach(item => {
      item.addEventListener('click', handleTabClick);
    });

    return () => {
      navItems.forEach(item => {
        item.removeEventListener('click', handleTabClick);
      });
    };
  }, []);

  return (
    <main>
      <link rel="stylesheet" href="/css/features/core_dash_board_design/core.css" />
      <link rel="stylesheet" href="/css/features/budgets/budgets.css" />
      <link rel="stylesheet" href="/css/features/debts/debts.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="stylesheet" href="/css/features/savings/savings.css" />

      <style jsx global>{`
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-header {
          background: #10B981;
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .chat-header span {
          font-size: 12px;
          opacity: 0.9;
        }

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

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }

        .btn-primary {
          background: #10B981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

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

        {/* MAIN CONTENT */}
        <main className="main">
          <header className="main__header">
            <h1 className="page-title">Dashboard</h1>
            <div className="profile-avatar"></div>
          </header>

          <section className="main__content">
            
            {/* DASHBOARD TAB */}
            <div className="tab active" id="dashboard">
              <section id="view-stats" className="view-section">
                <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
                  
                  {/* Balance Trend Card */}
                  <div className="card">
                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span className="card-title" style={{ fontWeight: 700 }}>Balance Trend</span>
                      <span className="filter-badge" style={{ background: 'var(--bg-body)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', border: '1px solid var(--border)' }}>Current Year</span>
                    </div>
                    <h2 id="balance-total" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {formatPHP(records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0) - records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0))}
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      <span id="balance-trend-pct" className="text-success" style={{ fontWeight: 600 }}>↑ 12%</span> vs last month
                    </p>
                    <div className="chart-wrapper" style={{ height: '350px', position: 'relative', width: '100%' }}>
                      <canvas id="trendCanvas" style={{ width: '100%', height: '100%' }}></canvas>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '1.5rem' }}>
                  <div className="card">
                    <span style={{ color: '#64748b' }}>Monthly Income</span>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#10B981', margin: '10px 0' }}>
                      {formatPHP(records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0))}
                    </h3>
                    <span style={{ color: '#10B981' }}>↑ 8%</span>
                  </div>
                  <div className="card">
                    <span style={{ color: '#64748b' }}>Monthly Expenses</span>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ef4444', margin: '10px 0' }}>
                      {formatPHP(records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0))}
                    </h3>
                    <span style={{ color: '#10B981' }}>↓ 3%</span>
                  </div>
                  <div className="card">
                    <span style={{ color: '#64748b' }}>Savings Rate</span>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#8B5CF6', margin: '10px 0' }}>
                      {Math.round((records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0) - records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0)) / records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0) * 100)}%
                    </h3>
                    <span style={{ color: '#10B981' }}>↑ 5%</span>
                  </div>
                </div>

                {/* Recent Activity & Budget Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  <div className="card">
                    <h4 style={{ marginBottom: '15px' }}>Recent Transactions</h4>
                    <div id="recent-list">
                      {records.slice(0, 3).map(r => (
                        <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{r.category}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{r.desc}</div>
                          </div>
                          <div style={{ fontWeight: 600, color: r.type === 'income' ? '#10B981' : '#ef4444' }}>
                            {r.type === 'income' ? '+' : '-'}{formatPHP(r.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', borderStyle: 'dashed', padding: '12px', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--text-muted)' }} onClick={() => setShowRecordModal(true)}>
                      Add Record
                    </button>
                  </div>
                  <div className="card">
                    <h4 style={{ marginBottom: '15px' }}>Budget Overview</h4>
                    {budgets.slice(0, 3).map(b => (
                      <div key={b.id} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span>{b.category}</span>
                          <span>{formatPHP(b.spent)} / {formatPHP(b.limit_amount)}</span>
                        </div>
                        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px' }}>
                          <div style={{ width: `${(b.spent / b.limit_amount) * 100}%`, height: '100%', background: '#10B981', borderRadius: '10px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* BUDGETS TAB */}
            <div className="tab" id="budgets">
              <section id="view-budgets" className="view-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>Your Budgets</h3>
                  <button className="btn btn-primary" onClick={() => setShowBudgetModal(true)}>
                    <i className="fa-solid fa-plus"></i> New Budget
                  </button>
                </div>
                <div id="budget-container" className="grid-2">
                  {budgets.map(b => {
                    const pct = (b.spent / b.limit_amount) * 100;
                    return (
                      <div key={b.id} className="card" style={{ borderLeft: `4px solid ${pct > 90 ? '#ef4444' : '#10B981'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 700 }}>{b.name}</span>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.period}</span>
                        </div>
                        <div style={{ margin: '15px 0' }}>
                          <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: pct > 90 ? '#ef4444' : '#10B981', borderRadius: '10px' }}></div>
                          </div>
                          <div style={{ fontSize: '0.8rem', marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{formatPHP(b.spent)} spent</span>
                            <span>{formatPHP(b.limit_amount)}</span>
                          </div>
                        </div>
                        <button className="btn-text" onClick={() => deleteBudget(b.id)} style={{ color: '#ef4444', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* SAVINGS TAB */}
            <div className="tab" id="savings">
              <section id="view-planner" className="view-section">
                <div className="grid-2">
                  <div className="planner-stat-card" style={{ background: '#10B981', color: 'white', padding: '32px', borderRadius: '20px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)' }}>Total Savings Goal</label>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      <input 
                        id="planner-main-goal" 
                        type="number" 
                        className="planner-input" 
                        value={planner.mainGoal}
                        onChange={(e) => setPlanner({...planner, mainGoal: parseFloat(e.target.value) || 0})}
                        style={{ fontSize: '1.5rem', fontWeight: '700', width: '180px', padding: '8px', borderRadius: '6px', border: 'none' }} 
                      />
                      <select 
                        id="planner-period" 
                        className="planner-input" 
                        value={planner.period}
                        onChange={(e) => setPlanner({...planner, period: e.target.value})}
                        style={{ padding: '8px', borderRadius: '6px', border: 'none' }}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="planner-required" style={{ marginTop: '10px' }}>
                      Required contribution: <span id="planner-calc-result">{formatPHP(planner.mainGoal / (planner.period === 'Monthly' ? 12 : planner.period === 'Weekly' ? 52 : 365))} / {planner.period}</span>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <span className="card-title">Allocation Breakdown</span>
                    </div>
                    <div className="planner-chart-container" style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
                      <div id="planner-donut" className="planner-donut" style={{ 
                        width: '180px', 
                        height: '180px', 
                        borderRadius: '50%', 
                        background: `conic-gradient(#10B981 0% ${Math.min(100, (planner.items.reduce((s, i) => s + i.cost, 0) / planner.mainGoal) * 100)}%, #f1f5f9 ${Math.min(100, (planner.items.reduce((s, i) => s + i.cost, 0) / planner.mainGoal) * 100)}% 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div className="planner-donut-hole" style={{ width: '120px', height: '120px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span id="planner-donut-val" style={{ fontSize: '28px', fontWeight: 700 }}>{Math.round((planner.items.reduce((s, i) => s + i.cost, 0) / planner.mainGoal) * 100)}%</span>
                          <span style={{ fontSize: '14px', color: '#64748b' }}>Allocated</span>
                        </div>
                      </div>
                    </div>
                    <div className="planner-chart-legend">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Total Goal:</span><span id="donut-total-goal">{formatPHP(planner.mainGoal)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Allocated:</span><span id="donut-allocated">{formatPHP(planner.items.reduce((s, i) => s + i.cost, 0))}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ marginTop: '20px' }}>
                  <div className="card-header">
                    <span id="planner-items-header" className="card-title">Items to Buy {planner.items.length} / 3 Items</span>
                  </div>
                  <div id="planner-items-list">
                    {planner.items.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <span>{formatPHP(item.cost)}</span>
                        <button onClick={() => deletePlannerItem(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="planner-input-row" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <input 
                      id="new-item-name" 
                      placeholder="Item Name" 
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      style={{ flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} 
                    />
                    <input 
                      id="new-item-cost" 
                      type="number" 
                      placeholder="Cost" 
                      value={newItemCost}
                      onChange={(e) => setNewItemCost(e.target.value)}
                      style={{ width: '100px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }} 
                    />
                    <button className="btn btn-primary" onClick={() => window.addPlannerItem?.()} style={{ padding: '12px 20px' }}>
                      Add Item
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* DEBTS TAB */}
            <div className="tab" id="debts">
              <section id="view-debts" className="view-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>Debt Tracker</h3>
                  <button className="btn btn-primary" onClick={() => setShowDebtModal(true)}>
                    <i className="fa-solid fa-plus"></i> Add Debt
                  </button>
                </div>
                <div id="debt-container" className="grid-2">
                  {debts.map(d => (
                    <div key={d.id} className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700 }}>{d.name}</span>
                        <span style={{ background: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '20px', fontSize: '12px' }}>
                          Due {formatDate(d.due_date)}
                        </span>
                      </div>
                      <h3 style={{ margin: '10px 0' }}>{formatPHP(d.amount)}</h3>
                      <button className="btn btn-outline" onClick={() => deleteDebt(d.id)} style={{ fontSize: '0.8rem', padding: '6px' }}>
                        Paid
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* GOALS TAB */}
            <div className="tab" id="goals">
              <section id="view-goals" className="view-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3>Savings Goals</h3>
                  <button className="btn btn-primary" onClick={() => setShowGoalModal(true)}>
                    <i className="fa-solid fa-plus"></i> New Goal
                  </button>
                </div>
                <div id="goal-container" className="grid-2">
                  {goals.map(g => {
                    const pct = (g.saved / g.target) * 100;
                    return (
                      <div key={g.id} className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ width: '50px', height: '50px', background: '#ECFDF5', color: '#10B981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            <i className={`fa-solid ${g.icon}`}></i>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700 }}>{g.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Target: {formatPHP(g.target)}</div>
                            {g.date && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Due: {formatDate(g.date)}</div>}
                            <div style={{ marginTop: '10px', height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: '#10B981', borderRadius: '10px' }}></div>
                            </div>
                          </div>
                          <i className="fa-solid fa-trash" onClick={() => deleteGoal(g.id)} style={{ color: '#94a3b8', cursor: 'pointer' }}></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

          </section>
        </main>
      </div>

      {/* FAB CONTAINER */}
      <div className="fab-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
        <div className="fab-menu" id="fabMenu" style={{ display: fabOpen ? 'flex' : 'none', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
          <div className="fab-item" onClick={() => { setShowRecordModal(true); setFabOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 16px', borderRadius: '30px', boxShadow: 'var(--shadow-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>
            <span>Add Income</span>
            <div className="fab-icon" style={{ width: '32px', height: '32px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></div>
          </div>
        </div>
        <div className="fab-main" id="fabMain" onClick={() => setFabOpen(!fabOpen)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-float)', cursor: 'pointer', transition: 'transform 0.3s' }}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>

      {/* RECORD MODAL */}
      {showRecordModal && (
        <div className="modal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.6)', zIndex: 1000, justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', width: '90%', maxWidth: '500px', padding: '2rem', borderRadius: '20px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 id="recordModalTitle">Add Transaction</h3>
              <i className="fa-solid fa-xmark" onClick={() => setShowRecordModal(false)} style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newRecord = {
                id: Date.now(),
                type: recType,
                amount: parseFloat(recAmount),
                date: recDate,
                category: recCategory,
                desc: recNote
              };
              setRecords([newRecord, ...records]);
              setShowRecordModal(false);
              setRecAmount('');
              setRecNote('');
            }}>
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Type</label>
                  <select id="recType" value={recType} onChange={(e) => setRecType(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Date</label>
                  <input type="date" id="recDate" value={recDate} onChange={(e) => setRecDate(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Amount (PHP)</label>
                <input type="number" id="recAmount" value={recAmount} onChange={(e) => setRecAmount(e.target.value)} required placeholder="0.00" step="0.01" style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 700, outline: 'none', background: '#F0FDF4' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Category</label>
                <select id="recCategory" value={recCategory} onChange={(e) => setRecCategory(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }}>
                  {recType === 'expense' 
                    ? ['Food', 'Transport', 'Utilities', 'Shopping', 'Health', 'Education', 'Entertainment'].map(c => <option key={c} value={c}>{c}</option>)
                    : ['Salary', 'Freelance', 'Business', 'Investment', 'Gift'].map(c => <option key={c} value={c}>{c}</option>)
                  }
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Note (Optional)</label>
                <input type="text" id="recNote" value={recNote} onChange={(e) => setRecNote(e.target.value)} placeholder="e.g. Lunch with team" style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', padding: '12px 20px', background: '#10B981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Save Record</button>
            </form>
          </div>
        </div>
      )}

      {/* BUDGET MODAL */}
      {showBudgetModal && (
        <div className="modal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.6)', zIndex: 1000, justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', width: '90%', maxWidth: '500px', padding: '2rem', borderRadius: '20px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3>Create New Budget</h3>
              <i className="fa-solid fa-xmark" onClick={() => setShowBudgetModal(false)} style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newBudget = {
                id: Date.now(),
                name: budgetName,
                limit_amount: parseFloat(budgetLimit),
                category: budgetCategory,
                period: budgetPeriod,
                spent: 0
              };
              setBudgets([...budgets, newBudget]);
              setShowBudgetModal(false);
              setBudgetName('');
              setBudgetLimit('');
            }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Budget Name</label>
                <input type="text" id="budgetName" value={budgetName} onChange={(e) => setBudgetName(e.target.value)} placeholder="e.g. Weekly Groceries" required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Period</label>
                  <select id="budgetPeriod" value={budgetPeriod} onChange={(e) => setBudgetPeriod(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }}>
                    <option value="Month">Monthly</option>
                    <option value="Week">Weekly</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Currency</label>
                  <select disabled style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }}><option>PHP (₱)</option></select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Limit Amount</label>
                <input type="number" id="budgetLimit" value={budgetLimit} onChange={(e) => setBudgetLimit(e.target.value)} required placeholder="0.00" step="0.01" style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Category</label>
                  <select id="budgetCategory" value={budgetCategory} onChange={(e) => setBudgetCategory(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }}>
                    <option value="All">All Categories</option>
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Account</label>
                  <select id="budgetAccount" style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }}>
                    <option value="All">All Accounts</option>
                    <option value="Cash">Cash Wallet</option>
                    <option value="Bank">Bank Account</option>
                  </select>
                </div>
              </div>
              <div className="toggle-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0' }}>
                <label style={{ margin: 0 }}>Notify when exceeded</label>
                <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                  <input type="checkbox" id="budgetNotify" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                  <span className="slider" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ccc', transition: '.4s', borderRadius: '34px' }}></span>
                </label>
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', padding: '12px 20px', marginTop: '10px', background: '#10B981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Create Budget</button>
            </form>
          </div>
        </div>
      )}

      {/* DEBT MODAL */}
      {showDebtModal && (
        <div className="modal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.6)', zIndex: 1000, justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', width: '90%', maxWidth: '500px', padding: '2rem', borderRadius: '20px', position: 'relative' }}>
            <span className="close-modal" onClick={() => setShowDebtModal(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer' }}>
              <i className="fa-solid fa-xmark"></i>
            </span>
            <h3>Add Debt</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newDebt = {
                id: Date.now(),
                name: debtName,
                amount: parseFloat(debtAmount),
                due_date: debtDate
              };
              setDebts([...debts, newDebt]);
              setShowDebtModal(false);
              setDebtName('');
              setDebtAmount('');
              setDebtDate('');
            }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Description</label>
                <input type="text" id="debtName" value={debtName} onChange={(e) => setDebtName(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Amount Owed</label>
                <input type="number" id="debtAmount" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Due Date</label>
                <input type="date" id="debtDate" value={debtDate} onChange={(e) => setDebtDate(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', padding: '12px 20px', background: '#10B981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Save Debt</button>
            </form>
          </div>
        </div>
      )}

      {/* GOAL MODAL */}
      {showGoalModal && (
        <div className="modal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.6)', zIndex: 1000, justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', width: '90%', maxWidth: '500px', padding: '2rem', borderRadius: '20px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3>New Savings Goal</h3>
              <i className="fa-solid fa-xmark" onClick={() => setShowGoalModal(false)} style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newGoal = {
                id: Date.now(),
                name: goalName,
                target: parseFloat(goalTarget),
                date: goalDate,
                saved: 0,
                icon: "fa-star"
              };
              setGoals([...goals, newGoal]);
              setShowGoalModal(false);
              setGoalName('');
              setGoalTarget('');
              setGoalDate('');
            }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Goal Name</label>
                <input type="text" id="goalName" value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder="e.g. New Laptop" required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
              </div>
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Target Amount</label>
                  <input type="number" id="goalTarget" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#6B7280' }}>Target Date</label>
                  <input type="date" id="goalDate" value={goalDate} onChange={(e) => setGoalDate(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #D1FAE5', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', background: '#F0FDF4' }} />
                </div>
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', padding: '12px 20px', background: '#10B981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Create Goal</button>
            </form>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      {isChatOpen && (
        <div className="ai-chat-container">
          <div className="chat-header">
            <div>
              <h3>Money Pilot AI</h3>
              <span>● Online</span>
            </div>
            <button className="close-chat" onClick={() => setIsChatOpen(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  <i className={`fa-solid ${msg.role === 'assistant' ? 'fa-robot' : 'fa-user'}`}></i>
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {isChatLoading && (
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
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask about your finances..."
              disabled={isChatLoading}
            />
            <button onClick={handleChatSend} disabled={isChatLoading || !chatInput.trim()}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}