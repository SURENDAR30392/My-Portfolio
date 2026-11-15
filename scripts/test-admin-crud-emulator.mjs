// Admin CRUD Verification Test Suite (Firestore Emulator)
// Verifies full CRUD lifecycle for Super Admin UID: HOHTgjkAZlTPOO7bH98ukkw2vip1

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

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (e) {
    console.error(`  [FAIL] ${name}: ${e.message}`);
    failed++;
  }
}

async function req(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  return fetch(`${baseUrl}/${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
}

async function main() {
  console.log('='.repeat(70));
  console.log('VERIFYING COMPLETE ADMIN CRUD LIFECYCLE (FIRESTORE EMULATOR)');
  console.log(`Target Super Admin UID: ${SUPER_ADMIN_UID}`);
  console.log('='.repeat(70));

  // 1. Profile CRUD
  console.log('\n--- 1. PROFILE CRUD ---');
  await test('Create Profile', async () => {
    const res = await req('profile/main', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { name: { stringValue: 'Marthala Surendar Reddy' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Read Profile', async () => {
    const res = await req('profile/main', { headers: { 'Authorization': `Bearer ${adminToken}` } });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update Profile', async () => {
    const res = await req('profile/main', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { name: { stringValue: 'MSR Updated' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 2. Skills CRUD & Publish/Unpublish
  console.log('\n--- 2. SKILLS CRUD & PUBLISH/UNPUBLISH ---');
  await test('Create Skill', async () => {
    const res = await req('skills/crud-skill-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { name: { stringValue: 'Spring Boot' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Read Skill', async () => {
    const res = await req('skills/crud-skill-1', { headers: { 'Authorization': `Bearer ${adminToken}` } });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update & Unpublish Skill (draft mode)', async () => {
    const res = await req('skills/crud-skill-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { name: { stringValue: 'Spring Boot 3' }, published: { booleanValue: false } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Delete Skill', async () => {
    const res = await req('skills/crud-skill-1', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 3. Projects CRUD & Publish/Unpublish
  console.log('\n--- 3. PROJECTS CRUD & PUBLISH/UNPUBLISH ---');
  await test('Create Project', async () => {
    const res = await req('projects/crud-proj-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'New Project' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Read Project', async () => {
    const res = await req('projects/crud-proj-1', { headers: { 'Authorization': `Bearer ${adminToken}` } });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update Project & Toggle Unpublish', async () => {
    const res = await req('projects/crud-proj-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'Updated Project' }, published: { booleanValue: false } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Delete Project', async () => {
    const res = await req('projects/crud-proj-1', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 4. Education CRUD & Publish/Unpublish
  console.log('\n--- 4. EDUCATION CRUD & PUBLISH/UNPUBLISH ---');
  await test('Create Education', async () => {
    const res = await req('education/crud-edu-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { degree: { stringValue: 'B.Tech' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update Education (Unpublish)', async () => {
    const res = await req('education/crud-edu-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { degree: { stringValue: 'B.Tech CSE' }, published: { booleanValue: false } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Delete Education', async () => {
    const res = await req('education/crud-edu-1', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 5. Experience CRUD & Publish/Unpublish
  console.log('\n--- 5. EXPERIENCE CRUD & PUBLISH/UNPUBLISH ---');
  await test('Create Experience', async () => {
    const res = await req('experience/crud-exp-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { role: { stringValue: 'Developer' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update Experience (Unpublish)', async () => {
    const res = await req('experience/crud-exp-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { role: { stringValue: 'Lead Developer' }, published: { booleanValue: false } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Delete Experience', async () => {
    const res = await req('experience/crud-exp-1', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 6. Certifications CRUD & Publish/Unpublish
  console.log('\n--- 6. CERTIFICATIONS CRUD & PUBLISH/UNPUBLISH ---');
  await test('Create Certification', async () => {
    const res = await req('certifications/crud-cert-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'AWS Cloud' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update Certification (Unpublish)', async () => {
    const res = await req('certifications/crud-cert-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'AWS Cloud Practitioner' }, published: { booleanValue: false } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Delete Certification', async () => {
    const res = await req('certifications/crud-cert-1', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 7. Achievements CRUD & Publish/Unpublish
  console.log('\n--- 7. ACHIEVEMENTS CRUD & PUBLISH/UNPUBLISH ---');
  await test('Create Achievement', async () => {
    const res = await req('achievements/crud-ach-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'Hackathon Win' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Update Achievement (Unpublish)', async () => {
    const res = await req('achievements/crud-ach-1', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { title: { stringValue: 'Hackathon 1st Place' }, published: { booleanValue: false } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Delete Achievement', async () => {
    const res = await req('achievements/crud-ach-1', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 8. Social Links CRUD
  console.log('\n--- 8. SOCIAL LINKS CRUD ---');
  await test('Create & Update Social Links', async () => {
    const res = await req('socialLinks/main', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { github: { stringValue: 'https://github.com/SURENDAR30392' }, published: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 9. Settings CRUD
  console.log('\n--- 9. SETTINGS CRUD ---');
  await test('Create & Update Settings', async () => {
    const res = await req('settings/general', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { fields: { seoTitle: { stringValue: 'MSR' }, isPublic: { booleanValue: true } } }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 10. Messages: Super Admin Read, Mark Read, and Delete
  console.log('\n--- 10. CONTACT MESSAGES (READ, MARK READ, DELETE) ---');
  await test('Public Visitor Submits Valid Message', async () => {
    const res = await req('messages/msg-test-crud', {
      method: 'PATCH',
      body: {
        fields: {
          name: { stringValue: 'Recruiter' },
          email: { stringValue: 'recruiter@tech.com' },
          subject: { stringValue: 'Opportunity' },
          message: { stringValue: 'We are hiring backend engineers.' },
          read: { booleanValue: false }
        }
      }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Super Admin Reads Message', async () => {
    const res = await req('messages/msg-test-crud', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Super Admin Marks Message as Read (Update)', async () => {
    const res = await req('messages/msg-test-crud', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        fields: {
          name: { stringValue: 'Recruiter' },
          email: { stringValue: 'recruiter@tech.com' },
          subject: { stringValue: 'Opportunity' },
          message: { stringValue: 'We are hiring backend engineers.' },
          read: { booleanValue: true }
        }
      }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });
  await test('Super Admin Deletes Message', async () => {
    const res = await req('messages/msg-test-crud', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  console.log('\n' + '='.repeat(70));
  console.log(`ADMIN CRUD VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('='.repeat(70));

  if (failed > 0) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
