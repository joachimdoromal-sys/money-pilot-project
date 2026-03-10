"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I\'m your Money Pilot AI. How can I help with your finances today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

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
    if (!showLanding && isLoggedIn) {
      const handleTabClick = (e) => {
        e.preventDefault();
        const target = e.currentTarget.dataset.tab;
        
        document.querySelectorAll('.nav__item').forEach(i => i.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        const tab = document.getElementById(target);
        if (tab) tab.classList.add('active');
      };

      const navItems = document.querySelectorAll('.nav__item');
      navItems.forEach(item => {
        item.removeEventListener('click', handleTabClick);
        item.addEventListener('click', handleTabClick);
      });

      return () => {
        navItems.forEach(item => {
          item.removeEventListener('click', handleTabClick);
        });
      };
    }
  }, [showLanding, isLoggedIn]);

  // LANDING PAGE
  if (showLanding) {
    return (
      <main>
        <style jsx global>{`
          :root {
            --primary: #10B981;
            --primary-dark: #059669;
            --primary-light: #D1FAE5;
            --text-main: #1F2937;
            --text-muted: #6B7280;
            --bg-body: #FFFFFF;
            --bg-alt: #F9FAFB;
            --white: #FFFFFF;
            --max-width: 1200px;
            --nav-height: 80px;
            --radius: 12px;
            --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            scroll-behavior: smooth;
          }

          body {
            background-color: var(--bg-body);
            color: var(--text-main);
            line-height: 1.6;
          }

          .navbar {
            height: var(--nav-height);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            border-bottom: 1px solid #E5E7EB;
          }

          .nav-container {
            max-width: var(--max-width);
            margin: 0 auto;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          }

          .logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary-dark);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }
          
          .logo i { color: var(--primary); }

          .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
          }

          .nav-link {
            text-decoration: none;
            color: var(--text-main);
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.2s;
            cursor: pointer;
          }

          .nav-link:hover { color: var(--primary); }

          .btn {
            padding: 10px 24px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            display: inline-block;
            border: none;
          }

          .btn-primary {
            background-color: var(--primary);
            color: var(--white);
            border: 2px solid var(--primary);
            box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
          }

          .btn-primary:hover {
            background-color: var(--primary-dark);
            border-color: var(--primary-dark);
            transform: translateY(-1px);
          }

          .btn-outline {
            background-color: transparent;
            color: var(--primary-dark);
            border: 2px solid var(--primary);
          }

          .btn-outline:hover {
            background-color: var(--primary-light);
          }

          .hero {
            padding: calc(var(--nav-height) + 60px) 20px 80px;
            max-width: var(--max-width);
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 60px;
            min-height: 90vh;
          }

          .hero-image-col {
            flex: 1;
            position: relative;
          }

          .hero-image-col img {
            width: 100%;
            height: auto;
            border-radius: 20px;
            box-shadow: var(--shadow);
            animation: fadeIn 1s ease-out;
          }

          .hero-text-col {
            flex: 1;
          }

          .badge {
            display: inline-block;
            background-color: var(--primary-light);
            color: var(--primary-dark);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .hero-title {
            font-size: 3.5rem;
            line-height: 1.1;
            font-weight: 800;
            margin-bottom: 24px;
            background: linear-gradient(135deg, var(--text-main) 0%, var(--primary-dark) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-desc {
            font-size: 1.125rem;
            color: var(--text-muted);
            margin-bottom: 32px;
            max-width: 540px;
          }

          .hero-buttons {
            display: flex;
            gap: 16px;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .about-section {
            background-color: var(--bg-alt);
            padding: 100px 20px;
            text-align: center;
          }

          .section-container {
            max-width: 800px;
            margin: 0 auto;
          }

          .section-title {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--text-main);
          }

          .section-desc {
            font-size: 1.1rem;
            color: var(--text-muted);
            margin-bottom: 40px;
          }

          .features-section {
            padding: 100px 20px;
            max-width: var(--max-width);
            margin: 0 auto;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
          }

          .feature-card {
            background: var(--white);
            padding: 30px;
            border-radius: 16px;
            border: 1px solid #E5E7EB;
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow);
            border-color: var(--primary-light);
          }

          .icon-box {
            width: 50px;
            height: 50px;
            background-color: var(--primary-light);
            color: var(--primary-dark);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
          }

          .feature-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 10px;
          }

          .feature-text {
            color: var(--text-muted);
            font-size: 0.95rem;
          }

          .footer {
            background-color: #111827;
            color: #F9FAFB;
            padding: 60px 20px 30px;
          }

          .footer-content {
            max-width: var(--max-width);
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 50px;
          }

          .footer-brand h3 {
            font-size: 1.5rem;
            color: var(--primary);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .footer-tagline {
            color: #9CA3AF;
            font-size: 0.95rem;
          }

          .footer-links h4 {
            font-size: 1.1rem;
            margin-bottom: 20px;
            font-weight: 600;
          }

          .footer-links ul {
            list-style: none;
          }

          .footer-links li {
            margin-bottom: 10px;
          }

          .footer-links a {
            color: #D1D5DB;
            text-decoration: none;
            transition: color 0.2s;
            cursor: pointer;
          }

          .footer-links a:hover {
            color: var(--primary);
          }

          .copyright {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #374151;
            color: #6B7280;
            font-size: 0.9rem;
          }

          @media (max-width: 968px) {
            .hero {
              flex-direction: column;
              text-align: center;
              gap: 40px;
              padding-top: 120px;
            }

            .hero-buttons {
              justify-content: center;
            }
            
            .hero-desc {
              margin: 0 auto 32px;
            }

            .hero-title {
              font-size: 2.5rem;
            }

            .nav-links {
              display: none;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              font-size: 2rem;
            }
            
            .hero-buttons {
              flex-direction: column;
            }
            
            .btn {
              width: 100%;
              text-align: center;
            }
          }
        `}</style>

        <nav className="navbar">
          <div className="nav-container">
            <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
              <i className="fa-solid fa-paper-plane"></i> MoneyPilot
            </a>
            
            <ul className="nav-links">
              <li><a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Home</a></li>
              <li><a href="#features" className="nav-link" onClick={(e) => e.preventDefault()}>Features</a></li>
              <li><a href="#about" className="nav-link" onClick={(e) => e.preventDefault()}>About</a></li>
              <li><a href="#contact" className="nav-link" onClick={(e) => e.preventDefault()}>Contact</a></li>
            </ul>

            <button className="btn btn-primary" onClick={() => setShowLanding(false)}>Launch App</button>
          </div>
        </nav>

        <header className="hero" id="home">
          <div className="hero-image-col">
            <img src="https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Financial Growth" />
          </div>

          <div className="hero-text-col">
            <span className="badge">Smart Personal Finance Tool</span>
            <h1 className="hero-title">Take Control of Your Money, One Goal at a Time</h1>
            <p className="hero-desc">
              MoneyPilot helps you track expenses, manage budgets, and save money for specific goals like gadgets, education, or emergency funds.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => setShowLanding(false)}>Get Started</button>
              <a href="#features" className="btn btn-outline" onClick={(e) => e.preventDefault()}>Learn More</a>
            </div>
          </div>
        </header>

        <section className="about-section" id="about">
          <div className="section-container">
            <h2 className="section-title">Why MoneyPilot?</h2>
            <p className="section-desc">
              We believe financial freedom starts with better habits. MoneyPilot helps you break down big financial dreams into manageable daily, weekly, and monthly saving goals.
            </p>
          </div>
        </section>

        <section className="features-section" id="features">
          <div style={{ textAlign: "center" }}>
            <span className="badge">Features</span>
            <h2 className="section-title">Everything you need to grow</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-box"><i className="fa-solid fa-receipt"></i></div>
              <h3 className="feature-title">Expense Tracking</h3>
              <p className="feature-text">Log daily expenses and see exactly where your money goes.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fa-solid fa-chart-pie"></i></div>
              <h3 className="feature-title">Budget Management</h3>
              <p className="feature-text">Set monthly budgets and get alerts before you overspend.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fa-solid fa-bullseye"></i></div>
              <h3 className="feature-title">Smart Savings Goals</h3>
              <p className="feature-text">Save for specific goals with personalized daily targets.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fa-solid fa-arrow-trend-up"></i></div>
              <h3 className="feature-title">Balance Trends</h3>
              <p className="feature-text">Visualize your financial health with beautiful charts.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <h3 className="feature-title">AI Insights</h3>
              <p className="feature-text">Receive personalized tips to optimize your spending.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-text">Your financial data is encrypted and protected.</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3><i className="fa-solid fa-paper-plane"></i> MoneyPilot</h3>
              <p className="footer-tagline">Plan smarter. Spend better.</p>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#features" onClick={(e) => e.preventDefault()}>Features</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Pricing</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Security</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="#about" onClick={(e) => e.preventDefault()}>About Us</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Careers</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            &copy; 2026 MoneyPilot. All rights reserved.
          </div>
        </footer>
      </main>
    );
  }

  // DASHBOARD with LOGIN
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

        /* MOBILE RESPONSIVE STYLES */
        @media screen and (max-width: 768px) {
          .app-layout {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }
          
          .main__header {
            padding: 15px;
          }
          
          .grid-3, 
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          
          .grid-2,
          div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          .card {
            padding: 15px;
          }
          
          .planner-stat-card {
            padding: 20px !important;
          }
          
          .planner-input-row {
            flex-direction: column;
          }
          
          .planner-input-row input,
          .planner-input-row button {
            width: 100% !important;
          }
          
          div[style*="position: fixed"][style*="top: 20px"][style*="right: 20px"] {
            top: 10px;
            right: 10px;
            padding: 8px 12px !important;
            font-size: 14px;
          }
          
          .ai-chat-container {
            left: 5% !important;
            width: 90% !important;
            bottom: 80px !important;
          }
          
          .fab-container {
            bottom: 20px !important;
            right: 20px !important;
          }
          
          .modal-content {
            width: 95% !important;
            padding: 1.5rem !important;
          }
          
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
          
          h2 { font-size: 1.5rem !important; }
          h3 { font-size: 1.2rem !important; }
        }

        @media screen and (max-width: 480px) {
          .sidebar__bottom .ai-button {
            font-size: 14px;
            padding: 12px;
          }
          
          .planner-stat-card div[style*="display: flex"] {
            flex-direction: column;
          }
          
          .planner-stat-card input,
          .planner-stat-card select {
            width: 100% !important;
          }
          
          div[style*="position: fixed"][style*="top: 20px"][style*="right: 20px"] {
            font-size: 12px;
            padding: 5px 10px !important;
          }
          
          .chat-messages .message {
            max-width: 90% !important;
          }
        }
      `}</style>

      {!isLoggedIn ? (
        // LOGIN SCREEN
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#f9fafb',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            padding: '32px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <button onClick={() => setShowLanding(true)} style={{
              marginBottom: '20px',
              background: 'none',
              border: 'none',
              color: '#10B981',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </button>

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
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px' }} required={isSignUp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px' }} required={isSignUp} />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px' }} required />
              </div>

              {authError && <div style={{ color: '#ef4444', fontSize: '14px' }}>{authError}</div>}

              <button type="submit" style={{ width: '100%', padding: '12px', background: '#1e293b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '8px' }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <p style={{ marginTop: '24px', textAlign: 'center' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); setAuthError(''); }} style={{ color: '#2563eb', textDecoration: 'none' }}>
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
          {/* Logout and Back buttons */}
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
            <button onClick={() => setShowLanding(true)} style={{
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
            <span style={{ color: '#1e293b', fontWeight: 600 }}>👋 Hi, {fullName || 'Hans'}!</span>
            <button onClick={handleLogout} style={{ padding: '5px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
              Logout
            </button>
          </div>

          {/* Main Dashboard Layout */}
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
                {/* DASHBOARD TAB */}
                <div className="tab active" id="dashboard">
                  <section id="view-stats" className="view-section">
                    <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
                      <div className="card">
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span className="card-title" style={{ fontWeight: 700 }}>Balance Trend</span>
                          <span className="filter-badge" style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', border: '1px solid #e2e8f0' }}>Current Year</span>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981' }}>
                          {formatPHP(records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0) - records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0))}
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                          <span style={{ fontWeight: 600, color: '#10B981' }}>↑ 12%</span> vs last month
                        </p>
                        <div style={{ height: '200px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#94a3b8' }}>Chart would render here</span>
                        </div>
                      </div>
                    </div>

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

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                      <div className="card">
                        <h4 style={{ marginBottom: '15px' }}>Recent Transactions</h4>
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
                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px', padding: '12px' }} onClick={() => setShowRecordModal(true)}>
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
                    <div className="grid-2">
                      {budgets.map(b => {
                        const pct = (b.spent / b.limit_amount) * 100;
                        return (
                          <div key={b.id} className="card" style={{ borderLeft: `4px solid ${pct > 90 ? '#ef4444' : '#10B981'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontWeight: 700 }}>{b.name}</span>
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.period}</span>
                            </div>
                            <div style={{ margin: '15px 0' }}>
                              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: pct > 90 ? '#ef4444' : '#10B981', borderRadius: '10px' }}></div>
                              </div>
                              <div style={{ fontSize: '0.8rem', marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{formatPHP(b.spent)} spent</span>
                                <span>{formatPHP(b.limit_amount)}</span>
                              </div>
                            </div>
                            <button onClick={() => deleteBudget(b.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
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
                      <div className="card" style={{ background: '#10B981', color: 'white' }}>
                        <label style={{ color: 'rgba(255,255,255,0.8)' }}>Total Savings Goal</label>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px', flexWrap: 'wrap' }}>
                          <input type="number" value={planner.mainGoal} onChange={(e) => setPlanner({...planner, mainGoal: parseFloat(e.target.value) || 0})} style={{ fontSize: '1.5rem', fontWeight: '700', width: '180px', padding: '8px', borderRadius: '6px', border: 'none' }} />
                          <select value={planner.period} onChange={(e) => setPlanner({...planner, period: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: 'none' }}>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          Required: {formatPHP(planner.mainGoal / (planner.period === 'Monthly' ? 12 : planner.period === 'Weekly' ? 52 : 365))} / {planner.period}
                        </div>
                      </div>

                      <div className="card">
                        <h4>Allocation Breakdown</h4>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: `conic-gradient(#10B981 0% ${Math.min(100, (planner.items.reduce((s, i) => s + i.cost, 0) / planner.mainGoal) * 100)}%, #f1f5f9 ${Math.min(100, (planner.items.reduce((s, i) => s + i.cost, 0) / planner.mainGoal) * 100)}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '24px', fontWeight: 700 }}>{Math.round((planner.items.reduce((s, i) => s + i.cost, 0) / planner.mainGoal) * 100)}%</span>
                              <span style={{ fontSize: '12px', color: '#64748b' }}>Allocated</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Goal:</span><span>{formatPHP(planner.mainGoal)}</span></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Allocated:</span><span>{formatPHP(planner.items.reduce((s, i) => s + i.cost, 0))}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="card" style={{ marginTop: '20px' }}>
                      <h4>Items to Buy {planner.items.length} / 3 Items</h4>
                      {planner.items.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                          <span>{item.name}</span>
                          <span>{formatPHP(item.cost)}</span>
                          <button onClick={() => deletePlannerItem(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                        <input placeholder="Item Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                        <input type="number" placeholder="Cost" value={newItemCost} onChange={(e) => setNewItemCost(e.target.value)} style={{ width: '100px', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                        <button onClick={() => window.addPlannerItem?.()} className="btn btn-primary">Add</button>
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
                    <div className="grid-2">
                      {debts.map(d => (
                        <div key={d.id} className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 700 }}>{d.name}</span>
                            <span style={{ background: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '20px', fontSize: '12px' }}>
                              Due {formatDate(d.due_date)}
                            </span>
                          </div>
                          <h3 style={{ margin: '10px 0' }}>{formatPHP(d.amount)}</h3>
                          <button onClick={() => deleteDebt(d.id)} className="btn btn-outline">Paid</button>
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
                    <div className="grid-2">
                      {goals.map(g => {
                        const pct = (g.saved / g.target) * 100;
                        return (
                          <div key={g.id} className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                              <div style={{ width: '50px', height: '50px', background: '#ECFDF5', color: '#10B981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                <i className={`fa-solid ${g.icon}`}></i>
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700 }}>{g.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Target: {formatPHP(g.target)}</div>
                                {g.date && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Due: {formatDate(g.date)}</div>}
                                <div style={{ marginTop: '10px', height: '8px', background: '#f1f5f9', borderRadius: '10px' }}>
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

          {/* FAB Button */}
          <div className="fab-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100 }}>
            <div className="fab-main" onClick={() => setFabOpen(!fabOpen)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#10B981', color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
              <i className="fa-solid fa-plus"></i>
            </div>
            {fabOpen && (
              <div style={{ position: 'absolute', bottom: '70px', right: '0', background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <div onClick={() => { setShowRecordModal(true); setFabOpen(false); }} style={{ padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-arrow-down" style={{ color: '#10B981', marginRight: '10px' }}></i> Add Income
                </div>
              </div>
            )}
          </div>

          {/* Modals - Keep existing modal code but I'll summarize for brevity */}
          {/* Record Modal */}
          {showRecordModal && (
            <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}>
                <h3 style={{ marginBottom: '20px' }}>Add Transaction</h3>
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
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Type</label>
                    <select value={recType} onChange={(e) => setRecType(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Amount</label>
                    <input type="number" value={recAmount} onChange={(e) => setRecAmount(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Date</label>
                    <input type="date" value={recDate} onChange={(e) => setRecDate(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Category</label>
                    <select value={recCategory} onChange={(e) => setRecCategory(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      {recType === 'expense' 
                        ? ['Food', 'Transport', 'Utilities', 'Shopping', 'Health'].map(c => <option key={c}>{c}</option>)
                        : ['Salary', 'Freelance', 'Investment'].map(c => <option key={c}>{c}</option>)
                      }
                    </select>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Note</label>
                    <input type="text" value={recNote} onChange={(e) => setRecNote(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
                    <button type="button" onClick={() => setShowRecordModal(false)} className="btn btn-outline">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Budget Modal */}
          {showBudgetModal && (
            <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
                <h3 style={{ marginBottom: '20px' }}>Create Budget</h3>
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
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Budget Name</label>
                    <input value={budgetName} onChange={(e) => setBudgetName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Limit Amount</label>
                    <input type="number" value={budgetLimit} onChange={(e) => setBudgetLimit(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Category</label>
                    <select value={budgetCategory} onChange={(e) => setBudgetCategory(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Shopping">Shopping</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create</button>
                    <button type="button" onClick={() => setShowBudgetModal(false)} className="btn btn-outline">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Debt Modal */}
          {showDebtModal && (
            <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
                <h3 style={{ marginBottom: '20px' }}>Add Debt</h3>
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
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Description</label>
                    <input value={debtName} onChange={(e) => setDebtName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Amount</label>
                    <input type="number" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Due Date</label>
                    <input type="date" value={debtDate} onChange={(e) => setDebtDate(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
                    <button type="button" onClick={() => setShowDebtModal(false)} className="btn btn-outline">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Goal Modal */}
          {showGoalModal && (
            <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
                <h3 style={{ marginBottom: '20px' }}>New Goal</h3>
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
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Goal Name</label>
                    <input value={goalName} onChange={(e) => setGoalName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Target Amount</label>
                    <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Target Date</label>
                    <input type="date" value={goalDate} onChange={(e) => setGoalDate(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create</button>
                    <button type="button" onClick={() => setShowGoalModal(false)} className="btn btn-outline">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* AI Chatbot */}
          {isChatOpen && (
            <div className="ai-chat-container">
              <div className="chat-header">
                <div><h3>Money Pilot AI</h3><span>● Online</span></div>
                <button className="close-chat" onClick={() => setIsChatOpen(false)}><i className="fa-solid fa-times"></i></button>
              </div>
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    <div className="message-avatar"><i className={`fa-solid ${msg.role === 'assistant' ? 'fa-robot' : 'fa-user'}`}></i></div>
                    <div className="message-content">{msg.content}</div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="message assistant">
                    <div className="message-avatar"><i className="fa-solid fa-robot"></i></div>
                    <div className="typing-indicator"><span></span><span></span><span></span></div>
                  </div>
                )}
              </div>
              <div className="chat-input-area">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChatSend()} placeholder="Ask about finances..." />
                <button onClick={handleChatSend} disabled={isChatLoading || !chatInput.trim()}><i className="fa-solid fa-paper-plane"></i></button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
