# CC_VERIFY_TERMINATION_V1

## Machine

```yaml
fqdn: workload::CC_VERIFY_TERMINATION_V1
artifact_kind: CAPABILITY_CONTRACT
version: v1
governed_by: capability_contracts::CONSTITUTION_CAPABILITY_CONTRACT_V0
authority: pgc.platform
concern: collatz
supersedes: workload::CC_VERIFY_TERMINATION_V0
core:
  summary: Verify all Collatz sequences terminate at 1
  inputs:
    sequences:
      type: object
      required: true
  outputs:
    all_terminate:
      type: boolean
    non_terminating:
      type: array
    conjecture_holds:
      type: boolean
  result_status_contract:
    allowed:
    - VIOLATION
    - SUCCESS
    on_input_failure: VIOLATION
  pipeline:
  - step: check_termination
    transform: workload::CT_PURE_TERMINATION_CHECK_V0
    inputs:
      sequences: $.inputs.sequences
    outputs:
      all_terminate: $.capability_result.all_terminate
      non_terminating: $.capability_result.non_terminating
    result_surface:
    - SUCCESS
    - VIOLATION
    on_result:
      SUCCESS: continue
      VIOLATION: exit
  - step: require_every_sequence_terminated
    transform: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    inputs:
      value: $.results.check_termination.all_terminate
      allowed_set:
      - true
    outputs:
      conjecture_holds: $.capability_result.is_member
    result_surface:
    - SUCCESS
    - VIOLATION
    on_result:
      SUCCESS: continue
      VIOLATION: exit
```

---

## Intent

Verify all Collatz sequences terminate at 1
