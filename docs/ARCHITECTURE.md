# Architecture

## Core Shape

The plugin has five layers:

1. Ontology assets: bundled JSONL, JSON, and Markdown evidence files under `assets/ontology/`.
2. Core engine: `scripts/fable-agent-core.mjs` loads assets and exposes pure operations.
3. MCP server: `scripts/mcp-server.mjs` exposes those operations as Codex-callable tools.
4. CLI: `scripts/cli.mjs` provides local smoke tests and manual use.
5. Skill and docs: `skills/fable-ontology-agent/SKILL.md` defines agent behavior and evidence discipline.

## Data Flow

```text
assets/ontology
  -> fable-agent-core.mjs
  -> mcp-server.mjs / cli.mjs
  -> agent answer, prompt pack, or compact dashboard
```

## Design Boundary

The plugin is not a graph viewer. It deliberately avoids Obsidian export and full graph HTML generation. The usable agent surface is:

- summary;
- audit;
- query;
- node evidence inspection;
- workflow scoring;
- prompt-pack generation;
- compact dashboard refresh.

## Grounding Model

The core loader builds:

- `atoms`: ontology nodes;
- `edges`: ontology relationships;
- `byId`: atom lookup map;
- `incoming` and `outgoing`: edge indexes;
- `patterns`, `comparison`, and `audit`: supporting reports.

Tools should always distinguish direct evidence from interpretation. `inspect_node` is the narrow evidence gate.
