# RB_COLLATZ_V0

## Header (Mandatory)

- **Artifact Code:** RB_COLLATZ_V0
- **Artifact Kind:** runtime_binding
- **Governed By:** CONSTITUTION_RUNTIME_BINDING_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** CS_MUTABLE_JSON_V0, STRUCTURE_COLLATZ_STORAGE_V0

---

## 1. Intent

Runtime binding for the Collatz reference workload — binds the platform side effect
`capability_side_effects::CS_MUTABLE_JSON_V0` (imported) to its host implementation for persisting
results, and names the storage structure that resolves the path.

---

## Machine

```yaml
fqdn: workload::RB_COLLATZ_V0
artifact_kind: RUNTIME_BINDING
version: v0
governed_by: fb.runtime_binding::CONSTITUTION_RUNTIME_BINDING_V0
parameters:
- module_data_root
core:
  summary: Runtime binding for Collatz result storage
  description: Binds the platform CS_MUTABLE_JSON to its host for persisting Collatz results.
  storage_structure: workload::STRUCTURE_COLLATZ_STORAGE_V0
  bindings:
    capability_side_effects::CS_MUTABLE_JSON_V0:
      type: CS
      host: MutableJsonRuntime
      operation: READ_WRITE
      policy: {}
```
