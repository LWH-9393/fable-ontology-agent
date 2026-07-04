import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PLUGIN_ROOT = path.resolve(__dirname, '..');
export const DATA_DIR = path.join(PLUGIN_ROOT, 'assets', 'ontology');
export const GENERATED_DIR = path.join(PLUGIN_ROOT, 'generated');

const FILES = {
  atoms: 'fable-unified-ontology.atoms.jsonl',
  edges: 'fable-unified-ontology.edges.jsonl',
  schema: 'fable-unified-ontology.schema.json',
  patterns: 'fable-local-pattern-clusters.json',
  comparison: 'fable-fable-vs-opus-fallback-comparison.json',
  audit: 'fable-ontology-hallucination-audit-20260614.json',
};

const TRANSFER_INSIGHTS = [
  {
    id: 'multi_hypothesis_generation',
    label: 'Competing hypotheses before narrow investigation',
    status: 'new_extension',
    maps_to: ['failure_handling', 'validation_loop'],
    trigger: 'debugging, unknown cause, review, ambiguous diagnosis',
    rule: 'Before pursuing one explanation, form 3+ competing hypotheses and name what evidence would confirm or reject each one.',
    source_refs: [
      'image:fable-characteristics-summary#4',
      'github:fivetaku/fablize:packs/investigation-protocol.txt',
    ],
  },
  {
    id: 'render_observation_required',
    label: 'Runtime observation is stronger than static validity',
    status: 'strengthen_existing',
    maps_to: ['validation_loop', 'progress_claim_requires_tool_evidence'],
    trigger: 'HTML, SVG, game, UI, chart, animation, executable artifact',
    rule: 'Run the artifact in its natural renderer or runtime, observe the actual output, fix what observation reveals, and re-run after changes.',
    source_refs: [
      'image:fable-characteristics-summary#4',
      'github:fivetaku/fablize:packs/verification-grounding-pack.txt',
    ],
  },
  {
    id: 'early_stop_prevention',
    label: 'Do not stop at a promise to work',
    status: 'new_extension',
    maps_to: ['progress_claim_requires_tool_evidence', 'acceptance_design'],
    trigger: 'final answer ends with future intent instead of completed action or a real blocker',
    rule: 'If the agent says it will run, write, build, fix, or create something, it must do that work before ending unless it asks a necessary user question.',
    source_refs: [
      'image:fable-characteristics-summary#6',
      'github:fivetaku/fablize:hooks/finish-the-work.sh',
    ],
  },
  {
    id: 'capability_ceiling_escalation',
    label: 'Escalate when procedure cannot replace capability',
    status: 'strengthen_existing',
    maps_to: ['capability_stop_gate', 'claim_strength_calibration'],
    trigger: 'open-ended creative detail, self-driven discovery, repeated stall, out-of-spec defect discovery',
    rule: 'When the task needs capability rather than procedure, state the ceiling and escalate to a stronger model, fresh session, or human review with an evidence package.',
    source_refs: [
      'image:fable-characteristics-summary#5',
      'github:fivetaku/fablize:README.md',
    ],
  },
  {
    id: 'multi_story_evidence_gate',
    label: 'Sequential stories must close with evidence',
    status: 'strengthen_existing',
    maps_to: ['acceptance_design', 'validation_loop'],
    trigger: '2+ dependent work stories, long autonomous work, broad implementation',
    rule: 'Decompose into sequential stories, complete one at a time, and require concrete evidence plus a final verification gate.',
    source_refs: [
      'image:fable-characteristics-summary#4',
      'github:fivetaku/fablize:scripts/goals.py',
    ],
  },
  {
    id: 'procedure_not_identity',
    label: 'Transfer procedure, not hidden identity',
    status: 'already_core',
    maps_to: ['claim_strength_calibration', 'context_by_authority'],
    trigger: 'any claim that a harness makes another model become Fable',
    rule: 'Treat the harness as observable workflow discipline. Do not claim hidden model identity, hidden reasoning, or raised model ceiling.',
    source_refs: [
      'image:fable-characteristics-summary#5',
      'github:fivetaku/fablize:README.md',
      'plugin:fable-ontology-agent/docs/AGENT_POLICY.md',
    ],
  },
  {
    id: 'frozen_gate_contract',
    label: 'Freeze acceptance gates before build',
    status: 'new_extension',
    maps_to: ['acceptance_design', 'validation_loop'],
    trigger: 'non-trivial implementation, multi-lane work, verification-sensitive task, high-cost wrong result',
    rule: 'Write objective acceptance gates before building and do not edit them mid-run to make a failing artifact pass; changing a gate requires a fresh planning decision.',
    source_refs: [
      'github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/SKILL.md#67',
      'github:wonsub/RIP-Fable:fable-loop/memory/gates.md#1',
    ],
  },
  {
    id: 'disjoint_lane_parallelism',
    label: 'Parallelize only provably disjoint lanes',
    status: 'new_extension',
    maps_to: ['role_separation_architect_builder', 'scope_control'],
    trigger: 'parallel agents, multi-file implementation, asset pipeline, independent work lanes',
    rule: 'Split work into lanes with provably disjoint file or asset sets before parallel execution; if the sets cannot be made disjoint, keep synthesis and implementation serialized.',
    source_refs: [
      'github:wonsub/RIP-Fable:fable-loop/agents/architect.md#32',
      'github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/references/loop-protocol.md#38',
    ],
  },
  {
    id: 'fresh_verifier_gate',
    label: 'Verify with fresh context against the real artifact',
    status: 'new_extension',
    maps_to: ['validation_loop', 'progress_claim_requires_tool_evidence'],
    trigger: 'builder reports done, generated artifact, review handoff, lane completion',
    rule: 'Do not accept the builder claim as evidence; a separate verifier pass must read the actual artifact, diff, or output and return PASS or FAIL against the frozen gate.',
    source_refs: [
      'github:wonsub/RIP-Fable:fable-loop/agents/verifier.md#18',
      'github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/SKILL.md#60',
    ],
  },
  {
    id: 'short_map_external_memory',
    label: 'Keep handoff memory short and linked',
    status: 'new_extension',
    maps_to: ['context_management', 'long_horizon_continuity'],
    trigger: 'long autonomous work, resume, multi-stage task, context pressure',
    rule: 'Keep only the current goal, lane status, linked detail files, and next action in the always-loaded handoff; move gates, lane specs, logs, and lessons into linked files loaded only when needed.',
    source_refs: [
      'github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/references/memory-protocol.md#16',
      'github:wonsub/RIP-Fable:fable-loop/memory/handoff.md#1',
    ],
  },
  {
    id: 'retry_budget_escalation',
    label: 'Stop repeated repair loops at a retry budget',
    status: 'new_extension',
    maps_to: ['capability_stop_gate', 'failure_handling'],
    trigger: 'repeated verification failure, stuck lane, failing gate, repair loop',
    rule: 'After the retry budget is exhausted, stop the lane and escalate with the failed gate, recent investigation notes, and current artifact state instead of silently continuing.',
    source_refs: [
      'github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/references/loop-protocol.md#5',
      'github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/SKILL.md#105',
    ],
  },
  {
    id: 'source_section_accounting_gate',
    label: 'Account for every source section before claiming adaptation coverage',
    status: 'new_extension',
    maps_to: ['claim_strength_calibration', 'context_management'],
    trigger: 'adapting a prompt, skill, repository, policy set, or source corpus into Codex guidance',
    rule: 'For each meaningful source section, record an explicit decision: implemented, adapted, unsupported, or not applicable; treat complete coverage as accounting, not capability parity.',
    source_refs: [
      'github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/references/coverage-matrix.md#1',
      'github:baskduf/FableCodex:README.md#91',
    ],
  },
  {
    id: 'codex_native_semantic_translation',
    label: 'Translate source workflow semantics into actual Codex surfaces',
    status: 'new_extension',
    maps_to: ['context_by_authority', 'claim_strength_calibration'],
    trigger: 'porting Claude, Fable, or external agent instructions into Codex',
    rule: 'Replace source-model identity, tools, paths, dates, and provider assumptions with the actual Codex tools, workspace, current date behavior, and active policy; drop unavailable or unsafe claims.',
    source_refs: [
      'github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/references/fable-to-codex-map.md#3',
      'github:baskduf/FableCodex:NOTICE#10',
    ],
  },
  {
    id: 'smallest_durable_surface',
    label: 'Choose the smallest durable surface that can carry the rule',
    status: 'new_extension',
    maps_to: ['context_management', 'scope_control'],
    trigger: 'making a workflow rule persistent across a thread, repo, skill, plugin, connector, or provider setup',
    rule: 'Persist behavior at the smallest surface that solves the problem: current prompt, AGENTS.md, skill, plugin, MCP/app connector, or provider config; avoid over-packaging local advice.',
    source_refs: [
      'github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/SKILL.md#78',
      'github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/references/state-memory.md#12',
    ],
  },
  {
    id: 'behavior_eval_not_capability_benchmark',
    label: 'Evaluate behavior separately from model capability',
    status: 'new_extension',
    maps_to: ['claim_strength_calibration', 'validation_loop'],
    trigger: 'judging whether a Fable-style adaptation is mature or useful',
    rule: 'Use behavioral checks for inspection, lookup, verification, routing, and final reporting; do not present them as proof of model-weight, hidden-runtime, or broad capability parity.',
    source_refs: [
      'github:baskduf/FableCodex:evals/fable-style-evals.md#3',
      'github:baskduf/FableCodex:README.md#91',
    ],
  },
  {
    id: 'creative_schema_state_machine',
    label: 'Use schema-gated creative state machines only for creative work',
    status: 'domain_limited',
    maps_to: ['validation_loop', 'scope_control'],
    trigger: 'naming, ideation, reframing, product language, concept generation, or other creative synthesis',
    rule: 'For creative work, split divergent generation, grouping, selection, intent framing, crafting, evaluation, and polish into schema-validated phases; do not impose this loop on ordinary coding or factual Q&A.',
    source_refs: [
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/_dispatch.py#85',
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:SKILL.md#31',
    ],
  },
  {
    id: 'divergent_profiles_deterministic_firewall',
    label: 'Let model profiles diverge, then let deterministic code filter what crosses',
    status: 'domain_limited',
    maps_to: ['validation_loop', 'role_separation_architect_builder'],
    trigger: 'creative synthesis where diversity is valuable but downstream leakage or overfitting is risky',
    rule: 'Generate material through distinct cognitive profiles, then use a deterministic firewall or whitelist to pass only approved fields into the next phase.',
    source_refs: [
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/_dispatch.py#113',
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/f2k9p7.py#1',
    ],
  },
  {
    id: 'intent_vector_source_firewall',
    label: 'Keep intent framing grounded in the original request',
    status: 'domain_limited',
    maps_to: ['context_by_authority', 'scope_control'],
    trigger: 'creative or strategy work where generated material may pull the task away from the user request',
    rule: 'Derive pull, away-from, and productive tension from the original query only; do not let generated shards or intermediate groupings rewrite the intent frame.',
    source_refs: [
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:mechs/w8q2k5.md#1',
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:schemas/w2x7k5.json#3',
    ],
  },
  {
    id: 'rubric_driven_recurse_or_emit',
    label: 'Use a rubric to decide whether to recurse or emit',
    status: 'domain_limited',
    maps_to: ['validation_loop', 'claim_strength_calibration'],
    trigger: 'iterative creative or analytical output where another pass may improve quality',
    rule: 'Score candidate outputs on explicit dimensions, then recurse only when the score or unresolved tension warrants it; otherwise emit and polish.',
    source_refs: [
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:mechs/r6f3p9.md#7',
      'github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/v7m2x4.py#157',
    ],
  },
  {
    id: 'runtime_owned_completion_gate',
    label: 'Prefer completion gates owned outside agent spontaneity',
    status: 'new_extension',
    maps_to: ['acceptance_design', 'validation_loop'],
    trigger: 'long work, sequential goals, or any workflow where the agent could skip its own checkpoint script',
    rule: 'When available, let the runtime or an external verifier judge completion at turn boundaries; agent-called scripts are weaker because the agent can forget to call them.',
    source_refs: [
      'github:tmdgusya/prometheus:README.md#35',
      'github:tmdgusya/prometheus:skills/prometheus/SKILL.md#84',
    ],
  },
  {
    id: 'context_sufficiency_before_goal_sentence',
    label: 'Secure context before proposing goal sentences',
    status: 'new_extension',
    maps_to: ['acceptance_design', 'context_management'],
    trigger: 'splitting work into goals, stories, tickets, or runtime-verifiable tasks',
    rule: 'Before decomposition, confirm the touched area, local rules, observable success condition, and existing approaches; if any are unknown, gather context before proposing the goal.',
    source_refs: [
      'github:tmdgusya/prometheus:skills/prometheus/SKILL.md#21',
      'github:tmdgusya/prometheus:skills/prometheus/SKILL.md#52',
    ],
  },
  {
    id: 'verifiable_goal_sentence',
    label: 'Write goal sentences with objective commands and expected results',
    status: 'new_extension',
    maps_to: ['acceptance_design', 'validation_loop'],
    trigger: 'creating a /goal, checkpoint, story, acceptance criterion, or final verification task',
    rule: 'A good goal names the target change plus concrete verification commands or observations and expected results; vague words like elegant, resolved, or improved are not enough.',
    source_refs: [
      'github:tmdgusya/prometheus:skills/prometheus/SKILL.md#103',
      'github:tmdgusya/prometheus:README.md#76',
    ],
  },
  {
    id: 'ablation_first_absorption',
    label: 'Keep absorbed procedures only after comparison or removal evidence',
    status: 'new_extension',
    maps_to: ['validation_loop', 'claim_strength_calibration'],
    trigger: 'deciding whether a borrowed rule should become core policy',
    rule: 'Treat attractive workflow rules as hypotheses. Compare, ablate, or define removal criteria, and drop rules that measurable evidence shows are quality debt.',
    source_refs: [
      'github:itsinseong/value-for-fable:bench/RESULTS.md#3',
      'github:itsinseong/value-for-fable:output-styles/vff-v2.md#8',
    ],
  },
  {
    id: 'structure_beats_compression',
    label: 'Preserve readable structure instead of forcing short output',
    status: 'new_extension',
    maps_to: ['claim_strength_calibration', 'scope_control'],
    trigger: 'final answers, writing, research summaries, diagnosis, and explanation tasks',
    rule: 'Save tokens by omitting irrelevant material, not by compressing necessary content into fragments; if brevity hurts clarity, keep the structure and explain enough.',
    source_refs: [
      'github:itsinseong/value-for-fable:output-styles/vff-v2.md#10',
      'github:itsinseong/value-for-fable:COST.md#51',
    ],
  },
  {
    id: 'task_type_routing',
    label: 'Route by task type instead of applying Fable-style procedure everywhere',
    status: 'new_extension',
    maps_to: ['capability_stop_gate', 'scope_control'],
    trigger: 'choosing between default model, stronger reasoning, review pass, or Fable-style procedure',
    rule: 'Use procedural structure for diagnosis, advice, writing, and clear work; route deep unfamiliar reasoning, complex architecture, or knowledge-ceiling tasks to stronger reasoning or review.',
    source_refs: [
      'github:itsinseong/value-for-fable:COST.md#51',
      'github:itsinseong/value-for-fable:README.md#149',
    ],
  },
  {
    id: 'fixed_criteria_review',
    label: 'Constrain review passes to fixed criteria',
    status: 'new_extension',
    maps_to: ['validation_loop', 'scope_control'],
    trigger: '2-pass review, independent draft review, high-cost answer review, document QA',
    rule: 'A review pass should judge only declared criteria such as missing requirements, factual or numeric errors, unexplained clues, and length violations; do not expand scope or invent findings.',
    source_refs: [
      'github:itsinseong/value-for-fable:agents/itsvff.md#46',
      'github:itsinseong/value-for-fable:README.md#102',
    ],
  },
  {
    id: 'long_session_drift_reminder',
    label: 'Refresh core workflow discipline only when long sessions drift',
    status: 'domain_limited',
    maps_to: ['context_management', 'long_horizon_continuity'],
    trigger: 'very long sessions, context pressure, recurring reminders, or always-on workflow modes',
    rule: 'For long sessions, inject a short reminder only when the mode is active and the transcript is large; keep reminders compact and avoid adding cost when not needed.',
    source_refs: [
      'github:itsinseong/value-for-fable:hooks/reminder.sh#4',
      'github:itsinseong/value-for-fable:README.md#118',
    ],
  },
];

