---
name: fable-ontology-agent
description: Use when the user asks to think like Fable, apply Fable-style judgment, audit, query, score, or operationalize the verified Fable ontology as an agent workflow. Includes cognitive-operational synthesis, ontology grounding checks, image/fablize/RIP-Fable/FableCodex/CTP/Prometheus/value-for-fable transfer insights, atom search, node inspection, workflow scoring, and prompt-pack generation.
---

# Fable Ontology Agent

## Purpose

Use the bundled ontology as a cognitive-operational layer: guide attention, choose work moves, audit claims, list transfer insights, search atoms, inspect evidence, score session behavior, and generate prompt packs. Treat the ontology as observed and derived behavior data, not as proof of hidden model identity or hidden reasoning.

## When To Use

Use this skill when the user asks for:

- applying the Fable ontology to a current task or transcript;
- "페이블처럼 사고", "Fable식 사고", "think like Fable", or Fable-style judgment requests;
- checking whether an ontology node is grounded;
- finding nodes about validation, blocker recovery, tool order, fallback behavior, or decision thresholds;
- applying the combined image/fablize/RIP-Fable/FableCodex/CTP/Prometheus/value-for-fable synthesis: competing hypotheses, runtime observation, early-stop prevention, capability ceiling escalation, evidence gates, frozen gates, disjoint lanes, verifier gating, short-map memory, retry budgets, source-section accounting, Codex-native translation, runtime-owned goals, ablation-aware absorption, task routing, and fixed-criteria review;
- scoring a session against the Fable workflow pattern;
- generating a reusable prompt pack from the ontology;
- using the ontology as a plugin-backed agent.

## Required Order

1. Start with `summarize_ontology` or `audit_ontology` unless the user asks for a specific node.
2. Use `get_cognitive_operational_profile` when the user asks to think like Fable or asks for Fable-style judgment.
3. Use `list_transfer_insights` when the user refers to the image/fablize/RIP-Fable/FableCodex/CTP/Prometheus/value-for-fable synthesis layer.
4. Use `query_ontology` to narrow candidate nodes.
5. Use `inspect_node` before treating a node as evidence.
6. Use `score_workflow` only for local behavior atoms, session ids, or source-file scopes.
7. Use `build_prompt_pack` when the user wants reusable instructions.
8. Use `build_agent_app` when the compact local dashboard needs to be refreshed.

## Evidence Rules

- Do not present interpretive nodes as direct quotes.
- Mention hard grounding failures if the audit reports any.
- Keep fallback events visible instead of merging them into normal behavior.
- Treat transfer insights as procedure rules, not as proof that another model became Fable.
- Treat cognitive axes as soft attention biases, not as a rigid checklist.
- If a source file or node id is missing, say that the claim cannot be verified from the bundled ontology.
- Do not use this skill to create an Obsidian export or a full graph HTML export.

## Tool Fallback

Prefer MCP tools when available. If MCP is unavailable, run the local CLI:

```bash
node scripts/cli.mjs summary
node scripts/cli.mjs audit
node scripts/cli.mjs transfer-insights
node scripts/cli.mjs cognitive-profile
node scripts/cli.mjs query validation_loop --limit 10
node scripts/cli.mjs inspect <atom-id>
node scripts/cli.mjs score
node scripts/cli.mjs prompt-pack strict
node scripts/cli.mjs app
```
