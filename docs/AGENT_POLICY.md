# Agent Policy

## Primary Rule

Use the ontology as an evidence-backed workflow map. Do not convert derived patterns into factual claims without checking the node evidence.

## Claim Classes

- Direct evidence: source file, source line, or source URL is available and the audit reports no hard grounding failure.
- Structurally derived: the node comes from validated ontology structure, transitions, or clusters.
- Interpretive: the node summarizes or extends source material and must be marked as interpretation.
- Unsupported: no matching node, source, or audit support is available.

## Operating Rules

- Start with the audit when evaluating the ontology as a whole.
- Use `get_cognitive_operational_profile` when the user says "think like Fable", "Fable식으로 사고", or asks for cognitive style rather than audit.
- Inspect a node before using it as evidence in a report.
- Use `list_transfer_insights` when applying the image/fablize/RIP-Fable/FableCodex/CTP/Prometheus/value-for-fable synthesis layer.
- Keep fallback events separate from normal behavior.
- Treat workflow scores as diagnostic signals, not final judgments.
- Report missing evidence plainly.
- Prefer direct evidence mode for enforcement prompts.

## Prompt-Pack Rules

Strict prompt packs should only enforce broadly supported workflow discipline:

- lock the output form;
- inspect governing evidence;
- account for source sections when absorbing repositories, prompts, skills, or policies;
- translate imported rules into actual Codex tools, dates, paths, permissions, and policy surfaces;
- persist rules at the smallest durable surface that can carry them;
- form 3+ competing hypotheses before unknown-cause narrowing;
- run and observe renderable/executable artifacts in their real environment;
- freeze objective acceptance gates before non-trivial builds;
- parallelize only when lanes have provably disjoint file or asset sets;
- verify actual artifacts, diffs, or outputs rather than trusting builder claims;
- keep long-work handoffs short with linked detail files;
- stop repeated repair loops at a retry budget and escalate with evidence;
- prefer runtime-owned completion gates when available;
- write verifiable goal sentences with expected results;
- keep absorbed procedures only with comparison, ablation, or removal rationale;
- preserve readable structure instead of over-compressing necessary content;
- route by task type and capability ceiling;
- constrain review passes to fixed criteria;
- ask only when the answer changes the outcome;
- stop on missing capability or evidence;
- verify changes before completion claims;
- prevent early stopping on future promises;
- escalate when procedure cannot replace capability;
- separate facts, inferences, and risks.

Full prompt packs can include more interpretive material only when the user explicitly wants broader inspiration. Domain-limited creative-state rules from CTP and long-session reminder rules from value-for-fable belong here, not in default strict enforcement.

## Cognitive Operational Synthesis

Do not split thinking style and working style into separate modes. Use cognitive axes as soft attention biases that select the right work move:

- implication depth becomes consequence tracing;
- causal structure first becomes mechanism-first diagnosis;
- ambiguity preservation becomes careful question/assumption handling;
- possibility branching becomes competing hypotheses or meaningful alternatives;
- medium sensitivity becomes renderer/test/source-appropriate verification;
- coherence over completion becomes evidence-backed closure;
- capability humility becomes honest escalation.

This is intentionally softer than a harness. It should guide how the agent frames and executes the task without exposing a checklist unless the user asks for audit detail.
