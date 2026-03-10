"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import LandingPage from "./components/LandingPage";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Auth states
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Data states
  const [budgets, setBudgets] = useState([
    { id: 1, name: "Monthly Food", limit_amount: 8000, category: "Food", period: "Month", spent: 4500 },
    { id: 2, name: "Transportation", limit_amount: 3000, category: "Transport", period: "Month", spent: 1200 },
    { id: 3, name: "Shopping", limit_amount: 5000, category: "Shopping", period: "Month", spent: 2500 },
  ]);

  const [debts, setDebts] = useState([
    { id: 1, name: "Credit Card", amount: 15000, due_date: "2024-12-01" },
    { id: 2, name: "Student Loan", amount: 50000, due_date: "2025-01-15" },
  ]);

  const [goals, setGoals] = useState([
    { id: 1, name: "New Laptop", target: 60000, saved: 15000, date: "2024-06-01", icon: "fa-laptop" },
    { id: 2, name: "Emergency Fund", target: 100000, saved: 25000, date: "2024-12-31", icon: "fa-piggy-bank" },
  ]);

  const [planner, setPlanner] = useState({
    mainGoal: 50000,
    period: "Monthly",
    items: [
      { id: 1, name: "Standing Desk", cost: 15000 },
      { id: 2, name: "New Monitor", cost: 12000 },
    ]
  });

  const [records, setRecords] = useState([
    { id: 1, type: 'income', amount: 45000, category: 'Salary', date: '2024-03-01', desc: 'Monthly Salary' },
    { id: 2, type: 'expense', amount: 2500, category: 'Food', date: '2024-03-02', desc: 'Groceries' },
    { id: 3, type: 'expense', amount: 500, category: 'Transport', date: '2024-03-03', desc: 'Gas' },
  ]);

  useEffect(() => {
    async function loadScripts() {
      window.supabase = supabase;
      window.appData = { budgets, debts, goals, records, planner };
      
      const scripts = [
        "/js/core/supabaseData.js",
        "/js/core/dashboard.js",
        "/js/features/budgets/budgets.js",
        "/js/features/debts/debts.js",
        "/js/features/goals/goals.js",
        "/js/features/savings/savings.js" 
      ];
  
      for (const src of scripts) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }
    }
    loadScripts();
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

  // Utility functions
  const formatPHP = (num) => '₱' + parseFloat(num).toLocaleString('en-PH', { minimumFractionDigits: 2 });
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const deleteBudget = (id) => {
    if (confirm('Delete this budget?')) setBudgets(budgets.filter(b => b.id !== id));
  };

  const deleteDebt = (id) => {
    if (confirm('Mark this debt as paid?')) setDebts(debts.filter(d => d.id !== id));
  };

  const deleteGoal = (id) => {
    if (confirm('Delete this goal?')) setGoals(goals.filter(g => g.id !== id));
  };

  const deletePlannerItem = (id) => {
    setPlanner({ ...planner, items: planner.items.filter(i => i.id !== id) });
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen 
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        fullName={fullName}
        setFullName={setFullName}
        dob={dob}
        setDob={setDob}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        authError={authError}
        handleAuth={handleAuth}
        onBackToHome={() => setShowLanding(true)}
      />
    );
  }

  return (
    <Dashboard 
      userData={{ fullName, email }}
      onLogout={handleLogout}
      onBackToHome={() => setShowLanding(true)}
      budgets={budgets}
      setBudgets={setBudgets}
      debts={debts}
      setDebts={setDebts}
      goals={goals}
      setGoals={setGoals}
      planner={planner}
      setPlanner={setPlanner}
      records={records}
      setRecords={setRecords}
      formatPHP={formatPHP}
      formatDate={formatDate}
      deleteBudget={deleteBudget}
      deleteDebt={deleteDebt}
      deleteGoal={deleteGoal}
      deletePlannerItem={deletePlannerItem}
    />
  );
}