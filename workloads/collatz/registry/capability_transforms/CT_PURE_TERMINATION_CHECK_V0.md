# CT_PURE_TERMINATION_CHECK_V0

## Header (Mandatory)

- **Artifact Code:** CT_PURE_TERMINATION_CHECK_V0
- **Artifact Kind:** capability_transform
- **Governed By:** CONSTITUTION_CAPABILITY_TRANSFORMS_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** NONE

---

## 1. Intent

Verify that every computed Collatz sequence terminates at 1. Pure, deterministic, no side effects.

---

## Machine

```yaml
fqdn: workload::CT_PURE_TERMINATION_CHECK_V0
artifact_kind: CAPABILITY_TRANSFORM
version: v0
governed_by: capability_transforms::CONSTITUTION_CAPABILITY_TRANSFORMS_V0
authority: pgc.platform
concern: workload
core:
  summary: Verify all Collatz sequences terminate at 1
  refusal: returns
  description: Inspects last element of each sequence. Returns all_terminate boolean and list of non-terminating
    seeds.
  inputs:
    sequences:
      type: object
      required: true
      description: Mapping from str(n) to Collatz sequence list
  outputs:
    all_terminate:
      type: boolean
      required: true
      description: True if every sequence ends at 1
    non_terminating:
      type: array
      required: true
      description: List of seeds whose sequences did not end at 1
machine:
  ct_kind: atom
  ct_purity: ct_pure
  operation: PURE_TERMINATION_CHECK
  implementation:
    module: workloads.collatz.implementation.capability_transforms.atoms.ct_pure_termination_check_v0
    callable: execute
```
