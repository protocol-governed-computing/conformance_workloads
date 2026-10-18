# Design Intent — workload, baseline

## Machine

```yaml
document:
  phase: p7
  domain: workload
  subdomain:
  - collatz
  - workload
  cr: baseline
  rule_set: transformation.schemas.REGISTER_SCHEMA_P7_V0
registers:
  design_resolution: []
  existing_inventory: []
  new_artifacts:
  - family: AC
    code: workload::AC_REFERENCE_ACTOR_V0
    summary: Reference workload actor
    owner_subdomain: workload
    status: NEW
  - family: CC
    code: workload::CC_COMPUTE_SEQUENCES_V0
    summary: Compute Collatz sequences for all input numbers
    owner_subdomain: workload
    status: NEW
  - family: CC
    code: workload::CC_STORE_RESULTS_V0
    summary: Store Collatz results to mutable JSON storage
    owner_subdomain: workload
    status: NEW
  - family: CC
    code: workload::CC_VERIFY_TERMINATION_V0
    summary: Verify all Collatz sequences terminate at 1
    owner_subdomain: workload
    status: NEW
  - family: CT
    code: workload::CT_PURE_COLLATZ_STEP_V0
    summary: Compute full Collatz sequence for each input number
    owner_subdomain: workload
    status: NEW
  - family: CT
    code: workload::CT_PURE_TERMINATION_CHECK_V0
    summary: Verify all Collatz sequences terminate at 1
    owner_subdomain: workload
    status: NEW
  - family: CC
    code: workload::CC_VERIFY_TERMINATION_V1
    summary: Verify all Collatz sequences terminate at 1
    owner_subdomain: collatz
    status: NEW
  - family: CC
    code: workload::CC_VERIFY_TERMINATION_V2
    summary: Verify all Collatz sequences terminate at 1
    owner_subdomain: collatz
    status: NEW
  - family: EV
    code: workload::EV_CONJECTURE_EVALUATED_V0
    summary: Conjecture Evaluated
    owner_subdomain: workload
    status: NEW
  - family: IN
    code: workload::IN_COLLATZ_INPUT_VALIDATED_V0
    summary: Validate Collatz input — non-empty list of positive integers
    owner_subdomain: workload
    status: NEW
  - family: STRUCTURE
    code: workload::STRUCTURE_COLLATZ_STORAGE_V0
    summary: Collatz reference-workload storage topology
    owner_subdomain: workload
    status: NEW
  - family: RB
    code: workload::RB_COLLATZ_V0
    summary: Runtime binding for Collatz result storage
    owner_subdomain: workload
    status: NEW
  - family: WF
    code: workload::WF_COLLATZ_CONJECTURE_V0
    summary: Compute, verify, and persist Collatz sequences — domain-blind PGC execution
    owner_subdomain: workload
    status: NEW
  rb_declarations:
  - rb_code: workload::RB_COLLATZ_V0
    binds_wf: workload::WF_COLLATZ_CONJECTURE_V0
    cs_bindings:
    - capability_side_effects::CS_MUTABLE_JSON_V0
    storage_structure: workload::STRUCTURE_COLLATZ_STORAGE_V0
  execution_topology:
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: IN_COLLATZ_INPUT_VALIDATED_V0
    node_type: IN
    routing:
      ACK: CC_COMPUTE_SEQUENCES_V0
      NACK: EXIT_REJECTED
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: CC_COMPUTE_SEQUENCES_V0
    node_type: CC
    routing:
      SUCCESS: CC_VERIFY_TERMINATION_V0
      VIOLATION: EXIT_ERROR
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: CC_VERIFY_TERMINATION_V0
    node_type: CC
    routing:
      SUCCESS: CC_STORE_RESULTS_V0
      VIOLATION: EXIT_CONJECTURE_VIOLATED
    runs: CC_VERIFY_TERMINATION_V2
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: CC_STORE_RESULTS_V0
    node_type: CC
    routing:
      SUCCESS: EXIT_CONJECTURE_PROVEN
      VIOLATION: EXIT_ERROR
      BACKEND_ERROR: EXIT_ERROR
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: EXIT_CONJECTURE_PROVEN
    node_type: EXIT
    routing: null
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: EXIT_CONJECTURE_VIOLATED
    node_type: EXIT
    routing: null
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: EXIT_REJECTED
    node_type: EXIT
    routing: null
  - workflow: workload::WF_COLLATZ_CONJECTURE_V0
    node: EXIT_ERROR
    node_type: EXIT
    routing: null
  cc_composition:
  - cc_code: workload::CC_COMPUTE_SEQUENCES_V0
    step: '1'
    step_name: compute_sequences
    capability: workload::CT_PURE_COLLATZ_STEP_V0
    kind: CT
    operation: null
    store: null
    consumes:
    - numbers
    produces:
    - sequences
    routing:
      SUCCESS: exit
      VIOLATION: exit
    interpreted_by: null
    semantic_status: SUCCESS
    interface:
      in:
        numbers: numbers
      out:
        sequences: sequences
  - cc_code: workload::CC_STORE_RESULTS_V0
    step: '1'
    step_name: store_results
    capability: capability_side_effects::CS_MUTABLE_JSON_V0
    kind: CS
    operation: WRITE
    store: COLLATZ_RESULTS
    consumes:
    - key
    - value
    produces:
    - result_status
    routing:
      SUCCESS: exit
      VIOLATION: exit
      BACKEND_ERROR: exit
    interpreted_by: null
    semantic_status: SUCCESS
    interface:
      in:
        key: key
        value: value
      out:
        result_status: result_status
  - cc_code: workload::CC_VERIFY_TERMINATION_V0
    step: '1'
    step_name: check_termination
    capability: workload::CT_PURE_TERMINATION_CHECK_V0
    kind: CT
    operation: null
    store: null
    consumes:
    - sequences
    produces:
    - all_terminate
    - non_terminating
    routing:
      SUCCESS: evaluate_conjecture
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
    step: '1'
    step_name: check_termination
    capability: workload::CT_PURE_TERMINATION_CHECK_V0
    kind: CT
    operation: null
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
    operation: null
    store: null
    consumes:
    - value
    - allowed_set
    produces:
    - conjecture_holds
    routing:
      SUCCESS: continue
      VIOLATION: exit
    interpreted_by: null
    semantic_status: SUCCESS
    interface:
      in:
        value: value
        allowed_set: allowed_set
      out:
        conjecture_holds: conjecture_holds
  - cc_code: workload::CC_VERIFY_TERMINATION_V2
    step: '1'
    step_name: check_termination
    capability: workload::CT_PURE_TERMINATION_CHECK_V0
    kind: CT
    operation: null
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
    operation: null
    store: null
    consumes:
    - value
    produces:
    - conjecture_holds
    routing:
      SUCCESS: continue
      VIOLATION: exit
    interpreted_by: null
    semantic_status: SUCCESS
    interface:
      in:
        value: value
      out:
        conjecture_holds: conjecture_holds
  step_bindings:
  - owner: workload::CC_COMPUTE_SEQUENCES_V0
    step: compute_sequences
    direction: INPUT
    field: numbers
    bound_to: inputs.numbers
  - owner: workload::CC_COMPUTE_SEQUENCES_V0
    step: compute_sequences
    direction: OUTPUT
    field: sequences
    bound_to: capability_result.sequences
  - owner: workload::CC_STORE_RESULTS_V0
    step: store_results
    direction: INPUT
    field: key
    bound_to:
      literal: collatz_results
  - owner: workload::CC_STORE_RESULTS_V0
    step: store_results
    direction: INPUT
    field: value
    bound_to:
      literal:
        sequences: $.inputs.sequences
        all_terminate: $.inputs.all_terminate
        non_terminating: $.inputs.non_terminating
  - owner: workload::CC_STORE_RESULTS_V0
    step: store_results
    direction: OUTPUT
    field: result_status
    bound_to: result_status
  - owner: workload::CC_VERIFY_TERMINATION_V0
    step: check_termination
    direction: INPUT
    field: sequences
    bound_to: inputs.sequences
  - owner: workload::CC_VERIFY_TERMINATION_V0
    step: check_termination
    direction: OUTPUT
    field: all_terminate
    bound_to: capability_result.all_terminate
  - owner: workload::CC_VERIFY_TERMINATION_V0
    step: check_termination
    direction: OUTPUT
    field: non_terminating
    bound_to: capability_result.non_terminating
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: check_termination
    direction: INPUT
    field: sequences
    bound_to: inputs.sequences
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: check_termination
    direction: OUTPUT
    field: all_terminate
    bound_to: capability_result.all_terminate
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: check_termination
    direction: OUTPUT
    field: non_terminating
    bound_to: capability_result.non_terminating
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: require_every_sequence_terminated
    direction: INPUT
    field: value
    bound_to: results.check_termination.all_terminate
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: require_every_sequence_terminated
    direction: INPUT
    field: allowed_set
    bound_to:
      literal:
      - true
  - owner: workload::CC_VERIFY_TERMINATION_V1
    step: require_every_sequence_terminated
    direction: OUTPUT
    field: conjecture_holds
    bound_to: capability_result.is_member
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: check_termination
    direction: INPUT
    field: sequences
    bound_to: inputs.sequences
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: check_termination
    direction: OUTPUT
    field: all_terminate
    bound_to: capability_result.all_terminate
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: check_termination
    direction: OUTPUT
    field: non_terminating
    bound_to: capability_result.non_terminating
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: require_every_sequence_terminated
    direction: INPUT
    field: value
    bound_to: results.check_termination.all_terminate
  - owner: workload::CC_VERIFY_TERMINATION_V2
    step: require_every_sequence_terminated
    direction: OUTPUT
    field: conjecture_holds
    bound_to: capability_result.held
  - owner: workload::WF_COLLATZ_CONJECTURE_V0
    step: CC_COMPUTE_SEQUENCES_V0
    direction: INPUT
    field: numbers
    bound_to: payload.numbers
  - owner: workload::WF_COLLATZ_CONJECTURE_V0
    step: CC_VERIFY_TERMINATION_V0
    direction: INPUT
    field: sequences
    bound_to: results.CC_COMPUTE_SEQUENCES_V0.sequences
  - owner: workload::WF_COLLATZ_CONJECTURE_V0
    step: CC_STORE_RESULTS_V0
    direction: INPUT
    field: sequences
    bound_to: results.CC_COMPUTE_SEQUENCES_V0.sequences
  - owner: workload::WF_COLLATZ_CONJECTURE_V0
    step: CC_STORE_RESULTS_V0
    direction: INPUT
    field: all_terminate
    bound_to: results.CC_VERIFY_TERMINATION_V0.all_terminate
  - owner: workload::WF_COLLATZ_CONJECTURE_V0
    step: CC_STORE_RESULTS_V0
    direction: INPUT
    field: non_terminating
    bound_to: results.CC_VERIFY_TERMINATION_V0.non_terminating
  interface_fields:
  - artifact: workload::AC_REFERENCE_ACTOR_V0
    direction: ATTRIBUTE
    field: role
    type: string
    required: 'YES'
    default: null
    meaning: role
  - artifact: workload::CC_COMPUTE_SEQUENCES_V0
    direction: INPUT
    field: numbers
    type: array
    required: 'YES'
    default: null
    meaning: numbers
  - artifact: workload::CC_COMPUTE_SEQUENCES_V0
    direction: OUTPUT
    field: sequences
    type: object
    required: 'NO'
    default: null
    meaning: sequences
  - artifact: workload::CC_STORE_RESULTS_V0
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: null
    meaning: sequences
  - artifact: workload::CC_STORE_RESULTS_V0
    direction: INPUT
    field: all_terminate
    type: boolean
    required: 'YES'
    default: null
    meaning: all terminate
  - artifact: workload::CC_STORE_RESULTS_V0
    direction: INPUT
    field: non_terminating
    type: array
    required: 'NO'
    default: null
    meaning: non terminating
  - artifact: workload::CC_STORE_RESULTS_V0
    direction: OUTPUT
    field: result_status
    type: string
    required: 'NO'
    default: null
    meaning: result status
  - artifact: workload::CC_VERIFY_TERMINATION_V0
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: null
    meaning: sequences
  - artifact: workload::CC_VERIFY_TERMINATION_V0
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'NO'
    default: null
    meaning: all terminate
  - artifact: workload::CC_VERIFY_TERMINATION_V0
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'NO'
    default: null
    meaning: non terminating
  - artifact: workload::CT_PURE_COLLATZ_STEP_V0
    direction: INPUT
    field: numbers
    type: array
    required: 'YES'
    default: null
    meaning: List of positive integers for which to compute sequences
  - artifact: workload::CT_PURE_COLLATZ_STEP_V0
    direction: OUTPUT
    field: sequences
    type: object
    required: 'YES'
    default: null
    meaning: Mapping from str(n) to full Collatz sequence as list of integers
  - artifact: workload::CT_PURE_TERMINATION_CHECK_V0
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: null
    meaning: Mapping from str(n) to Collatz sequence list
  - artifact: workload::CT_PURE_TERMINATION_CHECK_V0
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'YES'
    default: null
    meaning: True if every sequence ends at 1
  - artifact: workload::CT_PURE_TERMINATION_CHECK_V0
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'YES'
    default: null
    meaning: List of seeds whose sequences did not end at 1
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: null
    meaning: sequences
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'NO'
    default: null
    meaning: all terminate
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'NO'
    default: null
    meaning: non terminating
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    direction: OUTPUT
    field: conjecture_holds
    type: boolean
    required: 'NO'
    default: null
    meaning: conjecture holds
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: INPUT
    field: sequences
    type: object
    required: 'YES'
    default: null
    meaning: sequences
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'NO'
    default: null
    meaning: all terminate
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'NO'
    default: null
    meaning: non terminating
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    direction: OUTPUT
    field: conjecture_holds
    type: boolean
    required: 'NO'
    default: null
    meaning: conjecture holds
  - artifact: workload::EV_CONJECTURE_EVALUATED_V0
    direction: OUTPUT
    field: all_terminate
    type: boolean
    required: 'YES'
    default: null
    meaning: all terminate
  - artifact: workload::EV_CONJECTURE_EVALUATED_V0
    direction: OUTPUT
    field: non_terminating
    type: array
    required: 'YES'
    default: null
    meaning: non terminating
  - artifact: workload::EV_CONJECTURE_EVALUATED_V0
    direction: OUTPUT
    field: timestamp
    type: string
    required: 'YES'
    default: null
    meaning: When the moment occurred
    format: date-time
  - artifact: workload::IN_COLLATZ_INPUT_VALIDATED_V0
    direction: INPUT
    field: numbers
    type: array
    required: 'YES'
    default: null
    meaning: List of positive integers
  implementation_bindings:
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    callable: execute
    operation: PURE_COLLATZ_STEP
    kind: atom
    purity: ct_pure
    refusal: never
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    callable: execute
    operation: PURE_TERMINATION_CHECK
    kind: atom
    purity: ct_pure
    refusal: returns
  vocabulary_extensions: []
  runtime_policies:
  - rb_code: workload::RB_COLLATZ_V0
    capability: capability_side_effects::CS_MUTABLE_JSON_V0
    key: null
    value: null
  artifact_properties:
  - artifact: workload::AC_REFERENCE_ACTOR_V0
    property: description
    value: System actor context under which the Collatz reference workload executes.
  - artifact: workload::AC_REFERENCE_ACTOR_V0
    property: type
    value: system
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    property: supersedes
    value:
    - workload::CC_VERIFY_TERMINATION_V0
  - artifact: workload::CC_VERIFY_TERMINATION_V2
    property: supersedes
    value:
    - workload::CC_VERIFY_TERMINATION_V1
  - artifact: workload::STRUCTURE_COLLATZ_STORAGE_V0
    property: layer
    value: DOMAINS
  - artifact: workload::STRUCTURE_COLLATZ_STORAGE_V0
    property: description
    value: Maps the COLLATZ_RESULTS entity store to a path under the instance data root.
  - artifact: workload::STRUCTURE_COLLATZ_STORAGE_V0
    property: storage_roots
    value:
      base_path: '{{module_data_root}}'
      description: Root path for Collatz storage (the runtime instance data root, resolved at runtime)
  - artifact: workload::STRUCTURE_COLLATZ_STORAGE_V0
    property: resolution
    value:
      algorithm: base_path / entity_stores[entity_type].path
      example: '{{module_data_root}}/workload/collatz/collatz_results.json'
  - artifact: workload::WF_COLLATZ_CONJECTURE_V0
    property: actor_context
    value: workload::AC_REFERENCE_ACTOR_V0
  - artifact: workload::WF_COLLATZ_CONJECTURE_V0
    property: emit.EXIT_CONJECTURE_PROVEN
    value:
    - workload::EV_CONJECTURE_EVALUATED_V0
  - artifact: workload::WF_COLLATZ_CONJECTURE_V0
    property: emit.EXIT_CONJECTURE_VIOLATED
    value:
    - workload::EV_CONJECTURE_EVALUATED_V0
  structure_stores:
  - store_name: COLLATZ_RESULTS
    storage_type: CS_MUTABLE_JSON_V0
    proposed_path: workload/collatz/collatz_results.json
    used_by: workload::CC_STORE_RESULTS_V0
    structure: workload::STRUCTURE_COLLATZ_STORAGE_V0
  transport_bindings: []
  declared_reach: []
  molecule_steps: []
  molecule_step_bindings: []
  test_cases:
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    case: one_is_its_own_sequence
    expected_outcome: SUCCESS
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    case: sequences_for_several_numbers
    expected_outcome: SUCCESS
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: every_sequence_terminates
    expected_outcome: SUCCESS
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: names_a_sequence_that_does_not_end_at_one
    expected_outcome: SUCCESS
  test_case_values:
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    case: one_is_its_own_sequence
    role: INPUT
    field: numbers
    value:
    - 1
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    case: one_is_its_own_sequence
    role: EXPECTED
    field: sequences
    value:
      '1':
      - 1
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    case: sequences_for_several_numbers
    role: INPUT
    field: numbers
    value:
    - 6
    - 7
  - ct_code: workload::CT_PURE_COLLATZ_STEP_V0
    case: sequences_for_several_numbers
    role: EXPECTED
    field: sequences
    value:
      '6':
      - 6
      - 3
      - 10
      - 5
      - 16
      - 8
      - 4
      - 2
      - 1
      '7':
      - 7
      - 22
      - 11
      - 34
      - 17
      - 52
      - 26
      - 13
      - 40
      - 20
      - 10
      - 5
      - 16
      - 8
      - 4
      - 2
      - 1
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: every_sequence_terminates
    role: INPUT
    field: sequences
    value:
      '6':
      - 6
      - 3
      - 10
      - 5
      - 16
      - 8
      - 4
      - 2
      - 1
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: every_sequence_terminates
    role: EXPECTED
    field: all_terminate
    value: true
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: every_sequence_terminates
    role: EXPECTED
    field: non_terminating
    value: []
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: names_a_sequence_that_does_not_end_at_one
    role: INPUT
    field: sequences
    value:
      '6':
      - 6
      - 3
      - 10
      - 5
      - 16
      - 8
      - 4
      - 2
      - 1
      '7':
      - 7
      - 22
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: names_a_sequence_that_does_not_end_at_one
    role: EXPECTED
    field: all_terminate
    value: false
  - ct_code: workload::CT_PURE_TERMINATION_CHECK_V0
    case: names_a_sequence_that_does_not_end_at_one
    role: EXPECTED
    field: non_terminating
    value:
    - '7'
  generation_provenance: []
  artifact_summary:
  - action: NEW
    subdomain: collatz
    count: '2'
    artifacts: workload::CC_VERIFY_TERMINATION_V1, workload::CC_VERIFY_TERMINATION_V2
  - action: NEW
    subdomain: workload
    count: '11'
    artifacts: workload::AC_REFERENCE_ACTOR_V0, workload::CC_COMPUTE_SEQUENCES_V0, workload::CC_STORE_RESULTS_V0,
      workload::CC_VERIFY_TERMINATION_V0, workload::CT_PURE_COLLATZ_STEP_V0, workload::CT_PURE_TERMINATION_CHECK_V0,
      workload::EV_CONJECTURE_EVALUATED_V0, workload::IN_COLLATZ_INPUT_VALIDATED_V0, workload::STRUCTURE_COLLATZ_STORAGE_V0,
      workload::RB_COLLATZ_V0, workload::WF_COLLATZ_CONJECTURE_V0
  refusal_discharge: []
  refusal_deferrals: []
  refusal_governance_discharge: []
  withdrawn_facts: null
```

The design of record of `workload`: every artifact its registry holds, stated in the design language.
Written by `python -m transformation.record` from the registry. Construction of this design and its
mandate reproduces the registry, and `construction_acceptance` asks whether it does. A change to
`workload` is a dossier designed against the composition.
