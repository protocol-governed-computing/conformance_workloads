# CT_PURE_COLLATZ_STEP_V0

## Header (Mandatory)

- **Artifact Code:** CT_PURE_COLLATZ_STEP_V0
- **Artifact Kind:** capability_transform
- **Governed By:** CONSTITUTION_CAPABILITY_TRANSFORMS_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** NONE

---

## 1. Intent

Compute the full Collatz sequence for each input number. Pure, deterministic, no side effects.

---

## Machine

```yaml
fqdn: workload::CT_PURE_COLLATZ_STEP_V0
artifact_kind: CAPABILITY_TRANSFORM
version: v0
governed_by: capability_transforms::CONSTITUTION_CAPABILITY_TRANSFORMS_V0
authority: pgc.platform
concern: workload
core:
  summary: Compute full Collatz sequence for each input number
  refusal: never
  description: For each n in numbers, iterates the Collatz rule until reaching 1. Returns mapping of n
    → sequence.
  inputs:
    numbers:
      type: array
      required: true
      description: List of positive integers for which to compute sequences
  outputs:
    sequences:
      type: object
      required: true
      description: Mapping from str(n) to full Collatz sequence as list of integers
machine:
  ct_kind: atom
  ct_purity: ct_pure
  operation: PURE_COLLATZ_STEP
  implementation:
    module: workloads.collatz.implementation.capability_transforms.atoms.ct_pure_collatz_step_v0
    callable: execute
```