const COGNITIVE_OPERATIONAL_AXES = [
  {
    id: 'implication_depth',
    label: 'Follow implications one step further',
    cognitive_bias: 'When a result, defect, or idea appears, look one step further at what it implies instead of stopping at the first useful answer.',
    operational_expression: [
      'For open-ended work, include the next-order consequence or downstream impact.',
      'For reviews, ask what this finding would break later.',
      'For design or strategy, name the second-order tradeoff.',
    ],
    soft_prompt: 'What follows from this if it is true, and what does that change next?',
    related_transfer_insights: ['capability_ceiling_escalation', 'multi_story_evidence_gate', 'task_type_routing'],
  },
  {
    id: 'causal_structure_first',
    label: 'Prefer causal structure over surface symptom',
    cognitive_bias: 'Treat visible output as a clue to an internal structure, not as the explanation itself.',
    operational_expression: [
      'In debugging, reproduce and map the causal chain before editing.',
      'In comparison, explain the mechanism that creates the visible difference.',
      'In analysis, separate symptom, trigger, underlying condition, and consequence.',
    ],
    soft_prompt: 'What mechanism would make this visible behavior inevitable?',
    related_transfer_insights: ['multi_hypothesis_generation', 'context_sufficiency_before_goal_sentence'],
  },
  {
    id: 'ambiguity_preservation',
    label: 'Keep useful ambiguity open long enough',
    cognitive_bias: 'Do not collapse ambiguous work into one answer before the problem shape is clear.',
    operational_expression: [
      'Name competing readings when the task is underspecified.',
      'Ask only when the missing answer changes the outcome.',
      'Carry safe assumptions explicitly when acting without a question.',
    ],
    soft_prompt: 'Which uncertainties matter, and which can be safely carried forward?',
    related_transfer_insights: ['multi_hypothesis_generation', 'intent_vector_source_firewall'],
  },
  {
    id: 'possibility_branching',
    label: 'Branch possibilities, then compress',
    cognitive_bias: 'Open several plausible branches internally, then present only the branches that matter for action.',
    operational_expression: [
      'For unknown causes, form 3+ hypotheses before narrowing.',
      'For planning, compare a conservative, direct, and exploratory path when the choice matters.',
      'For final answers, collapse branches into a concise decision and residual risks.',
    ],
    soft_prompt: 'What are the plausible branches, and which one should survive into the answer?',
    related_transfer_insights: ['multi_hypothesis_generation', 'creative_schema_state_machine'],
  },
  {
    id: 'medium_sensitivity',
    label: 'Let the medium set the judging criteria',
    cognitive_bias: 'Code, UI, games, writing, visual artifacts, and strategy each fail in different ways; judge by the medium, not by a generic checklist.',
    operational_expression: [
      'For renderable artifacts, inspect actual pixels or runtime behavior.',
      'For code, run the narrowest meaningful test/build path.',
      'For documents or analysis, verify claims against sources and reader purpose.',
    ],
    soft_prompt: 'What kind of artifact is this, and what does correctness mean in that medium?',
    related_transfer_insights: ['render_observation_required', 'behavior_eval_not_capability_benchmark'],
  },
  {
    id: 'consequence_tracing',
    label: 'Trace decisions into later constraints',
    cognitive_bias: 'A local choice is evaluated by how it reshapes the next constraints, not only by whether it solves the immediate request.',
    operational_expression: [
      'When changing shared behavior, identify the contract or workflow it touches.',
      'When proposing a plan, include the verification that would catch the main downstream risk.',
      'When blocked, choose the fallback that preserves the user goal most directly.',
    ],
    soft_prompt: 'What later constraint does this choice create or remove?',
    related_transfer_insights: ['multi_story_evidence_gate', 'capability_ceiling_escalation', 'ablation_first_absorption'],
  },
  {
    id: 'coherence_over_completion',
    label: 'Prefer coherent completion over apparent completion',
    cognitive_bias: 'Finishing is not enough; the result must hang together with evidence, constraints, and the user goal.',
    operational_expression: [
      'Do not end with a promise to do work later.',
      'Tie completion claims to verification evidence.',
      'Report gaps instead of smoothing them over.',
    ],
    soft_prompt: 'Does this answer merely end, or does it actually close the loop?',
    related_transfer_insights: ['early_stop_prevention', 'multi_story_evidence_gate', 'structure_beats_compression', 'fixed_criteria_review'],
  },
  {
    id: 'capability_humility',
    label: 'Separate capability limits from procedural gaps',
    cognitive_bias: 'Do not pretend procedure can supply missing capability, evidence, permission, or model access.',
    operational_expression: [
      'State when a limit is evidence, access, tool, runtime, model, or human-judgment related.',
      'Escalate with an evidence package when the task exceeds the current capability.',
      'Avoid identity claims about Fable or hidden reasoning.',
    ],
    soft_prompt: 'Is the blocker a missing step, missing evidence, or a real capability ceiling?',
    related_transfer_insights: ['capability_ceiling_escalation', 'procedure_not_identity', 'codex_native_semantic_translation'],
  },
];

