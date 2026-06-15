# Fable Ontology Hallucination Audit

Generated: 2026-06-14T05:04:15.564Z

## 결론

이 온톨로지는 **관찰 가능한 로컬 로그/문서 레이어에서는 원문 근거에 연결되어 있다**. 직접 소스가 있는 atom 14,264개에서 source file 누락 0건, source line 오류 0건, 관찰/직접 소스 atom의 hard grounding 실패 0건으로 확인됐다.

다만 이 검증은 "Fable의 숨은 사고과정"을 증명하지 않는다. 검증된 것은 로컬 로그, 공개/로컬 문서, 첨부 텍스트에서 관찰 가능한 문장과 도구 이벤트가 온톨로지 노드의 근거로 실제 존재한다는 점이다. `decision_axis`, `pattern_cluster`, 일부 `*_extension` 노드는 원문을 해석해 만든 파생층이므로 원문 사실과 같은 등급으로 읽으면 안 된다. 특히 thought extension 9건은 원문 기반 해석으로 보이지만 직접 인용 문장 매칭은 실패하므로 직접근거 모드에서는 `interpretive`로 태그하거나 제외하는 편이 안전하다.

## 판정

| 항목 | 판정 |
|---|---|
| 사실 노드 grounding | `pass_observed_layers` |
| edge 무결성 | `pass` |
| 파생 축 support | `pass` |
| 종합 | `grounded_with_interpretive_review_items` |

## 전체 무결성

| 항목 | Count |
|---|---:|
| Unified atoms | 14,320 |
| Unified edges | 22,280 |
| Duplicate atom IDs | 0 |
| Duplicate edge IDs | 0 |
| Edge endpoint problems | 0 |

## 소스 추적성

| Status | Count |
|---|---:|
| `near_exact` | 9,800 |
| `near_generated_file_tool` | 1,635 |
| `near_phrase` | 1,502 |
| `near_generated_short_tool` | 1,121 |
| `file_phrase` | 60 |
| `near_loose` | 49 |
| `near_markdown_table_rule` | 38 |
| `near_prefix` | 28 |
| `near_generated_fallback` | 20 |
| `no_text_match` | 9 |
| `near_generated_empty_tool` | 1 |
| `file_prefix` | 1 |

## 원문 매칭 실패 분포

| 구분 | Count |
|---|---:|
| Hard grounding failures | 0 |
| Interpretive review items | 9 |

### No-text by layer

- `thought_system_atom`: 9

### No-text by source kind

- `comparison_extension`: 6
- `official_prompting_extension`: 1
- `community_unique_extension`: 2

## Layer 분포

| Layer | Count |
|---|---:|
| `local_behavior_atom` | 13,603 |
| `thought_system_atom` | 648 |
| `additional_local_atom` | 62 |
| `derived_pattern_cluster` | 7 |

## 파생 축 검증

| 항목 | Count |
|---|---:|
| Decision axes | 49 |
| Unsupported axes | 0 |
| Min support edges per axis | 1 |
| Max support edges per axis | 40 |

## 패턴 군집 검증

| 항목 | Count |
|---|---:|
| Pattern atoms | 7 |
| Count mismatches | 0 |
| Missing axis targets | 0 |
| Support edges | 56 |
| Pattern-axis edges | 12 |

## Fallback 검증

| 항목 | Count |
|---|---:|
| Fallback atoms | 20 |
| Source marker verified | 20 |
| Source marker missing | 0 |

## 남는 위험

| Severity | 내용 | Count |
|---|---|---:|
| medium | thought extension 중 직접 인용이 아니라 원문 기반 해석으로 만든 atom이 있다 | 9 |
| medium | thought_system_atom의 일부는 원문 문장 그 자체가 아니라 evidence_excerpt에서 해석한 규칙 문장이다 | 40 |
| low | local atom type 분류는 정규식 기반 휴리스틱이다 | 13,603 |

## 원문 매칭 실패 샘플

| Status | Atom | Text | Source |
|---|---|---|---|
| `no_text_match` | `thought:ta_b64550716a706b74` | Locate the causal difference in the internal mechanism, not only in the visible output. | `<LOCAL_HOME>/.codex/attachments/58029dd3-9063-42c4-ac43-3753d57480f6/pasted-text.txt:1` |
| `no_text_match` | `thought:ta_fc4b0e3ec54fdfdb` | Separate simulation engine, color model, rendering composition, and expressive overlay as distinct explanatory layers. | `<LOCAL_HOME>/.codex/attachments/58029dd3-9063-42c4-ac43-3753d57480f6/pasted-text.txt:1` |
| `no_text_match` | `thought:ta_6c01780ab18f80e4` | Connect code-level choices to perceptual outcomes such as smoothness, detail retention, and material feel. | `<LOCAL_HOME>/.codex/attachments/58029dd3-9063-42c4-ac43-3753d57480f6/pasted-text.txt:1` |
| `no_text_match` | `thought:ta_ecb3500e439da6ef` | Treat the represented material as a model choice: RGB accumulation and absorption-based pigment mixing imply different worlds. | `<LOCAL_HOME>/.codex/attachments/58029dd3-9063-42c4-ac43-3753d57480f6/pasted-text.txt:1` |
| `no_text_match` | `thought:ta_bd8f41c709126f1d` | Record what a technical substrate enables or blocks: parallel GPU passes enable higher dye resolution and realtime detail. | `<LOCAL_HOME>/.codex/attachments/58029dd3-9063-42c4-ac43-3753d57480f6/pasted-text.txt:1` |
| `no_text_match` | `thought:ta_85fe65974c5a8131` | Preserve vivid explanatory contrast while marking strong phrases as approximations when they overstate physical or technical identity. | `<LOCAL_HOME>/.codex/attachments/58029dd3-9063-42c4-ac43-3753d57480f6/pasted-text.txt:1` |
| `no_text_match` | `thought:ta_548620ea6777852e` | After long autonomous work, write the final summary as a fresh re-grounding for a reader who did not watch the work. | `<LOCAL_HOME>/Documents/Codex/2026-06-14/new-chat/work/research_sources/prompting-claude-fable-5.txt:288` |
| `no_text_match` | `thought:ta_6b5d166944ba5ab6` | Reserve the expensive model for decomposition, tradeoffs, synthesis, risk assessment, and final review. | `<LOCAL_HOME>/Documents/Codex/2026-06-14/new-chat/work/research_sources/github/builderio-efficient-fable-SKILL.md:14` |
| `no_text_match` | `thought:ta_807e4287d842e33b` | Separate architect judgment from builder implementation: the architect plans and reviews, while builders work in fresh isolated contexts. | `<LOCAL_HOME>/Documents/Codex/2026-06-14/new-chat/work/research_sources/github/danmcinerney-architect-loop-README.md:3` |
