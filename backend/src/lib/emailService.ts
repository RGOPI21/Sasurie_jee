import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port: env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

// Email template for application submission
export const sendApplicationConfirmationEmail = async (
    userEmail: string,
    userName: string,
    applicationData: any
) => {
    try {
        // Generate application summary HTML
        const summaryHTML = generateApplicationSummaryHTML(userName, applicationData);

        const mailOptions = {
            from: `"Sasurie College of Engineering" <${env.SMTP_USER}>`,
            to: userEmail,
            subject: 'Application Submitted Successfully - Sasurie College of Engineering',
            html: summaryHTML,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

// Generate HTML for application summary
const generateApplicationSummaryHTML = (userName: string, appData: any) => {
    const {
        personalInfo,
        contactInfo,
        familyInfo,
        academicInfo,
        coursePreferences,
        reservationCategory,
        additionalDetails,
    } = appData;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%);
          color: #ffffff;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          margin: -30px -30px 30px -30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #fbbf24;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 14px;
        }
        .success-badge {
          background-color: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
          margin: 15px 0;
          font-weight: bold;
        }
        .section {
          margin-bottom: 25px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 20px;
        }
        .section:last-child {
          border-bottom: none;
        }
        .section-title {
          color: #991b1b;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          border-left: 4px solid #fbbf24;
          padding-left: 12px;
        }
        .info-row {
          display: flex;
          margin-bottom: 10px;
        }
        .info-label {
          font-weight: 600;
          color: #64748b;
          min-width: 200px;
        }
        .info-value {
          color: #0f172a;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #fbbf24;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }
        .important-note {
          background-color: #fef3c7;
          border-left: 4px solid #fbbf24;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Sasurie College of Engineering</h1>
          <p>Admission Application Confirmation</p>
          <div class="success-badge">✓ Application Submitted Successfully</div>
        </div>

        <p>Dear <strong>${userName}</strong>,</p>
        <p>Thank you for submitting your application to Sasurie College of Engineering. We have successfully received your application and it is now under review.</p>

        <div class="important-note">
          <strong>📌 Important:</strong> Please keep this email for your records. Your application details are summarized below.
        </div>

        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="info-row">
            <div class="info-label">Full Name:</div>
            <div class="info-value">${personalInfo?.fullName || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Gender:</div>
            <div class="info-value">${personalInfo?.gender || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Date of Birth:</div>
            <div class="info-value">${personalInfo?.dob || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Nationality:</div>
            <div class="info-value">${personalInfo?.nationality || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Blood Group:</div>
            <div class="info-value">${personalInfo?.bloodGroup || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Contact Information</div>
          <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value">${contactInfo?.email || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Mobile:</div>
            <div class="info-value">${contactInfo?.mobile || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Address:</div>
            <div class="info-value">${contactInfo?.address || 'N/A'}, ${contactInfo?.city || ''}, ${contactInfo?.state || ''} - ${contactInfo?.pincode || ''}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Academic Information</div>
          <div class="info-row">
            <div class="info-label">10th Percentage:</div>
            <div class="info-value">${academicInfo?.tenthPercentage || 'N/A'}%</div>
          </div>
          <div class="info-row">
            <div class="info-label">12th Percentage:</div>
            <div class="info-value">${academicInfo?.twelfthPercentage || 'N/A'}%</div>
          </div>
          <div class="info-row">
            <div class="info-label">12th Board:</div>
            <div class="info-value">${academicInfo?.twelfthBoard || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Course Preferences</div>
          <div class="info-row">
            <div class="info-label">First Preference:</div>
            <div class="info-value">${coursePreferences?.firstChoice || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Second Preference:</div>
            <div class="info-value">${coursePreferences?.secondChoice || 'N/A'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Third Preference:</div>
            <div class="info-value">${coursePreferences?.thirdChoice || 'N/A'}</div>
          </div>
        </div>

        <div class="important-note">
          <strong>📧 Next Steps:</strong>
          <ul style="margin: 10px 0 0 0; padding-left: 20px;">
            <li>Our admissions team will review your application within 5-7 business days</li>
            <li>You will receive further communication via email regarding your application status</li>
            <li>Please check your email regularly for updates</li>
            <li>For any queries, contact us at admissions@sasurie.ac.in</li>
          </ul>
        </div>

        <div class="footer">
          <p><strong>Sasurie College of Engineering</strong></p>
          <p>Vijayamangalam, Tirupur - 638056, Tamil Nadu, India</p>
          <p>Phone: +91-4257-226666 | Email: admissions@sasurie.ac.in</p>
          <p style="margin-top: 15px; font-size: 12px; color: #94a3b8;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Test email connection
export const testEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('✓ Email server is ready to send messages');
        return true;
    } catch (error) {
        console.error('✗ Email server connection failed:', error);
        return false;
    }
};
