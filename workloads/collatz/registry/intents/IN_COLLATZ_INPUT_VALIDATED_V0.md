# IN_COLLATZ_INPUT_VALIDATED_V0

## Header (Mandatory)

- **Artifact Code:** IN_COLLATZ_INPUT_VALIDATED_V0
- **Artifact Kind:** intent
- **Governed By:** CONSTITUTION_INTENT_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** WF_COLLATZ_CONJECTURE_V0

---

## 1. Intent

Admission gate for the Collatz reference workload. Accepts a non-empty list of positive integers.

---

## Machine

```yaml
fqdn: workload::IN_COLLATZ_INPUT_VALIDATED_V0
artifact_kind: INTENT
version: v0
governed_by: fb.intent::CONSTITUTION_INTENT_V0
core:
  summary: Validate Collatz input — non-empty list of positive integers
  workflow: WF_COLLATZ_CONJECTURE_V0
  inputs:
    numbers:
      type: array
      required: true
      description: List of positive integers
  outcomes:
    ACK:
      description: Input valid — execution proceeds
    NACK:
      description: Input invalid — execution rejected
extensions:
  domain: workload.collatz
  admission_rules:
  - numbers must be a non-empty array
  - each element must be a positive integer
```
