import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api";
import { auth } from "./auth";

// ...

export const ApplicationForm: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const user = auth.getUser();

    // Expanded Form State matching reference
    const [formData, setFormData] = useState({
        // ... (state remains same)

        // Step 1: Source
        source: "",

        // Step 2: Personal
        fullName: "",
        gender: "",
        dob: "",
        nationality: "Indian",
        aadhar: "",
        bloodGroup: "",
        motherTongue: "",
        community: "",

        // Step 3: Contact
        address: "",
        city: "",
        state: "",
        pincode: "",
        studentMobile: "",
        studentEmail: "",
        parentMobile: "",
        parentEmail: "",

        // Step 4: Family
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        guardianName: "",

        // Step 5: Academic (Basic)
        schoolName10: "",
        board10: "",
        percentage10: "",
        year10: "",
        schoolName12: "",
        board12: "",
        percentage12: "",
        year12: "",

        // Step 6: Entrance Exam
        examName: "",
        examRoll: "",
        examScore: "",
        examRank: "",

        // Step 7: Course
        program: "",
        course: "",
        courseChoice2: "",
        courseChoice3: "",

        // Step 8: Reservation
        isFirstGraduate: "",
        isMinority: "",

        // Step 9: Scholarship / Details
        languagesKnown: "",
        achievements: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        emergencyRelation: "",

        // Step 10 & 11 handled as UI steps (Payment & Declaration)
    });

    // Check auth and load data
    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const loadApplication = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/application/${user._id}`);
                if (res.ok) {
                    const savedApp = await res.json();
                    if (savedApp) {
                        setFormData(prev => ({
                            ...prev,
                            ...savedApp
                        }));
                        // Optional: if savedApp.status === 'submitted', maybe redirect?
                        // For now we just load data.

                        // We could also try to infer step, but simply restoring data is key.
                    } else {
                        // Pre-fill user data if no app exists
                        setFormData(prev => ({
                            ...prev,
                            fullName: user.fullName || "",
                            studentEmail: user.email || "",
                            studentMobile: user.mobile || "",
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to load application", error);
            }
        };

        loadApplication();
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        window.scrollTo(0, 0);
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        window.scrollTo(0, 0);
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/application`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?._id,
                    data: formData,
                    status: "submitted"
                })
            });

            if (!res.ok) throw new Error("Submission failed");

            alert("Application Submitted Successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Failed to submit application.");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndExit = async () => {
        if (!user) {
            window.location.href = "/";
            return;
        }
        setLoading(true);
        try {
            // Save as draft (in_progress) without validation
            const res = await fetch(`${API_BASE_URL}/application`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?._id,
                    data: formData,
                    status: "in_progress"
                })
            });
            // Proceed even if save fails (or maybe alert?)
            // forcing hard redirect to home
            window.location.href = "/";
        } catch (error) {
            console.error("Save draft failed", error);
            // Force exit
            window.location.href = "/";
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER STEPS ---

    const renderStep1 = () => (
        <div className="form-section">
            <h3>Step 1: How did you find us?</h3>
            <div className="field">
                <label>Source Information *</label>
                <select name="source" value={formData.source} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Website">Social Media (FB, Insta, etc.)</option>
                    <option value="Friend">Friend / Relative Reference</option>
                    <option value="Paper">Newspaper Advertisement</option>
                    <option value="WalkIn">Direct Walk-in</option>
                </select>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="form-section">
            <h3>Step 2: Personal Information</h3>
            <div className="grid-2">
                <div className="field">
                    <label>Full Name *</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="field">
                    <label>Date of Birth *</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Nationality</label>
                    <select name="nationality" value={formData.nationality} onChange={handleChange}>
                        <option value="Indian">Indian</option>
                        <option value="NRI">NRI</option>
                        <option value="Foreign">Foreign National</option>
                    </select>
                </div>
                <div className="field">
                    <label>Aadhar Number</label>
                    <input name="aadhar" value={formData.aadhar} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" />
                </div>
                <div className="field">
                    <label>Blood Group</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="O-">O-</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <div className="field">
                    <label>Mother Tongue</label>
                    <input name="motherTongue" value={formData.motherTongue} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Community</label>
                    <input name="community" value={formData.community} onChange={handleChange} placeholder="e.g. BC, MBC, SC/ST" />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="form-section">
            <h3>Step 3: Contact Information</h3>
            <div className="field">
                <label>Permanent Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={3} />
            </div>
            <div className="grid-3">
                <div className="field">
                    <label>City</label>
                    <input name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>State</label>
                    <input name="state" value={formData.state} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Pincode</label>
                    <input name="pincode" value={formData.pincode} onChange={handleChange} />
                </div>
            </div>
            <hr className="divider" />
            <div className="grid-2">
                <div className="field">
                    <label>Student Mobile *</label>
                    <input name="studentMobile" value={formData.studentMobile} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Student Email *</label>
                    <input name="studentEmail" value={formData.studentEmail} readOnly className="disabled" />
                </div>
                <div className="field">
                    <label>Parent Mobile</label>
                    <input name="parentMobile" value={formData.parentMobile} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Parent Email</label>
                    <input name="parentEmail" value={formData.parentEmail} onChange={handleChange} />
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="form-section">
            <h3>Step 4: Family Details</h3>
            <div className="grid-2">
                <div className="field">
                    <label>Father's Name</label>
                    <input name="fatherName" value={formData.fatherName} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Occupation</label>
                    <input name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Mother's Name</label>
                    <input name="motherName" value={formData.motherName} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Occupation</label>
                    <input name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
                </div>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="form-section">
            <h3>Step 5: Academic Details</h3>

            <h4>10th Standard / SSLC</h4>
            <div className="grid-2">
                <div className="field">
                    <label>School Name</label>
                    <input name="schoolName10" value={formData.schoolName10} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Board</label>
                    <input name="board10" value={formData.board10} onChange={handleChange} placeholder="e.g. State Board, CBSE" />
                </div>
                <div className="field">
                    <label>Percentage / CGPA</label>
                    <input name="percentage10" value={formData.percentage10} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Year of Passing</label>
                    <input name="year10" value={formData.year10} onChange={handleChange} />
                </div>
            </div>

            <hr className="divider" />

            <h4>12th Standard / HSC / Diploma</h4>
            <div className="grid-2">
                <div className="field">
                    <label>School / College Name</label>
                    <input name="schoolName12" value={formData.schoolName12} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Board</label>
                    <input name="board12" value={formData.board12} onChange={handleChange} placeholder="e.g. State Board, CBSE" />
                </div>
                <div className="field">
                    <label>Percentage / CGPA</label>
                    <input name="percentage12" value={formData.percentage12} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Year of Passing</label>
                    <input name="year12" value={formData.year12} onChange={handleChange} />
                </div>
            </div>
        </div>
    );

    const renderStep6 = () => (
        <div className="form-section">
            <h3>Step 6: Entrance Examination</h3>
            <div className="field">
                <label>Name of Entrance Exam</label>
                <select name="examName" value={formData.examName} onChange={handleChange}>
                    <option value="">Select Exam</option>
                    <option value="TNEA">TNEA</option>
                    <option value="JEE">JEE Main</option>
                    <option value="Other">Other</option>
                    <option value="None">None / Management Quota</option>
                </select>
            </div>
            {formData.examName && formData.examName !== "None" && (
                <div className="grid-3">
                    <div className="field">
                        <label>Roll Number</label>
                        <input name="examRoll" value={formData.examRoll} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Score / Cutoff</label>
                        <input name="examScore" value={formData.examScore} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <label>Rank</label>
                        <input name="examRank" value={formData.examRank} onChange={handleChange} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep7 = () => (
        <div className="form-section">
            <h3>Step 7: Course Preferences</h3>
            <div className="field">
                <label>Preferred Degree</label>
                <select name="program" value={formData.program} onChange={handleChange}>
                    <option value="">Select Degree</option>
                    <option value="BE">B.E - Bachelor of Engineering</option>
                    <option value="BTech">B.Tech - Bachelor of Technology</option>
                </select>
            </div>

            <div className="field">
                <label>Course Choice 1 (Priority)</label>
                <select name="course" value={formData.course} onChange={handleChange}>
                    <option value="">Select Course</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication Engineering</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                    <option value="AI">Artificial Intelligence & Data Science</option>
                </select>
            </div>

            <div className="field">
                <label>Course Choice 2</label>
                <select name="courseChoice2" value={formData.courseChoice2} onChange={handleChange}>
                    <option value="">Select Course</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication Engineering</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                    <option value="AI">Artificial Intelligence & Data Science</option>
                </select>
            </div>

            <div className="field">
                <label>Course Choice 3</label>
                <select name="courseChoice3" value={formData.courseChoice3} onChange={handleChange}>
                    <option value="">Select Course</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication Engineering</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                    <option value="AI">Artificial Intelligence & Data Science</option>
                </select>
            </div>
        </div>
    );

    const renderStep8 = () => (
        <div className="form-section">
            <h3>Step 8: Reservation Categories</h3>
            <div className="grid-2">
                <div className="field">
                    <label>First Graduate in Family?</label>
                    <select name="isFirstGraduate" value={formData.isFirstGraduate} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="field">
                    <label>Minority Status?</label>
                    <select name="isMinority" value={formData.isMinority} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes (Christian/Muslim)</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep9 = () => (
        <div className="form-section">
            <h3>Step 9: Additional Details</h3>
            <div className="field">
                <label>Languages Known</label>
                <input name="languagesKnown" value={formData.languagesKnown} onChange={handleChange} placeholder="e.g. Tamil, English" />
            </div>
            <div className="field">
                <label>Achievements (Sports/Co-curricular)</label>
                <textarea name="achievements" value={formData.achievements} onChange={handleChange} rows={2} />
            </div>

            <h4>Emergency Contact</h4>
            <div className="grid-3">
                <div className="field">
                    <label>Contact Name</label>
                    <input name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Contact Number</label>
                    <input name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Relation</label>
                    <input name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} />
                </div>
            </div>
        </div>
    );

    const renderStep10 = () => (
        <div className="form-section">
            <h3>Step 10: Application Fee Payment</h3>
            <div className="review-box" style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
                <h4>Application Fee: ₹ 1,000</h4>
                <p>Non-refundable registration fee (Simulated Payment)</p>
                <button className="btn-outline" style={{ marginTop: '1rem' }} onClick={(e) => { e.preventDefault(); alert("Payment Simulated: Successful"); }}>
                    Pay Now
                </button>
            </div>
            <div className="field">
                <label style={{ textAlign: 'center', display: 'block', marginTop: '1rem', color: 'green' }}>
                    <input type="checkbox" checked readOnly /> Payment Verified
                </label>
            </div>
        </div>
    );

    const renderStep11 = () => (
        <div className="form-section review-section">
            <h3>Step 11: Final Review & Declaration</h3>
            <div className="review-box">
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Mobile:</strong> {formData.studentMobile}</p>
                <p><strong>Course 1:</strong> {formData.program} - {formData.course}</p>
                <p><strong>Exam:</strong> {formData.examName}</p>

                <div className="declaration">
                    <input type="checkbox" id="declare" />
                    <label htmlFor="declare">
                        I hereby declare that the information provided above is true and correct to the best of my knowledge.
                        I understand that admission is subject to verification of certificates.
                    </label>
                </div>
            </div>
        </div>
    );

    return (
        <div className="app-page">
            <header className="dashboard-header">
                <div className="brand">
                    <div className="logo-icon">🎓</div>
                    <h1>Admission Application</h1>
                </div>
                <button className="btn-logout" onClick={handleSaveAndExit} disabled={loading}>
                    {loading ? "Saving..." : "Save & Exit"}
                </button>
            </header>

            <main className="app-main">
                {/* Stepper */}
                <div className="stepper-container" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(s => (
                        <React.Fragment key={s}>
                            <div className={`step-dot ${step >= s ? "active" : ""}`} style={{ minWidth: '32px' }}>{s}</div>
                            {s < 11 && <div className="step-line"></div>}
                        </React.Fragment>
                    ))}
                </div>
                <div className="step-labels" style={{ justifyContent: 'center', gap: '1rem' }}>
                    <span style={{ color: '#64748b' }}>Step {step} of 11</span>
                </div>

                <div className="form-card">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                    {step === 5 && renderStep5()}
                    {step === 6 && renderStep6()}
                    {step === 7 && renderStep7()}
                    {step === 8 && renderStep8()}
                    {step === 9 && renderStep9()}
                    {step === 10 && renderStep10()}
                    {step === 11 && renderStep11()}

                    <div className="form-actions">
                        {step > 1 && <button className="btn-outline" onClick={handleBack}>Back</button>}
                        {step < 11 ? (
                            <button className="btn-primary" onClick={handleNext}>Next</button>
                        ) : (
                            <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
