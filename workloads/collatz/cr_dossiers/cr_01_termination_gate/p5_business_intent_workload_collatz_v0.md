# Stage 5 — Business Intent: workload / collatz

## Machine

```yaml
document:
  phase: p5
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P5_V0
registers:
  subdomain_purpose: |2

    The Collatz subdomain is a conformance workload: it computes the Collatz sequence for each number it
    is given, decides whether every sequence ends at 1, and records the result, so that a run shows the
    platform executing exactly what it declares. It decides nothing about any business.
  purpose_provenance:
  - source: CR seed §0 Subdomain Purpose
    disposition: INHERITED
    refinement: ''
  subdomain_purposes:
  - subdomain: collatz
    purpose: Decides whether a run holds the conjecture, by capabilities that answer with an outcome.
    source_finding: {phase: p4, register: actors, key: Collatz}
  scope_boundary:
  - capability: Gate the conjecture
    status: IN_SCOPE
    notes: A new version of the termination gate.
    source_finding: {phase: p4, register: authoring_scope, key: GAP-01}
  - capability: Tell a malformed input apart from a violation
    status: DEFERRED
    notes: Both end the run the same way today.
    source_finding: {phase: p4, register: authoring_scope, key: Tell a malformed input apart from a violation}
  business_objects: null
  identity_semantics: []
  invariants:
  - invariant: A run ends with the conjecture holding only when every sequence ends at 1.
    business_reason: A gate that cannot fail proves nothing.
    source_finding: {phase: p1, register: business_invariants, row: 1}
  - invariant: The termination gate's outcome is the termination check's outcome.
    business_reason: Routing is a lookup; the decision is the check's.
    source_finding: {phase: p1, register: business_invariants, row: 2}
  actions:
  - action: Gate
    object: The conjecture
    trigger: Termination is checked
    status: IN_SCOPE
    source_finding: {phase: p4, register: capability_graph, key: Gate the conjecture}
  provisional_codes:
  - subdomain: collatz
    provisional_code: CC_VERIFY_TERMINATION_V1
    family: CC
    summary: Gate the conjecture on the termination check's outcome.
    source_finding: {phase: p4, register: design_decisions, row: 2}
  cross_subdomain_refs: []
```

---

## 1. Subdomain Purpose

---

## 2. Scope Boundary

---

## 3. Business Objects

---

## 4. Identity Semantics

---

## 5. Invariants

---

## 6. Actions

---

## 7. Provisional Codes

---

## 8. Cross-Subdomain References

---

## gov_projection — Governed Handoff to Stage 6

| Direction | Fields |
|-----------|--------|
| **Consumes** ← Stage 4 | actors · bm_entities · events · capability_graph · dependency_graph · constraint_register · gap_register · design_decisions · authoring_scope |
| **Emits** → Stage 6 | subdomain_purpose · purpose_provenance · scope_boundary · business_objects · identity_semantics · invariants · actions · provisional_codes · cross_subdomain_refs |
