"use client";

import { useState } from "react";

export default function SavingsTab({ planner, setPlanner, formatPHP, deletePlannerItem }) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const addPlannerItem = () => {
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

  const totalCost = planner.items.reduce((s, i) => s + i.cost, 0);
  const percentage = Math.min(100, (totalCost / planner.mainGoal) * 100);

  return (
    <section id="view-planner" className="view-section">
      <div className="grid-2">
        <div className="card" style={{ background: '#10B981', color: 'white' }}>
          <label style={{ color: 'rgba(255,255,255,0.8)' }}>Total Savings Goal</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px', flexWrap: 'wrap' }}>
            <input 
              type="number" 
              value={planner.mainGoal} 
              onChange={(e) => setPlanner({...planner, mainGoal: parseFloat(e.target.value) || 0})} 
              style={{ fontSize: '1.5rem', fontWeight: '700', width: '180px', padding: '8px', borderRadius: '6px', border: 'none' }} 
            />
            <select 
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
          <div style={{ marginTop: '10px' }}>
            Required: {formatPHP(planner.mainGoal / (planner.period === 'Monthly' ? 12 : planner.period === 'Weekly' ? 52 : 365))} / {planner.period}
          </div>
        </div>

        <div className="card">
          <h4>Allocation Breakdown</h4>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <div style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              background: `conic-gradient(#10B981 0% ${percentage}%, #f1f5f9 ${percentage}% 100%)`,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: 700 }}>{Math.round(percentage)}%</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Allocated</span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Goal:</span><span>{formatPHP(planner.mainGoal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Allocated:</span><span>{formatPHP(totalCost)}</span></div>
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
          <input 
            placeholder="Item Name" 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)} 
            style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} 
          />
          <input 
            type="number" 
            placeholder="Cost" 
            value={newItemCost} 
            onChange={(e) => setNewItemCost(e.target.value)} 
            style={{ width: '100px', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }} 
          />
          <button onClick={addPlannerItem} className="btn btn-primary">Add</button>
        </div>
      </div>
    </section>
  );
}