# Stage 8 — Authoring Mandate: workload / collatz

**Stage:** 8 — Authoring Mandate
**CR:** cr_01_termination_gate
**Status:** DRAFT
**Feeds:** Construction

IN WHAT ORDER. Mechanically derived from the design; it reconciles with Stage 7 exactly and adds
nothing. One contract is built in its subdomain; the one it replaces is stood down, and the workflow
re-pointed to the new one.

---

## 1. Build Order

<!-- register:build_order optional -->
| Wave | Step | Code | Action (REPLACE, EXTEND, NEW) | Subdomain | Depends On |
|------|------|------|-------------------------------|-----------|------------|
| 1 | 1 | workload::CC_VERIFY_TERMINATION_V1 | NEW | collatz | — |

---

## 2. Critical Path

<!-- register:critical_path optional -->
| Position | Code |
|----------|------|
| 1 | workload::CC_VERIFY_TERMINATION_V1 |

---

## 3. Artifact Summary

<!-- register:mandate_artifact_summary -->
| Action (REPLACE, EXTEND, NEW) | Count | Description |
|-------------------------------|-------|-------------|
| NEW | 1 | The termination gate, refusing unless every sequence ended at 1. |
| REPLACE | 1 | The termination gate it stands in for. |

---

## 4. Field Declarations

<!-- register:field_declarations -->
| Code | Subdomain Field |
|------|-----------------|
| workload::CC_VERIFY_TERMINATION_V1 | collatz |

---

## 5. New Capabilities

<!-- register:new_capabilities optional -->
| Code | Purpose | Inputs | Outputs |
|------|---------|--------|---------|
| workload::CC_VERIFY_TERMINATION_V1 | Verify all Collatz sequences terminate at 1 | sequences | all_terminate, non_terminating, conjecture_holds |

---

## 6. New Intents

<!-- register:new_intents optional -->
| Code | Purpose | Workflow | Inputs |
|------|---------|----------|--------|

---

## 7. Cross-Subdomain Notes

<!-- register:cross_subdomain_notes optional -->
| Code | Note |
|------|------|