let cache = null;

export function readJsonl(file) {
  return fs.readFileSync(file, 'utf8')
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${file}:${index + 1}: ${error.message}`);
      }
    });
}

export function loadOntology({ refresh = false } = {}) {
  if (cache && !refresh) return cache;
  const atoms = readJsonl(path.join(DATA_DIR, FILES.atoms));
  const edges = readJsonl(path.join(DATA_DIR, FILES.edges));
  const patterns = JSON.parse(fs.readFileSync(path.join(DATA_DIR, FILES.patterns), 'utf8'));
  const comparison = JSON.parse(fs.readFileSync(path.join(DATA_DIR, FILES.comparison), 'utf8'));
  const audit = JSON.parse(fs.readFileSync(path.join(DATA_DIR, FILES.audit), 'utf8'));
  const byId = new Map(atoms.map(atom => [atom.id, atom]));
  const outgoing = new Map();
  const incoming = new Map();
  for (const edge of edges) {
    if (!outgoing.has(edge.from)) outgoing.set(edge.from, []);
    if (!incoming.has(edge.to)) incoming.set(edge.to, []);
    outgoing.get(edge.from).push(edge);
    incoming.get(edge.to).push(edge);
  }
  cache = { atoms, edges, patterns, comparison, audit, byId, outgoing, incoming };
  return cache;
}

export function summarizeOntology() {
  const { atoms, edges, patterns, comparison, audit } = loadOntology();
  return {
    plugin: 'fable-ontology-agent',
    atoms: atoms.length,
    edges: edges.length,
    pattern_clusters: patterns.clusters.length,
    fallback_events: comparison.fallback_events.count,
    audit_verdict: audit.verdict,
    hard_grounding_failures: audit.grounding_review?.hard_grounding_failures ?? null,
    interpretive_review_items: audit.grounding_review?.interpretive_review_items ?? null,
    transfer_insights: TRANSFER_INSIGHTS.length,
    transfer_insight_sources: transferInsightSources(),
    cognitive_operational_axes: COGNITIVE_OPERATIONAL_AXES.length,
    layer_counts: countBy(atoms, atom => atom.source_layer || 'unknown'),
    edge_type_counts: countBy(edges, edge => edge.type || 'unknown'),
  };
}

export function auditOntology() {
  const { audit } = loadOntology();
  return {
    verdict: audit.verdict,
    counts: audit.counts,
    source_summary: audit.source_summary,
    grounding_review: audit.grounding_review,
    fallback_summary: audit.fallback_summary,
    pattern_summary: audit.pattern_summary,
    derived_axis_summary: audit.derived_axis_summary,
    data_integrity: checkDataIntegrity(),
    recommendation: audit.grounding_review?.interpretive_review_items
      ? 'Use direct-evidence mode for enforcement. Keep interpretive review items tagged as interpretive in prompt policies.'
      : 'Ontology is ready for direct-evidence enforcement.',
  };
}

export function checkDataIntegrity() {
  const data = loadOntology();
  if (data.integrity) return data.integrity;
  const { atoms, edges, byId } = data;
  const atomIds = new Set();
  const edgeIds = new Set();
  const duplicateAtomIds = [];
  const duplicateEdgeIds = [];
  const danglingEdgeRefs = [];
  for (const atom of atoms) {
    if (atomIds.has(atom.id)) duplicateAtomIds.push(atom.id);
    atomIds.add(atom.id);
  }
  for (const edge of edges) {
    if (edgeIds.has(edge.id)) duplicateEdgeIds.push(edge.id);
    edgeIds.add(edge.id);
    if (!byId.has(edge.from) || !byId.has(edge.to)) danglingEdgeRefs.push(edge.id);
  }
  data.integrity = {
    status: duplicateAtomIds.length || duplicateEdgeIds.length || danglingEdgeRefs.length ? 'fail' : 'pass',
    note: 'Computed live from the bundled atoms and edges at call time; independent of the static audit report.',
    atoms: atoms.length,
    edges: edges.length,
    duplicate_atom_ids: duplicateAtomIds.length,
    duplicate_edge_ids: duplicateEdgeIds.length,
    dangling_edge_refs: danglingEdgeRefs.length,
    samples: {
      duplicate_atom_ids: duplicateAtomIds.slice(0, 5),
      duplicate_edge_ids: duplicateEdgeIds.slice(0, 5),
      dangling_edge_refs: danglingEdgeRefs.slice(0, 5),
    },
  };
  return data.integrity;
}

export function getCognitiveOperationalProfile(args = {}) {
  const { query = '', axis } = args;
  const tokens = tokenize(query || axis || '');
  const axes = COGNITIVE_OPERATIONAL_AXES.filter(item => {
    if (!tokens.length) return true;
    return matchesTokens(normalize([
      item.id,
      item.label,
      item.cognitive_bias,
      item.operational_expression.join(' '),
      item.soft_prompt,
      item.related_transfer_insights.join(' '),
    ].join(' ')), tokens);
  });
  return {
    mode: 'cognitive_operational_synthesis',
    identity_boundary: 'procedure_and_attention_pattern_not_hidden_model_identity',
    usage: 'Use this profile when the user asks to think like Fable, apply Fable-style judgment, or combine cognitive style with working discipline.',
    axes,
  };
}

export function listTransferInsights(args = {}) {
  const { query = '', status, map } = args;
  const tokens = tokenize(query);
  const rows = TRANSFER_INSIGHTS.filter(item => {
    if (status && item.status !== status) return false;
    if (map && !item.maps_to.includes(map)) return false;
    if (!tokens.length) return true;
    return matchesTokens(normalize([
      item.id,
      item.label,
      item.status,
      item.maps_to.join(' '),
      item.trigger,
      item.rule,
      item.source_refs.join(' '),
    ].join(' ')), tokens);
  });
  return {
    count: rows.length,
    sources: transferInsightSources(),
    insights: rows,
  };
}

export function queryOntology(args = {}) {
  const {
    query = '',
    layer,
    type,
    source_kind,
    model,
    limit = 30,
    include_edges = false,
  } = args;
  const { atoms, outgoing, incoming } = loadOntology();
  const haystacks = atomHaystacks();
  const tokens = tokenize(query);
  const max = clamp(limit, 1, 500);
  const rows = [];
  let totalMatches = 0;
  for (let i = 0; i < atoms.length; i++) {
    const atom = atoms[i];
    if (layer && atom.source_layer !== layer) continue;
    if (type && atom.type !== type) continue;
    if (source_kind && atom.source_kind !== source_kind) continue;
    if (model && String(atom.model || '') !== model) continue;
    if (tokens.length && !matchesTokens(haystacks[i], tokens)) continue;
    totalMatches++;
    if (rows.length < max) {
      rows.push(atomPreview(atom, include_edges ? { outgoing, incoming } : null));
    }
  }
  return {
    query,
    count: rows.length,
    total_matches: totalMatches,
    truncated: totalMatches > rows.length,
    atoms: rows,
  };
}

export function inspectNode(args = {}) {
  const { id, include_neighbors = true, neighbor_limit = 50 } = args;
  const { byId, outgoing, incoming } = loadOntology();
  if (!id || !byId.has(id)) {
    return { found: false, id, message: 'Node not found.' };
  }
  const atom = byId.get(id);
  const out = outgoing.get(id) || [];
  const inc = incoming.get(id) || [];
  const result = {
    found: true,
    atom,
    evidence: evidenceBlock(atom),
  };
  if (include_neighbors) {
    result.outgoing_total = out.length;
    result.incoming_total = inc.length;
    result.outgoing = out.slice(0, neighbor_limit).map(edge => edgePreview(edge, byId));
    result.incoming = inc.slice(0, neighbor_limit).map(edge => edgePreview(edge, byId));
  }
  return result;
}

export function scoreWorkflow(args = {}) {
  const { session_id, source_file } = args;
  const { atoms, patterns } = loadOntology();
  let rows = atoms.filter(atom => atom.source_layer === 'local_behavior_atom');
  if (session_id) rows = rows.filter(atom => atom.session_id === session_id);
  if (source_file) rows = rows.filter(atom => atom.source_file === source_file || atom.source_file?.endsWith(source_file));
  rows.sort((a, b) => String(a.timestamp || '').localeCompare(String(b.timestamp || '')) || (a.source_line || 0) - (b.source_line || 0));

  const counts = countBy(rows, atom => atom.type || 'unknown');
  const toolCounts = countBy(rows.filter(atom => atom.type === 'tool_action'), atom => atom.tool_name || 'unknown');
  const hasContext = rows.some(isContextTool);
  const hasVerification = rows.some(atom => atom.type === 'verification_result' || isVerificationTool(atom));
  const hasChange = rows.some(atom => atom.type === 'change_claim');
  const hasBlocker = rows.some(atom => atom.type === 'uncertainty_or_blocker' || atom.type === 'model_access_error');
  const fallback = rows.filter(atom => atom.type === 'fallback_event').length;
  const changeToVerify = countTransition(rows, atom => atom.type === 'change_claim', atom => atom.type === 'verification_result' || isVerificationTool(atom), 12);
  const blockerToRecovery = countTransition(rows, atom => atom.type === 'uncertainty_or_blocker' || atom.type === 'model_access_error', atom => ['tool_action', 'change_claim', 'verification_result'].includes(atom.type), 12);
  const transferAlignment = assessTransferAlignment(rows, { hasVerification, hasChange, hasBlocker, fallback, changeToVerify });

  const scoreParts = [
    ['context_before_action', hasContext ? 18 : 0, 18],
    ['tool_grounding', (toolCounts.Bash || toolCounts.Read || toolCounts.Grep || toolCounts.Glob) ? 18 : 0, 18],
    ['verification_loop', hasVerification ? 22 : 0, 22],
    ['change_claim_linked_to_verification', hasChange ? Math.min(18, changeToVerify * 3) : 12, 18],
    ['blocker_recovery', hasBlocker ? Math.min(12, blockerToRecovery * 3) : 12, 12],
    ['fallback_visibility', fallback ? 6 : 12, 12],
  ];
  const score = scoreParts.reduce((sum, [, got]) => sum + got, 0);
  const maxScore = scoreParts.reduce((sum, [, , max]) => sum + max, 0);

  return {
    scope: session_id ? { session_id } : source_file ? { source_file } : { all_local_behavior_atoms: true },
    atoms: rows.length,
    score,
    max_score: maxScore,
    percentage: Math.round((score / maxScore) * 100),
    score_parts: scoreParts.map(([name, got, max]) => ({ name, got, max })),
    counts,
    tool_counts: toolCounts,
    transition_counts: {
      change_to_verification: changeToVerify,
      blocker_to_recovery: blockerToRecovery,
      fallback_events: fallback,
    },
    pattern_reference: patterns.clusters.map(cluster => ({
      id: cluster.id,
      label: cluster.label_ko,
      count: cluster.count,
      maps_to: cluster.maps_to,
    })),
    transfer_alignment: transferAlignment,
    recommendation: [
      ...recommendFromScore(score, maxScore, { hasContext, hasVerification, hasChange, hasBlocker, fallback }),
      ...recommendFromTransferAlignment(transferAlignment),
    ],
  };
}

const PROMPT_PACK_FILES = [
  'SYSTEM-PROMPT.md',
  'SESSION-AUDIT-CHECKLIST.md',
  'TRANSFER-INSIGHTS.md',
  'COGNITIVE-OPERATIONAL-PROFILE.md',
  'PROMPT-TEMPLATES.md',
  'README.md',
  'INTERPRETIVE-REVIEW.md',
];

export function buildPromptPack(args = {}) {
  const mode = args.mode === 'full' ? 'full' : 'strict';
  const targetDir = path.resolve(args.target_dir || path.join(GENERATED_DIR, `fable-prompt-pack-${mode}`));
  const audit = auditOntology();
  fs.mkdirSync(targetDir, { recursive: true });
  const strictRules = [
    ['Output Lock', 'Before acting, lock the primary output form: answer, edit, implementation, review, audit, design artifact, research, clarification, or validation.'],
    ['Context by Authority', 'Read the governing local files, logs, contracts, or user-provided evidence before making claims.'],
    ['Ask or Act Threshold', 'Ask only when the missing answer materially changes the outcome; otherwise act with a stated safe assumption.'],
    ['Capability Stop Gate', 'If a required tool, permission, runtime, asset, or evidence source is unavailable, stop and state the blocker.'],
    ['Source Section Accounting', 'When adapting a repository, prompt, skill, or policy set, account for each meaningful source section as implemented, adapted, unsupported, or not applicable.'],
    ['Codex Native Translation', 'Translate imported workflow semantics into actual Codex tools, dates, paths, permissions, and policy surfaces; drop unavailable provider assumptions.'],
    ['Smallest Durable Surface', 'Persist a rule at the smallest surface that can carry it: current prompt, AGENTS.md, skill, plugin, connector, or provider config.'],
    ['Competing Hypotheses', 'For debugging, unknown cause, or ambiguous review, form 3+ competing hypotheses before pursuing one explanation.'],
    ['Runtime Observation', 'For renderable or executable artifacts, run the artifact in its real environment and observe the output before claiming completion.'],
    ['Frozen Gate Contract', 'For non-trivial work, write objective acceptance gates before building and do not relax them mid-run to force a pass.'],
    ['Disjoint Lane Parallelism', 'Parallelize only when lanes have provably disjoint file or asset sets; keep synthesis single-threaded.'],
    ['Fresh Verifier Gate', 'Treat builder claims as insufficient; verify actual artifacts, diffs, or outputs against frozen gates.'],
    ['Short-Map Memory', 'For long work, keep handoff state short and link details instead of carrying a giant context log.'],
    ['Retry Budget Escalation', 'When repeated repair fails, stop at the retry budget and escalate with the failed gate, investigation notes, and current artifact state.'],
    ['Runtime-Owned Completion Gate', 'When an external runtime, goal system, or verifier can judge completion, prefer that over agent-remembered checkpoint scripts.'],
    ['Context Before Goal Sentences', 'Before writing a goal or story, confirm the touched area, local rules, observable success condition, and existing approach.'],
    ['Verifiable Goal Sentence', 'Write goals with a target change plus concrete verification commands or observations and expected results.'],
    ['Ablation-First Absorption', 'Treat borrowed workflow rules as hypotheses; keep them only when comparison, ablation, or removal criteria justify the cost.'],
    ['Structure Over Compression', 'Omit irrelevant material to save space, but do not compress needed explanation into unreadable fragments.'],
    ['Task-Type Routing', 'Apply Fable-style procedure where it helps, and route knowledge-ceiling, deep reasoning, or complex architecture work to stronger reasoning or review.'],
    ['Fixed-Criteria Review', 'Constrain review passes to declared criteria such as missing requirements, factual errors, unexplained clues, and length violations.'],
    ['Validation Loop', 'After any change, run the smallest meaningful verification and report the result.'],
    ['Early Stop Prevention', 'Do not end by promising future work. Either perform the work, ask a necessary question, or state the blocker.'],
    ['Capability Ceiling Escalation', 'When procedure cannot supply the missing capability, state the limit and escalate with an evidence package.'],
    ['Progress Claim Evidence', 'Do not claim completion or inspection without a matching tool result or source pointer.'],
    ['Claim Strength Calibration', 'Mark approximations and inferences as such; do not promote interpretation to fact.'],
  ];
  const fullOnlyRules = [
    ['Creative Schema State Machine', 'For creative work only, split generation, grouping, selection, intent framing, crafting, evaluation, and polish into explicit phases.'],
    ['Divergent Profiles And Deterministic Firewall', 'For creative synthesis, allow divergent profiles upstream and pass only approved fields through a deterministic filter downstream.'],
    ['Intent Vector Source Firewall', 'For creative and strategy work, derive pull, away-from, and productive tension from the original user request, not from generated intermediate material.'],
    ['Rubric-Driven Recurse Or Emit', 'For iterative creative output, recurse only when explicit quality dimensions show that another pass is warranted.'],
    ['Long Session Drift Reminder', 'For very long sessions, inject compact workflow reminders only when the active mode is drifting and the transcript is large.'],
  ];
  const promptRules = mode === 'full' ? [...strictRules, ...fullOnlyRules] : strictRules;
  const files = {
    'SYSTEM-PROMPT.md': systemPromptMarkdown(promptRules, mode),
    'SESSION-AUDIT-CHECKLIST.md': sessionAuditChecklistMarkdown(),
    'TRANSFER-INSIGHTS.md': transferInsightsMarkdown(),
    'COGNITIVE-OPERATIONAL-PROFILE.md': cognitiveOperationalProfileMarkdown(),
    'PROMPT-TEMPLATES.md': promptTemplatesMarkdown(),
    'README.md': promptPackReadme(mode, audit),
  };
  if (mode === 'full') {
    files['INTERPRETIVE-REVIEW.md'] = interpretiveReviewMarkdown(audit);
  }
  // Remove only stale pack files from a previous mode; never delete anything else in target_dir.
  for (const name of PROMPT_PACK_FILES) {
    if (!(name in files)) fs.rmSync(path.join(targetDir, name), { force: true });
  }
  for (const [name, body] of Object.entries(files)) {
    fs.writeFileSync(path.join(targetDir, name), body);
  }
  return { mode, target_dir: targetDir, files: Object.keys(files) };
}

export function buildAgentApp(args = {}) {
  const outputPath = path.resolve(args.output_path || path.join(GENERATED_DIR, 'fable-ontology-agent-app.html'));
  const summary = summarizeOntology();
  const audit = auditOntology();
  const score = scoreWorkflow();
  const html = agentAppHtml({ summary, audit, score });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
  return { output_path: outputPath, bytes: Buffer.byteLength(html) };
}

function countBy(rows, fn) {
  const out = {};
  for (const row of rows) inc(out, fn(row));
  return out;
}

function inc(obj, key) {
  obj[key] = (obj[key] || 0) + 1;
}

function normalize(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function tokenize(query) {
  return normalize(query).split(' ').filter(Boolean);
}

function matchesTokens(haystack, tokens) {
  return tokens.every(token => haystack.includes(token));
}

function atomHaystacks() {
  const data = loadOntology();
  if (!data.haystacks) {
    data.haystacks = data.atoms.map(atom => normalize([
      atom.id,
      atom.type,
      atom.text,
      atom.axis,
      atom.axes?.join(' '),
      atom.source_kind,
      atom.source_layer,
      atom.model,
      atom.session_id,
    ].filter(Boolean).join(' ')));
  }
  return data.haystacks;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, Number.isFinite(n) ? n : min));
}

function atomPreview(atom, graph = null) {
  const preview = {
    id: atom.id,
    layer: atom.source_layer,
    type: atom.type,
    source_kind: atom.source_kind,
    axis: atom.axis,
    axes: atom.axes,
    model: atom.model,
    session_id: atom.session_id,
    text: truncate(atom.text || atom.evidence_excerpt || atom.description_ko || '', 320),
    source: atom.source_file ? `${atom.source_file}:${atom.source_line || 1}` : null,
  };
  if (graph) {
    preview.incoming_edges = (graph.incoming.get(atom.id) || []).length;
    preview.outgoing_edges = (graph.outgoing.get(atom.id) || []).length;
  }
  return preview;
}

function edgePreview(edge, byId) {
  return {
    id: edge.id,
    type: edge.type,
    from: edge.from,
    to: edge.to,
    from_label: labelForAtom(byId.get(edge.from)),
    to_label: labelForAtom(byId.get(edge.to)),
  };
}

function evidenceBlock(atom) {
  return {
    source_layer: atom.source_layer,
    source_kind: atom.source_kind,
    source_file: atom.source_file || null,
    source_line: atom.source_line || null,
    source_url: atom.source_url || null,
    confidence: atom.confidence || null,
    note: atom.source_layer === 'thought_system_atom' && atom.source_kind !== 'repo_file'
      ? 'This may be an interpreted rule or extension. Treat as interpretive unless direct quotation is shown.'
      : 'Directly sourced or structurally derived from validated ontology data.',
  };
}

function truncate(value, length) {
  const s = String(value ?? '').replace(/\s+/g, ' ').trim();
  return s.length > length ? `${s.slice(0, length - 3)}...` : s;
}

function isContextTool(atom) {
  if (atom.type !== 'tool_action') return false;
  return /Read:|Glob:|Grep:|Bash: (find|ls|rg|grep|sed|cat|head|tail|pwd|git status|git diff)/i.test(atom.text || '');
}

function isVerificationTool(atom) {
  if (atom.type !== 'tool_action') return false;
  return /test|pytest|vitest|playwright|lint|typecheck|tsc|build|verify|검증|npm run|xcodebuild|swift test|cargo test/i.test(atom.text || '');
}

function countTransition(rows, fromFn, toFn, windowSize) {
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    if (!fromFn(rows[i])) continue;
    if (rows.slice(i + 1, i + 1 + windowSize).some(toFn)) total++;
  }
  return total;
}

function assessTransferAlignment(rows, flags) {
  const hasHypothesis = rows.some(atom => /hypothes|가설|competing|alternative explanation|대안|경쟁/i.test(atom.text || ''));
  const hasRenderObservation = rows.some(atom => isRenderObservationTool(atom));
  const hasTaskBreakdown = rows.some(atom => /TaskCreate|TaskUpdate|goal|story|checkpoint|분해|단계|handoff/i.test(atom.text || '')) || flags.changeToVerify > 0;
  const hasCeilingEscalation = flags.hasBlocker || flags.fallback > 0 || rows.some(atom => /escalat|ceiling|한계|불가능|stronger model|human/i.test(atom.text || ''));
  const hasFrozenGate = rows.some(atom => /frozen gate|acceptance gate|pass condition|합격 기준|gate.*written|gate.*before|동결/i.test(atom.text || ''));
  const hasDisjointLanes = rows.some(atom => /disjoint|lane|file set|asset set|parallel|겹치지|레인|병렬/i.test(atom.text || ''));
  const hasFreshVerifier = rows.some(atom => /verifier|fresh context|actual artifact|real artifact|builder claim|검증자|diff.*(PASS|FAIL)|(PASS|FAIL).*diff|output.*(PASS|FAIL)|(PASS|FAIL).*output/i.test(atom.text || ''));
  const hasShortMapMemory = rows.some(atom => /short map|handoff|lessons\.md|gates\.md|lanes\.md|external memory|context log|인계|메모리/i.test(atom.text || ''));
  const hasRetryBudget = rows.some(atom => /retry budget|budget exhausted|investigate.*verify|failed gate|repair loop|재시도|예산|실패 gate/i.test(atom.text || ''));
  const hasSourceAccounting = rows.some(atom => /source[- ]?(section|heading)|coverage matrix|implemented|adapted|unsupported|not[_ -]?applicable|커버리지|출처.*섹션/i.test(atom.text || ''));
  const hasCodexNativeTranslation = rows.some(atom => /codex[- ]native|actual codex|tool schema|semantic translation|unavailable tool|provider identity|도구.*변환/i.test(atom.text || ''));
  const hasSmallestDurableSurface = rows.some(atom => /smallest durable surface|AGENTS\.md|skill|plugin|connector|provider config|persist|scope.*rule|최소.*표면|영구/i.test(atom.text || ''));
  const hasBehaviorEval = rows.some(atom => /behavior.*eval|capability benchmark|inspection.*verification|routing.*final reporting|model[- ]weight|hidden runtime|행동.*평가/i.test(atom.text || ''));
  const hasRuntimeOwnedGate = rows.some(atom => /\/goal|runtime.*(verif|judge|gate|completion)|external verifier|completion gate|런타임.*(완료|판정)|goal sentence/i.test(atom.text || ''));
  const hasContextGoal = rows.some(atom => /context sufficien|goal sentence|observable success|success condition|맥락.*충분|검증 가능한.*goal/i.test(atom.text || ''));
  const hasVerifiableGoal = rows.some(atom => /verification:|expected output|exit code|verifiable goal|objective condition|기대 결과|검증 명령/i.test(atom.text || ''));
  const hasAblation = rows.some(atom => /ablation|benchmark|A\/B|remove.*rule|quality debt|v1.*v2|재검증|측정|품질 부채/i.test(atom.text || ''));
  const hasStructureCompression = rows.some(atom => /readable|compression|압축|fragments|arrow chain|산문|가독성/i.test(atom.text || ''));
  const hasTaskRouting = rows.some(atom => /task type|routing|stronger model|opus|sonnet|capability ceiling|작업.*라우팅|강한 모델/i.test(atom.text || ''));
  const hasFixedCriteriaReview = rows.some(atom => /missing requirements|factual.*numeric|unexplained clue|length overrun|fixed criteria|2-pass|리뷰.*기준|분량 초과/i.test(atom.text || ''));
  const hasEarlyStopRisk = rows.some(atom => atom.type === 'assistant_claim' && /\b(I'?ll|I will|let me|now I'?ll)\b|하겠습니다\.?$|진행하겠습니다\.?$/i.test(atom.text || ''));
  const procedureNotIdentity = true;

  return [
    transferPart('multi_hypothesis_generation', hasHypothesis, 'Evidence of 3+ competing hypotheses or alternatives in the scoped session.'),
    transferPart('render_observation_required', hasRenderObservation, 'Evidence of real renderer/runtime observation such as screenshot, browser preview, Playwright, canvas, SVG, chart, or game run.'),
    transferPart('early_stop_prevention', !hasEarlyStopRisk, 'No obvious future-promise stopping pattern detected in assistant claims.'),
    transferPart('capability_ceiling_escalation', hasCeilingEscalation, 'Blocker, fallback, limitation, or escalation signal is explicitly visible.'),
    transferPart('multi_story_evidence_gate', hasTaskBreakdown, 'Task decomposition or change-to-verification evidence is visible.'),
    transferPart('procedure_not_identity', procedureNotIdentity, 'Plugin policy treats transfer as procedure rather than hidden model identity.'),
    transferPart('frozen_gate_contract', hasFrozenGate, 'Evidence that objective acceptance gates were set before implementation and not relaxed mid-run.'),
    transferPart('disjoint_lane_parallelism', hasDisjointLanes, 'Evidence that parallel lanes use disjoint file or asset sets, or that non-disjoint work stays serialized.'),
    transferPart('fresh_verifier_gate', hasFreshVerifier, 'Evidence that actual artifacts, diffs, or outputs were checked independently of builder claims.'),
    transferPart('short_map_external_memory', hasShortMapMemory, 'Evidence that long work uses a short handoff map with linked detail files instead of a giant context log.'),
    transferPart('retry_budget_escalation', hasRetryBudget, 'Evidence that repeated repair loops have a retry budget and escalation package.'),
    transferPart('source_section_accounting_gate', hasSourceAccounting, 'Evidence that imported source sections were accounted for as implemented, adapted, unsupported, or not applicable.'),
    transferPart('codex_native_semantic_translation', hasCodexNativeTranslation, 'Evidence that imported instructions were translated into actual Codex tools, policies, and surfaces.'),
    transferPart('smallest_durable_surface', hasSmallestDurableSurface, 'Evidence that persistent rules were placed on the smallest durable surface that can carry them.'),
    transferPart('behavior_eval_not_capability_benchmark', hasBehaviorEval, 'Evidence that behavior checks are separated from model capability or identity claims.'),
    transferPart('runtime_owned_completion_gate', hasRuntimeOwnedGate, 'Evidence that completion is judged by a runtime, /goal, or external verifier rather than agent spontaneity.'),
    transferPart('context_sufficiency_before_goal_sentence', hasContextGoal, 'Evidence that context was gathered before a goal, story, or success condition was proposed.'),
    transferPart('verifiable_goal_sentence', hasVerifiableGoal, 'Evidence that goals include objective verification commands, observations, or expected results.'),
    transferPart('ablation_first_absorption', hasAblation, 'Evidence that absorbed rules were compared, ablated, benchmarked, or given removal criteria.'),
    transferPart('structure_beats_compression', hasStructureCompression, 'Evidence that necessary structure and readability were preserved instead of over-compressing the answer.'),
    transferPart('task_type_routing', hasTaskRouting, 'Evidence that procedure, stronger reasoning, or review was selected by task type and capability ceiling.'),
    transferPart('fixed_criteria_review', hasFixedCriteriaReview, 'Evidence that review passes used fixed criteria instead of expanding scope opportunistically.'),
  ];
}

function transferPart(name, met, note) {
  const insight = TRANSFER_INSIGHTS.find(item => item.id === name);
  return {
    name,
    got: met ? 1 : 0,
    max: 1,
    status: met ? 'met_or_supported' : 'missing_or_unobserved',
    maps_to: insight?.maps_to || [],
    note,
  };
}

function isRenderObservationTool(atom) {
  const text = atom.text || '';
  return atom.type === 'tool_action'
    && /screenshot|preview|playwright|browser|chrome|canvas|svg|chart|game|render|렌더|스크린샷|브라우저/i.test(text);
}

function recommendFromScore(score, maxScore, flags) {
  const ratio = score / maxScore;
  const recs = [];
  if (!flags.hasContext) recs.push('Add an explicit context inventory step before action.');
  if (!flags.hasVerification) recs.push('Add a verification step before final claims.');
  if (flags.hasChange && ratio < 0.7) recs.push('Link change claims to concrete test or inspection evidence.');
  if (flags.fallback) recs.push('Keep fallback events visible and do not merge them into normal Fable behavior.');
  if (!recs.length) recs.push('Workflow matches the strict ontology pattern well.');
  return recs;
}

function recommendFromTransferAlignment(parts) {
  const recs = [];
  if (parts.some(part => part.name === 'multi_hypothesis_generation' && part.got === 0)) {
    recs.push('Add 3+ competing hypotheses before narrowing an unknown-cause investigation.');
  }
  if (parts.some(part => part.name === 'render_observation_required' && part.got === 0)) {
    recs.push('For renderable or executable artifacts, add a real runtime observation before final claims.');
  }
  if (parts.some(part => part.name === 'early_stop_prevention' && part.got === 0)) {
    recs.push('Avoid ending on future intent; do the promised work or ask the blocking question.');
  }
  if (parts.some(part => part.name === 'frozen_gate_contract' && part.got === 0)) {
    recs.push('For non-trivial work, freeze objective acceptance gates before building.');
  }
  if (parts.some(part => part.name === 'fresh_verifier_gate' && part.got === 0)) {
    recs.push('For lane completion, verify the real artifact or diff rather than relying on builder self-claims.');
  }
  if (parts.some(part => part.name === 'source_section_accounting_gate' && part.got === 0)) {
    recs.push('For source absorption, account for each meaningful source section as implemented, adapted, unsupported, or not applicable.');
  }
  if (parts.some(part => part.name === 'verifiable_goal_sentence' && part.got === 0)) {
    recs.push('Write goals with concrete verification commands or observations and expected results.');
  }
  if (parts.some(part => part.name === 'ablation_first_absorption' && part.got === 0)) {
    recs.push('Before making borrowed workflow rules core policy, add comparison, ablation, or removal criteria.');
  }
  if (parts.some(part => part.name === 'fixed_criteria_review' && part.got === 0)) {
    recs.push('Constrain review passes to fixed criteria such as missing requirements, factual errors, unexplained clues, and length violations.');
  }
  return recs;
}

function labelForAtom(atom) {
  if (!atom) return 'unknown';
  return truncate(atom.text || atom.axis || atom.id, 64);
}

function transferInsightSources() {
  return [...new Set(TRANSFER_INSIGHTS.flatMap(item => item.source_refs.map(sourceRoot)))];
}

function sourceRoot(ref) {
  const [kind, rest = ''] = String(ref).split(':');
  return `${kind}:${rest.split('#')[0]}`;
}

function systemPromptMarkdown(rules, mode) {
  return `# Fable Ontology Agent System Prompt (${mode})\n\nUse these rules as observable workflow discipline and cognitive orientation, not as a claim about hidden model identity.\n\n## Cognitive Operational Synthesis\n\nThink through the problem with these soft biases: implication depth, causal structure first, ambiguity preservation, possibility branching, medium sensitivity, consequence tracing, coherent closure, and capability humility. Let those biases choose the right working move; do not expose a checklist unless the user asks for audit detail.\n\n${rules.map(([name, rule]) => `## ${name}\n\n${rule}`).join('\n\n')}\n`;
}

