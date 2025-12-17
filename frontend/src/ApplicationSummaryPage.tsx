import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api";
import { auth } from "./auth";

export const ApplicationSummaryPage: React.FC = () => {
    const navigate = useNavigate();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const user = auth.getUser();

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
    }, []);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Summary...</div>;
    if (!application) return <div style={{ padding: '2rem', textAlign: 'center' }}>No Application Found</div>;

    const {
        source, fullName, gender, dob, nationality, aadhar, bloodGroup, motherTongue, community,
        address, city, state, pincode, studentMobile, studentEmail, parentMobile, parentEmail,
        fatherName, fatherOccupation, motherName, motherOccupation,
        schoolName10, board10, percentage10, year10,
        schoolName12, board12, percentage12, year12,
        program, course, courseChoice2, courseChoice3,
        examName, examRoll, examScore, examRank,
        isFirstGraduate, isMinority,
        languagesKnown, achievements, emergencyContactName, emergencyContactNumber, emergencyRelation
    } = application;

    const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="summary-section">
            <h3>{title}</h3>
            <div className="summary-content">
                {children}
            </div>
        </div>
    );

    const Item = ({ label, value }: { label: string, value: string | undefined }) => (
        <div className="summary-item">
            <span className="label">{label}</span>
            <span className="value">{value || "-"}</span>
        </div>
    );

    return (
        <div className="app-page">
            <header className="dashboard-header">
                <div className="brand">
                    <div className="logo-icon">✅</div>
                    <h1>Submitted Application</h1>
                </div>
                <button className="btn-logout" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            </header>

            <main className="app-main" style={{ maxWidth: '1000px' }}>
                <div className="form-card" style={{ borderTop: '4px solid #10b981' }}>
                    <div className="summary-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="success-icon-container">✓</div>
                        <h2>Application Successful</h2>
                        <p>Application Number: <strong>{application.applicationNumber}</strong></p>
                        <p>Submitted on: {new Date(application.updatedAt).toLocaleDateString()}</p>
                    </div>

                    <Section title="1. Source Information">
                        <Item label="Source" value={source} />
                    </Section>

                    <Section title="2. Personal Information">
                        <Item label="Full Name" value={fullName} />
                        <Item label="Gender" value={gender} />
                        <Item label="Date of Birth" value={dob} />
                        <Item label="Nationality" value={nationality} />
                        <Item label="Aadhar" value={aadhar} />
                        <Item label="Blood Group" value={bloodGroup} />
                        <Item label="Mother Tongue" value={motherTongue} />
                        <Item label="Community" value={community} />
                    </Section>

                    <Section title="3. Contact Information">
                        <Item label="Permanent Address" value={address} />
                        <Item label="City" value={city} />
                        <Item label="State" value={state} />
                        <Item label="Pincode" value={pincode} />
                        <Item label="Student Mobile" value={studentMobile} />
                        <Item label="Student Email" value={studentEmail} />
                        <Item label="Parent Mobile" value={parentMobile} />
                        <Item label="Parent Email" value={parentEmail} />
                    </Section>

                    <Section title="4. Family Details">
                        <Item label="Father's Name" value={fatherName} />
                        <Item label="Father's Occupation" value={fatherOccupation} />
                        <Item label="Mother's Name" value={motherName} />
                        <Item label="Mother's Occupation" value={motherOccupation} />
                    </Section>

                    <Section title="5. Academic Details">
                        <Item label="10th School" value={schoolName10} />
                        <Item label="10th Board" value={board10} />
                        <Item label="10th %/CGPA" value={percentage10} />
                        <Item label="10th Year" value={year10} />
                        <Item label="12th School" value={schoolName12} />
                        <Item label="12th Board" value={board12} />
                        <Item label="12th %/CGPA" value={percentage12} />
                        <Item label="12th Year" value={year12} />
                    </Section>

                    <Section title="6. Entrance Examination">
                        <Item label="Exam Name" value={examName} />
                        <Item label="Roll Number" value={examRoll} />
                        <Item label="Score / Cutoff" value={examScore} />
                        <Item label="Rank" value={examRank} />
                    </Section>

                    <Section title="7. Course Preferences">
                        <Item label="Program" value={program} />
                        <Item label="First Choice" value={course} />
                        <Item label="Second Choice" value={courseChoice2} />
                        <Item label="Third Choice" value={courseChoice3} />
                    </Section>

                    <Section title="8. Reservation Categories">
                        <Item label="First Graduate" value={isFirstGraduate} />
                        <Item label="Minority" value={isMinority} />
                    </Section>

                    <Section title="9. Additional Details">
                        <Item label="Languages Known" value={languagesKnown} />
                        <Item label="Achievements" value={achievements} />
                    </Section>

                    <Section title="Emergency Contact">
                        <Item label="Name" value={emergencyContactName} />
                        <Item label="Number" value={emergencyContactNumber} />
                        <Item label="Relation" value={emergencyRelation} />
                    </Section>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button className="btn-primary" onClick={() => window.print()}>🖨️ Print Application</button>
                    </div>
                </div>
            </main>
        </div>
    );
};
