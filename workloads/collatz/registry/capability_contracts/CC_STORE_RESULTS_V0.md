# CC_STORE_RESULTS_V0

## Header (Mandatory)

- **Artifact Code:** CC_STORE_RESULTS_V0
- **Artifact Kind:** capability_contract
- **Governed By:** CONSTITUTION_CAPABILITY_CONTRACT_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** CS_MUTABLE_JSON_V0

---

## 1. Intent

Persist the Collatz evaluation results to the `COLLATZ_RESULTS` store — the Capability Side Effect
concern, consuming the platform's `capability_side_effects::CS_MUTABLE_JSON_V0` (imported).

---

## Machine

```yaml
fqdn: workload::CC_STORE_RESULTS_V0
artifact_kind: CAPABILITY_CONTRACT
version: v0
governed_by: fb.topology::CONSTITUTION_CAPABILITY_CONTRACT_V0
core:
  summary: Store Collatz results to mutable JSON storage
  inputs:
    sequences:
      type: object
      required: true
    all_terminate:
      type: boolean
      required: true
    non_terminating:
      type: array
  outputs:
    result_status:
      type: string
  result_status_contract:
    allowed:
    - SUCCESS
    - VIOLATION
    - BACKEND_ERROR
    on_input_failure: VIOLATION
  pipeline:
  - step: store_results
    side_effect: capability_side_effects::CS_MUTABLE_JSON_V0
    op: WRITE
    store: COLLATZ_RESULTS
    inputs:
      key: collatz_results
      value:
        sequences: $.inputs.sequences
        all_terminate: $.inputs.all_terminate
        non_terminating: $.inputs.non_terminating
    outputs:
      result_status: $.result_status
    result_surface:
    - SUCCESS
    - VIOLATION
    - BACKEND_ERROR
    on_result:
      SUCCESS: exit
      VIOLATION: exit
      BACKEND_ERROR: exit
extensions:
  description: Persists conjecture results with last-write-wins semantics
```
