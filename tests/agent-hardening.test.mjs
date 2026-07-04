import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  PLUGIN_ROOT,
  auditOntology,
  buildPromptPack,
  inspectNode,
  loadOntology,
  queryOntology,
  summarizeOntology,
} from '../scripts/fable-agent-core.mjs';

// query_ontology: totals and truncation reporting.
const broad = queryOntology({ query: '', limit: 5 });
assert.equal(broad.count, 5);
assert.equal(broad.total_matches, summarizeOntology().atoms);
assert.equal(broad.truncated, true);

// query_ontology: space-separated terms are ANDed and order-independent.
const { atoms } = loadOntology();
const sampleWords = atoms
  .map(atom => String(atom.text || '').toLowerCase().match(/[a-z]{4,}/g))
  .find(words => words && new Set(words).size >= 2);
const [wordA, wordB] = [...new Set(sampleWords)];
const forward = queryOntology({ query: `${wordA} ${wordB}` });
const reversed = queryOntology({ query: `${wordB} ${wordA}` });
assert.ok(forward.total_matches >= 1);
assert.equal(forward.total_matches, reversed.total_matches);
assert.equal(queryOntology({ query: `${wordA} zzzzunfindablezzzz` }).total_matches, 0);

// audit_ontology: live data integrity check over bundled atoms and edges.
const integrity = auditOntology().data_integrity;
assert.equal(integrity.status, 'pass');
assert.equal(integrity.duplicate_atom_ids, 0);
assert.equal(integrity.duplicate_edge_ids, 0);
assert.equal(integrity.dangling_edge_refs, 0);
assert.equal(integrity.atoms, summarizeOntology().atoms);
assert.equal(integrity.edges, summarizeOntology().edges);

// inspect_node: neighbor totals survive neighbor_limit truncation.
const { outgoing } = loadOntology();
const [busyId, busyEdges] = [...outgoing.entries()].find(([, edges]) => edges.length >= 2);
const inspected = inspectNode({ id: busyId, neighbor_limit: 1 });
assert.equal(inspected.found, true);
assert.equal(inspected.outgoing.length, 1);
assert.equal(inspected.outgoing_total, busyEdges.length);
assert.ok(inspected.incoming_total >= inspected.incoming.length);

// build_prompt_pack: never deletes foreign files in target_dir; removes only stale pack files.
const packDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fable-pack-'));
try {
  fs.writeFileSync(path.join(packDir, 'keep.txt'), 'user data');
  fs.writeFileSync(path.join(packDir, 'INTERPRETIVE-REVIEW.md'), 'stale full-mode file');
  const pack = buildPromptPack({ mode: 'strict', target_dir: packDir });
  assert.equal(pack.target_dir, packDir);
  assert.equal(fs.readFileSync(path.join(packDir, 'keep.txt'), 'utf8'), 'user data');
  assert.equal(fs.existsSync(path.join(packDir, 'INTERPRETIVE-REVIEW.md')), false);
  assert.equal(fs.existsSync(path.join(packDir, 'SYSTEM-PROMPT.md')), true);
} finally {
  fs.rmSync(packDir, { recursive: true, force: true });
}

// mcp-server: protocol version negotiation, silent notifications, isError tool results.
const probe = [
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"9999-99-99"}}',
  '{"jsonrpc":"2.0","method":"notifications/initialized"}',
  '{"jsonrpc":"2.0","method":"notifications/cancelled","params":{"requestId":5}}',
  '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"build_prompt_pack","arguments":{"target_dir":"/dev/null/impossible"}}}',
  '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"summarize_ontology","arguments":{}}}',
].join('\n');
const server = spawnSync(process.execPath, [path.join(PLUGIN_ROOT, 'scripts', 'mcp-server.mjs')], {
  input: `${probe}\n`,
  encoding: 'utf8',
});
const responses = server.stdout.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
assert.equal(responses.length, 3, 'notifications must not receive responses');
assert.deepEqual(responses.map(msg => msg.id), [1, 2, 3]);
assert.equal(responses[0].result.protocolVersion, '2025-06-18');
assert.equal('error' in responses[1], false, 'tool failure must be a result, not a protocol error');
assert.equal(responses[1].result.isError, true);
assert.match(responses[1].result.content[0].text, /build_prompt_pack failed/);
assert.equal(responses[2].result.isError, false);
assert.ok(responses[2].result.structuredContent.atoms > 0);

// cli: boolean flags must not swallow a following positional argument.
const cliBin = path.join(PLUGIN_ROOT, 'scripts', 'cli.mjs');
const swallowProbe = spawnSync(process.execPath, [cliBin, 'query', '--include_edges', 'validation', '--limit', '2'], { encoding: 'utf8' });
assert.equal(swallowProbe.status, 0);
assert.equal(JSON.parse(swallowProbe.stdout).query, 'validation');

const flagFirstInspect = spawnSync(process.execPath, [cliBin, 'inspect', '--include_neighbors', busyId], { encoding: 'utf8' });
assert.equal(flagFirstInspect.status, 0);
const flagFirstParsed = JSON.parse(flagFirstInspect.stdout);
assert.equal(flagFirstParsed.found, true);
assert.ok(Array.isArray(flagFirstParsed.outgoing));

const explicitFalse = spawnSync(process.execPath, [cliBin, 'inspect', busyId, '--include_neighbors', 'false'], { encoding: 'utf8' });
assert.equal(explicitFalse.status, 0);
assert.equal('outgoing' in JSON.parse(explicitFalse.stdout), false);
