# Fable Additional Local Source Scan

Generated: 2026-06-14T03:26:55.161Z

## 결론

기존 1차 추출은 `~/.claude/projects` 중심이었다. 이번에는 `~/.claude/history.jsonl`, `~/.claude/tasks`, `~/.claude/transcripts`를 추가로 확인했다.

## 결과

- History records scanned: 9
- History relevant records extracted: 2
- Task session dirs checked: 5
- Task records extracted: 60
- Task status counts: `{"completed":59,"pending":1}`
- Transcript files scanned: 32
- Transcript model-candidate files: 0
- Transcript model-candidate records: 0
- Transcript generic fallback records ignored: 10

## 해석

추가로 실질적인 구조 정보를 준 것은 `~/.claude/tasks`다. 이는 기존 대화 atom에는 없던 작업 분해/완료 상태를 제공한다. `history.jsonl`은 사용자 명령 히스토리 보조 자료다. `transcripts`에서는 모델명 기준 Fable/Opus 후보가 없었고, 일반 단어 `fallback`만 걸린 기록은 온톨로지 반영에서 제외했다.