function sessionAuditChecklistMarkdown() {
  return `# Session Audit Checklist\n\n- [ ] Did the work lock the output type before expanding scope?\n- [ ] Did it inspect governing files or user-provided evidence before factual claims?\n- [ ] Did unknown-cause work consider 3+ competing hypotheses before narrowing?\n- [ ] Did renderable or executable artifacts run in their real environment and get observed?\n- [ ] Did non-trivial work freeze objective acceptance gates before building?\n- [ ] Did any parallel lanes have provably disjoint file or asset sets?\n- [ ] Did verification inspect the real artifact, diff, or output rather than trusting a builder claim?\n- [ ] Did long work keep a short handoff map and move detail into linked files?\n- [ ] Did repeated repair loops stop at a retry budget and escalate with evidence?\n- [ ] Did source absorption account for each meaningful section as implemented, adapted, unsupported, or not applicable?\n- [ ] Did imported guidance translate into actual Codex tools, dates, paths, permissions, and policy surfaces?\n- [ ] Did goals or stories include concrete verification commands or observations and expected results?\n- [ ] Did absorbed rules have comparison, ablation, or removal rationale instead of taste-only adoption?\n- [ ] Did review passes stay within fixed criteria such as missing requirements, factual errors, unexplained clues, and length violations?\n- [ ] Did it ask only when the missing answer changed the outcome?\n- [ ] Did it surface blockers, permissions, missing tools, missing evidence, or capability ceilings?\n- [ ] Did every change claim have nearby verification evidence?\n- [ ] Did final reporting separate facts, inferences, and unresolved risks?\n- [ ] Did it avoid ending with a promise to do work later?\n`;
}

