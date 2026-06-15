# Transfer Insights

These insights integrate the image analysis, fivetaku/fablize comparison, selected wonsub/RIP-Fable loop policies, FableCodex Codex-native adaptation rules, CTP creative-state patterns, Prometheus runtime-goal discipline, and value-for-fable ablation/review findings. They are procedure-transfer rules, not model identity claims.

## multi_hypothesis_generation

- Label: Competing hypotheses before narrow investigation
- Status: `new_extension`
- Maps to: `failure_handling`, `validation_loop`
- Trigger: debugging, unknown cause, review, ambiguous diagnosis
- Rule: Before pursuing one explanation, form 3+ competing hypotheses and name what evidence would confirm or reject each one.
- Sources: `image:fable-characteristics-summary#4`, `github:fivetaku/fablize:packs/investigation-protocol.txt`

## render_observation_required

- Label: Runtime observation is stronger than static validity
- Status: `strengthen_existing`
- Maps to: `validation_loop`, `progress_claim_requires_tool_evidence`
- Trigger: HTML, SVG, game, UI, chart, animation, executable artifact
- Rule: Run the artifact in its natural renderer or runtime, observe the actual output, fix what observation reveals, and re-run after changes.
- Sources: `image:fable-characteristics-summary#4`, `github:fivetaku/fablize:packs/verification-grounding-pack.txt`

## early_stop_prevention

- Label: Do not stop at a promise to work
- Status: `new_extension`
- Maps to: `progress_claim_requires_tool_evidence`, `acceptance_design`
- Trigger: final answer ends with future intent instead of completed action or a real blocker
- Rule: If the agent says it will run, write, build, fix, or create something, it must do that work before ending unless it asks a necessary user question.
- Sources: `image:fable-characteristics-summary#6`, `github:fivetaku/fablize:hooks/finish-the-work.sh`

## capability_ceiling_escalation

- Label: Escalate when procedure cannot replace capability
- Status: `strengthen_existing`
- Maps to: `capability_stop_gate`, `claim_strength_calibration`
- Trigger: open-ended creative detail, self-driven discovery, repeated stall, out-of-spec defect discovery
- Rule: When the task needs capability rather than procedure, state the ceiling and escalate to a stronger model, fresh session, or human review with an evidence package.
- Sources: `image:fable-characteristics-summary#5`, `github:fivetaku/fablize:README.md`

## multi_story_evidence_gate

- Label: Sequential stories must close with evidence
- Status: `strengthen_existing`
- Maps to: `acceptance_design`, `validation_loop`
- Trigger: 2+ dependent work stories, long autonomous work, broad implementation
- Rule: Decompose into sequential stories, complete one at a time, and require concrete evidence plus a final verification gate.
- Sources: `image:fable-characteristics-summary#4`, `github:fivetaku/fablize:scripts/goals.py`

## procedure_not_identity

- Label: Transfer procedure, not hidden identity
- Status: `already_core`
- Maps to: `claim_strength_calibration`, `context_by_authority`
- Trigger: any claim that a harness makes another model become Fable
- Rule: Treat the harness as observable workflow discipline. Do not claim hidden model identity, hidden reasoning, or raised model ceiling.
- Sources: `image:fable-characteristics-summary#5`, `github:fivetaku/fablize:README.md`, `plugin:fable-ontology-agent/docs/AGENT_POLICY.md`

## frozen_gate_contract

- Label: Freeze acceptance gates before build
- Status: `new_extension`
- Maps to: `acceptance_design`, `validation_loop`
- Trigger: non-trivial implementation, multi-lane work, verification-sensitive task, high-cost wrong result
- Rule: Write objective acceptance gates before building and do not edit them mid-run to make a failing artifact pass; changing a gate requires a fresh planning decision.
- Sources: `github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/SKILL.md#67`, `github:wonsub/RIP-Fable:fable-loop/memory/gates.md#1`

## disjoint_lane_parallelism

- Label: Parallelize only provably disjoint lanes
- Status: `new_extension`
- Maps to: `role_separation_architect_builder`, `scope_control`
- Trigger: parallel agents, multi-file implementation, asset pipeline, independent work lanes
- Rule: Split work into lanes with provably disjoint file or asset sets before parallel execution; if the sets cannot be made disjoint, keep synthesis and implementation serialized.
- Sources: `github:wonsub/RIP-Fable:fable-loop/agents/architect.md#32`, `github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/references/loop-protocol.md#38`

## fresh_verifier_gate

- Label: Verify with fresh context against the real artifact
- Status: `new_extension`
- Maps to: `validation_loop`, `progress_claim_requires_tool_evidence`
- Trigger: builder reports done, generated artifact, review handoff, lane completion
- Rule: Do not accept the builder claim as evidence; a separate verifier pass must read the actual artifact, diff, or output and return PASS or FAIL against the frozen gate.
- Sources: `github:wonsub/RIP-Fable:fable-loop/agents/verifier.md#18`, `github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/SKILL.md#60`

