# EV_CONJECTURE_EVALUATED_V0

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
governed_by: event::CONSTITUTION_EVENT_V0
authority: pgc.platform
concern: workload
core:
  summary: Conjecture Evaluated
  subdomain: workload
  description: Emitted when the Collatz conjecture has been evaluated for the input set.
  schema:
    all_terminate:
      type: boolean
      required: true
    non_terminating:
      type: array
      required: true
    timestamp:
      type: string
      format: date-time
      required: true
      description: When the moment occurred
```
