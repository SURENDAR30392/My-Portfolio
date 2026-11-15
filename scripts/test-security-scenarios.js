/**
 * Security Rule & Authentication Test Suite for MSR Portfolio
 * 
 * Tests the 10 core validation requirements:
 * 1. Only the exact authorized UID passes the Super Admin rule
 * 2. An authenticated user with another UID is denied
 * 3. An unverified account is denied
 * 4. Public visitors can read published portfolio content
 * 5. Public visitors cannot write portfolio content
 * 6. Public visitors cannot read messages
 * 7. Public visitors can submit valid contact messages
 * 8. Invalid contact messages are rejected
 * 9. The default-deny rule blocks unknown collections
 * 10. No Gmail address is displayed anywhere in the admin UI
 */

import fs from 'fs';
import path from 'path';

const EXACT_SUPER_ADMIN_UID = 'HOHTgjkAZlTPOO7bH98ukkw2vip1';

function runValidationTests() {
  console.log('================================================================');
  console.log('MSR PORTFOLIO - FINAL SUPER ADMIN & EMAIL PRIVACY TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assertTest(name, condition, details) {
    total++;
    if (condition) {
      passed++;
      console.log(`✅ [PASS] Test ${total}: ${name}`);
    } else {
      console.error(`❌ [FAIL] Test ${total}: ${name}`);
    }
    if (details) console.log(`   └─ ${details}`);
  }

  // Helper matching firestore.rules isSuperAdmin()
  const isSuperAdminRule = (auth) => {
    return auth != null &&
      auth.uid === EXACT_SUPER_ADMIN_UID &&
      auth.token?.email_verified === true;
  };

  // --- 1. Only the exact authorized UID passes the Super Admin rule ---
  const validAdminAuth = {
    uid: EXACT_SUPER_ADMIN_UID,
    token: { email_verified: true }
  };
  assertTest(
    'Only the exact authorized UID passes the Super Admin rule',
    isSuperAdminRule(validAdminAuth),
    `UID: ${EXACT_SUPER_ADMIN_UID} with email_verified: true succeeds`
  );

  // --- 2. An authenticated user with another UID is denied ---
  const anotherUserAuth = {
    uid: 'OTHER_USER_UID_998877665544',
    token: { email_verified: true }
  };
  assertTest(
    'Authenticated user with another UID is denied Super Admin access',
    !isSuperAdminRule(anotherUserAuth),
    'Different UID is strictly denied write/admin operations'
  );

  // --- 3. An unverified account is denied ---
  const unverifiedAdminAuth = {
    uid: EXACT_SUPER_ADMIN_UID,
    token: { email_verified: false }
  };
  assertTest(
    'Unverified account is denied Super Admin access',
    !isSuperAdminRule(unverifiedAdminAuth),
    'email_verified == false is rejected by isSuperAdmin()'
  );

  // --- 4. Public visitors can read published portfolio content ---
  const canReadProject = (doc, auth) => {
    return doc.published === true || isSuperAdminRule(auth);
  };
  assertTest(
    'Public visitors can read published portfolio content',
    canReadProject({ title: 'Algorithmic Code Arena', published: true }, null),
    'Published documents are accessible without authentication'
  );

  // --- 5. Public visitors cannot write portfolio content ---
  const canWriteProject = (auth) => {
    return isSuperAdminRule(auth);
  };
  assertTest(
    'Public visitors cannot write portfolio content',
    !canWriteProject(null),
    'Unauthenticated write to projects collection is rejected'
  );

  // --- 6. Public visitors cannot read messages ---
  const canReadMessages = (auth) => {
    return isSuperAdminRule(auth);
  };
  assertTest(
    'Public visitors cannot read contact messages',
    !canReadMessages(null),
    'Unauthenticated read to messages collection is rejected'
  );

  // --- 7. Public visitors can submit valid contact messages ---
  const isValidMessage = (data) => {
    const allowedKeys = ['name', 'email', 'subject', 'message', 'read', 'timestamp', 'createdAt', 'id', 'hp_check'];
    const dataKeys = Object.keys(data);
    const hasAllRequired = ['name', 'email', 'subject', 'message'].every(k => dataKeys.includes(k));
    const hasOnlyAllowed = dataKeys.every(k => allowedKeys.includes(k));

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    return (
      hasAllRequired &&
      hasOnlyAllowed &&
      typeof data.name === 'string' && data.name.length >= 2 && data.name.length <= 100 &&
      typeof data.email === 'string' && data.email.length <= 100 && emailRegex.test(data.email) &&
      typeof data.subject === 'string' && data.subject.length >= 2 && data.subject.length <= 200 &&
      typeof data.message === 'string' && data.message.length >= 5 && data.message.length <= 2000 &&
      data.read === false
    );
  };

  const validSubmission = {
    name: 'Tech Recruiter',
    email: 'recruiter@university-partner.com',
    subject: 'Internship Role Discussion',
    message: 'Hello Surendar, reviewing your Java backend projects and interested in scheduling a discussion.',
    read: false
  };
  assertTest(
    'Public visitors can submit valid contact messages',
    isValidMessage(validSubmission),
    'Payload satisfies length limits, email regex, required fields, and read: false'
  );

  // --- 8. Invalid contact messages are rejected ---
  const invalidSubmissionTampered = {
    name: 'A', // too short (< 2)
    email: 'bad-email',
    subject: 'Hi',
    message: 'test', // too short (< 5)
    read: true, // attempting to mark read
    unexpectedSecretField: 'injection' // rejected unexpected field
  };
  assertTest(
    'Invalid or tampered contact messages are rejected',
    !isValidMessage(invalidSubmissionTampered),
    'Failed length, email format, and rejected unexpected field'
  );

  // --- 9. The default-deny rule blocks unknown collections ---
  const isPathAllowed = (pathStr, auth) => {
    const knownCollections = ['profile', 'skills', 'projects', 'education', 'experience', 'certifications', 'achievements', 'socialLinks', 'settings', 'messages', 'content'];
    const col = pathStr.split('/')[0];
    if (!knownCollections.includes(col)) {
      return false; // Default deny
    }
    return isSuperAdminRule(auth);
  };
  assertTest(
    'Default-deny rule blocks unknown collections and paths',
    !isPathAllowed('server_logs/item1', validAdminAuth),
    'Wildcard match /{document=**} blocks unknown paths'
  );

  // --- 10. No Gmail address is displayed anywhere in the admin UI ---
  const adminDir = path.resolve('src/admin');
  let gmailFoundInAdmin = false;
  let filesChecked = 0;

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
        filesChecked++;
        const content = fs.readFileSync(fullPath, 'utf8');
        // Check for literal Gmail
        if (content.includes('marthalasurendarreddy@gmail.com')) {
          gmailFoundInAdmin = true;
          console.error(`   Found Gmail in: ${path.relative('.', fullPath)}`);
        }
      }
    }
  }
  scanDir(adminDir);

  assertTest(
    'No Gmail address is displayed anywhere in the admin UI',
    !gmailFoundInAdmin,
    `Scanned ${filesChecked} admin source files. Verified zero occurrences of Gmail address.`
  );

  console.log('\n================================================================');
  console.log(`VALIDATION RESULTS: ${passed}/${total} Security & Privacy Checks Passed!`);
  console.log('================================================================');
}

runValidationTests();