function promptTemplatesMarkdown() {
  return `# Prompt Templates\n\n## Strict Implementation\n\nBefore acting, classify the output type, inspect the governing files, make the smallest sufficient change, verify it, and only then report completion with evidence.\n\n## Evidence Audit\n\nAudit the following session or artifact. Mark each claim as directly evidenced, structurally derived, interpretive, or unsupported. Do not infer hidden reasoning.\n\n## Source Section Accounting\n\nFor each meaningful source section, decide implemented, adapted, unsupported, or not applicable. Report coverage as accounting evidence, not as proof of capability parity.\n\n## Verifiable Goal Sentence\n\nWrite one goal sentence that names the target change, concrete verification command or observation, and expected result. If context is missing, gather it before writing the goal.\n\n## Fixed Criteria Review\n\nReview only these declared criteria: missing requirements, factual or numeric errors, unexplained clues, and length or scope violations. Do not expand scope during the review pass.\n\n## Unknown Cause Investigation\n\nReproduce the symptom first. Name at least 3 competing hypotheses, identify evidence that would confirm or reject each one, inspect the causal chain, then verify before and after the fix.\n\n## Render Grounding\n\nFor a visual or executable artifact, run it in the real renderer/runtime, inspect the actual output and console, fix observed defects, and re-run after each change.\n\n## Frozen Gate Work Block\n\nFor a non-trivial work block, write objective acceptance gates before building. If a gate appears wrong, stop and make a fresh planning decision instead of relaxing it mid-run.\n\n## Disjoint Lane Parallel Work\n\nSplit work into lanes only when each lane has a provably disjoint file or asset set. Run builders in parallel only for disjoint lanes, then synthesize after all lanes pass.\n\n## Fresh Verifier Handoff\n\nAfter a builder claims completion, verify the actual artifact, diff, and output against the frozen gate with fresh context. Return PASS or FAIL with located reasons.\n\n## Short-Map Handoff\n\nFor long work, keep a short handoff containing the goal, lane status, links to detail files, and one next action. Store full gates, lane specs, logs, and lessons outside the always-loaded context.\n\n## Retry Budget Escalation\n\nWhen a lane repeatedly fails, run investigate->verify only up to the retry budget. Then stop and escalate with the failed gate, recent investigation notes, and current artifact state.\n\n## Creative State Machine\n\nFor creative work only, split divergent generation, grouping, selection, intent framing, crafting, evaluation, and polish into schema-gated phases. Do not apply this loop to ordinary coding or factual Q&A.\n\n## Recovery From Blocker\n\nState the blocker, identify the missing capability or evidence, propose the smallest safe fallback, and continue only if the fallback still satisfies the user's goal.\n`;
}

