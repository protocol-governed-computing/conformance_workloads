# Stage 7 — Design Intent: workload / collatz

**Stage:** 7 — Design Intent
**CR:** cr_01_termination_gate
**Status:** DRAFT
**Feeds:** Stage 8 — Authoring Mandate

Read against the pinned baseline
`d880845e3b189f2589aa29bb2b53db291ff897ff0705a52f99c687bd26cf2b51`.

The termination gate is replaced by a version that decides: after the unchanged termination check
reports, the platform's set-membership check refuses unless every sequence ended at 1. Both steps
route on their own outcomes, and the gate declares no condition. The workflow is re-pointed to run
the new gate, and nothing else about it changes.

---

## 1. Design Decisions Resolution

<!-- register:design_resolution optional -->
| Decision | Business Fact | Resolution | Source Finding |
|----------|---------------|------------|----------------|
| A capability decides | A decision is made by a capability | workload::CC_VERIFY_TERMINATION_V1 runs workload::CT_PURE_TERMINATION_CHECK_V0 unchanged in check_termination, then capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 in require_every_sequence_terminated, with value all_terminate and allowed_set holding only true; the second refuses when a sequence did not end at 1 | S4 design_decisions #1 |
| The gate routes on its steps | Routing is a lookup | Each step routes SUCCESS to continue and VIOLATION to exit, and workload::CC_VERIFY_TERMINATION_V1 declares no evaluation block; its inputs and allowed outcomes are those of workload::CC_VERIFY_TERMINATION_V0, and it adds the output conjecture_holds, because every step declares what it reports | S4 design_decisions #2 |
| The workflow runs the new gate | It decides as today | workload::WF_COLLATZ_CONJECTURE_V0 is re-pointed: the place labelled CC_VERIFY_TERMINATION_V0 runs workload::CC_VERIFY_TERMINATION_V1; its label, routes and the store's bindings to it are unchanged | S4 design_decisions #3 |
| A new version | A change of meaning is a new identity | workload::CC_VERIFY_TERMINATION_V1 supersedes workload::CC_VERIFY_TERMINATION_V0 | S4 design_decisions #4 |

---

## 2. Artifact Inventory — Existing Artifacts

<!-- register:existing_inventory -->
| FQDN | Action (REPLACE, REUSE, EXTEND, REPOINT, REVIEW) | Summary | Reason | Source Finding |
|------|------------------------------------------|---------|--------|----------------|
| workload::CC_VERIFY_TERMINATION_V0 | REPLACE |  | Routes to a condition nothing runs. Stood down by its next version. | S6 pps_artifacts_requiring_action #1 |
| workload::WF_COLLATZ_CONJECTURE_V0 | REPOINT |  | Runs the gate being replaced; re-pointed to its next version. | S6 pps_artifacts_requiring_action #2 |
| workload::CT_PURE_TERMINATION_CHECK_V0 | REUSE |  | Reports whether every sequence ended at 1, and which did not, unchanged. | S6 pps_artifacts_requiring_action #3 |
| capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 | REUSE |  | Refuses a value not in a declared set, unchanged. | S6 pps_artifacts_requiring_action #4 |
| workload::CC_STORE_RESULTS_V0 | REUSE |  | Records the sequences and the check's findings, unchanged. | S6 pps_artifacts_requiring_action #5 |

---

## 3. Artifact Family Mapping — New Artifacts

<!-- register:new_artifacts optional business_language=capability -->
| Capability | Family (AC, IN, WF, RB, CC, CT, EV, VOCAB, STRUCTURE, TI, TE) | Code | Summary | Owner Subdomain | Status | Source Finding |
|------------|------------------------------------------------|------|---------|-----------------|--------|----------------|
| Gate the conjecture | CC | workload::CC_VERIFY_TERMINATION_V1 | Verify all Collatz sequences terminate at 1 | collatz | NEW | S6 governance_outcome #1 |

---

## 4. Runtime Binding (RB) Declarations

<!-- register:rb_declarations -->
| RB Code | Binds WF | CS Bindings | Storage Structure | Source Finding |
|---------|----------|-------------|-------------------|----------------|
| NONE IDENTIFIED |

