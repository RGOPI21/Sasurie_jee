import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    applicationNumber: { type: String, unique: true },
    status: { type: String, default: "in-progress" }, // in-progress, submitted

    // Steps Data
    source: String,

    // Personal
    fullName: String,
    gender: String,
    dob: String,
    nationality: String,
    aadhar: String,
    bloodGroup: String,
    motherTongue: String,
    community: String,

    // Contact
    address: String,
    city: String,
    state: String,
    pincode: String,
    studentMobile: String,
    studentEmail: String,
    parentMobile: String,
    parentEmail: String,

    // Family
    fatherName: String,
    fatherOccupation: String,
    motherName: String,
    motherOccupation: String,
    guardianName: String,

    // Academic
    schoolName10: String,
    board10: String,
    percentage10: String,
    year10: String,
    schoolName12: String,
    board12: String,
    percentage12: String,
    year12: String,

    // Exam
    examName: String,
    examRoll: String,
    examScore: String,
    examRank: String,

    // Course
    program: String,
    course: String,
    courseChoice2: String,
    courseChoice3: String,

    // Reservation
    isFirstGraduate: String,
    isMinority: String,

    // Additional
    languagesKnown: String,
    achievements: String,
    emergencyContactName: String,
    emergencyContactNumber: String,
    emergencyRelation: String,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const ApplicationModel = mongoose.model("Application", ApplicationSchema);
