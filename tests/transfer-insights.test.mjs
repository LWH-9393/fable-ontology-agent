import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  GENERATED_DIR,
  buildAgentApp,
  buildPromptPack,
  listTransferInsights,
  scoreWorkflow,
  summarizeOntology,
} from '../scripts/fable-agent-core.mjs';

const insights = listTransferInsights();

assert.equal(insights.count, 27);
assert.equal(insights.sources.includes('image:fable-characteristics-summary'), true);
assert.equal(insights.sources.includes('github:fivetaku/fablize'), true);
assert.equal(insights.sources.includes('github:wonsub/RIP-Fable'), true);
assert.equal(insights.sources.includes('github:baskduf/FableCodex'), true);
assert.equal(insights.sources.includes('github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-'), true);
assert.equal(insights.sources.includes('github:tmdgusya/prometheus'), true);
assert.equal(insights.sources.includes('github:itsinseong/value-for-fable'), true);

const ids = insights.insights.map(item => item.id);
assert.equal(ids.includes('multi_hypothesis_generation'), true);
assert.equal(ids.includes('render_observation_required'), true);
assert.equal(ids.includes('early_stop_prevention'), true);
assert.equal(ids.includes('capability_ceiling_escalation'), true);
assert.equal(ids.includes('frozen_gate_contract'), true);
assert.equal(ids.includes('disjoint_lane_parallelism'), true);
assert.equal(ids.includes('fresh_verifier_gate'), true);
assert.equal(ids.includes('short_map_external_memory'), true);
assert.equal(ids.includes('retry_budget_escalation'), true);
assert.equal(ids.includes('source_section_accounting_gate'), true);
assert.equal(ids.includes('codex_native_semantic_translation'), true);
assert.equal(ids.includes('creative_schema_state_machine'), true);
assert.equal(ids.includes('runtime_owned_completion_gate'), true);
assert.equal(ids.includes('ablation_first_absorption'), true);
assert.equal(ids.includes('task_type_routing'), true);
assert.equal(ids.includes('fixed_criteria_review'), true);

const summary = summarizeOntology();
assert.equal(summary.transfer_insights, 27);
assert.equal(summary.transfer_insight_sources.includes('github:fivetaku/fablize'), true);
assert.equal(summary.transfer_insight_sources.includes('github:wonsub/RIP-Fable'), true);
assert.equal(summary.transfer_insight_sources.includes('github:baskduf/FableCodex'), true);
assert.equal(summary.transfer_insight_sources.includes('github:itsinseong/value-for-fable'), true);

const score = scoreWorkflow();
assert.ok(Array.isArray(score.transfer_alignment));
assert.ok(score.transfer_alignment.some(item => item.name === 'multi_hypothesis_generation'));
assert.ok(score.transfer_alignment.some(item => item.name === 'frozen_gate_contract'));
assert.ok(score.transfer_alignment.some(item => item.name === 'fresh_verifier_gate'));
assert.ok(score.transfer_alignment.some(item => item.name === 'source_section_accounting_gate'));
assert.ok(score.transfer_alignment.some(item => item.name === 'runtime_owned_completion_gate'));
assert.ok(score.transfer_alignment.some(item => item.name === 'ablation_first_absorption'));
assert.ok(score.transfer_alignment.some(item => item.name === 'fixed_criteria_review'));
assert.ok(score.transfer_alignment.every(item => ['structural', 'keyword', 'none'].includes(item.evidence)));
assert.ok(score.transfer_alignment.every(item => ['structural_evidence', 'no_structural_evidence', 'keyword_signal_only', 'no_keyword_signal', 'not_measurable'].includes(item.status)));
assert.equal(score.transfer_alignment.find(item => item.name === 'procedure_not_identity').status, 'not_measurable');
const alignmentSummary = score.transfer_alignment_summary;
assert.equal(
  alignmentSummary.structural_evidence + alignmentSummary.no_structural_evidence + alignmentSummary.keyword_signal_only
    + alignmentSummary.no_keyword_signal + alignmentSummary.not_measurable,
  score.transfer_alignment.length,
);
assert.ok(score.recommendation.some(item => item.includes('unmeasured')));

const strictPack = buildPromptPack({ mode: 'strict' });
assert.equal(strictPack.files.includes('TRANSFER-INSIGHTS.md'), true);
const strictInsights = fs.readFileSync(path.join(strictPack.target_dir, 'TRANSFER-INSIGHTS.md'), 'utf8');
assert.match(strictInsights, /multi_hypothesis_generation/);
assert.match(strictInsights, /3\+ competing hypotheses/);
assert.match(strictInsights, /frozen_gate_contract/);
assert.match(strictInsights, /wonsub\/RIP-Fable/);
assert.match(strictInsights, /source_section_accounting_gate/);
assert.match(strictInsights, /value-for-fable/);

const app = buildAgentApp();
const html = fs.readFileSync(app.output_path, 'utf8');
assert.match(html, /Transfer Insights/);
assert.match(html, /multi_hypothesis_generation/);
assert.match(html, /frozen_gate_contract/);
assert.match(html, /task_type_routing/);
assert.equal(app.output_path.startsWith(GENERATED_DIR), true);
