# Tools

## summarize_ontology

Returns counts for atoms, edges, pattern clusters, fallback events, audit verdict, layer counts, and edge type counts.

## audit_ontology

Returns the grounding audit. Use this before broad ontology claims.

The result includes `data_integrity`, a live structural check computed from the bundled atoms and edges at call time (duplicate atom ids, duplicate edge ids, dangling edge references). It verifies the static audit's `edge_integrity` claim instead of trusting it.

## list_transfer_insights

Arguments:

- `query`: optional text search across insight ids, rules, triggers, maps, and sources.
- `status`: optional exact insight status filter.
- `map`: optional ontology axis or policy map filter.

Returns the combined image/fablize/RIP-Fable/FableCodex/CTP/Prometheus/value-for-fable procedure-transfer insights. Use this when applying the synthesis layer rather than searching raw ontology atoms.

## get_cognitive_operational_profile

Arguments:

- `query`: optional text search across cognitive axes.
- `axis`: optional axis id or search term.

Returns the unified cognitive-operational profile. Use this for "think like Fable" requests. It gives soft thinking biases plus their operational expression, without claiming hidden model identity.

## query_ontology

Arguments:

- `query`: text search across id, text, axis, layer, type, model, and session id. Space-separated terms are ANDed; each term must appear somewhere in the atom.
- `layer`: exact `source_layer` filter.
- `type`: exact atom type filter.
- `source_kind`: exact source kind filter.
- `model`: exact model filter.
- `limit`: 1 to 500.
- `include_edges`: include incoming/outgoing edge counts.

The result reports `count` (returned atoms), `total_matches` (all matches before the limit), and `truncated`, so a caller can tell when a broad query needs refinement.

## inspect_node

Arguments:

- `id`: required atom id.
- `include_neighbors`: include nearby edges.
- `neighbor_limit`: maximum neighbors to return.

When neighbors are included, `outgoing_total` and `incoming_total` report the full edge counts even when the listed neighbors are truncated by `neighbor_limit`.

Use this before citing a node as evidence.

## score_workflow

Arguments:

- `session_id`: optional local behavior session id.
- `source_file`: optional exact or suffix source file filter.

The score checks context gathering, tool grounding, verification, change-to-verification linkage, blocker recovery, and fallback visibility.

It also returns `transfer_alignment`, which checks the observable subset of the 27 synthesis-layer rules: competing hypotheses, runtime observation, early-stop prevention, capability-ceiling escalation, multi-story evidence gate, procedure-not-identity, frozen acceptance gates, disjoint lane parallelism, fresh verifier gating, short-map memory, retry-budget escalation, source-section accounting, Codex-native translation, runtime-owned completion, verifiable goals, ablation-aware absorption, task-type routing, and fixed-criteria review.

## build_prompt_pack

Arguments:

- `mode`: `strict` or `full`.
- `target_dir`: optional output directory.

Strict mode is the default.

The build only writes and removes known pack filenames inside `target_dir`; it never deletes other files or the directory itself, so an existing directory can be passed safely.

## build_agent_app

Arguments:

- `output_path`: optional HTML output path.

Refreshes the compact local dashboard.
