# Stage 6 — Governance Intent: workload / collatz

**Stage:** 6 — Governance Intent

**CR:** cr_01_termination_gate

**Status:** DRAFT

**Feeds:** Stage 7 — Design Intent

Placement of rules. The termination gate is Collatz's; the checks it runs and the store it records
into are unchanged.

---

## 1. Ownership

<!-- register:ownership business_language=capability -->
| Capability | Owner Subdomain | Disposition (OWNED, SATISFIED, DEFERRED) | Existing Artifact | Source Finding |
|------------|-----------------|------------------------------------------|-------------------|----------------|
| Gate the conjecture | collatz | OWNED | workload::CC_VERIFY_TERMINATION_V0 | S5 scope_boundary Gate the conjecture |
| Tell a malformed input apart from a violation | collatz | DEFERRED |  | S5 scope_boundary Tell a malformed input apart from a violation |

---

## 2. Storage Governance

<!-- register:storage_governance business_language=storage_need,purpose -->
| Storage Need | Purpose | Subdomain | Source Finding |
|--------------|---------|-----------|----------------|
| NONE IDENTIFIED |

---

## 3. Cross-Subdomain Dependencies

<!-- register:cross_subdomain_deps optional -->
| Dependency | Direction | Existing Artifact | Status (SATISFIED, GAP) | Source Finding |
|------------|-----------|-------------------|-------------------------|----------------|
| Checking set membership | collatz -> capability_transforms | capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 | SATISFIED | S4 dependency_graph capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 |

---

## 4. PPS Artifacts Requiring Action

<!-- register:pps_artifacts_requiring_action optional -->
| FQDN | Current Status | Action (REPLACE, REVIEW, REUSE, EXTEND) | Source Finding |
|------|----------------|----------------------------------|----------------|
| workload::CC_VERIFY_TERMINATION_V0 | Present; routes to a condition nothing runs | REPLACE | S4 design_decisions #4 |
| workload::WF_COLLATZ_CONJECTURE_V0 | Present; runs the gate being replaced | REVIEW | S4 design_decisions #3 |
| workload::CT_PURE_TERMINATION_CHECK_V0 | Present and reused unchanged | REUSE | S4 dependency_graph workload::CT_PURE_TERMINATION_CHECK_V0 |
| capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 | Present and reused unchanged | REUSE | S4 dependency_graph capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 |
| workload::CC_STORE_RESULTS_V0 | Present and reused unchanged | REUSE | S4 dependency_graph workload::CC_STORE_RESULTS_V0 |

---

## 5. Governance Boundary Rules

<!-- register:boundary_rules optional -->
| Rule Name | Statement | Source Finding |
|-----------|-----------|----------------|
| A_CAPABILITY_DECIDES | The gate refuses, by the platform's set-membership check, unless every sequence ended at 1. | S4 design_decisions #1 |
| THE_GATE_ROUTES_ON_ITS_STEPS | Each step routes SUCCESS to continue and VIOLATION to exit, and the gate declares no condition. | S4 design_decisions #2 |
| RE_POINT_THE_RUNNER | The workflow runs the new gate; nothing else about it changes. | S4 design_decisions #3 |

---

## 6. Governance Outcome

<!-- register:governance_outcome optional -->
| Capability | Owner Subdomain | Source Finding |
|------------|-----------------|----------------|
| Gate the conjecture | collatz | S6 ownership Gate the conjecture |

---

## gov_projection — Governed Handoff to Stage 7

| Direction | Fields |
|-----------|--------|
| **Consumes** ← Stage 5 | subdomain_purpose · scope_boundary · business_objects · identity_semantics · invariants · actions · provisional_codes · cross_subdomain_refs |
| **Emits** → Stage 7 | ownership · storage_governance · cross_subdomain_deps · pps_artifacts_requiring_action · boundary_rules · governance_outcome |
