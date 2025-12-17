import React, { FormEvent, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  getPrograms,
  getSiteSettings,
  getStats,
  getTestimonials,
  Program,
  SiteSettings,
  StatMetric,
  submitLead,
  register,
  login,
  Testimonial,
} from "./api";
import { DashboardPage } from "./DashboardPage";
import { ApplicationForm } from "./ApplicationForm";
import { ApplicationSummaryPage } from "./ApplicationSummaryPage";
import { auth } from "./auth";
import { 
  Phone, 
  Globe, 
  Award, 
  Briefcase, 
  Target, 
  Microscope, 
  GraduationCap, 
  Star, 
  HelpCircle, 
  ArrowLeft,
  Mail,
  MapPin
} from "lucide-react";

type LoadState = "idle" | "loading" | "success" | "error";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [stats, setStats] = useState<StatMetric[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [state, setState] = useState<LoadState>("idle");

  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setState("loading");
        const [s, st, p, t] = await Promise.all([
          getSiteSettings(),
          getStats(),
          getPrograms(),
          getTestimonials(),
        ]);
        setSettings(s);
        setStats(st);
        setPrograms(p);
        setTestimonials(t);
        setState("success");
      } catch (error) {
        console.error("Failed to load content", error);
        setState("error");
        // Log more details for debugging
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
      }
    }

    load();
  }, []);

  async function handleLeadSubmit(event: FormEvent) {
    event.preventDefault();
    setLeadSuccess(null);
    setLeadError(null);

    if (!firstName || !lastName || !email) {
      setLeadError("Please fill in first name, last name and email.");
      return;
    }

    try {
      setLeadSubmitting(true);
      await submitLead({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        message: message || undefined,
      });
      setLeadSuccess("Thank you! Our admissions team will contact you soon.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Lead submit failed", error);
      setLeadError("Could not submit the form. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="subtitle">SASURIE-JEE 2026</p>
            <h1>SCHOLARSHIP ENTRANCE EXAM</h1>
            <p className="tagline">YOUR COLLEGE, YOUR CHOICE.</p>
            
            <ul className="hero-highlights">
              <li>One Exam. One Shot. Your Future.</li>
              <li>Scholarships & benefits for top scorers.</li>
              <li>Apply now & choose the college you love.</li>
            </ul>
            
            <div className="hero-actions">
              <button
                className="btn primary"
                onClick={() => navigate("/admissions")}
              >
                REGISTER NOW
              </button>
              <button className="btn outline">Download Prospectus</button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="scholarship-badge">
              <div className="badge-text">Top 50 Students Get<br />Scholarship Worth</div>
              <div className="badge-amount">₹1,00,000</div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        {state === "loading" && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {state === "error" && (
          <div className="error-message">
            Could not load data from the API. Make sure the backend is running on http://localhost:5001.
          </div>
        )}

        {state === "success" && (
          <>
            <section className="section">
              <h2>At a Glance</h2>
              <p>Discover what makes Sasurie Group of Institutions a leader in engineering education</p>
              <div className="grid stats-grid">
                {stats.map((s) => (
                  <article key={s._id} className="card stat-card">
                    <div className="stat-value">
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>Engineering Programs</h2>
              <p>Your Engineering Future Starts Right From Your Doorstep</p>
              <div className="grid program-grid">
                {programs.map((p) => (
                  <article key={p._id} className="card program-card">
                    <h3>{p.title}</h3>
                    <div className="program-meta">
                      <div className="program-meta-item">
                        <strong>Degree:</strong> {p.degree}
                      </div>
                      <div className="program-meta-item">
                        <strong>Duration:</strong> {p.duration}
                      </div>
                    </div>
                    <p>{p.description}</p>
                    <button className="btn secondary" onClick={() => navigate("/admissions")}>
                      Apply Now
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>Voices from our community</h2>
              <p>Hear from our successful students and alumni</p>
              <div className="grid testimonial-grid">
                {testimonials.map((t) => (
                  <article key={t._id} className="card testimonial-card">
                    <div className="testimonial-quote">"</div>
                    <p className="testimonial-text">{t.quote}</p>
                    <div className="testimonial-author">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section contact-form-section">
              <h2>Contact Admissions</h2>
              <p>Have questions? Our admissions team will contact you soon.</p>
              
              {leadSuccess && (
                <div className="success-message">{leadSuccess}</div>
              )}
              
              {leadError && (
                <div className="error-message">{leadError}</div>
              )}
              
              <form onSubmit={handleLeadSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9488891111"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    className="btn primary"
                    type="submit"
                    disabled={leadSubmitting}
                  >
                    {leadSubmitting ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>
              </form>
            </section>
          </>
        )}
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <img 
              src="/logo.png" 
              alt="Sasurie Logo" 
              style={{height: '80px', width: 'auto', objectFit: 'contain', marginBottom: '1rem'}}
            />
            <p>Coimbatore | Tiruppur</p>
            <p>Empowering future engineers since decades</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#programs">Programs</a>
            <a href="#admissions">Admissions</a>
            <a href="#campus">Campus Life</a>
            <a href="#placements">Placements</a>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-info-icon"><Phone size={24} /></div>
              <div>
                <p><strong>Call to Apply Now!</strong></p>
                <a 
                  href="tel:+919488891111" 
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    transition: 'var(--transition-smooth)',
                    display: 'block',
                    marginBottom: '0.8rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--white)'}
                >
                  +91 9488891111
                </a>
              </div>
            </div>
            <p>Visit our Website</p>
            <a 
              href="https://www.sasurie.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--white)',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'var(--transition-smooth)',
                display: 'block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--white)'}
            >
              www.sasurie.com
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Sasurie Group of Institutions. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!mobile.trim() || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeToTerms) {
      setError("You must agree to the Terms and Conditions and Privacy Policy");
      return;
    }

    try {
      setSubmitting(true);

      await register({
        fullName,
        email: email.trim(),
        mobile: mobile.trim(),
        password,
      });

      setSuccess("Account created successfully! Redirecting to login...");
      // Reset form
      setFullName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
      setAgreeToTerms(false);

      // Auto redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error("Registration failed", err);
      setError(err.message || "Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-container">
      <button 
        onClick={() => navigate("/")} 
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'var(--white)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          padding: '0.6rem 1.5rem',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--white)';
          e.currentTarget.style.color = 'var(--primary-red)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.color = 'var(--white)';
        }}
      >
        <ArrowLeft size={18} style={{marginRight: '0.5rem'}} /> Back to Home
      </button>
      
      <div className="auth-card" style={{maxWidth: '900px'}}>
        <div className="text-center mb-4">
          <img 
            src="/logo2.jpg" 
            alt="Sasurie Logo" 
            style={{height: '100px', width: 'auto', objectFit: 'contain', margin: '0 auto 1rem', display: 'block'}}
          />
          <h2>Create Account</h2>
          <p style={{color: 'var(--text-light)'}}>Start your admission journey today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setMobile(val);
                }}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                minLength={6}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
              />
            </div>

            <div className="form-group full-width" style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  style={{marginTop: '0.3rem'}}
                />
                <span style={{fontSize: '0.95rem'}}>
                  I agree to the Terms and Conditions and Privacy Policy
                </span>
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button
            className="btn primary"
            type="submit"
            disabled={submitting}
            style={{width: '100%', justifyContent: 'center'}}
          >
            {submitting ? "Creating Account..." : "Register"}
          </button>

          <div className="auth-link">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setSubmitting(true);
      const data = await login({ email, password });

      // Check success
      if (data && data.user) {
        // Save user to session
        auth.login(data.user);
        alert(`Welcome back, ${data.user.fullName}!`);
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.message || "Could not login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-container">
      <button 
        onClick={() => navigate("/")} 
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'var(--white)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          padding: '0.6rem 1.5rem',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--white)';
          e.currentTarget.style.color = 'var(--primary-red)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.color = 'var(--white)';
        }}
      >
        <ArrowLeft size={18} style={{marginRight: '0.5rem'}} /> Back to Home
      </button>
      
      <div className="auth-card">
        <div className="text-center mb-4">
          <img 
            src="/logo2.jpg" 
            alt="Sasurie Logo" 
            style={{height: '100px', width: 'auto', objectFit: 'contain', margin: '0 auto 1rem', display: 'block'}}
          />
          <h2>Applicant Login</h2>
          <p style={{color: 'var(--text-light)'}}>Continue your admission application</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email Address</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="btn primary"
            type="submit"
            disabled={submitting}
            style={{width: '100%', justifyContent: 'center'}}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          <div className="auth-link">
            Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate("/register"); }}>Register here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdmissionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div style={{
              background: 'var(--gold)',
              color: 'var(--primary-red)',
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              display: 'inline-block',
              fontWeight: '700',
              marginBottom: '1.5rem',
              fontSize: '0.95rem'
            }}>
              ADMISSIONS OPEN 2025-26
            </div>
            <h1>Shape Your Future in Engineering Excellence</h1>
            <p className="tagline">
              Apply online for undergraduate engineering programs at one of Tamil Nadu&apos;s premier institutions
            </p>
            <div className="hero-actions">
              <button
                className="btn primary"
                onClick={() => navigate("/register")}
              >
                Start Application
              </button>
              <button
                className="btn outline"
                onClick={() => navigate("/login")}
              >
                Continue Application
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="scholarship-badge">
              <div className="badge-text">Merit Based<br />Scholarships</div>
              <div className="badge-amount">Available</div>
              <div className="badge-subtitle">Apply Today!</div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main">
        <section className="section">
          <h2>Why Choose Sasurie?</h2>
          <p>Join thousands of successful engineers who started their journey with us</p>
          <div className="grid program-grid">
            <article className="card">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Award size={28} color="var(--gold)" /> Premier Institution</h3>
              <p>One of Tamil Nadu&apos;s leading engineering colleges with a legacy of excellence spanning decades.</p>
            </article>
            <article className="card">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Briefcase size={28} color="var(--gold)" /> Industry-Ready Programs</h3>
              <p>Curriculum designed in collaboration with industry leaders to ensure job readiness and practical skills.</p>
            </article>
            <article className="card">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Target size={28} color="var(--gold)" /> Excellent Placements</h3>
              <p>Strong track record of placements with top-tier companies across India and excellent salary packages.</p>
            </article>
            <article className="card">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Microscope size={28} color="var(--gold)" /> Modern Infrastructure</h3>
              <p>State-of-the-art labs, libraries, sports facilities and hostels to support your complete learning journey.</p>
            </article>
            <article className="card">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><GraduationCap size={28} color="var(--gold)" /> Expert Faculty</h3>
              <p>Learn from experienced professors and industry professionals dedicated to student success.</p>
            </article>
            <article className="card">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Star size={28} color="var(--gold)" /> Scholarship Programs</h3>
              <p>Merit-based scholarships worth ₹1,00,000 for top performers in entrance examinations.</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <h1>Contact admissions</h1>
          <p className="tagline">
            We&apos;re here to help you explore programs, admissions and campus life.
          </p>
        </div>
      </header>
      <main className="main">
        <p>
          Use the enquiry form on the home page for now. Dedicated contact page
          content will come later.
        </p>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent: React.FC = () => {
  // We need useLocation, so we extracted this component to be inside BrowserRouter
  const location = window.location; // Simple check or use hook if imported
  // Better to use hook
  return <InnerApp />;
};

const InnerApp: React.FC = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hideNavRoutes = ["/login", "/register", "/dashboard", "/application", "/application-summary"];
  const showNav = !hideNavRoutes.includes(pathname);

  return (
    <div className="page">
      {showNav && (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              <img 
                src="/logo.png" 
                alt="Sasurie Logo" 
                style={{height: '50px', width: 'auto', objectFit: 'contain'}}
              />
            </Link>
            <ul className="navbar-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li>
                <Link to="/register">
                  <button className="btn primary" style={{padding: '0.6rem 1.5rem', fontSize: '0.95rem'}}>
                    Apply Now
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/application-summary" element={<ApplicationSummaryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
};

export default App;


