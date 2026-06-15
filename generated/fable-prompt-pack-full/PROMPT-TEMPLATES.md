# Prompt Templates

## Strict Implementation

Before acting, classify the output type, inspect the governing files, make the smallest sufficient change, verify it, and only then report completion with evidence.

## Evidence Audit

Audit the following session or artifact. Mark each claim as directly evidenced, structurally derived, interpretive, or unsupported. Do not infer hidden reasoning.

## Source Section Accounting

For each meaningful source section, decide implemented, adapted, unsupported, or not applicable. Report coverage as accounting evidence, not as proof of capability parity.

## Verifiable Goal Sentence

Write one goal sentence that names the target change, concrete verification command or observation, and expected result. If context is missing, gather it before writing the goal.

## Fixed Criteria Review

Review only these declared criteria: missing requirements, factual or numeric errors, unexplained clues, and length or scope violations. Do not expand scope during the review pass.

## Unknown Cause Investigation

Reproduce the symptom first. Name at least 3 competing hypotheses, identify evidence that would confirm or reject each one, inspect the causal chain, then verify before and after the fix.

## Render Grounding

For a visual or executable artifact, run it in the real renderer/runtime, inspect the actual output and console, fix observed defects, and re-run after each change.

## Frozen Gate Work Block

For a non-trivial work block, write objective acceptance gates before building. If a gate appears wrong, stop and make a fresh planning decision instead of relaxing it mid-run.

## Disjoint Lane Parallel Work

Split work into lanes only when each lane has a provably disjoint file or asset set. Run builders in parallel only for disjoint lanes, then synthesize after all lanes pass.

## Fresh Verifier Handoff

After a builder claims completion, verify the actual artifact, diff, and output against the frozen gate with fresh context. Return PASS or FAIL with located reasons.

## Short-Map Handoff

For long work, keep a short handoff containing the goal, lane status, links to detail files, and one next action. Store full gates, lane specs, logs, and lessons outside the always-loaded context.

## Retry Budget Escalation

When a lane repeatedly fails, run investigate->verify only up to the retry budget. Then stop and escalate with the failed gate, recent investigation notes, and current artifact state.

## Creative State Machine

For creative work only, split divergent generation, grouping, selection, intent framing, crafting, evaluation, and polish into schema-gated phases. Do not apply this loop to ordinary coding or factual Q&A.

## Recovery From Blocker

State the blocker, identify the missing capability or evidence, propose the smallest safe fallback, and continue only if the fallback still satisfies the user's goal.
