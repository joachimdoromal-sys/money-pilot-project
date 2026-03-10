"use client";

export default function LandingPage({ onGetStarted }) {
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

          <button className="btn btn-primary" onClick={onGetStarted}>Launch App</button>
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
            <button className="btn btn-primary" onClick={onGetStarted}>Get Started</button>
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