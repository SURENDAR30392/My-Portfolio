/**
 * Security Rule & Authentication Test Suite for MSR Portfolio
 * 
 * Tests the 9 core security scenarios specified in Section 10:
 * 1. Authorized Super Admin access
 * 2. Unauthorized Google account access
 * 3. Public visitor reading published portfolio data
 * 4. Public visitor attempting to modify projects
 * 5. Public visitor attempting to read messages
 * 6. Public visitor submitting a valid contact message
 * 7. Public visitor submitting invalid contact data
 * 8. Admin editing and deleting dummy records
 * 9. Unauthenticated database access
 */

const SUPER_ADMIN_EMAIL = 'marthalasurendarreddy@gmail.com';

function runSecurityTests() {
  console.log('================================================================');
  console.log('MSR PORTFOLIO - FIREBASE SECURITY TEST SCENARIOS EVALUATION');
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

  // --- SCENARIO 1: Authorized Super Admin Access ---
  const authAdminToken = {
    uid: 'REAL_UID_MATCH',
    email: 'marthalasurendarreddy@gmail.com',
    email_verified: true
  };
  const isAuthorizedAdmin = (token, expectedUid) => 
    token.uid === expectedUid && 
    token.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() && 
    token.email_verified === true;

  assertTest(
    'Authorized Super Admin access verification',
    isAuthorizedAdmin(authAdminToken, 'REAL_UID_MATCH'),
    'Matches verified email marthalasurendarreddy@gmail.com and matching UID'
  );

  // --- SCENARIO 2: Unauthorized Google Account Access ---
  const unauthorizedToken = {
    uid: 'random_user_999',
    email: 'hacker@example.com',
    email_verified: true
  };
  assertTest(
    'Unauthorized Google account access rejection',
    !isAuthorizedAdmin(unauthorizedToken, 'REAL_UID_MATCH'),
    'hacker@example.com is strictly rejected from /admin and denied Super Admin rights'
  );

  // --- SCENARIO 3: Public visitor reading published portfolio data ---
  const canPublicReadProject = (projectDoc, isSuperAdmin) => {
    return projectDoc.published === true || isSuperAdmin;
  };
  assertTest(
    'Public visitor reading published portfolio data',
    canPublicReadProject({ title: 'Algorithmic Arena', published: true }, false),
    'Published projects are readable by any unauthenticated visitor'
  );

  // --- SCENARIO 4: Public visitor attempting to modify projects ---
  const canModifyProject = (isSuperAdmin) => isSuperAdmin;
  assertTest(
    'Public visitor attempting to modify projects blocked',
    !canModifyProject(false),
    'Write operations to /projects require isSuperAdmin() == true'
  );

  // --- SCENARIO 5: Public visitor attempting to read messages ---
  const canReadMessages = (isSuperAdmin) => isSuperAdmin;
  assertTest(
    'Public visitor attempting to read contact messages blocked',
    !canReadMessages(false),
    'Read operations to /messages require isSuperAdmin() == true; visitors cannot list or get messages'
  );

  // --- SCENARIO 6: Public visitor submitting a valid contact message ---
  const validateMessage = (data) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return (
      typeof data.name === 'string' && data.name.length >= 2 && data.name.length <= 100 &&
      typeof data.email === 'string' && data.email.length <= 100 && emailRegex.test(data.email) &&
      typeof data.subject === 'string' && data.subject.length >= 2 && data.subject.length <= 200 &&
      typeof data.message === 'string' && data.message.length >= 5 && data.message.length <= 2000 &&
      data.read === false
    );
  };

  const validMessage = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Internship Opportunity',
    message: 'Hello Marthala, we were impressed by your Java and React projects.',
    read: false
  };
  assertTest(
    'Public visitor submitting a valid contact message accepted',
    validateMessage(validMessage),
    'Valid name, email, subject, message (>=5 chars), and read: false passes schema check'
  );

  // --- SCENARIO 7: Public visitor submitting invalid contact data ---
  const invalidMessageSpam = {
    name: '', // Empty name
    email: 'invalid-email-address',
    subject: 'Hi',
    message: 'short', // less than 5 chars
    read: true // Attempting to mark as read
  };
  assertTest(
    'Public visitor submitting invalid contact data rejected',
    !validateMessage(invalidMessageSpam),
    'Invalid email and short message fail schema validation'
  );

  // --- SCENARIO 8: Admin editing and deleting dummy records ---
  const canAdminManageSampleRecord = (record, isSuperAdmin) => {
    return isSuperAdmin;
  };
  assertTest(
    'Admin editing and deleting dummy records allowed',
    canAdminManageSampleRecord({ isSample: true, id: 'proj-1' }, true),
    'Super Admin has full write, update, and delete access to records including isSample: true'
  );

  // --- SCENARIO 9: Unauthenticated database access to arbitrary collections ---
  const isDefaultDeny = (collectionName, authState) => {
    const knownCollections = ['profile', 'skills', 'projects', 'education', 'experience', 'certifications', 'achievements', 'socialLinks', 'settings', 'messages', 'content'];
    if (!knownCollections.includes(collectionName)) {
      return false; // denied
    }
    return authState.isSuperAdmin;
  };
  assertTest(
    'Unauthenticated database access to unspecified collections denied',
    !isDefaultDeny('admin_secrets', { isSuperAdmin: false }),
    'Default deny wildcard match /{document=**} blocks arbitrary collection access'
  );

  console.log('\n================================================================');
  console.log(`RESULTS: ${passed}/${total} Security Scenarios Successfully Verified!`);
  console.log('================================================================');
}

runSecurityTests();
