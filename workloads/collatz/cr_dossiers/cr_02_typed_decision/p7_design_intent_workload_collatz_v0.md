# Stage 7 — Design Intent: workload / collatz

**Stage:** 7 — Design Intent
**CR:** cr_02_typed_decision
**Status:** DRAFT
**Feeds:** Stage 8 — Authoring Mandate

Read against the pinned baseline
`1e3d4d99a6827c161374fe5c4bda903437d8393f9536e0e116cca128d44ff20a`.

The termination gate is replaced by a version that gives each capability only values of the types
it declares. After the unchanged termination check reports, the platform's capability that refuses
unless a boolean is true decides on all_terminate. Both steps route as today. The workflow is
re-pointed to run the new gate, and nothing else about it changes.

---

## 1. Design Decisions Resolution

<!-- register:design_resolution optional -->
| Decision | Business Fact | Resolution | Source Finding |
|----------|---------------|------------|----------------|
| A capability decides on what it declares | A capability is given only values of the types it declares | workload::CC_VERIFY_TERMINATION_V2 runs workload::CT_PURE_TERMINATION_CHECK_V0 unchanged in check_termination, then capability_transforms::CT_PURE_REQUIRE_TRUE_V0 in require_every_sequence_terminated, with value all_terminate; the second refuses when a sequence did not end at 1 | S4 design_decisions #1 |
| The gate routes as today | Every run decides as today | Each step routes SUCCESS to continue and VIOLATION to exit; the inputs, outputs and allowed outcomes of workload::CC_VERIFY_TERMINATION_V2 are those of workload::CC_VERIFY_TERMINATION_V1, and conjecture_holds is mapped from held | S4 design_decisions #2 |
| The workflow runs the new gate | It decides as today | workload::WF_COLLATZ_CONJECTURE_V0 is re-pointed: the place labelled CC_VERIFY_TERMINATION_V0 runs workload::CC_VERIFY_TERMINATION_V2; its label, routes and the store's bindings to it are unchanged | S4 design_decisions #3 |
| A new version | A change of meaning is a new identity | workload::CC_VERIFY_TERMINATION_V2 supersedes workload::CC_VERIFY_TERMINATION_V1 | S4 design_decisions #4 |

---

## 2. Artifact Inventory — Existing Artifacts

<!-- register:existing_inventory -->
| FQDN | Action (REPLACE, REUSE, EXTEND, REPOINT, REVIEW) | Summary | Reason | Source Finding |
|------|------------------------------------------|---------|--------|----------------|
| workload::CC_VERIFY_TERMINATION_V1 | REPLACE |  | Gives the set-membership check a boolean where it declares a string. Stood down by its next version. | S6 pps_artifacts_requiring_action #1 |
| workload::WF_COLLATZ_CONJECTURE_V0 | REPOINT |  | Runs the gate being replaced; re-pointed to its next version. | S6 pps_artifacts_requiring_action #2 |
| workload::CT_PURE_TERMINATION_CHECK_V0 | REUSE |  | Reports whether every sequence ended at 1, and which did not, unchanged. | S6 pps_artifacts_requiring_action #3 |
| capability_transforms::CT_PURE_REQUIRE_TRUE_V0 | REUSE |  | Refuses unless a boolean is true, unchanged. | S6 pps_artifacts_requiring_action #4 |

---

## 3. Artifact Family Mapping — New Artifacts

