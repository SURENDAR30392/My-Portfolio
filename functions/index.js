const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Authorized Admin Email
const AUTHORIZED_ADMIN_EMAIL = "marthalasurendarreddy@gmail.com";

/**
 * 1. Submit Contact Form Message with Backend Validation
 */
exports.submitContactMessage = functions.https.onCall(async (data, context) => {
  const { name, email, subject, message, hp_check } = data || {};

  // Spam Honeypot check
  if (hp_check) {
    return { success: true };
  }

  // Field validations
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "Name is required.");
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new functions.https.HttpsError("invalid-argument", "A valid email address is required.");
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "Message cannot be empty.");
  }

  try {
    const newMessage = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 100),
      subject: (subject || "General Inquiry").trim().substring(0, 150),
      message: message.trim().substring(0, 3000),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      read: false,
      ip: context.rawRequest?.ip || null
    };

    await db.collection("messages").add(newMessage);

    return { 
      success: true, 
      message: "Message received successfully. Surendar will get in touch with you shortly." 
    };
  } catch (error) {
    console.error("Error storing contact message:", error);
    throw new functions.https.HttpsError("internal", "Unable to save message at this time.");
  }
});

/**
 * 2. Assign Super Admin Custom Claim to authorized owner
 */
exports.assignAdminRole = functions.auth.user().onCreate(async (user) => {
  if (user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
    try {
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });
      console.log(`Successfully assigned admin claim to owner: ${user.email}`);
    } catch (error) {
      console.error("Error setting custom claims:", error);
    }
  }
});

