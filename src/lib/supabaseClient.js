import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials exist and are valid
let supabase;

try {
  if (supabaseUrl && supabaseAnonKey && 
      supabaseUrl !== 'your_supabase_url_here' && 
      supabaseUrl.startsWith('https://')) {
    
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("✅ Supabase initialized with real credentials");
    
  } else {
    throw new Error("Invalid or missing credentials");
  }
} catch (e) {
  console.log("⚠️ Using mock Supabase client (no database connection)");
  
  // Create a complete mock client with all methods
  const mockData = {
    budgets: [
      { id: 1, name: "Monthly Food", limit_amount: 8000, category: "Food", period: "Month", created_at: new Date().toISOString() },
      { id: 2, name: "Transportation", limit_amount: 3000, category: "Transport", period: "Month", created_at: new Date().toISOString() },
      { id: 3, name: "Shopping", limit_amount: 5000, category: "Shopping", period: "Month", created_at: new Date().toISOString() }
    ],
    debts: [
      { id: 1, name: "Credit Card", amount: 15000, due_date: "2024-12-01", created_at: new Date().toISOString() },
      { id: 2, name: "Student Loan", amount: 50000, due_date: "2025-01-15", created_at: new Date().toISOString() }
    ],
    goals: [
      { id: 1, name: "New Laptop", target: 60000, date: "2024-06-01", icon: "fa-laptop", created_at: new Date().toISOString() },
      { id: 2, name: "Emergency Fund", target: 100000, date: "2024-12-31", icon: "fa-piggy-bank", created_at: new Date().toISOString() }
    ]
  };

  // Create a query builder that supports method chaining
  const createQueryBuilder = (table, data) => {
    let currentData = [...(data || [])];
    let currentFilters = [];
    
    const builder = {
      select: () => builder,
      order: (column, { ascending = true } = {}) => {
        // Sort the data
        currentData = [...currentData].sort((a, b) => {
          if (ascending) {
            return a[column] > b[column] ? 1 : -1;
          } else {
            return a[column] < b[column] ? 1 : -1;
          }
        });
        return builder;
      },
      eq: (column, value) => {
        currentFilters.push({ column, value, operator: 'eq' });
        return builder;
      },
      single: () => {
        const filtered = currentFilters.length > 0 
          ? currentData.filter(item => 
              currentFilters.every(filter => item[filter.column] === filter.value)
            )
          : currentData;
        return Promise.resolve({ data: filtered[0] || null, error: null });
      },
      then: (resolve) => {
        // Apply filters
        let filtered = currentData;
        if (currentFilters.length > 0) {
          filtered = currentData.filter(item => 
            currentFilters.every(filter => item[filter.column] === filter.value)
          );
        }
        resolve({ data: filtered, error: null });
      }
    };
    
    return builder;
  };

  supabase = {
    from: (table) => ({
      select: () => createQueryBuilder(table, mockData[table] || []),
      insert: (data) => {
        const newItem = { 
          id: Date.now(), 
          ...data,
          created_at: new Date().toISOString() 
        };
        if (mockData[table]) {
          mockData[table].push(newItem);
        }
        return Promise.resolve({ data: newItem, error: null });
      },
      delete: () => ({
        eq: (column, value) => {
          if (mockData[table]) {
            mockData[table] = mockData[table].filter(item => item[column] !== value);
          }
          return Promise.resolve({ error: null });
        }
      }),
      order: (column, { ascending = true } = {}) => ({
        select: () => ({
          then: (resolve) => {
            const sorted = [...(mockData[table] || [])].sort((a, b) => {
              if (ascending) {
                return a[column] > b[column] ? 1 : -1;
              } else {
                return a[column] < b[column] ? 1 : -1;
              }
            });
            resolve({ data: sorted, error: null });
          }
        })
      })
    }),
  };
  
  console.log("✅ Mock Supabase client ready with sample data");
}

export default supabase;