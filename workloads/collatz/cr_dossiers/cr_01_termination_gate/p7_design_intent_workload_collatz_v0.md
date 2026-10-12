# Stage 7 — Design Intent: workload / collatz

## Machine

```yaml
document:
  phase: p7
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P7_V0
registers:
  design_resolution:
  - decision: A capability decides
    business_fact: A decision is made by a capability
    resolution: workload::CC_VERIFY_TERMINATION_V1 runs workload::CT_PURE_TERMINATION_CHECK_V0 unchanged in check_termination, then capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 in require_every_sequence_terminated, with value all_terminate and allowed_set holding only true; the second refuses when a sequence did not end at 1
    source_finding: {phase: p4, register: design_decisions, row: 1}
  - decision: The gate routes on its steps
    business_fact: Routing is a lookup
    resolution: Each step routes SUCCESS to continue and VIOLATION to exit, and workload::CC_VERIFY_TERMINATION_V1 declares no evaluation block; its inputs and allowed outcomes are those of workload::CC_VERIFY_TERMINATION_V0, and it adds the output conjecture_holds, because every step declares what it reports
    source_finding: {phase: p4, register: design_decisions, row: 2}
  - decision: The workflow runs the new gate
    business_fact: It decides as today
    resolution: 'workload::WF_COLLATZ_CONJECTURE_V0 is re-pointed: the place labelled CC_VERIFY_TERMINATION_V0 runs workload::CC_VERIFY_TERMINATION_V1; its label, routes and the store''s bindings to it are unchanged'
    source_finding: {phase: p4, register: design_decisions, row: 3}
  - decision: A new version
    business_fact: A change of meaning is a new identity
    resolution: workload::CC_VERIFY_TERMINATION_V1 supersedes workload::CC_VERIFY_TERMINATION_V0
    source_finding: {phase: p4, register: design_decisions, row: 4}
  existing_inventory:
  - fqdn: workload::CC_VERIFY_TERMINATION_V0
    action: REPLACE
    summary: ''
    reason: Routes to a condition nothing runs. Stood down by its next version.
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
  - fqdn: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    action: REUSE
    summary: ''
    reason: Refuses a value not in a declared set, unchanged.
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 4}
  - fqdn: workload::CC_STORE_RESULTS_V0
    action: REUSE
    summary: ''
    reason: Records the sequences and the check's findings, unchanged.
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 5}
  new_artifacts:
  - capability: Gate the conjecture
    family: CC
    code: workload::CC_VERIFY_TERMINATION_V1
    summary: Verify all Collatz sequences terminate at 1
    owner_subdomain: collatz
    status: NEW
    source_finding: {phase: p6, register: governance_outcome, row: 1}
  rb_declarations: []
  execution_topology: []
  cc_composition:
  - cc_code: workload::CC_VERIFY_TERMINATION_V1
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
  - cc_code: workload::CC_VERIFY_TERMINATION_V1
    step: '2'
    step_name: require_every_sequence_terminated
    capability: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    kind: CT
    operation: VALIDATE_SET_MEMBERSHIP
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
        allowed_set: true only
      out:
        is_member: conjecture_holds
  step_bindings:
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: check_termination
    direction: INPUT
    field: sequences
    bound_to: inputs.sequences
    source_finding: {phase: p7, register: cc_composition, key: check_termination}
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: check_termination
    direction: OUTPUT
    field: all_terminate
    bound_to: capability_result.all_terminate
    source_finding: {phase: p7, register: cc_composition, key: check_termination}
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: check_termination
    direction: OUTPUT
    field: non_terminating
    bound_to: capability_result.non_terminating
    source_finding: {phase: p7, register: cc_composition, key: check_termination}
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: require_every_sequence_terminated
    direction: INPUT
    field: value
    bound_to: results.check_termination.all_terminate
    source_finding: {phase: p7, register: cc_composition, key: require_every_sequence_terminated}
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: require_every_sequence_terminated
    direction: INPUT
    field: allowed_set
    bound_to:
      literal:
      - true
    source_finding: {phase: p7, register: cc_composition, key: require_every_sequence_terminated}
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: require_every_sequence_terminated
    direction: OUTPUT
    field: conjecture_holds
    bound_to: capability_result.is_member
    source_finding: {phase: p7, register: cc_composition, key: require_every_sequence_terminated}
  interface_fields:
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: ''
    meaning: The sequences computed for a run
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'NO'
    default: ''
    meaning: Whether every sequence ends at 1
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'NO'
    default: ''
    meaning: The numbers whose sequences did not end at 1
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: OUTPUT
    field: conjecture_holds
    type: boolean
    required: 'NO'
    default: ''
    meaning: True when every sequence ended at 1; the gate refuses otherwise
  artifact_properties:
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    property: supersedes
    value:
    - workload::CC_VERIFY_TERMINATION_V0
    source_finding: {phase: p4, register: design_decisions, row: 4}
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    property: description
    value: Protocol gate for Collatz Conjecture — SUCCESS means conjecture holds for this input set
    source_finding: {phase: p6, register: pps_artifacts_requiring_action, row: 1}
  structure_stores: null
  artifact_summary:
  - action: NEW
    subdomain: collatz
    count: '1'
    artifacts: workload::CC_VERIFY_TERMINATION_V1
  - action: REPLACE
    subdomain: collatz
    count: '1'
    artifacts: workload::CC_VERIFY_TERMINATION_V0
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
    deferred_to: workload::CC_VERIFY_TERMINATION_V1, step require_every_sequence_terminated, which ends the gate VIOLATION; the workflow routes it to EXIT_CONJECTURE_VIOLATED
    until: Armed by this change
    source_finding: {phase: p0, register: operation_refusals, row: 1}
  refusal_governance_discharge: null
  molecule_steps: null
  molecule_step_bindings: null
  test_cases: null
  test_case_values: null
  withdrawn_facts: null
```

Read against the pinned baseline
`d42ef69df1b0b2f03d40c896076bb718ef333f383e58a1a29d54e68b229f921e`.

The termination gate is replaced by a version that decides: after the unchanged termination check
reports, the platform's set-membership check refuses unless every sequence ended at 1. Both steps
route on their own outcomes, and the gate declares no condition. The workflow is re-pointed to run
the new gate, and nothing else about it changes.

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
