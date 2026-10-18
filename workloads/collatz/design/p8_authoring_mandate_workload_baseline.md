# Authoring Mandate — workload, baseline

## Machine

```yaml
document:
  phase: p8
  domain: workload
  subdomain:
  - collatz
  - workload
  cr: baseline
  rule_set: transformation.schemas.REGISTER_SCHEMA_P8_V0
registers:
  build_order:
  - wave: '1'
    step: '1'
    code: workload::STRUCTURE_COLLATZ_STORAGE_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '1'
    step: '2'
    code: workload::AC_REFERENCE_ACTOR_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '1'
    step: '3'
    code: workload::EV_CONJECTURE_EVALUATED_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '1'
    step: '4'
    code: workload::CT_PURE_COLLATZ_STEP_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '1'
    step: '5'
    code: workload::CT_PURE_TERMINATION_CHECK_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '1'
    step: '6'
    code: workload::CC_STORE_RESULTS_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '1'
    step: '7'
    code: workload::IN_COLLATZ_INPUT_VALIDATED_V0
    action: NEW
    subdomain: workload
    depends_on: null
  - wave: '2'
    step: '8'
    code: workload::CC_COMPUTE_SEQUENCES_V0
    action: NEW
    subdomain: workload
    depends_on:
    - workload::CT_PURE_COLLATZ_STEP_V0
  - wave: '2'
    step: '9'
    code: workload::CC_VERIFY_TERMINATION_V0
    action: NEW
    subdomain: workload
    depends_on:
    - workload::CT_PURE_TERMINATION_CHECK_V0
  - wave: '2'
    step: '10'
    code: workload::CC_VERIFY_TERMINATION_V1
    action: NEW
    subdomain: collatz
    depends_on:
    - workload::CT_PURE_TERMINATION_CHECK_V0
  - wave: '2'
    step: '11'
    code: workload::CC_VERIFY_TERMINATION_V2
    action: NEW
    subdomain: collatz
    depends_on:
    - workload::CT_PURE_TERMINATION_CHECK_V0
  - wave: '2'
    step: '12'
    code: workload::RB_COLLATZ_V0
    action: NEW
    subdomain: workload
    depends_on:
    - workload::STRUCTURE_COLLATZ_STORAGE_V0
  - wave: '3'
    step: '13'
    code: workload::WF_COLLATZ_CONJECTURE_V0
    action: NEW
    subdomain: workload
    depends_on:
    - workload::RB_COLLATZ_V0
    - workload::AC_REFERENCE_ACTOR_V0
    - workload::EV_CONJECTURE_EVALUATED_V0
    - workload::IN_COLLATZ_INPUT_VALIDATED_V0
    - workload::CC_COMPUTE_SEQUENCES_V0
    - workload::CC_VERIFY_TERMINATION_V0
    - workload::CC_STORE_RESULTS_V0
  critical_path:
  - position: '1'
    code: workload::CT_PURE_COLLATZ_STEP_V0
  - position: '2'
    code: workload::CC_COMPUTE_SEQUENCES_V0
  - position: '3'
    code: workload::WF_COLLATZ_CONJECTURE_V0
  mandate_artifact_summary:
  - action: NEW
    count: '13'
    description: 1 STRUCTURE, 1 AC, 1 EV, 2 CT, 5 CC, 1 IN, 1 WF, 1 RB
  field_declarations:
  - code: workload::STRUCTURE_COLLATZ_STORAGE_V0
    subdomain_field: workload
  - code: workload::AC_REFERENCE_ACTOR_V0
    subdomain_field: workload
  - code: workload::EV_CONJECTURE_EVALUATED_V0
    subdomain_field: workload
  - code: workload::CT_PURE_COLLATZ_STEP_V0
    subdomain_field: workload
  - code: workload::CT_PURE_TERMINATION_CHECK_V0
    subdomain_field: workload
  - code: workload::CC_STORE_RESULTS_V0
    subdomain_field: workload
  - code: workload::IN_COLLATZ_INPUT_VALIDATED_V0
    subdomain_field: workload
  - code: workload::CC_COMPUTE_SEQUENCES_V0
    subdomain_field: workload
  - code: workload::CC_VERIFY_TERMINATION_V0
    subdomain_field: workload
  - code: workload::CC_VERIFY_TERMINATION_V1
    subdomain_field: collatz
  - code: workload::CC_VERIFY_TERMINATION_V2
    subdomain_field: collatz
  - code: workload::RB_COLLATZ_V0
    subdomain_field: workload
  - code: workload::WF_COLLATZ_CONJECTURE_V0
    subdomain_field: workload
  new_capabilities:
  - code: workload::CT_PURE_COLLATZ_STEP_V0
    purpose: Compute full Collatz sequence for each input number
    inputs: numbers:array
    outputs: sequences:object
  - code: workload::CT_PURE_TERMINATION_CHECK_V0
    purpose: Verify all Collatz sequences terminate at 1
    inputs: sequences:object
    outputs: all_terminate:boolean, non_terminating:array
  new_intents:
  - code: workload::IN_COLLATZ_INPUT_VALIDATED_V0
    purpose: Validate Collatz input — non-empty list of positive integers
    workflow: WF_COLLATZ_CONJECTURE_V0
    inputs: numbers:array
  cross_subdomain_notes: []
```

The 13 artifacts of `workload`'s design of record, scheduled in dependency order. Written by
`python -m transformation.record` from the P7 beside it. The mandate orders the build; it decides
nothing.
