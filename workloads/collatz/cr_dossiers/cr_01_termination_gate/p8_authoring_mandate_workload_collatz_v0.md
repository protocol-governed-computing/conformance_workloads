# Stage 8 — Authoring Mandate: workload / collatz

## Machine

```yaml
document:
  phase: p8
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P8_V0
registers:
  build_order:
  - wave: '1'
    step: '1'
    code: workload::CC_VERIFY_TERMINATION_V1
    action: NEW
    subdomain: collatz
    depends_on: null
  critical_path:
  - position: '1'
    code: workload::CC_VERIFY_TERMINATION_V1
  mandate_artifact_summary:
  - action: NEW
    count: '1'
    description: The termination gate, refusing unless every sequence ended at 1.
  - action: REPLACE
    count: '1'
    description: The termination gate it stands in for.
  field_declarations:
  - code: workload::CC_VERIFY_TERMINATION_V1
    subdomain_field: collatz
  new_capabilities:
  - code: workload::CC_VERIFY_TERMINATION_V1
    purpose: Verify all Collatz sequences terminate at 1
    inputs: sequences
    outputs: all_terminate, non_terminating, conjecture_holds
  new_intents: null
  cross_subdomain_notes: null
```

IN WHAT ORDER. Mechanically derived from the design; it reconciles with Stage 7 exactly and adds
nothing. One contract is built in its subdomain; the one it replaces is stood down, and the workflow
re-pointed to the new one.

---

## 1. Build Order

---

## 2. Critical Path

---

## 3. Artifact Summary

---

## 4. Field Declarations

---

## 5. New Capabilities

---

## 6. New Intents

---

## 7. Cross-Subdomain Notes