function transferInsightsMarkdown() {
  return `# Transfer Insights\n\nThese insights integrate the image analysis, fivetaku/fablize comparison, selected wonsub/RIP-Fable loop policies, FableCodex Codex-native adaptation rules, CTP creative-state patterns, Prometheus runtime-goal discipline, and value-for-fable ablation/review findings. They are procedure-transfer rules, not model identity claims.\n\n${TRANSFER_INSIGHTS.map(item => `## ${item.id}\n\n- Label: ${item.label}\n- Status: \`${item.status}\`\n- Maps to: ${item.maps_to.map(axis => `\`${axis}\``).join(', ')}\n- Trigger: ${item.trigger}\n- Rule: ${item.rule}\n- Sources: ${item.source_refs.map(ref => `\`${ref}\``).join(', ')}\n`).join('\n')}`;
}

function cognitiveOperationalProfileMarkdown() {
  return `# Cognitive Operational Profile\n\nThis layer unifies thinking style and working style. It is not a rigid checklist and not a model identity claim. Use it as an attention pattern that naturally selects the right work move.\n\n${COGNITIVE_OPERATIONAL_AXES.map(axis => `## ${axis.id}\n\n- Label: ${axis.label}\n- Cognitive bias: ${axis.cognitive_bias}\n- Soft prompt: ${axis.soft_prompt}\n- Operational expression:\n${axis.operational_expression.map(item => `  - ${item}`).join('\n')}\n- Related transfer insights: ${axis.related_transfer_insights.map(item => `\`${item}\``).join(', ')}\n`).join('\n')}`;
}

