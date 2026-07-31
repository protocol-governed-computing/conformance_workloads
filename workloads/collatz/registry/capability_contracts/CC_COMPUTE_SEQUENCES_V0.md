# CC_COMPUTE_SEQUENCES_V0

## Header (Mandatory)

- **Artifact Code:** CC_COMPUTE_SEQUENCES_V0
- **Artifact Kind:** capability_contract
- **Governed By:** CONSTITUTION_CAPABILITY_CONTRACT_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** CT_PURE_COLLATZ_STEP_V0

---

## 1. Intent

Compute Collatz sequences for all numbers in the input list.

---

## Machine

```yaml
fqdn: workload::CC_COMPUTE_SEQUENCES_V0
artifact_kind: CAPABILITY_CONTRACT
version: v0
governed_by: fb.capability_contracts::CONSTITUTION_CAPABILITY_CONTRACT_V0
core:
  summary: Compute Collatz sequences for all input numbers
  inputs:
    numbers:
      type: array
      required: true
  outputs:
    sequences:
      type: object
  result_status_contract:
    allowed:
    - SUCCESS
    - VIOLATION
    on_input_failure: VIOLATION
  pipeline:
  - step: compute_sequences
    transform: workload::CT_PURE_COLLATZ_STEP_V0
    inputs:
      numbers: $.inputs.numbers
    outputs:
      sequences: $.capability_result.sequences
    result_surface:
    - SUCCESS
    - VIOLATION
    on_result:
      SUCCESS: exit
      VIOLATION: exit
extensions:
  description: Computes full Collatz iteration path for each input integer
```
