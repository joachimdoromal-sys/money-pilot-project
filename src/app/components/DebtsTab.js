"use client";

import { useState } from "react";

export default function GoalsTab({ goals, setGoals, formatPHP, formatDate, deleteGoal }) {
  const [showModal, setShowModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDate, setGoalDate] = useState('');

  const addGoal = (e) => {
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
    setShowModal(false);
    setGoalName('');
    setGoalTarget('');
    setGoalDate('');
  };

  return (
    <section id="view-goals" className="view-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>Savings Goals</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
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

      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '20px' }}>New Goal</h3>
            <form onSubmit={addGoal}>
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
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}