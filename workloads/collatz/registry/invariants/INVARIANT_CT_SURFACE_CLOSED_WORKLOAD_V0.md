# INVARIANT_CT_SURFACE_CLOSED_WORKLOAD_V0

## Machine

```yaml
fqdn: workload::INVARIANT_CT_SURFACE_CLOSED_WORKLOAD_V0
artifact_kind: INVARIANT
version: V0
governed_by: fb.topology::CONSTITUTION_CAPABILITY_TRANSFORMS_V0
core:
  enforcement_stage:
  - compiler_assertion
  violation_response: FAIL_IMMEDIATELY
assert_projection:
  handler: pgs_governance.registry.handlers.assert_ct_surface_closed_v0
  scope:
    applies_to:
    - WORKLOAD
  allowed_capability_transforms:
  - workload::CT_PURE_COLLATZ_STEP_V0
  - workload::CT_PURE_TERMINATION_CHECK_V0
  applies_to_kinds:
  - CT
```

---

## Purpose

The workload domain governs its own capability-transform surface. Platform surface-closure governs the platform surface; a domain declares the closed set of CTs it introduces, so that domain execution has no undeclared transform — the same guarantee the platform gives itself, owned by the surface that carries the artifacts.

---

## Validation Rules

### Rule 1: Closed CT surface

Every CT discovered in the `WORKLOAD` layer MUST appear in `allowed_capability_transforms`, and every entry there MUST be discovered. The workload surface is exactly these transforms — no more, no fewer.

---

## Rationale

Surface closure is per-surface by construction: the allowed set is a property of the surface that declares it. A domain inherits the platform's *mechanism* (the generic closure handler) but supplies its own *meaning* (its allowed list), exactly as the rule-ownership doctrine prescribes.
