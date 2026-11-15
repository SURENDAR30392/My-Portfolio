// Comprehensive Firestore Rules Unit Tests running against actual Firebase Firestore Emulator
const projectId = 'msr-portfolio-5c52f';
const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
const baseUrl = `http://${emulatorHost}/v1/projects/${projectId}/databases/(default)/documents`;

function makeToken(uid, emailVerified = true) {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: uid,
    user_id: uid,
    uid: uid,
    email_verified: emailVerified,
    aud: projectId,
    iss: `https://securetoken.google.com/${projectId}`
  })).toString('base64url');
  return `${header}.${payload}.mock`;
}

const SUPER_ADMIN_UID = 'HOHTgjkAZlTPOO7bH98ukkw2vip1';
const adminToken = makeToken(SUPER_ADMIN_UID, true);
const unverifiedAdminToken = makeToken(SUPER_ADMIN_UID, false);
const attackerToken = makeToken('attacker_user_999', true);

let passed = 0;
let failed = 0;

async function test(description, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${description}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${description}\n         Error: ${err.message}`);
    failed++;
  }
}

function assertStatus(actual, expected, context = '') {
  if (actual !== expected) {
    throw new Error(`Expected HTTP ${expected} but received HTTP ${actual}. ${context}`);
  }
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(`${baseUrl}/${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  return res;
}

async function main() {
  console.log('='.repeat(70));
  console.log('FIRESTORE SECURITY RULES - ACTUAL EMULATOR TEST SUITE');
  console.log(`Target Emulator Host: ${emulatorHost}`);
  console.log(`Target Project: ${projectId}`);
  console.log('='.repeat(70));

  // --- SECTION 1: SUPER ADMIN AUTHORIZATION ---
  console.log('\n--- 1. SUPER ADMIN AUTHORIZATION & PERMISSIONS ---');

  await test('Super Admin can write and publish profile data', async () => {
    const res = await request('profile/superadmin-doc', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { name: { stringValue: 'MSR' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write skills', async () => {
    const res = await request('skills/sk-admin', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { name: { stringValue: 'Java' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write education', async () => {
    const res = await request('education/edu-admin', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { degree: { stringValue: 'B.Tech' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write experience', async () => {
    const res = await request('experience/exp-admin', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { role: { stringValue: 'Developer' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write certifications', async () => {
    const res = await request('certifications/cert-admin', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'Oracle Certified' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write achievements', async () => {
    const res = await request('achievements/ach-admin', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'LeetCode' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write socialLinks', async () => {
    const res = await request('socialLinks/links-admin', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { github: { stringValue: 'https://github.com' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write private settings', async () => {
    const res = await request('settings/admin-config', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { isPublic: { booleanValue: false }, secretKey: { stringValue: 'internal-123' } } }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can read private settings', async () => {
    const res = await request('settings/admin-config', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assertStatus(res.status, 200);
  });

  await test('Super Admin can write aggregate content/portfolioData', async () => {
    const res = await request('content/portfolioData', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'MSR Portfolio' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 200);
  });

  // --- SECTION 2: ATTACKER & NON-ADMIN BLOCKS ---
  console.log('\n--- 2. ATTACKER & NON-ADMIN AUTHORIZATION BLOCKS ---');

  await test('Non-admin authenticated user CANNOT write to profile', async () => {
    const res = await request('profile/hack-profile', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${attackerToken}` },
      body: { fields: { name: { stringValue: 'Hacker' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 403);
  });

  await test('Non-admin authenticated user CANNOT write to projects', async () => {
    const res = await request('projects/hack-project', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${attackerToken}` },
      body: { fields: { title: { stringValue: 'Hacked' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 403);
  });

  await test('Non-admin authenticated user CANNOT write to skills', async () => {
    const res = await request('skills/hack-skill', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${attackerToken}` },
      body: { fields: { name: { stringValue: 'Hacked' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 403);
  });

  await test('Non-admin authenticated user CANNOT write to content', async () => {
    const res = await request('content/portfolioData', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${attackerToken}` },
      body: { fields: { title: { stringValue: 'Hacked' } } }
    });
    assertStatus(res.status, 403);
  });

  await test('Super Admin with UNVERIFIED email is DENIED write access', async () => {
    const res = await request('projects/unverified-admin-doc', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${unverifiedAdminToken}` },
      body: { fields: { title: { stringValue: 'Test' }, published: { booleanValue: true } } }
    });
    assertStatus(res.status, 403);
  });

  // --- SECTION 3: PUBLIC READ ENFORCEMENT (PUBLISHED ONLY) ---
  console.log('\n--- 3. PUBLIC READ ENFORCEMENT (PUBLISHED ONLY) ---');

  // Seed published vs unpublished test documents
  await request('profile/pub-profile', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { name: { stringValue: 'Surendar' }, published: { booleanValue: true } } }
  });
  await request('profile/unpub-profile', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { name: { stringValue: 'Draft' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published profile', async () => {
    const res = await request('profile/pub-profile');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished profile', async () => {
    const res = await request('profile/unpub-profile');
    assertStatus(res.status, 403);
  });

  // Seed published vs unpublished skills
  await request('skills/pub-skill', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { name: { stringValue: 'Python' }, published: { booleanValue: true } } }
  });
  await request('skills/unpub-skill', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { name: { stringValue: 'Draft' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published skills', async () => {
    const res = await request('skills/pub-skill');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished skills', async () => {
    const res = await request('skills/unpub-skill');
    assertStatus(res.status, 403);
  });

  // Seed published vs unpublished education
  await request('education/pub-edu', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { degree: { stringValue: 'CSE' }, published: { booleanValue: true } } }
  });
  await request('education/unpub-edu', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { degree: { stringValue: 'Draft' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published education', async () => {
    const res = await request('education/pub-edu');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished education', async () => {
    const res = await request('education/unpub-edu');
    assertStatus(res.status, 403);
  });

  // Seed published vs unpublished experience
  await request('experience/pub-exp', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { role: { stringValue: 'Intern' }, published: { booleanValue: true } } }
  });
  await request('experience/unpub-exp', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { role: { stringValue: 'Draft' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published experience', async () => {
    const res = await request('experience/pub-exp');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished experience', async () => {
    const res = await request('experience/unpub-exp');
    assertStatus(res.status, 403);
  });

  // Seed published vs unpublished certifications
  await request('certifications/pub-cert', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { title: { stringValue: 'Java Cert' }, published: { booleanValue: true } } }
  });
  await request('certifications/unpub-cert', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { title: { stringValue: 'Draft Cert' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published certifications', async () => {
    const res = await request('certifications/pub-cert');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished certifications', async () => {
    const res = await request('certifications/unpub-cert');
    assertStatus(res.status, 403);
  });

  // Seed published vs unpublished achievements
  await request('achievements/pub-ach', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { title: { stringValue: 'LeetCode 200' }, published: { booleanValue: true } } }
  });
  await request('achievements/unpub-ach', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { title: { stringValue: 'Draft Ach' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published achievements', async () => {
    const res = await request('achievements/pub-ach');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished achievements', async () => {
    const res = await request('achievements/unpub-ach');
    assertStatus(res.status, 403);
  });

  // Seed published vs unpublished socialLinks
  await request('socialLinks/pub-social', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { github: { stringValue: 'https://github.com' }, published: { booleanValue: true } } }
  });
  await request('socialLinks/unpub-social', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { github: { stringValue: 'https://github.com' }, published: { booleanValue: false } } }
  });

  await test('Public visitor CAN read published social links', async () => {
    const res = await request('socialLinks/pub-social');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read unpublished social links', async () => {
    const res = await request('socialLinks/unpub-social');
    assertStatus(res.status, 403);
  });

  // --- SECTION 4: SETTINGS SECURITY ---
  console.log('\n--- 4. SETTINGS SECURITY (isPublic == true ONLY) ---');

  await request('settings/public-site-settings', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { seoTitle: { stringValue: 'MSR' }, isPublic: { booleanValue: true } } }
  });
  await request('settings/private-site-settings', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { adminNote: { stringValue: 'Secret' }, isPublic: { booleanValue: false } } }
  });

  await test('Public visitor CAN read settings when isPublic == true', async () => {
    const res = await request('settings/public-site-settings');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read settings when isPublic == false', async () => {
    const res = await request('settings/private-site-settings');
    assertStatus(res.status, 403);
  });

  // --- SECTION 5: CONTENT COLLECTION PRIVACY & DATA LEAKAGE PREVENTION ---
  console.log('\n--- 5. CONTENT COLLECTION PRIVACY & DATA LEAK PROTECTION ---');

  // Published content without messages
  await request('content/clean-content', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: { fields: { heroTitle: { stringValue: 'Hello' }, published: { booleanValue: true } } }
  });
  // Content with leaked messages map
  await request('content/leaked-messages-content', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: {
      fields: {
        heroTitle: { stringValue: 'Hello' },
        published: { booleanValue: true },
        messages: { arrayValue: { values: [{ stringValue: 'private message' }] } }
      }
    }
  });

  await test('Public visitor CAN read published content without messages', async () => {
    const res = await request('content/clean-content');
    assertStatus(res.status, 200);
  });

  await test('Public visitor CANNOT read content containing messages field (data leak blocked)', async () => {
    const res = await request('content/leaked-messages-content');
    assertStatus(res.status, 403);
  });

  // --- SECTION 6: CONTACT MESSAGES VALIDATION & PRIVACY ---
  console.log('\n--- 6. CONTACT MESSAGES (VALIDATION & SUPER ADMIN PRIVACY) ---');

  // Super Admin creates a message
  await request('messages/msg-test-1', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${adminToken}` },
    body: {
      fields: {
        name: { stringValue: 'Jane Doe' },
        email: { stringValue: 'jane@example.com' },
        subject: { stringValue: 'Project Inquiry' },
        message: { stringValue: 'Hello Surendar, great portfolio!' },
        read: { booleanValue: false }
      }
    }
  });

  await test('Public visitor CANNOT read messages collection', async () => {
    const res = await request('messages/msg-test-1');
    assertStatus(res.status, 403);
  });

  await test('Super Admin CAN read messages', async () => {
    const res = await request('messages/msg-test-1', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assertStatus(res.status, 200);
  });

  await test('Public visitor CAN create valid contact message', async () => {
    const res = await request('messages/valid-visitor-msg', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'Alice Engineer' },
          email: { stringValue: 'alice@company.org' },
          subject: { stringValue: 'Hiring Inquiry' },
          message: { stringValue: 'We are impressed by your projects and would love to chat.' },
          read: { booleanValue: false },
          id: { stringValue: 'msg-12345' }
        }
      }
    });
    assertStatus(res.status, 200);
  });

  await test('Public visitor message with read: true is REJECTED', async () => {
    const res = await request('messages/fake-read-msg', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'Spammer' },
          email: { stringValue: 'spam@bot.com' },
          subject: { stringValue: 'Ad' },
          message: { stringValue: 'Buy crypto now!' },
          read: { booleanValue: true }
        }
      }
    });
    assertStatus(res.status, 403);
  });

  await test('Public visitor message with unexpected fields is REJECTED', async () => {
    const res = await request('messages/unexpected-fields-msg', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'Hacker' },
          email: { stringValue: 'hacker@dark.net' },
          subject: { stringValue: 'Exploit' },
          message: { stringValue: 'Testing injection' },
          read: { booleanValue: false },
          injectedAdminRole: { booleanValue: true } // Unexpected field
        }
      }
    });
    assertStatus(res.status, 403);
  });

  await test('Public visitor message with invalid email format is REJECTED', async () => {
    const res = await request('messages/invalid-email-msg', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'John' },
          email: { stringValue: 'not-an-email-address' },
          subject: { stringValue: 'Hello' },
          message: { stringValue: 'Valid message body text.' },
          read: { booleanValue: false }
        }
      }
    });
    assertStatus(res.status, 403);
  });

  await test('Public visitor message with short name (< 2 chars) is REJECTED', async () => {
    const res = await request('messages/short-name-msg', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'J' },
          email: { stringValue: 'j@example.com' },
          subject: { stringValue: 'Hello' },
          message: { stringValue: 'Valid message body text.' },
          read: { booleanValue: false }
        }
      }
    });
    assertStatus(res.status, 403);
  });

  await test('Public visitor message with filled honeypot is REJECTED', async () => {
    const res = await request('messages/honeypot-msg', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'Bot' },
          email: { stringValue: 'bot@spammer.com' },
          subject: { stringValue: 'Spam Subject' },
          message: { stringValue: 'Spam message content here.' },
          read: { booleanValue: false },
          hp_check: { stringValue: 'bot-auto-fill' }
        }
      }
    });
    assertStatus(res.status, 403);
  });

  await test('Public visitor CANNOT delete messages', async () => {
    const res = await request('messages/valid-visitor-msg', {
      method: 'DELETE'
    });
    assertStatus(res.status, 403);
  });

  await test('Super Admin CAN delete messages', async () => {
    const res = await request('messages/valid-visitor-msg', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assertStatus(res.status, 200);
  });

  // --- SECTION 7: DEFAULT DENY RULE ---
  console.log('\n--- 7. DEFAULT DENY RULE (UNKNOWN COLLECTIONS) ---');

  await test('Public visitor CANNOT read unknown collection /users', async () => {
    const res = await request('users/user-1');
    assertStatus(res.status, 403);
  });

  await test('Public visitor CANNOT write to unknown collection /internal_secrets', async () => {
    const res = await request('internal_secrets/secret-1', {
      method: 'PATCH',
      body: { fields: { secret: { stringValue: 'leak' } } }
    });
    assertStatus(res.status, 403);
  });

  await test('Attacker CANNOT read or write unknown collection /keys', async () => {
    const res = await request('keys/key-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${attackerToken}` },
      body: { fields: { key: { stringValue: '123' } } }
    });
    assertStatus(res.status, 403);
  });

  console.log('\n' + '='.repeat(70));
  console.log(`EMULATOR RULES TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('='.repeat(70));

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