## short_map_external_memory

- Label: Keep handoff memory short and linked
- Status: `new_extension`
- Maps to: `context_management`, `long_horizon_continuity`
- Trigger: long autonomous work, resume, multi-stage task, context pressure
- Rule: Keep only the current goal, lane status, linked detail files, and next action in the always-loaded handoff; move gates, lane specs, logs, and lessons into linked files loaded only when needed.
- Sources: `github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/references/memory-protocol.md#16`, `github:wonsub/RIP-Fable:fable-loop/memory/handoff.md#1`

## retry_budget_escalation

- Label: Stop repeated repair loops at a retry budget
- Status: `new_extension`
- Maps to: `capability_stop_gate`, `failure_handling`
- Trigger: repeated verification failure, stuck lane, failing gate, repair loop
- Rule: After the retry budget is exhausted, stop the lane and escalate with the failed gate, recent investigation notes, and current artifact state instead of silently continuing.
- Sources: `github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/references/loop-protocol.md#5`, `github:wonsub/RIP-Fable:fable-loop/skills/fable-loop-orchestration/SKILL.md#105`

## source_section_accounting_gate

- Label: Account for every source section before claiming adaptation coverage
- Status: `new_extension`
- Maps to: `claim_strength_calibration`, `context_management`
- Trigger: adapting a prompt, skill, repository, policy set, or source corpus into Codex guidance
- Rule: For each meaningful source section, record an explicit decision: implemented, adapted, unsupported, or not applicable; treat complete coverage as accounting, not capability parity.
- Sources: `github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/references/coverage-matrix.md#1`, `github:baskduf/FableCodex:README.md#91`

## codex_native_semantic_translation

- Label: Translate source workflow semantics into actual Codex surfaces
- Status: `new_extension`
- Maps to: `context_by_authority`, `claim_strength_calibration`
- Trigger: porting Claude, Fable, or external agent instructions into Codex
- Rule: Replace source-model identity, tools, paths, dates, and provider assumptions with the actual Codex tools, workspace, current date behavior, and active policy; drop unavailable or unsafe claims.
- Sources: `github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/references/fable-to-codex-map.md#3`, `github:baskduf/FableCodex:NOTICE#10`

## smallest_durable_surface

- Label: Choose the smallest durable surface that can carry the rule
- Status: `new_extension`
- Maps to: `context_management`, `scope_control`
- Trigger: making a workflow rule persistent across a thread, repo, skill, plugin, connector, or provider setup
- Rule: Persist behavior at the smallest surface that solves the problem: current prompt, AGENTS.md, skill, plugin, MCP/app connector, or provider config; avoid over-packaging local advice.
- Sources: `github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/SKILL.md#78`, `github:baskduf/FableCodex:plugins/codex-fable5/skills/codex-fable5/references/state-memory.md#12`

## behavior_eval_not_capability_benchmark

- Label: Evaluate behavior separately from model capability
- Status: `new_extension`
- Maps to: `claim_strength_calibration`, `validation_loop`
- Trigger: judging whether a Fable-style adaptation is mature or useful
- Rule: Use behavioral checks for inspection, lookup, verification, routing, and final reporting; do not present them as proof of model-weight, hidden-runtime, or broad capability parity.
- Sources: `github:baskduf/FableCodex:evals/fable-style-evals.md#3`, `github:baskduf/FableCodex:README.md#91`

## creative_schema_state_machine

- Label: Use schema-gated creative state machines only for creative work
- Status: `domain_limited`
- Maps to: `validation_loop`, `scope_control`
- Trigger: naming, ideation, reframing, product language, concept generation, or other creative synthesis
- Rule: For creative work, split divergent generation, grouping, selection, intent framing, crafting, evaluation, and polish into schema-validated phases; do not impose this loop on ordinary coding or factual Q&A.
- Sources: `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/_dispatch.py#85`, `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:SKILL.md#31`

## divergent_profiles_deterministic_firewall

- Label: Let model profiles diverge, then let deterministic code filter what crosses
- Status: `domain_limited`
- Maps to: `validation_loop`, `role_separation_architect_builder`
- Trigger: creative synthesis where diversity is valuable but downstream leakage or overfitting is risky
- Rule: Generate material through distinct cognitive profiles, then use a deterministic firewall or whitelist to pass only approved fields into the next phase.
- Sources: `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/_dispatch.py#113`, `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/f2k9p7.py#1`

## intent_vector_source_firewall

- Label: Keep intent framing grounded in the original request
- Status: `domain_limited`
- Maps to: `context_by_authority`, `scope_control`
- Trigger: creative or strategy work where generated material may pull the task away from the user request
- Rule: Derive pull, away-from, and productive tension from the original query only; do not let generated shards or intermediate groupings rewrite the intent frame.
- Sources: `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:mechs/w8q2k5.md#1`, `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:schemas/w2x7k5.json#3`

## rubric_driven_recurse_or_emit

