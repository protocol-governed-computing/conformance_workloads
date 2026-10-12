# Stage 6 — Governance Intent: workload / collatz

## Machine

```yaml
document:
  phase: p6
  domain: workload
  subdomain: collatz
  cr: cr_02_typed_decision
  rule_set: transformation.schemas.REGISTER_SCHEMA_P6_V0
registers:
  ownership:
  - capability: Gate the conjecture
    owner_subdomain: collatz
    disposition: OWNED
    existing_artifact: workload::CC_VERIFY_TERMINATION_V1
    source_finding: {phase: p5, register: scope_boundary, key: Gate the conjecture}
  - capability: Tell a malformed input apart from a violation
    owner_subdomain: collatz
    disposition: DEFERRED
    existing_artifact: ''
    source_finding: {phase: p5, register: scope_boundary, key: Tell a malformed input apart from a violation}
  storage_governance: []
  cross_subdomain_deps:
  - dependency: Requiring a boolean true
    direction: collatz -> capability_transforms
    existing_artifact: capability_transforms::CT_PURE_REQUIRE_TRUE_V0
    status: SATISFIED
    source_finding: {phase: p4, register: dependency_graph, key: 'capability_transforms::CT_PURE_REQUIRE_TRUE_V0'}
  pps_artifacts_requiring_action:
  - fqdn: workload::CC_VERIFY_TERMINATION_V1
    current_status: Present; gives the set-membership check a boolean where it declares a string
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
  - fqdn: capability_transforms::CT_PURE_REQUIRE_TRUE_V0
    current_status: Present and reused unchanged
    action: REUSE
    source_finding: {phase: p4, register: dependency_graph, key: 'capability_transforms::CT_PURE_REQUIRE_TRUE_V0'}
  boundary_rules:
  - rule_name: GIVE_WHAT_IS_DECLARED
    statement: The gate decides with the platform's capability that refuses unless a boolean is true, given all_terminate, a boolean.
    source_finding: {phase: p4, register: design_decisions, row: 1}
  - rule_name: RE_POINT_THE_RUNNER
    statement: The workflow runs the new gate; nothing else about it changes.
    source_finding: {phase: p4, register: design_decisions, row: 3}
  governance_outcome:
  - capability: Gate the conjecture
    owner_subdomain: collatz
    source_finding: {phase: p6, register: ownership, key: Gate the conjecture}
```

Placement of rules. The termination gate is Collatz's; the check it runs and the capability it
decides with are unchanged.

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