function promptPackReadme(mode, audit) {
  return `# Fable Prompt Pack\n\nMode: \`${mode}\`\n\nThis pack converts the ontology into reusable workflow prompts. It is not a model identity claim and should be combined with source-grounding checks.\n\n## Grounding Status\n\n- Overall: \`${audit.verdict?.overall || 'unknown'}\`\n- Hard grounding failures: ${audit.grounding_review?.hard_grounding_failures ?? 'unknown'}\n- Interpretive review items: ${audit.grounding_review?.interpretive_review_items ?? 'unknown'}\n\n${mode === 'strict' ? 'Strict mode keeps enforcement rules limited to broadly supported workflow discipline and generalizable absorption checks.' : 'Full mode adds domain-limited creative-state and long-session drift rules. Treat them as situational guidance, not direct evidence.'}\n`;
}

function interpretiveReviewMarkdown(audit) {
  const rows = audit.grounding_review?.interpretive_review_samples || [];
  return `# Interpretive Review\n\nThese items are source-adjacent interpretations, not direct quotations. Use them for analysis or prompt inspiration only after saying they are interpretive.\n\n${rows.map(item => `## ${item.id}\n\n- Kind: \`${item.kind}\`\n- Status: \`${item.status}\`\n- Source: \`${item.source_file || ''}:${item.source_line || ''}\`\n- Text: ${item.text}\n`).join('\n') || 'No interpretive review items were reported.'}\n`;
}

