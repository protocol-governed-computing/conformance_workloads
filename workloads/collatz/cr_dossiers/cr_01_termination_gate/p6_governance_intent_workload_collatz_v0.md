# Stage 6 — Governance Intent: workload / collatz

## Machine

```yaml
document:
  phase: p6
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P6_V0
registers:
  ownership:
  - capability: Gate the conjecture
    owner_subdomain: collatz
    disposition: OWNED
    existing_artifact: workload::CC_VERIFY_TERMINATION_V0
    source_finding: {phase: p5, register: scope_boundary, key: Gate the conjecture}
  - capability: Tell a malformed input apart from a violation
    owner_subdomain: collatz
    disposition: DEFERRED
    existing_artifact: ''
    source_finding: {phase: p5, register: scope_boundary, key: Tell a malformed input apart from a violation}
  storage_governance: []
  cross_subdomain_deps:
  - dependency: Checking set membership
    direction: collatz -> capability_transforms
    existing_artifact: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    status: SATISFIED
    source_finding: {phase: p4, register: dependency_graph, key: 'capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0'}
  pps_artifacts_requiring_action:
  - fqdn: workload::CC_VERIFY_TERMINATION_V0
    current_status: Present; routes to a condition nothing runs
    action: REPLACE
    source_finding: {phase: p4, register: design_decisions, row: 4}
  - fqdn: workload::WF_COLLATZ_CONJECTURE_V0
    current_status: Present; runs the gate being replaced
    action: REVIEW
    source_finding: {phase: p4, register: design_decisions, row: 3}
  - fqdn: workload::CT_PURE_TERMINATION_CHECK_V0
    current_status: Present and reused unchanged
    action: REUSE
    source_finding: {phase: p4, register: dependency_graph, key: 'workload::CT_PURE_TERMINATION_CHECK_V0'}
  - fqdn: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    current_status: Present and reused unchanged
    action: REUSE
    source_finding: {phase: p4, register: dependency_graph, key: 'capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0'}
  - fqdn: workload::CC_STORE_RESULTS_V0
    current_status: Present and reused unchanged
    action: REUSE
    source_finding: {phase: p4, register: dependency_graph, key: 'workload::CC_STORE_RESULTS_V0'}
  boundary_rules:
  - rule_name: A_CAPABILITY_DECIDES
    statement: The gate refuses, by the platform's set-membership check, unless every sequence ended at 1.
    source_finding: {phase: p4, register: design_decisions, row: 1}
  - rule_name: THE_GATE_ROUTES_ON_ITS_STEPS
    statement: Each step routes SUCCESS to continue and VIOLATION to exit, and the gate declares no condition.
    source_finding: {phase: p4, register: design_decisions, row: 2}
  - rule_name: RE_POINT_THE_RUNNER
    statement: The workflow runs the new gate; nothing else about it changes.
    source_finding: {phase: p4, register: design_decisions, row: 3}
  governance_outcome:
  - capability: Gate the conjecture
    owner_subdomain: collatz
    source_finding: {phase: p6, register: ownership, key: Gate the conjecture}
```

Placement of rules. The termination gate is Collatz's; the checks it runs and the store it records
into are unchanged.

---

## 1. Ownership

---

## 2. Storage Governance

---

## 3. Cross-Subdomain Dependencies

---

## 4. PPS Artifacts Requiring Action

---

## 5. Governance Boundary Rules

---

## 6. Governance Outcome

---

## gov_projection — Governed Handoff to Stage 7

| Direction | Fields |
|-----------|--------|
| **Consumes** ← Stage 5 | subdomain_purpose · scope_boundary · business_objects · identity_semantics · invariants · actions · provisional_codes · cross_subdomain_refs |
| **Emits** → Stage 7 | ownership · storage_governance · cross_subdomain_deps · pps_artifacts_requiring_action · boundary_rules · governance_outcome |