<!-- register:new_artifacts optional business_language=capability -->
| Capability | Family (AC, IN, WF, RB, CC, CT, EV, VOCAB, STRUCTURE, TI, TE) | Code | Summary | Owner Subdomain | Status | Source Finding |
|------------|------------------------------------------------|------|---------|-----------------|--------|----------------|
| Gate the conjecture | CC | workload::CC_VERIFY_TERMINATION_V2 | Verify all Collatz sequences terminate at 1 | collatz | NEW | S6 governance_outcome #1 |

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
| workload::CC_VERIFY_TERMINATION_V2 | 1 | check_termination | workload::CT_PURE_TERMINATION_CHECK_V0 | CT | PURE_TERMINATION_CHECK | — | sequences | all_terminate, non_terminating | SUCCESS -> continue; VIOLATION -> exit | — | SUCCESS | in: sequences=sequences; out: all_terminate=all_terminate, non_terminating=non_terminating |
| workload::CC_VERIFY_TERMINATION_V2 | 2 | require_every_sequence_terminated | capability_transforms::CT_PURE_REQUIRE_TRUE_V0 | CT | REQUIRE_TRUE | — | all_terminate | conjecture_holds | SUCCESS -> continue; VIOLATION -> exit | — | SUCCESS | in: value=all_terminate; out: held=conjecture_holds |

---

## 7. Step Bindings

<!-- register:step_bindings optional -->
| Owner | Step | Direction (INPUT, OUTPUT) | Field | Bound To | Source Finding |
|-------|------|--------------------------|-------|----------|----------------|
| workload::CC_VERIFY_TERMINATION_V2 | check_termination | INPUT | sequences | inputs.sequences | S7 cc_composition check_termination |
| workload::CC_VERIFY_TERMINATION_V2 | check_termination | OUTPUT | all_terminate | capability_result.all_terminate | S7 cc_composition check_termination |
| workload::CC_VERIFY_TERMINATION_V2 | check_termination | OUTPUT | non_terminating | capability_result.non_terminating | S7 cc_composition check_termination |
| workload::CC_VERIFY_TERMINATION_V2 | require_every_sequence_terminated | INPUT | value | results.check_termination.all_terminate | S7 cc_composition require_every_sequence_terminated |
| workload::CC_VERIFY_TERMINATION_V2 | require_every_sequence_terminated | OUTPUT | conjecture_holds | capability_result.held | S7 cc_composition require_every_sequence_terminated |

---

## 8. Interface Fields

<!-- register:interface_fields optional -->
| Artifact | Direction (INPUT, OUTPUT, ATTRIBUTE) | Field | Type | Required (YES, NO) | Default | Meaning |
|----------|--------------------------------------|-------|------|--------------------|---------|---------|
| workload::CC_VERIFY_TERMINATION_V2 | INPUT | sequences | object | YES |  | The sequences computed for a run |
| workload::CC_VERIFY_TERMINATION_V2 | OUTPUT | all_terminate | boolean | NO |  | Whether every sequence ends at 1 |
| workload::CC_VERIFY_TERMINATION_V2 | OUTPUT | non_terminating | array | NO |  | The numbers whose sequences did not end at 1 |
| workload::CC_VERIFY_TERMINATION_V2 | OUTPUT | conjecture_holds | boolean | NO |  | True when every sequence ended at 1; the gate refuses otherwise |

---

## 9. Artifact Properties

<!-- register:artifact_properties optional -->
| Artifact | Property | Value | Source Finding |
|----------|----------|-------|----------------|
| workload::CC_VERIFY_TERMINATION_V2 | supersedes | workload::CC_VERIFY_TERMINATION_V1 | S4 design_decisions #4 |
| workload::CC_VERIFY_TERMINATION_V2 | description | Protocol gate for Collatz Conjecture — SUCCESS means conjecture holds for this input set | S6 pps_artifacts_requiring_action #1 |

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
| NEW | collatz | 1 | workload::CC_VERIFY_TERMINATION_V2 |
| REPLACE | collatz | 1 | workload::CC_VERIFY_TERMINATION_V1 |

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
| Gating the conjecture | A sequence does not end at 1 | workload::CC_VERIFY_TERMINATION_V2, step require_every_sequence_terminated, which ends the gate VIOLATION; the workflow routes it to EXIT_CONJECTURE_VIOLATED | Carried by this change | S0 operation_refusals #1 |

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

