import { Router } from "express";
import { readDb, writeDb } from "../lib/db.js";
import { UserModel } from "../models/User.js";
import { ApplicationModel } from "../models/Application.js";
import { sendApplicationConfirmationEmail } from "../lib/emailService.js";

const router = Router();

// Health check
router.get("/health", (_req, res) =>
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  }),
);

// Site branding + global settings
router.get("/site-settings", async (_req, res) => {
  try {
    const db = await readDb();
    const settings = db.siteSettings;

    if (!settings) {
      return res.status(404).json({ message: "Site settings not found" });
    }

    return res.json(settings);
  } catch (error) {
    console.error("[site-settings] failed", error);
    return res.status(500).json({ message: "Failed to load site settings" });
  }
});

// Programs listing
router.get("/programs", async (_req, res) => {
  try {
    const db = await readDb();
    return res.json(db.programs);
  } catch (error) {
    console.error("[programs] failed", error);
    return res.status(500).json({ message: "Failed to load programs" });
  }
});

// Stats / metrics
router.get("/stats", async (_req, res) => {
  try {
    const db = await readDb();
    return res.json(db.stats);
  } catch (error) {
    console.error("[stats] failed", error);
    return res.status(500).json({ message: "Failed to load stats" });
  }
});

// Events / news / announcements
router.get("/events", async (_req, res) => {
  try {
    const db = await readDb();
    return res.json(db.events);
  } catch (error) {
    console.error("[events] failed", error);
    return res
      .status(500)
      .json({ message: "Failed to load events and announcements" });
  }
});

// Testimonials
router.get("/testimonials", async (_req, res) => {
  try {
    const db = await readDb();
    return res.json(db.testimonials);
  } catch (error) {
    console.error("[testimonials] failed", error);
    return res.status(500).json({ message: "Failed to load testimonials" });
  }
});

// Auth: Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, mobile } = req.body ?? {};

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Try MongoDB first, fallback to JSON if not connected
    try {
      // MONGO UPDATE: Check if user exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const newUser = await UserModel.create({
        fullName,
        email,
        password, // In a real app, HASH this password!
        mobile
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: { _id: newUser._id, email: newUser.email, fullName: newUser.fullName },
      });
    } catch (mongoError) {
      // MongoDB not available, use JSON fallback
      console.warn("[register] MongoDB not available, using JSON storage");

      const db = await readDb();

      // Check if user exists in JSON
      const existingUser = db.users.find((u: any) => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user in JSON
      const newUser = {
        _id: Date.now().toString(),
        fullName,
        email,
        password,
        mobile,
        createdAt: new Date().toISOString(),
      };

      db.users.push(newUser);
      await writeDb(db);

      return res.status(201).json({
        message: "User registered successfully",
        user: { _id: newUser._id, email: newUser.email, fullName: newUser.fullName },
      });
    }
  } catch (error) {
    console.error("[register] failed", error);
    return res.status(500).json({ message: "Registration failed" });
  }
});

// Auth: Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Try MongoDB first, fallback to JSON
    try {
      // MONGO UPDATE
      const user = await UserModel.findOne({ email, password }); // Plain text pwd for MVP

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.json({
        message: "Login successful",
        user: { _id: user._id, email: user.email, fullName: user.fullName },
      });
    } catch (mongoError) {
      // MongoDB not available, use JSON fallback
      console.warn("[login] MongoDB not available, using JSON storage");

      const db = await readDb();
      const user = db.users.find((u: any) => u.email === email && u.password === password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.json({
        message: "Login successful",
        user: { _id: user._id, email: user.email, fullName: user.fullName },
      });
    }
  } catch (error) {
    console.error("[login] failed", error);
    return res.status(500).json({ message: "Login failed" });
  }
});

// Application: Get user's application
router.get("/application/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // MONGO UPDATE
    const application = await ApplicationModel.findOne({ userId });
    return res.json(application || null);
  } catch (error) {
    console.error("[get-application] failed", error);
    return res.status(500).json({ message: "Failed to fetch application" });
  }
});

// Application: Update/Submit
router.post("/application", async (req, res) => {
  try {
    const { userId, data, status } = req.body ?? {};
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    // MONGO UPDATE: Find or create/update
    let application = await ApplicationModel.findOne({ userId });

    if (application) {
      // Update existing
      application.set({
        ...data,
        status: status || application.status,
        updatedAt: new Date()
      });
      await application.save();
    } else {
      // Create new
      const count = await ApplicationModel.countDocuments();
      const appNumber = `SCE25${(1000 + count + 1).toString().padStart(5, '0')}`;

      const newApplication = await ApplicationModel.create({
        userId,
        ...data,
        status: status || "in-progress",
        applicationNumber: appNumber,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Handle the case where create returns an array
      application = Array.isArray(newApplication) ? newApplication[0] : newApplication;
    }

    // Send email if application is submitted
    if (status === "submitted") {
      try {
        // Get user details
        const user = await UserModel.findById(userId);

        if (user && user.email) {
          console.log(`Sending confirmation email to ${user.email}...`);
          const emailResult = await sendApplicationConfirmationEmail(
            user.email,
            user.fullName || "Applicant",
            data
          );

          if (emailResult.success) {
            console.log(`✓ Confirmation email sent successfully to ${user.email}`);
          } else {
            console.error(`✗ Failed to send confirmation email:`, emailResult.error);
          }
        }
      } catch (emailError) {
        // Log error but don't fail the request
        console.error("[email] Error sending confirmation:", emailError);
      }
    }

    return res.json({ message: "Application saved", application });

  } catch (error) {
    console.error("[save-application] failed", error);
    return res.status(500).json({ message: "Failed to save application" });
  }
});

// Lead capture (contact / admissions forms)
router.post("/leads", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      interestAreas,
      message,
      source,
      meta,
    } = req.body ?? {};

    if (!firstName || !email) {
      return res
        .status(400)
        .json({ message: "firstName and email are required" });
    }

    const db = await readDb();
    const newLead = {
      _id: Date.now().toString(), // Simple ID generation
      firstName,
      lastName,
      email,
      phone,
      interestAreas,
      message,
      source,
      meta,
      createdAt: new Date().toISOString(),
    };

    db.leads.push(newLead);
    await writeDb(db);

    return res.status(201).json({ id: newLead._id, message: "Lead submitted" });
  } catch (error) {
    console.error("[leads] failed", error);
    return res.status(500).json({ message: "Failed to submit lead" });
  }
});

export default router;


