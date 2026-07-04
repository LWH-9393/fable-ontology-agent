#!/usr/bin/env node
import readline from 'node:readline';
import {
  auditOntology,
  buildAgentApp,
  buildPromptPack,
  getCognitiveOperationalProfile,
  inspectNode,
  listTransferInsights,
  queryOntology,
  scoreWorkflow,
  summarizeOntology,
} from './fable-agent-core.mjs';

const SERVER_INFO = {
  name: 'fable-ontology-agent',
  version: '1.1.0',
};

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];

const TOOL_DEFS = [
  {
    name: 'summarize_ontology',
    title: 'Summarize Ontology',
    description: 'Return high-level counts, grounding status, layer counts, and edge type counts for the bundled Fable ontology.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'audit_ontology',
    title: 'Audit Ontology',
    description: 'Return the hallucination/grounding audit that separates directly evidenced ontology data from interpretive review items, plus a live data_integrity check computed from the bundled atoms and edges.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'list_transfer_insights',
    title: 'List Transfer Insights',
    description: 'List the integrated image, fablize, RIP-Fable, FableCodex, CTP, Prometheus, and value-for-fable procedure-transfer insights that extend the ontology policy layer.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Optional text search across insight ids, rules, triggers, maps, and sources.' },
        status: { type: 'string', description: 'Optional exact insight status filter.' },
        map: { type: 'string', description: 'Optional ontology axis or policy map filter.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_cognitive_operational_profile',
    title: 'Get Cognitive Operational Profile',
    description: 'Return the unified thinking-style and working-style profile for Fable-like cognitive operation without hidden identity claims.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Optional text search across cognitive axes.' },
        axis: { type: 'string', description: 'Optional axis id or search term.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'query_ontology',
    title: 'Query Ontology',
    description: 'Search ontology atoms by text, id, layer, type, source kind, or model. Returns matched atoms plus total_matches and truncated so callers can refine broad queries.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Case-insensitive search across id, text, axis, layer, type, model, and session id. Space-separated terms are ANDed; each term must appear somewhere in the atom.' },
        layer: { type: 'string', description: 'Optional exact source_layer filter.' },
        type: { type: 'string', description: 'Optional exact atom type filter.' },
        source_kind: { type: 'string', description: 'Optional exact source_kind filter.' },
        model: { type: 'string', description: 'Optional exact model filter.' },
        limit: { type: 'integer', minimum: 1, maximum: 500, default: 30 },
        include_edges: { type: 'boolean', default: false },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'inspect_node',
    title: 'Inspect Node',
    description: 'Return one atom with grounding metadata and nearby incoming/outgoing edges.',
    inputSchema: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Ontology atom id to inspect.' },
        include_neighbors: { type: 'boolean', default: true },
        neighbor_limit: { type: 'integer', minimum: 0, maximum: 500, default: 50 },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'score_workflow',
    title: 'Score Workflow',
    description: 'Score local session behavior against the ontology workflow pattern: context, tool grounding, verification, recovery, and fallback visibility.',
    inputSchema: {
      type: 'object',
      properties: {
        session_id: { type: 'string', description: 'Optional local behavior session id.' },
        source_file: { type: 'string', description: 'Optional exact or suffix source file filter.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'build_prompt_pack',
    title: 'Build Prompt Pack',
    description: 'Generate reusable prompt files from the ontology workflow rules. Strict mode keeps the pack anchored to directly enforceable rules.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['strict', 'full'], default: 'strict' },
        target_dir: { type: 'string', description: 'Optional output directory. Defaults to generated/fable-prompt-pack-MODE.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'build_agent_app',
    title: 'Build Agent App',
    description: 'Generate the compact local dashboard for audit status, ontology counts, and available agent tools.',
    inputSchema: {
      type: 'object',
      properties: {
        output_path: { type: 'string', description: 'Optional HTML output path. Defaults to generated/fable-ontology-agent-app.html.' },
      },
      additionalProperties: false,
    },
  },
];

const HANDLERS = {
  summarize_ontology: summarizeOntology,
  audit_ontology: auditOntology,
  list_transfer_insights: listTransferInsights,
  get_cognitive_operational_profile: getCognitiveOperationalProfile,
  query_ontology: queryOntology,
  inspect_node: inspectNode,
  score_workflow: scoreWorkflow,
  build_prompt_pack: buildPromptPack,
  build_agent_app: buildAgentApp,
};

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on('line', async line => {
  if (!line.trim()) return;
  let message;
  try {
    message = JSON.parse(line);
  } catch (error) {
    sendError(null, -32700, `Parse error: ${error.message}`);
    return;
  }

  try {
    await handleMessage(message);
  } catch (error) {
    // Notifications must never receive a response, even on internal failure.
    if (message.id === undefined || message.id === null) {
      process.stderr.write(`fable-ontology-agent: ${error.message}\n`);
      return;
    }
    sendError(message.id, -32603, error.message);
  }
});

async function handleMessage(message) {
  const { id, method, params = {} } = message;

  if (typeof method === 'string' && method.startsWith('notifications/')) return;

  if (method === 'initialize') {
    send({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.includes(params.protocolVersion)
          ? params.protocolVersion
          : SUPPORTED_PROTOCOL_VERSIONS[0],
        capabilities: {
          tools: { listChanged: false },
        },
        serverInfo: SERVER_INFO,
      },
    });
    return;
  }

  if (method === 'ping') {
    send({ jsonrpc: '2.0', id, result: {} });
    return;
  }

  if (method === 'tools/list') {
    send({ jsonrpc: '2.0', id, result: { tools: TOOL_DEFS } });
    return;
  }

  if (method === 'tools/call') {
    const name = params.name;
    const args = params.arguments || {};
    const handler = HANDLERS[name];
    if (!handler) {
      sendError(id, -32602, `Unknown tool: ${name}`);
      return;
    }
    // Tool execution failures are tool results (isError), not protocol errors,
    // so the calling model can see the failure and adjust its arguments.
    try {
      const result = await handler(args);
      send({
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result,
          isError: false,
        },
      });
    } catch (error) {
      send({
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: `Tool ${name} failed: ${error.message}` }],
          isError: true,
        },
      });
    }
    return;
  }

  sendError(id ?? null, -32601, `Method not found: ${method}`);
}

function send(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function sendError(id, code, message) {
  send({
    jsonrpc: '2.0',
    id,
    error: { code, message },
  });
}