---

## 5. Execution Topology

<!-- register:execution_topology optional_columns=runs -->
| Workflow | Node | Runs | Node Type (IN, CC, EXIT, EXIT_SUCCESS) | Routing | Source Finding |
|----------|------|------|----------------------------------------|---------|----------------|
| NONE IDENTIFIED |

---

## 6. Capability Composition

<!-- register:cc_composition optional -->
| CC Code | Step | Step Name | Capability | Kind (CT, CS) | Operation | Store | Consumes | Produces | Routing | Interpreted By | Semantic Status | Interface |
|---------|------|-----------|------------|---------------|-----------|-------|----------|----------|---------|----------------|-----------------|-----------|
| workload::CC_VERIFY_TERMINATION_V1 | 1 | check_termination | workload::CT_PURE_TERMINATION_CHECK_V0 | CT | PURE_TERMINATION_CHECK | — | sequences | all_terminate, non_terminating | SUCCESS -> continue; VIOLATION -> exit | — | SUCCESS | in: sequences=sequences; out: all_terminate=all_terminate, non_terminating=non_terminating |
| workload::CC_VERIFY_TERMINATION_V1 | 2 | require_every_sequence_terminated | capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 | CT | VALIDATE_SET_MEMBERSHIP | — | all_terminate | conjecture_holds | SUCCESS -> continue; VIOLATION -> exit | — | SUCCESS | in: value=all_terminate, allowed_set=true only; out: is_member=conjecture_holds |

---

## 7. Step Bindings

<!-- register:step_bindings optional -->
| Owner | Step | Direction (INPUT, OUTPUT) | Field | Bound To | Source Finding |
|-------|------|--------------------------|-------|----------|----------------|
| workload::CC_VERIFY_TERMINATION_V1 | check_termination | INPUT | sequences | inputs.sequences | S7 cc_composition check_termination |
| workload::CC_VERIFY_TERMINATION_V1 | check_termination | OUTPUT | all_terminate | capability_result.all_terminate | S7 cc_composition check_termination |
| workload::CC_VERIFY_TERMINATION_V1 | check_termination | OUTPUT | non_terminating | capability_result.non_terminating | S7 cc_composition check_termination |
| workload::CC_VERIFY_TERMINATION_V1 | require_every_sequence_terminated | INPUT | value | results.check_termination.all_terminate | S7 cc_composition require_every_sequence_terminated |
| workload::CC_VERIFY_TERMINATION_V1 | require_every_sequence_terminated | INPUT | allowed_set | [True] | S7 cc_composition require_every_sequence_terminated |
| workload::CC_VERIFY_TERMINATION_V1 | require_every_sequence_terminated | OUTPUT | conjecture_holds | capability_result.is_member | S7 cc_composition require_every_sequence_terminated |

---

## 8. Interface Fields

<!-- register:interface_fields optional -->
| Artifact | Direction (INPUT, OUTPUT, ATTRIBUTE) | Field | Type | Required (YES, NO) | Default | Meaning |
|----------|--------------------------------------|-------|------|--------------------|---------|---------|
| workload::CC_VERIFY_TERMINATION_V1 | INPUT | sequences | object | YES |  | The sequences computed for a run |
| workload::CC_VERIFY_TERMINATION_V1 | OUTPUT | all_terminate | boolean | NO |  | Whether every sequence ends at 1 |
| workload::CC_VERIFY_TERMINATION_V1 | OUTPUT | non_terminating | array | NO |  | The numbers whose sequences did not end at 1 |
| workload::CC_VERIFY_TERMINATION_V1 | OUTPUT | conjecture_holds | boolean | NO |  | True when every sequence ended at 1; the gate refuses otherwise |

---

## 9. Artifact Properties

<!-- register:artifact_properties optional -->
| Artifact | Property | Value | Source Finding |
|----------|----------|-------|----------------|
| workload::CC_VERIFY_TERMINATION_V1 | supersedes | workload::CC_VERIFY_TERMINATION_V0 | S4 design_decisions #4 |
| workload::CC_VERIFY_TERMINATION_V1 | description | Protocol gate for Collatz Conjecture — SUCCESS means conjecture holds for this input set | S6 pps_artifacts_requiring_action #1 |

