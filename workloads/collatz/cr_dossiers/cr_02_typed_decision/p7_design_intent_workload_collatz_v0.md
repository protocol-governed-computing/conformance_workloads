# Stage 7 — Design Intent: workload / collatz

## Machine

```yaml
document:
  phase: p7
  domain: workload
  subdomain: collatz
  cr: cr_02_typed_decision
  rule_set: transformation.schemas.REGISTER_SCHEMA_P7_V0
registers:
  design_resolution:
  - decision: A capability decides on what it declares
    business_fact: A capability is given only values of the types it declares
    resolution: workload::CC_VERIFY_TERMINATION_V2 runs workload::CT_PURE_TERMINATION_CHECK_V0 unchanged in check_termination, then capability_transforms::CT_PURE_REQUIRE_TRUE_V0 in require_every_sequence_terminated, with value all_terminate; the second refuses when a sequence did not end at 1
    source_finding: {phase: p4, register: design_decisions, row: 1}
  - decision: The gate routes as today
    business_fact: Every run decides as today
    resolution: Each step routes SUCCESS to continue and VIOLATION to exit; the inputs, outputs and allowed outcomes of workload::CC_VERIFY_TERMINATION_V2 are those of workload::CC_VERIFY_TERMINATION_V1, and conjecture_holds is mapped from held
    source_finding: {phase: p4, register: design_decisions, row: 2}
  - decision: The workflow runs the new gate
    business_fact: It decides as today
    resolution: 'workload::WF_COLLATZ_CONJECTURE_V0 is re-pointed: the place labelled CC_VERIFY_TERMINATION_V0 runs workload::CC_VERIFY_TERMINATION_V2; its label, routes and the store''s bindings to it are unchanged'
    source_finding: {phase: p4, register: design_decisions, row: 3}
  - decision: A new version
    business_fact: A change of meaning is a new identity
    resolution: workload::CC_VERIFY_TERMINATION_V2 supersedes workload::CC_VERIFY_TERMINATION_V1
    source_finding: {phase: p4, register: design_decisions, row: 4}
  existing_inventory:
  - fqdn: workload::CC_VERIFY_TERMINATION_V1
    action: REPLACE
    summary: ''
    reason: Gives the set-membership check a boolean where it declares a string. Stood down by its next version.
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 1}
  - fqdn: workload::WF_COLLATZ_CONJECTURE_V0
    action: REPOINT
    summary: ''
    reason: Runs the gate being replaced; re-pointed to its next version.
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 2}
  - fqdn: workload::CT_PURE_TERMINATION_CHECK_V0
    action: REUSE
    summary: ''
    reason: Reports whether every sequence ended at 1, and which did not, unchanged.
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 3}
  - fqdn: capability_transforms::CT_PURE_REQUIRE_TRUE_V0
    action: REUSE
    summary: ''
    reason: Refuses unless a boolean is true, unchanged.
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 4}
  new_artifacts:
  - capability: Gate the conjecture
    family: CC
    code: workload::CC_VERIFY_TERMINATION_V2
    summary: Verify all Collatz sequences terminate at 1
    owner_subdomain: collatz
    status: NEW
    source_finding: {phase: p6, register: governance_outcome, row: 1}
  rb_declarations: []
  execution_topology: []
  cc_composition:
  - cc_code: workload::CC_VERIFY_TERMINATION_V2
    step: '1'
    step_name: check_termination
    capability: workload::CT_PURE_TERMINATION_CHECK_V0
    kind: CT
    operation: PURE_TERMINATION_CHECK
    store: null
    consumes:
    - sequences
    produces:
    - all_terminate
    - non_terminating
    routing:
      SUCCESS: continue
      VIOLATION: exit
    interpreted_by: null
    semantic_status: SUCCESS
    interface:
      in:
        sequences: sequences
      out:
        all_terminate: all_terminate
        non_terminating: non_terminating
  - cc_code: workload::CC_VERIFY_TERMINATION_V2
    step: '2'
    step_name: require_every_sequence_terminated
    capability: capability_transforms::CT_PURE_REQUIRE_TRUE_V0
    kind: CT
    operation: REQUIRE_TRUE
    store: null
    consumes:
    - all_terminate
    produces:
    - conjecture_holds
    routing:
      SUCCESS: continue
      VIOLATION: exit
    interpreted_by: null
    semantic_status: SUCCESS
    interface:
      in:
        value: all_terminate
      out:
        held: conjecture_holds
  step_bindings:
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: check_termination
    direction: INPUT
    field: sequences
    bound_to: inputs.sequences
    source_finding: {phase: p7, register: cc_composition, key: check_termination}
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: check_termination
    direction: OUTPUT
    field: all_terminate
    bound_to: capability_result.all_terminate
    source_finding: {phase: p7, register: cc_composition, key: check_termination}
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: check_termination
    direction: OUTPUT
    field: non_terminating
    bound_to: capability_result.non_terminating
    source_finding: {phase: p7, register: cc_composition, key: check_termination}
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: require_every_sequence_terminated
    direction: INPUT
    field: value
    bound_to: results.check_termination.all_terminate
    source_finding: {phase: p7, register: cc_composition, key: require_every_sequence_terminated}
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: require_every_sequence_terminated
    direction: OUTPUT
    field: conjecture_holds
    bound_to: capability_result.held
    source_finding: {phase: p7, register: cc_composition, key: require_every_sequence_terminated}
  interface_fields:
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: ''
    meaning: The sequences computed for a run
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'NO'
    default: ''
    meaning: Whether every sequence ends at 1
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'NO'
    default: ''
    meaning: The numbers whose sequences did not end at 1
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: OUTPUT
    field: conjecture_holds
    type: boolean
    required: 'NO'
    default: ''
    meaning: True when every sequence ended at 1; the gate refuses otherwise
  artifact_properties:
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    property: supersedes
    value:
    - workload::CC_VERIFY_TERMINATION_V1
    source_finding: {phase: p4, register: design_decisions, row: 4}
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    property: description
    value: Protocol gate for Collatz Conjecture — SUCCESS means conjecture holds for this input set
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 1}
  structure_stores: null
  artifact_summary:
  - action: NEW
    subdomain: collatz
    count: '1'
    artifacts: workload::CC_VERIFY_TERMINATION_V2
  - action: REPLACE
    subdomain: collatz
    count: '1'
    artifacts: workload::CC_VERIFY_TERMINATION_V1
  declared_reach: null
  implementation_bindings: null
  vocabulary_extensions: null
  runtime_policies: null
  transport_bindings: null
  generation_provenance: null
  refusal_discharge: null
  refusal_deferrals:
  - operation: Gating the conjecture
    refused_when: A sequence does not end at 1
    deferred_to: workload::CC_VERIFY_TERMINATION_V2, step require_every_sequence_terminated, which ends the gate VIOLATION; the workflow routes it to EXIT_CONJECTURE_VIOLATED
    until: Carried by this change
    source_finding: {phase: p0, register: operation_refusals, row: 1}
  refusal_governance_discharge: null
  molecule_steps: null
  molecule_step_bindings: null
  test_cases: null
  test_case_values: null
  withdrawn_facts: null
```

