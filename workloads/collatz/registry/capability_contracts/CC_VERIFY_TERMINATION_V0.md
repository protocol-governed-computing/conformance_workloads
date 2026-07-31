# CC_VERIFY_TERMINATION_V0

## Header (Mandatory)

- **Artifact Code:** CC_VERIFY_TERMINATION_V0
- **Artifact Kind:** capability_contract
- **Governed By:** CONSTITUTION_CAPABILITY_CONTRACT_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** CT_PURE_TERMINATION_CHECK_V0

---

## 1. Intent

Verify that every computed Collatz sequence terminates at 1. A VIOLATION here is a first-class
protocol outcome (the conjecture was tested and failed), not an error.

---

## Machine

```yaml
fqdn: workload::CC_VERIFY_TERMINATION_V0
artifact_kind: CAPABILITY_CONTRACT
version: v0
governed_by: fb.capability_contracts::CONSTITUTION_CAPABILITY_CONTRACT_V0
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
  result_status_contract:
    allowed:
    - SUCCESS
    - VIOLATION
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
      SUCCESS: evaluate_conjecture
      VIOLATION: exit
  evaluation:
    evaluate_conjecture:
      condition: $.capability_result.all_terminate == true
      on_true: SUCCESS
      on_false: VIOLATION
extensions:
  description: Protocol gate for Collatz Conjecture — SUCCESS means conjecture holds for this input set
```
