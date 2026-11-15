/**
 * Script to assign custom admin claim to Marthala Surendar Reddy
 * Usage:
 *   1. Download service-account.json from Firebase Console -> Project Settings -> Service Accounts
 *   2. Run: node scripts/set-admin-claim.js
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, 'service-account.json');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'marthalasurendarreddy@gmail.com';

if (!fs.existsSync(serviceAccountPath)) {
  console.log(`
ℹ️ Instructions for Custom Admin Claim:
1. Place your downloaded Firebase service account key at: ${serviceAccountPath}
2. Run: node scripts/set-admin-claim.js
Target Admin Email: ${ADMIN_EMAIL}
`);
  process.exit(0);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function grantAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(ADMIN_EMAIL);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Success! Custom claim { admin: true } assigned to ${user.email} (UID: ${user.uid}).`);
  } catch (error) {
    console.error('❌ Error assigning admin claim:', error.message);
  }
}

grantAdminClaim();
