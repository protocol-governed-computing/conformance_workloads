# Stage 4 — Business Model: workload / collatz

## Machine

```yaml
document:
  phase: p4
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P4_V0
registers:
  actors:
  - actor: Collatz
    role: Decides whether a run holds the conjecture.
    authority_class: Owning subdomain
    source_finding: {phase: p3, register: placement_decision, key: collatz}
  bm_entities:
  - entity: The Sequence
    description: The Collatz sequence computed for one number.
    store_model: Recorded with the run's results when the conjecture holds.
    source_finding: {phase: p2, register: entities, row: 1}
  - entity: The Termination Check
    description: The capability that inspects every sequence for termination; unchanged.
    store_model: Run by the termination gate.
    source_finding: {phase: p2, register: entities, row: 2}
  - entity: The Termination Gate
    description: The contract that runs the check.
    store_model: Run by the Collatz workflow.
    source_finding: {phase: p2, register: entities, row: 3}
  resources: []
  events:
  - event: NONE IDENTIFIED
    trigger: This change recognises no new moment.
    lifecycle_meaning: ''
    source_finding: {phase: p1, register: business_events, row: 1}
  relationships:
  - subject: Collatz
    verb: gates
    object: the conjecture
    capability_need: Gate the conjecture
    source_finding: {phase: p3, register: authoring_decisions, key: Gate the conjecture}
  capability_graph:
  - capability: Gate the conjecture
    source_finding: {phase: p3, register: authoring_decisions, key: Gate the conjecture}
    status: CRITICAL
    gap_register_entry: GAP-01
    notes: A new version that decides with the platform's set-membership check.
  dependency_graph:
  - from: collatz
    to: workload::CT_PURE_TERMINATION_CHECK_V0
    dependency_type: transform
    pps_status: SATISFIED
    source_finding: {phase: p3, register: dependency_discoveries, key: The termination check}
  - from: collatz
    to: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    dependency_type: transform
    pps_status: SATISFIED
    source_finding: {phase: p3, register: dependency_discoveries, key: Checking set membership}
  - from: collatz
    to: workload::CC_STORE_RESULTS_V0
    dependency_type: contract
    pps_status: SATISFIED
    source_finding: {phase: p3, register: dependency_discoveries, key: Recording the results}
  constraint_register:
  - number: '1'
    constraint: Every run that ends with the conjecture holding today ends the same way, and records the same result.
    source_finding: {phase: p1, register: constraints, row: 1}
    source: The business author
  - number: '2'
    constraint: This change is built before the platform refuses routing to a condition.
    source_finding: {phase: p1, register: constraints, row: 2}
    source: The business author
  gap_register:
  - gap_code: GAP-01
    source_finding: {phase: p3, register: authoring_decisions, key: Gate the conjecture}
    capability: Gate the conjecture
    owner_subdomain: collatz
    resolution: AUTHOR_NEW
  design_decisions:
  - number: '1'
    decision: The new gate runs the unchanged check, then the platform's set-membership check on all_terminate against the set holding only true.
    source_finding: {phase: p3, register: analysis_findings, key: Q1}
    rationale: A decision is a capability's.
    constraints_imposed: No new transform.
  - number: '2'
    decision: Both steps route SUCCESS to continue and VIOLATION to exit, and the gate declares no condition.
    source_finding: {phase: p3, register: analysis_findings, key: Q2}
    rationale: Routing is a lookup.
    constraints_imposed: The gate's inputs, outputs and allowed outcomes are those of the old gate.
  - number: '3'
    decision: The workflow is re-pointed to the new gate.
    source_finding: {phase: p3, register: analysis_findings, key: Q4}
    rationale: It decides as today.
    constraints_imposed: Only the gate its place runs changes.
  - number: '4'
    decision: The old gate is replaced by its new version.
    source_finding: {phase: p3, register: analysis_findings, key: Q5}
    rationale: A change of meaning is a new identity.
    constraints_imposed: It stays in the record and out of reach.
  authoring_scope:
  - capability: Gate the conjecture
    gap_register_ref: GAP-01
```

Consolidation of Stages 1–3. Nothing is re-litigated and nothing new is decided.

---

## 1. Discovery Summary

### Actors (actors)

### Entities (bm_entities)

### Resources

### Events (events)

### Relationships (Candidate Capabilities)

## 2. Capability Graph (capability_graph)

## 3. Dependency Graph (dependency_graph)

## 4. Constraint Register (constraint_register)

## 5. Gap Register (gap_register)

## 6. Design Decisions (design_decisions)

## 7. Authoring Scope (authoring_scope)

### In Scope — This CR

### Deferred — Future CR
| Capability | Deferred Reason |
|-----------|-----------------|
| Tell a malformed input apart from a violation | Both end the run the same way today; not this change. |

## Pipeline Provenance

| Stage | Output | Status |
|-------|--------|--------|
| Stage 1 — Change Request & Input Elicitation | Classification + Problem + Outcome + Known Facts | COMPLETE |
| Stage 2 — Domain Model Discovery | Actors, Entities, Resources, Events, Relationships | COMPLETE |
| Stage 3 — Analysis Loop | Capability Graph, Dependency Graph, Constraints, Gap Register | COMPLETE — SATURATED |
| Stage 4 — Business Model | This document | COMPLETE |
| Stage 4b — Authoring Scope | IN/FUTURE CR boundary | PENDING |

---

## gov_projection — Governed Handoff to Stage 5

| Direction | Fields |
|-----------|--------|
| **Consumes** ← Stage 1 | cr_type · constraints · business_invariants · authority_boundaries · out_of_scope |
| **Consumes** ← Stage 2 | entities · entity_attributes · business_processes · pps_baseline_fqdns |
| **Consumes** ← Stage 3 | authoring_decisions · dependency_discoveries · placement_decision · saturation |
| **Emits** → Stage 5 | actors · bm_entities · events · capability_graph · dependency_graph · constraint_register · gap_register · design_decisions · authoring_scope |
