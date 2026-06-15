import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  buildAgentApp,
  buildPromptPack,
  getCognitiveOperationalProfile,
  summarizeOntology,
} from '../scripts/fable-agent-core.mjs';

const profile = getCognitiveOperationalProfile();

assert.equal(profile.mode, 'cognitive_operational_synthesis');
assert.equal(profile.identity_boundary, 'procedure_and_attention_pattern_not_hidden_model_identity');
assert.equal(profile.axes.length, 8);

const ids = profile.axes.map(axis => axis.id);
assert.equal(ids.includes('implication_depth'), true);
assert.equal(ids.includes('causal_structure_first'), true);
assert.equal(ids.includes('coherence_over_completion'), true);

const implication = profile.axes.find(axis => axis.id === 'implication_depth');
assert.ok(implication.cognitive_bias.includes('one step further'));
assert.ok(implication.operational_expression.length > 0);
assert.ok(implication.soft_prompt.length > 0);

const summary = summarizeOntology();
assert.equal(summary.cognitive_operational_axes, 8);

const pack = buildPromptPack({ mode: 'strict' });
assert.equal(pack.files.includes('COGNITIVE-OPERATIONAL-PROFILE.md'), true);
const body = fs.readFileSync(path.join(pack.target_dir, 'COGNITIVE-OPERATIONAL-PROFILE.md'), 'utf8');
assert.match(body, /implication_depth/);
assert.match(body, /coherence_over_completion/);

const app = buildAgentApp();
const html = fs.readFileSync(app.output_path, 'utf8');
assert.match(html, /Cognitive Operational/);
assert.match(html, /implication_depth/);
