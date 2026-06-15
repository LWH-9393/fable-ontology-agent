# Fable Local Ontology Merge Report

Generated: 2026-06-14

## 결론

요청한 4개 작업을 모두 반영했다. 13,603개 로컬 atom을 반복 패턴으로 군집화했고, Fable 실행 구간과 Opus 4.8 fallback 구간을 비교했으며, `~/.claude/history.jsonl`, `~/.claude/tasks`, `~/.claude/transcripts`를 2차 조사한 뒤 기존 두 온톨로지를 통합했다.

중요한 제한도 명시한다. 이 결과는 숨은 사고과정 추정이 아니라, 로컬에 남은 대화 문장, 도구 호출, 검증 결과, fallback 이벤트, 작업 기록의 관찰 가능한 반복 구조만 정리한 것이다.

## 1. 로컬 atom 반복 패턴 군집화

입력은 `fable5-atomic-ontology`의 로컬 atom 13,603개다. 군집은 7개로 정리했다.

| 군집 | Count | 의미 |
|---|---:|---|
| 장기 세션 이어받기 | 2,916 | continuation context로 이전 작업 상태를 이어받는 패턴 |
| 검증 실행 | 1,114 | 테스트, 빌드, 타입체크, 검증 결과를 남기는 패턴 |
| 작업 전 맥락 인벤토리 | 1,012 | 파일 읽기, 목록 조회, 검색으로 현재 상태를 먼저 확인하는 패턴 |
| 변경 주장 | 251 | 수정, 추가, 반영 같은 변경 완료 진술 |
| 불확실성 또는 차단 조건 명시 | 115 | 권한, 실패, 불확실성, 접근 제한을 먼저 드러내는 패턴 |
| Fable에서 Opus로 fallback | 20 | Fable 안전 라우팅으로 Opus 4.8 전환이 발생한 패턴 |
| 하위 에이전트 위임 | 17 | 독립 하위 작업을 Agent/Task로 분리하는 패턴 |

핵심 전환값은 다음과 같다.

- 사용자 요청 후 행동으로 진행: 39
- 사용자 요청 후 차단/불확실성으로 진행: 9
- 변경 주장 후 가까운 검증: 136
- 차단/불확실성 후 복구 행동: 95
- fallback window: 20

## 2. Fable vs Opus fallback 비교

비교는 atom의 `model` 메타데이터만 사용했다.

| Model | Atoms | Assistant atoms | Sessions | Tool action / 100 assistant atoms | Verification / 100 assistant atoms | Change claim / 100 assistant atoms | Blocker / 100 assistant atoms |
|---|---:|---:|---:|---:|---:|---:|---:|
| Fable | 7,362 | 7,342 | 18 | 57.63 | 4.89 | 3.36 | 1.5 |
| Opus 4.8 | 114 | 114 | 6 | 22.81 | 2.63 | 3.51 | 2.63 |

관찰상 Fable 구간은 도구 호출과 검증 실행 비율이 더 높게 잡혔다. Opus fallback 구간은 표본이 114개로 작기 때문에, “성향 확정”보다는 “fallback 이후 관찰된 행동 차이”로 다루는 것이 맞다.

Fallback 이벤트 20개는 `kirubiru_web` 15개, `Antigravity/Codex` 5개에 분포했다.

## 3. 추가 로컬 위치 조사

기존 1차 추출은 `~/.claude/projects` 중심이었다. 이번에는 아래 위치를 추가 조사했다.

| 위치 | 결과 |
|---|---:|
| `~/.claude/history.jsonl` | 9 records scanned, 2 relevant records extracted |
| `~/.claude/tasks` | 5 session dirs checked, 60 task records extracted |
| `~/.claude/transcripts` | 32 files scanned, 0 model-candidate records |

`~/.claude/tasks`가 가장 의미 있었다. 기존 대화 atom에는 없던 작업 분해, 완료 상태, pending 상태를 제공했다. `~/.claude/transcripts`에서는 일반 단어 `fallback` 오탐 10건이 있었지만, Fable/Opus 모델 후보가 아니므로 온톨로지 반영에서 제외했다.

## 4. 두 온톨로지 병합

통합 결과는 `fable-unified-ontology`로 저장했다.

| Layer | Count |
|---|---:|
| Local behavior atoms | 13,603 |
| Thought-system atoms | 648 |
| Additional local atoms | 62 |
| Derived pattern clusters | 7 |
| Unified atoms | 14,320 |
| Unified edges | 22,280 |

통합본은 원본 층을 섞어 없애지 않는다. `local_behavior_atom`은 실제 로컬 관찰값, `thought_system_atom`은 정제된 사고체계 축, `additional_local_atom`은 2차 로컬 자료, `derived_pattern_cluster`는 로컬 반복 행동과 사고체계 축을 연결하는 중간층이다.

## 검증

생성된 JSONL 파일은 모두 파싱됐다. 통합 atom ID 중복, edge ID 중복, edge endpoint 누락은 모두 0건이었다. 패턴 군집에서 사고체계 축으로 연결된 edge는 12개, 로컬 예시 atom에서 패턴 군집으로 연결된 support edge는 56개다.

## 산출물

- `fable-local-pattern-clusters.md`
- `fable-fable-vs-opus-fallback-comparison.md`
- `fable-local-additional-sources.summary.md`
- `fable-unified-ontology.summary.md`
- `fable-unified-ontology.atoms.jsonl`
- `fable-unified-ontology.edges.jsonl`
