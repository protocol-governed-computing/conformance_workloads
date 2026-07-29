# STRUCTURE_COLLATZ_STORAGE_V0

## Header (Mandatory)

- **Artifact Code:** STRUCTURE_COLLATZ_STORAGE_V0
- **Artifact Kind:** structure
- **Governed By:** CONSTITUTION_STRUCTURE_V0
- **Version:** v0
- **Status:** draft
- **Supersedes:** NONE
- **Dependencies:** NONE

---

## 1. Intent

Storage topology for the Collatz reference workload — maps the `COLLATZ_RESULTS` entity store to a
concrete path under the runtime instance root. Storage paths are a governance concern, resolved via
STRUCTURE only (never hardcoded in a capability or the runtime).

---

## Machine

```yaml
fqdn: workload::STRUCTURE_COLLATZ_STORAGE_V0
artifact_kind: STRUCTURE
version: v0
governed_by: fb.constitution::CONSTITUTION_STRUCTURE_V0
core:
  summary: Collatz reference-workload storage topology
  description: Maps the COLLATZ_RESULTS entity store to a path under the instance data root.
  domain: workload
  storage_roots:
    base_path: '{{module_data_root}}'
    description: Root path for Collatz storage (the runtime instance data root, resolved at runtime)
  entity_stores:
    COLLATZ_RESULTS:
      description: Mutable store for Collatz sequences + conjecture verdict (last-write-wins)
      path: workload/collatz/collatz_results.json
  resolution:
    algorithm: base_path / entity_stores[entity_type].path
    example: '{{module_data_root}}/workload/collatz/collatz_results.json'
```
