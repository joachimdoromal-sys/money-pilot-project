"use client";

export default function LoginScreen({ 
  isSignUp, setIsSignUp, 
  fullName, setFullName,
  dob, setDob,
  email, setEmail,
  password, setPassword,
  authError,
  handleAuth,
  onBackToHome
}) {
  return (
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
        <button onClick={onBackToHome} style={{
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
          <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); }} style={{ color: '#2563eb', textDecoration: 'none' }}>
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
  );
}