---

## 10. Structure Stores

<!-- register:structure_stores optional -->
| Store Name | Storage Type (CS_APPENDONLY_JSONL_V0, CS_MUTABLE_JSON_V0, CS_REGISTRY_V0) | Proposed Path | Used By | Source Finding |
|------------|------|------|------|----------------|

---

## 11. Artifact Summary

<!-- register:artifact_summary -->
| Action (REPLACE, EXTEND, NEW) | Subdomain | Count | Artifacts |
|-------------------------------|-----------|-------|-----------|
| NEW | collatz | 1 | workload::CC_VERIFY_TERMINATION_V1 |
| REPLACE | collatz | 1 | workload::CC_VERIFY_TERMINATION_V0 |

---

## 12. Declared Reach

<!-- register:declared_reach optional -->
| Act | Consults | Source Finding |
|-----|----------|----------------|

---

## 13. Unchanged Registers

No transform, vocabulary, policy, entrance or generator is touched. The workflow is re-pointed, not restated.

<!-- register:implementation_bindings optional -->
| CT Code | Module | Callable | Operation | Kind (atom, molecule) | Purity (ct_pure, ct_impure) | Refusal (raises, returns, never) | Source Finding |
|---|---|---|---|---|---|---|---|

<!-- register:vocabulary_extensions optional -->
| Vocabulary Code | Extends | Group | Casing | Value | Meaning | Source Finding |
|---|---|---|---|---|---|---|

<!-- register:runtime_policies optional -->
| RB Code | Capability | Key | Value | Source Finding |
|---|---|---|---|---|

<!-- register:transport_bindings optional -->
| Artifact | Direction (INGRESS, EGRESS) | Operation | Handler Kind (WF_INVOCATION, SNAPSHOT_READ) | Handler Target | Field | Bound To | Source Finding |
|---|---|---|---|---|---|---|---|

<!-- register:generation_provenance optional -->
| Artifact | Generator | Generator Sources | Source Finding |
|---|---|---|---|

---

## 14. Refusal Discharge

The business declared one refusal. It is made in the new gate, which the workflow runs at a place
this design re-points and does not restate, so it is deferred to that step rather than discharged at
a place of the design's own topology.

<!-- register:refusal_discharge optional -->
| Operation | Refused When | Act | Step | Outcome | Source Finding |
|-----------|--------------|-----|------|---------|----------------|

<!-- register:refusal_deferrals optional -->
| Operation | Refused When | Deferred To | Until | Source Finding |
|---|---|---|---|---|
| Gating the conjecture | A sequence does not end at 1 | workload::CC_VERIFY_TERMINATION_V1, step require_every_sequence_terminated, which ends the gate VIOLATION; the workflow routes it to EXIT_CONJECTURE_VIOLATED | Armed by this change | S0 operation_refusals #1 |

<!-- register:refusal_governance_discharge optional -->
| Operation | Refused When | Phase | Governing Rule | Source Finding |
|---|---|---|---|---|

---

## 15. Molecules, Tests and Withdrawals

No molecule or test is touched, and nothing is withdrawn. The workload declares no test data.

<!-- register:molecule_steps optional -->
| CT Code | Step | Kind (atom, molecule, loop) | Target | Over | Iterator | Emits | Source Finding |
|---|---|---|---|---|---|---|---|

<!-- register:molecule_step_bindings optional -->
| CT Code | Step | Role (INPUT, CARRY, UPDATE) | Field | Bound To | Source Finding |
|---|---|---|---|---|---|

<!-- register:test_cases optional -->
| CT Code | Case | Expected Outcome (SUCCESS, VIOLATION) | Source Finding |
|---|---|---|---|

<!-- register:test_case_values optional -->
| CT Code | Case | Role (INPUT, EXPECTED, ASSERT, RECORDED) | Field | Value | Source Finding |
|---|---|---|---|---|---|

<!-- register:withdrawn_facts optional -->
| Artifact | Fact | Reason | Source Finding |
|---|---|---|---|