Read against the pinned baseline
`1e3d4d99a6827c161374fe5c4bda903437d8393f9536e0e116cca128d44ff20a`.

The termination gate is replaced by a version that gives each capability only values of the types
it declares. After the unchanged termination check reports, the platform's capability that refuses
unless a boolean is true decides on all_terminate. Both steps route as today. The workflow is
re-pointed to run the new gate, and nothing else about it changes.

---

## 1. Design Decisions Resolution

---

## 2. Artifact Inventory — Existing Artifacts

---

## 3. Artifact Family Mapping — New Artifacts

---

## 4. Runtime Binding (RB) Declarations

---

## 5. Execution Topology

---

## 6. Capability Composition

---

## 7. Step Bindings

---

## 8. Interface Fields

---

## 9. Artifact Properties

---

## 10. Structure Stores

---

## 11. Artifact Summary

---

## 12. Declared Reach

---

## 13. Unchanged Registers

No transform, vocabulary, policy, entrance or generator is touched. The workflow is re-pointed, not restated.

---

## 14. Refusal Discharge

The business declared one refusal. It is made in the new gate, which the workflow runs at a place
this design re-points and does not restate, so it is deferred to that step rather than discharged at
a place of the design's own topology.

---

## 15. Molecules, Tests and Withdrawals

No molecule or test is touched, and nothing is withdrawn. The workload declares no test data.
