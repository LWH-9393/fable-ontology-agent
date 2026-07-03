# Fable Ontology Agent

Fable Ontology Agent is a local Codex plugin bundle that turns the verified ontology into usable agent tools. It focuses on cognitive-operational synthesis, evidence audit, transfer insights, atom search, node inspection, workflow scoring, prompt-pack generation, and a compact dashboard.

It intentionally does not include Obsidian vault export or full graph HTML generation.

## Public Dataset Note

This public package preserves the ontology structure, counts, transfer insights, and agent behavior, but local absolute paths, email-like identifiers, and sensitive secret-handling command metadata in the bundled ontology assets are redacted for safe publication.

## Capabilities

- `summarize_ontology`: high-level atom, edge, layer, pattern, fallback, and audit counts.
- `audit_ontology`: grounding audit with hard failures and interpretive review items separated, plus a live `data_integrity` check computed from the bundled atoms and edges.
- `list_transfer_insights`: image, fablize, RIP-Fable, FableCodex, CTP, Prometheus, and value-for-fable procedure-transfer insights integrated as an extension layer.
- `get_cognitive_operational_profile`: unified thinking-style and working-style profile for "think like Fable" requests.
- `query_ontology`: searchable access to ontology atoms; space-separated terms are ANDed, and results report `total_matches` and `truncated`.
- `inspect_node`: one-node evidence view with incoming and outgoing neighbors.
- `score_workflow`: local behavior scoring against context, tool grounding, verification, recovery, and fallback visibility.
- `build_prompt_pack`: reusable strict or full prompt-pack files.
- `build_agent_app`: compact local dashboard HTML.

## Layout

```text
fable-ontology-agent/
  .codex-plugin/plugin.json
  .mcp.json
  .app.json
  assets/ontology/
  docs/
  generated/
  scripts/
    cli.mjs
    fable-agent-core.mjs
    mcp-server.mjs
  skills/fable-ontology-agent/SKILL.md
```

## Local Usage

```bash
node scripts/cli.mjs summary
node scripts/cli.mjs audit
node scripts/cli.mjs transfer-insights
node scripts/cli.mjs cognitive-profile
node scripts/cli.mjs query validation_loop --limit 10 --include_edges
node scripts/cli.mjs inspect <atom-id>
node scripts/cli.mjs score
node scripts/cli.mjs prompt-pack strict
node scripts/cli.mjs app
```

## Tests

```bash
npm test
```

## MCP Usage

The plugin exposes one stdio MCP server in `.mcp.json`:

```json
{
  "mcpServers": {
    "fable-ontology-agent": {
      "command": "node",
      "args": ["./scripts/mcp-server.mjs"]
    }
  }
}
```

## Evidence Boundary

The ontology is safe to use as an observed workflow map. Directly grounded local atoms and source-backed nodes can support factual claims. Derived axes, pattern clusters, and extension nodes should be handled as interpretive unless `inspect_node` shows direct source evidence.

## Transfer Insights

The plugin now includes 27 combined image/fablize/RIP-Fable/FableCodex/CTP/Prometheus/value-for-fable insights as a procedure-transfer layer:

- 3+ competing hypotheses for unknown-cause investigation.
- Real renderer/runtime observation for visual or executable artifacts.
- Early-stop prevention: do the promised work, ask the necessary question, or state the blocker.
- Capability ceiling escalation instead of pretending a harness raises model ability.
- Sequential story evidence gates for broad work.
- Procedure transfer only, not hidden model identity transfer.
- Frozen acceptance gates before non-trivial build work.
- Disjoint file/asset lanes before parallel work.
- Fresh verifier gating against the actual artifact, diff, or output.
- Short-map external memory for long-horizon work.
- Retry-budget escalation for repeated repair loops.
- Source-section accounting for repository or policy absorption.
- Codex-native semantic translation of external workflow rules.
- Smallest durable surface selection for persistent guidance.
- Behavior evaluation without capability or identity claims.
- Domain-limited creative state machines for creative work.
- Runtime-owned completion gates and verifiable goal sentences.
- Ablation-first absorption and fixed-criteria review passes.
- Structure-preserving output and task-type routing.

## Cognitive Operational Synthesis

For requests like "think like Fable", use the cognitive-operational profile rather than a rigid harness. The profile links thinking tendencies to working moves:

- implication depth -> trace the next consequence;
- causal structure first -> seek the mechanism behind visible output;
- ambiguity preservation -> keep useful uncertainty open;
- possibility branching -> branch, then compress;
- medium sensitivity -> judge by the artifact's medium;
- consequence tracing -> follow decisions into later constraints;
- coherence over completion -> close the loop, not only the turn;
- capability humility -> separate procedural gaps from real capability limits.

## Generated Outputs

- `generated/fable-prompt-pack-strict/`
- `generated/fable-prompt-pack-full/`
- `generated/fable-ontology-agent-app.html`

These are produced on demand by the CLI or MCP tools.
