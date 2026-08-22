# AC_REFERENCE_ACTOR_V0

## Header (Mandatory)

- **Artifact Code:** AC_REFERENCE_ACTOR_V0
- **Artifact Kind:** actor
- **Governed By:** CONSTITUTION_ACTOR_IDENTITY_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** NONE

---

## 1. Intent

Actor context under which the Collatz reference workflow executes. This is the Authority concern at
its declaration/binding stage: a named actor that the workflow binds and the runtime propagates into
the execution context and attributes in the trace.

**Scope note:** this artifact declares an actor *identity/context* only. It does NOT implement
authorization or enforcement — real authority checks belong to the governance/authority model and are
out of scope here. The reference value is the lifecycle it demonstrates:
`declaration → workflow binding → runtime context propagation → trace attribution`.

---

## Machine

```yaml
fqdn: workload::AC_REFERENCE_ACTOR_V0
artifact_kind: ACTOR
version: v0
governed_by: actor::CONSTITUTION_ACTOR_IDENTITY_V0
authority: pgc.platform
concern: workload
core:
  summary: Reference workload actor
  description: System actor context under which the Collatz reference workload executes.
  type: system
  attributes:
    role:
      type: string
      required: true
      value: reference_workload_runner
```
