import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api";
import { auth } from "./auth";
import { CheckCircle, FileText, HelpCircle, ClipboardList } from "lucide-react";

export const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const user = auth.getUser();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchApp = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/application/${user._id}`);
                if (res.ok) {
                    const data = await res.json();
                    setApplication(data);
                }
            } catch (error) {
                console.error("Failed to fetch application", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApp();
    }, [user, navigate]);

    const handleLogout = () => {
        auth.logout();
        navigate("/login");
    };

    if (!user) return null;

    const isSubmitted = application?.status === "submitted";
    const appNumber = application?.applicationNumber || "Pending";

    let progress = 33;
    let statusText = "Not Started";

    if (application) {
        if (isSubmitted) {
            progress = 100;
            statusText = "Submitted";
        } else {
            progress = 66;
            statusText = "In Progress";
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <img 
                        src="/logo.png" 
                        alt="Sasurie Logo" 
                        style={{height: '50px', width: 'auto', objectFit: 'contain'}}
                    />
                    <div>
                        <h1>Admission Portal</h1>
                        <p style={{opacity: 0.9, marginBottom: 0}}>Sasurie College of Engineering</p>
                    </div>
                </div>
                <div className="dashboard-actions">
                    <button onClick={() => navigate("/")} className="btn outline">
                        Home
                    </button>
                    <button onClick={handleLogout} className="btn secondary">
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className="application-status-card">
                            <h2>Welcome, {user.fullName}!</h2>
                            <p>Application Number: <strong>{appNumber}</strong></p>
                            
                            <div className={`status-badge ${application?.status || 'pending'}`}>
                                {statusText}
                            </div>
                            
                            <div className="progress-bar" style={{marginTop: '2rem'}}>
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p style={{marginTop: '0.5rem', color: 'var(--text-light)'}}>
                                Application Progress: {progress}%
                            </p>

                            <div style={{marginTop: '2rem'}}>
                                <h3 style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Next Steps</h3>
                                {isSubmitted ? (
                                    <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
                                        <div style={{fontSize: '3rem', marginBottom: '1rem'}}><CheckCircle size={48} color="var(--gold)" /></div>
                                        <h4>Application Completed</h4>
                                        <p>Your application has been successfully submitted. We will review your details and get back to you shortly.</p>
                                        <button 
                                            className="btn primary" 
                                            onClick={() => navigate("/application-summary")}
                                            style={{marginTop: '1rem'}}
                                        >
                                            View Application
                                        </button>
                                    </div>
                                ) : (
                                    <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
                                        <div style={{fontSize: '3rem', marginBottom: '1rem'}}><FileText size={48} color="var(--gold)" /></div>
                                        <h4>{application ? "Continue Your Application" : "Start Your Application"}</h4>
                                        <p>Complete the admission application form with your personal, academic, and course details.</p>
                                        <button 
                                            className="btn primary" 
                                            onClick={() => navigate("/application")}
                                            style={{marginTop: '1rem'}}
                                        >
                                            {application ? "Continue Application" : "Start Application"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', marginTop: '2rem'}}>
                            <div className="card">
                                <h3 style={{color: 'var(--primary-red)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><HelpCircle size={24} /> Need Help?</h3>
                                <p>If you have any questions or face issues during the application process, our support team is here to help.</p>
                                <p style={{marginTop: '1rem'}}><strong>Email:</strong> admissions@sasurie.ac.in</p>
                                <p><strong>Phone:</strong> +91 9488891111</p>
                            </div>
                            
                            <div className="card">
                                <h3 style={{color: 'var(--primary-red)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><ClipboardList size={24} /> Important Instructions</h3>
                                <ul style={{marginLeft: '1.2rem', lineHeight: '1.8'}}>
                                    <li>Complete all sections accurately</li>
                                    <li>Upload clear documents (PDF/JPG)</li>
                                    <li>Keep your application number safe</li>
                                    <li>Submit before the deadline</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
