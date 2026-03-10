"use client";

import { useState } from "react";

export default function BudgetsTab({ budgets, setBudgets, formatPHP, deleteBudget }) {
  const [showModal, setShowModal] = useState(false);
  const [budgetName, setBudgetName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('Food');
  const [budgetPeriod, setBudgetPeriod] = useState('Month');

  const addBudget = (e) => {
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
    setShowModal(false);
    setBudgetName('');
    setBudgetLimit('');
  };

  return (
    <section id="view-budgets" className="view-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>Your Budgets</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
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

      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '20px' }}>Create Budget</h3>
            <form onSubmit={addBudget}>
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
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}