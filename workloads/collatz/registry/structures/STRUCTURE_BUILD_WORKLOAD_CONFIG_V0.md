# STRUCTURE_BUILD_WORKLOAD_CONFIG_V0

**Artifact Type**: STRUCTURE
**Version**: V0
**Status**: CANONICAL
**Governed By**: fb.constitution::CONSTITUTION_STRUCTURE_V0

---

## Purpose

Self-describing build manifest for the **PGC reference-workload** domain (`workload::`) — an
independently-authored domain compiled **against** the already-compiled platform surface, then
composed into the assembled universe.

This artifact lives in the **domain's own repo** (`conformance_workloads`, not the platform
surface), so the platform
surface is never edited to add a domain — its identity/hash is unchanged. The compiler merges this
manifest's `layer_definitions` and `identity_rules` **additively** (only for this build) on top of
the immutable platform `STRUCTURE_DISCOVERY_V0` / `STRUCTURE_IDENTITY_V0`.

First consumer: `workload::collatz` (Phase 1 — pure compute → verify).

---

## Machine

```yaml
fqdn: workload::STRUCTURE_BUILD_WORKLOAD_CONFIG_V0
artifact_kind: STRUCTURE
version: V0
governed_by: fb.constitution::CONSTITUTION_STRUCTURE_V0
structure_scope: workload
core:
  summary: Build-time STRUCTURE manifest (PGC reference-workload domain scope)
  description: 'Compiles the workload domain''s own artifacts (WF/IN/CC/CT), resolving governance and
    platform capability references against the imported compiled platform surface. Emits only workload
    artifacts. Self-describing: declares its own source layer and namespace rule additively.

    '
layer_definitions:
  WORKLOAD:
    domain_subpath: registry
    registry_module: workload.registry
    implementation_namespace: workloads.collatz.implementation.capability_transforms.atoms
    layer_category: workload
  WORKLOAD_TRANSPORT:
    domain_subpath: transport
    registry_module: workload.transport
    layer_category: workload
identity_rules:
- match: workload.registry
  namespace: workload
- match: workload.transport
  namespace: workload
artifact_discovery:
  search_layers:
  - WORKLOAD
  - WORKLOAD_TRANSPORT
  import_surface:
    domain: platform
  artifact_types:
  - WF
  - IN
  - CC
  - CT
  - EV
  - AC
  - RB
  - STRUCTURE
  - INVARIANT
  - TI
  - TE
output_configuration:
  artifacts:
    layer: PROTOCOL_BUILD_ROOT
    subpath: compiled/canonical
  vocabulary_projection_path:
    layer: GOVERNANCE
    subpath: compiled/vocabulary
  tokenized_projection_path:
    layer: GOVERNANCE
    subpath: compiled/tokenized
  evidence_projection_path:
    layer: GOVERNANCE
    subpath: compiled/evidence
  trust_attestation_path:
    layer: GOVERNANCE
    subpath: compiled/trust
  visualization_projection_path:
    layer: GOVERNANCE
    subpath: compiled/visualization
  layer_outputs:
    WORKLOAD:
      layer: WORKLOAD
      subpath: compiled/canonical
    WORKLOAD_TRANSPORT:
      layer: WORKLOAD
      subpath: compiled/canonical
  bootstrap_search_roots:
  - layer: GOVERNANCE
    subpath: declaration/structure/structures
build_phases:
- phase: discover
  description: Discover workload artifacts via STRUCTURE
- phase: parse
  description: Parse artifacts into canonical machine form
- phase: normalize
  description: Resolve references (workload + imported platform surface)
- phase: validate
  description: Validate artifacts using compiler schema rules
- phase: assert
  description: Evaluate cross-artifact invariants (surface closure)
- phase: materialize
  description: Emit deterministic compiled artifacts (workload scope only)
  target: compiled/artifacts/
```

## Version History

- **V0**: First PGC reference-workload domain build manifest. Self-describing (declares its own
  layer + namespace rule); compiles `workload::` against the imported compiled platform surface;
  emits only workload artifacts. Platform surface unchanged.