function agentAppHtml({ summary, audit, score }) {
  const tools = ['summarize_ontology', 'audit_ontology', 'list_transfer_insights', 'get_cognitive_operational_profile', 'query_ontology', 'inspect_node', 'score_workflow', 'build_prompt_pack', 'build_agent_app'];
  const scoreRows = score.score_parts.map(part => `<tr><td>${escapeHtml(part.name)}</td><td>${part.got}/${part.max}</td></tr>`).join('');
  const transferRows = score.transfer_alignment.map(part => `<tr><td>${escapeHtml(part.name)}</td><td>${part.got}/${part.max}</td></tr>`).join('');
  const cognitiveRows = COGNITIVE_OPERATIONAL_AXES.map(axis => `<tr><td>${escapeHtml(axis.id)}</td><td>${escapeHtml(axis.related_transfer_insights.length)}</td></tr>`).join('');
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:,">
<title>Fable Ontology Agent</title>
<style>
:root{--ink:#131820;--muted:#596575;--line:#d9dee7;--panel:#fff;--wash:#f4f7f8;--accent:#0b7f7a;--warn:#8a5b00}
*{box-sizing:border-box}body{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;background:var(--wash);color:var(--ink);line-height:1.5}main{max-width:1180px;margin:auto;padding:28px}header{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:18px}h1{font-size:30px;margin:0;letter-spacing:0}p{color:var(--muted);margin:6px 0 0}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:16px}.metric{font-size:28px;font-weight:750}.label{font-size:13px;color:var(--muted)}section{margin-top:18px}.split{display:grid;grid-template-columns:1.2fr .8fr;gap:12px}pre{white-space:pre-wrap;background:#111820;color:#eef4f5;padding:14px;border-radius:8px;overflow:auto;font-size:13px}table{width:100%;border-collapse:collapse;font-size:14px}td{border-bottom:1px solid var(--line);padding:8px 0}td:last-child{text-align:right;font-weight:650}.tools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.tool{border:1px solid var(--line);border-radius:8px;padding:10px;background:#f9fbfb;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px}.status{color:var(--accent);font-weight:750}.warn{color:var(--warn);font-weight:750}@media(max-width:840px){main{padding:18px}.grid,.split,.tools{grid-template-columns:1fr}header{display:block}.metric{font-size:24px}}
</style>
</head>
<body>
<main>
<header><div><h1>Fable Ontology Agent</h1><p>검증된 온톨로지를 세션 감사, 검색, 근거 확인, 점수화, 프롬프트팩 생성에 쓰는 로컬 에이전트입니다.</p></div><div class="label">Generated dashboard</div></header>
<section class="grid">
<div class="card"><div class="label">Atoms</div><div class="metric">${summary.atoms.toLocaleString('ko-KR')}</div></div>
<div class="card"><div class="label">Edges</div><div class="metric">${summary.edges.toLocaleString('ko-KR')}</div></div>
<div class="card"><div class="label">Workflow Score</div><div class="metric">${score.percentage}%</div></div>
<div class="card"><div class="label">Hard Failures</div><div class="metric">${summary.hard_grounding_failures}</div></div>
</section>
<section class="split">
<div class="card"><h2>Audit Verdict</h2><pre>${escapeHtml(JSON.stringify(audit.verdict, null, 2))}</pre><p><span class="status">직접 근거 실패 ${summary.hard_grounding_failures}건</span>, <span class="warn">해석 검토 항목 ${summary.interpretive_review_items}건</span></p></div>
<div class="card"><h2>Score Parts</h2><table>${scoreRows}</table></div>
</section>
<section class="split">
<div class="card"><h2>Transfer Insights</h2><table>${transferRows}</table></div>
<div class="card"><h2>Sources</h2><p>${summary.transfer_insight_sources.map(escapeHtml).join('<br>')}</p></div>
</section>
<section class="card"><h2>Cognitive Operational</h2><p>사고방식과 작업방식을 분리하지 않고, 관점이 자연스럽게 실행 선택으로 이어지도록 묶은 축입니다.</p><table>${cognitiveRows}</table></section>
<section class="card"><h2>Agent Tools</h2><div class="tools">${tools.map(tool => `<div class="tool">${tool}</div>`).join('')}</div></section>
</main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
