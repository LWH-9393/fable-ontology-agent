#!/usr/bin/env node
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

const BOOLEAN_FLAGS = new Set(['include_edges', 'include_neighbors']);

const [command = 'help', ...rawArgs] = process.argv.slice(2);
const { flags, positionals } = parseArgs(rawArgs);

try {
  const result = run(command, flags, positionals);
  if (result !== undefined) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}

function run(cmd, flags, args) {
  if (cmd === 'summary' || cmd === 'summarize') return summarizeOntology();
  if (cmd === 'audit') return auditOntology();
  if (cmd === 'transfer-insights' || cmd === 'insights') {
    return listTransferInsights({
      query: flags.query || args.join(' '),
      status: flags.status,
      map: flags.map,
    });
  }
  if (cmd === 'cognitive-profile' || cmd === 'cognitive' || cmd === 'profile') {
    return getCognitiveOperationalProfile({
      query: flags.query || args.join(' '),
      axis: flags.axis,
    });
  }
  if (cmd === 'query') {
    return queryOntology({
      query: flags.query || args.join(' '),
      layer: flags.layer,
      type: flags.type,
      source_kind: flags.source_kind,
      model: flags.model,
      limit: flags.limit ? Number(flags.limit) : undefined,
      include_edges: Boolean(flags.include_edges),
    });
  }
  if (cmd === 'inspect') {
    const id = flags.id || args[0];
    if (!id) throw new Error('inspect requires an atom id.');
    return inspectNode({
      id,
      include_neighbors: flags.include_neighbors !== 'false',
      neighbor_limit: flags.neighbor_limit ? Number(flags.neighbor_limit) : undefined,
    });
  }
  if (cmd === 'score') {
    return scoreWorkflow({
      session_id: flags.session_id || args[0],
      source_file: flags.source_file,
    });
  }
  if (cmd === 'prompt-pack') {
    return buildPromptPack({
      mode: flags.mode || args[0] || 'strict',
      target_dir: flags.target_dir,
    });
  }
  if (cmd === 'app') {
    return buildAgentApp({
      output_path: flags.output_path || args[0],
    });
  }
  if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
    process.stdout.write(helpText());
    return undefined;
  }
  throw new Error(`Unknown command: ${cmd}\n\n${helpText()}`);
}

function parseArgs(args) {
  const flags = {};
  const positionals = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('--')) {
      positionals.push(arg);
      continue;
    }
    const body = arg.slice(2);
    const eq = body.indexOf('=');
    if (eq >= 0) {
      flags[body.slice(0, eq)] = body.slice(eq + 1);
      continue;
    }
    const next = args[i + 1];
    if (BOOLEAN_FLAGS.has(body)) {
      if (next === 'true' || next === 'false') {
        flags[body] = next;
        i++;
      } else {
        flags[body] = true;
      }
      continue;
    }
    if (next && !next.startsWith('--')) {
      flags[body] = next;
      i++;
    } else {
      flags[body] = true;
    }
  }
  return { flags, positionals };
}

function helpText() {
  return `Fable Ontology Agent CLI

Usage:
  node scripts/cli.mjs summary
  node scripts/cli.mjs audit
  node scripts/cli.mjs transfer-insights [query]
  node scripts/cli.mjs cognitive-profile [query]
  node scripts/cli.mjs query validation_loop --limit 10 --include_edges
  node scripts/cli.mjs inspect <atom-id>
  node scripts/cli.mjs score [session-id]
  node scripts/cli.mjs score --source_file <path-suffix>
  node scripts/cli.mjs prompt-pack [strict|full]
  node scripts/cli.mjs app
`;
}
