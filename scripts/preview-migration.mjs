// Read-only migration preview script for MSR Portfolio Cloud Firestore
// Connects in READ-ONLY mode to msr-portfolio-5c52f using cached CLI credentials.
// NEVER writes or modifies any document.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { initialPortfolioData } from '../src/data/initialData.js';

const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = config.tokens.access_token;
const projectId = 'msr-portfolio-5c52f';
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

async function docExists(collectionName, docId) {
  const url = `${baseUrl}/${collectionName}/${docId}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

async function generatePreview() {
  console.log('='.repeat(75));
  console.log('MSR PORTFOLIO - CLOUD FIRESTORE MIGRATION PREVIEW (READ-ONLY)');
  console.log(`Target Project: ${projectId}`);
  console.log('='.repeat(75));

  const plan = [
    { col: 'profile', id: 'main', label: 'Super Admin Developer Profile' },
    { col: 'socialLinks', id: 'main', label: 'Independent Social & Coding Links' },
    { col: 'settings', id: 'general', label: 'Website Settings & SEO' },
    ...initialPortfolioData.skills.map(s => ({ col: 'skills', id: s.id, label: `Skill: ${s.name}` })),
    ...initialPortfolioData.projects.map(p => ({ col: 'projects', id: p.id, label: `Project: ${p.title}` })),
    ...initialPortfolioData.education.map(e => ({ col: 'education', id: e.id, label: `Education: ${e.degree}` })),
    ...initialPortfolioData.experience.map(e => ({ col: 'experience', id: e.id, label: `Experience: ${e.role}` })),
    ...initialPortfolioData.certifications.map(c => ({ col: 'certifications', id: c.id, label: `Certification: ${c.title}` })),
    ...initialPortfolioData.achievements.map(a => ({ col: 'achievements', id: a.id, label: `Achievement: ${a.title}` }))
  ];

  const willCreate = [];
  const willSkip = [];

  for (const item of plan) {
    const exists = await docExists(item.col, item.id);
    if (exists) {
      willSkip.push(item);
    } else {
      willCreate.push(item);
    }
  }

  console.log(`\n[PRESERVED / EXISTING] Documents already in Firestore (WILL BE SKIPPED - ZERO WRITES): ${willSkip.length}`);
  willSkip.forEach(item => {
    console.log(`  -> SKIP (EXISTS): ${item.col}/${item.id} (${item.label})`);
  });

  console.log(`\n[PROPOSED FOR CREATION] Missing documents to be created: ${willCreate.length}`);
  const grouped = {};
  willCreate.forEach(item => {
    if (!grouped[item.col]) grouped[item.col] = [];
    grouped[item.col].push(item.id);
  });

  for (const [col, ids] of Object.entries(grouped)) {
    console.log(`  -> Collection '${col}' (${ids.length} docs): ${ids.join(', ')}`);
  }

  console.log('\n' + '='.repeat(75));
  console.log(`SUMMARY: ${willCreate.length} to create, ${willSkip.length} to skip (preserved), 0 to delete/overwrite.`);
  console.log('='.repeat(75));
}

generatePreview().catch(console.error);
