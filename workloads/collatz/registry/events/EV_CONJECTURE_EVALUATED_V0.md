# EV_CONJECTURE_EVALUATED_V0

## Header (Mandatory)

- **Artifact Code:** EV_CONJECTURE_EVALUATED_V0
- **Artifact Kind:** event
- **Governed By:** CONSTITUTION_EVENT_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** WF_COLLATZ_CONJECTURE_V0

---

## 1. Intent

Domain event emitted once the Collatz conjecture has been evaluated for an input set — records
whether every sequence terminated at 1 and, if not, which seeds did not. This is the Observation
concern: a governed, declared event that becomes visible in the execution trace.

---

## Machine

```yaml
fqdn: workload::EV_CONJECTURE_EVALUATED_V0
artifact_kind: EVENT
version: v0
governed_by: fb.constitution::CONSTITUTION_EVENT_V0
core:
  summary: Conjecture Evaluated
  description: Emitted when the Collatz conjecture has been evaluated for the input set.
  schema:
    all_terminate:
      type: boolean
      required: true
    non_terminating:
      type: array
      required: true
```