- Label: Use a rubric to decide whether to recurse or emit
- Status: `domain_limited`
- Maps to: `validation_loop`, `claim_strength_calibration`
- Trigger: iterative creative or analytical output where another pass may improve quality
- Rule: Score candidate outputs on explicit dimensions, then recurse only when the score or unresolved tension warrants it; otherwise emit and polish.
- Sources: `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:mechs/r6f3p9.md#7`, `github:Cyapstaye/Claude-skill-for-Creative-Thinking-CTP-simplified-:scripts/v7m2x4.py#157`

## runtime_owned_completion_gate

- Label: Prefer completion gates owned outside agent spontaneity
- Status: `new_extension`
- Maps to: `acceptance_design`, `validation_loop`
- Trigger: long work, sequential goals, or any workflow where the agent could skip its own checkpoint script
- Rule: When available, let the runtime or an external verifier judge completion at turn boundaries; agent-called scripts are weaker because the agent can forget to call them.
- Sources: `github:tmdgusya/prometheus:README.md#35`, `github:tmdgusya/prometheus:skills/prometheus/SKILL.md#84`

## context_sufficiency_before_goal_sentence

- Label: Secure context before proposing goal sentences
- Status: `new_extension`
- Maps to: `acceptance_design`, `context_management`
- Trigger: splitting work into goals, stories, tickets, or runtime-verifiable tasks
- Rule: Before decomposition, confirm the touched area, local rules, observable success condition, and existing approaches; if any are unknown, gather context before proposing the goal.
- Sources: `github:tmdgusya/prometheus:skills/prometheus/SKILL.md#21`, `github:tmdgusya/prometheus:skills/prometheus/SKILL.md#52`

## verifiable_goal_sentence

- Label: Write goal sentences with objective commands and expected results
- Status: `new_extension`
- Maps to: `acceptance_design`, `validation_loop`
- Trigger: creating a /goal, checkpoint, story, acceptance criterion, or final verification task
- Rule: A good goal names the target change plus concrete verification commands or observations and expected results; vague words like elegant, resolved, or improved are not enough.
- Sources: `github:tmdgusya/prometheus:skills/prometheus/SKILL.md#103`, `github:tmdgusya/prometheus:README.md#76`

## ablation_first_absorption

- Label: Keep absorbed procedures only after comparison or removal evidence
- Status: `new_extension`
- Maps to: `validation_loop`, `claim_strength_calibration`
- Trigger: deciding whether a borrowed rule should become core policy
- Rule: Treat attractive workflow rules as hypotheses. Compare, ablate, or define removal criteria, and drop rules that measurable evidence shows are quality debt.
- Sources: `github:itsinseong/value-for-fable:bench/RESULTS.md#3`, `github:itsinseong/value-for-fable:output-styles/vff-v2.md#8`

## structure_beats_compression

- Label: Preserve readable structure instead of forcing short output
- Status: `new_extension`
- Maps to: `claim_strength_calibration`, `scope_control`
- Trigger: final answers, writing, research summaries, diagnosis, and explanation tasks
- Rule: Save tokens by omitting irrelevant material, not by compressing necessary content into fragments; if brevity hurts clarity, keep the structure and explain enough.
- Sources: `github:itsinseong/value-for-fable:output-styles/vff-v2.md#10`, `github:itsinseong/value-for-fable:COST.md#51`

## task_type_routing

- Label: Route by task type instead of applying Fable-style procedure everywhere
- Status: `new_extension`
- Maps to: `capability_stop_gate`, `scope_control`
- Trigger: choosing between default model, stronger reasoning, review pass, or Fable-style procedure
- Rule: Use procedural structure for diagnosis, advice, writing, and clear work; route deep unfamiliar reasoning, complex architecture, or knowledge-ceiling tasks to stronger reasoning or review.
- Sources: `github:itsinseong/value-for-fable:COST.md#51`, `github:itsinseong/value-for-fable:README.md#149`

## fixed_criteria_review

- Label: Constrain review passes to fixed criteria
- Status: `new_extension`
- Maps to: `validation_loop`, `scope_control`
- Trigger: 2-pass review, independent draft review, high-cost answer review, document QA
- Rule: A review pass should judge only declared criteria such as missing requirements, factual or numeric errors, unexplained clues, and length violations; do not expand scope or invent findings.
- Sources: `github:itsinseong/value-for-fable:agents/itsvff.md#46`, `github:itsinseong/value-for-fable:README.md#102`

## long_session_drift_reminder

- Label: Refresh core workflow discipline only when long sessions drift
- Status: `domain_limited`
- Maps to: `context_management`, `long_horizon_continuity`
- Trigger: very long sessions, context pressure, recurring reminders, or always-on workflow modes
- Rule: For long sessions, inject a short reminder only when the mode is active and the transcript is large; keep reminders compact and avoid adding cost when not needed.
- Sources: `github:itsinseong/value-for-fable:hooks/reminder.sh#4`, `github:itsinseong/value-for-fable:README.md#118`
