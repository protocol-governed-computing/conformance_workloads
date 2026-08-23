# TE_COLLATZ_COMPUTE_V0

**Kind:** Transport Egress Contract (Transport Standard V0 §7)
**Operation Identity:** `collatz.compute`
**Home:** platform-resident boundary declaration for the Collatz reference workload.
**Status:** cut-#1 hand-authored. Promoted to a compiler-recognized `TE_` kind in Phase 3.

Classifies a PGC Result into a protocol-neutral Result Class and declares the output
projection and evidence exposure. It carries **no** protocol semantics — no HTTP status,
no exit code (`RESULT_CLASS_PROTOCOL_INDEPENDENCE`). The adapter alone projects the
Result Class onto a wire representation (`RESPONSE_PROJECTION_EXTERNAL`).

## Machine

```yaml
fqdn: workload::TE_COLLATZ_COMPUTE_V0
artifact_kind: TRANSPORT_EGRESS
version: v0
governed_by: transport::CONSTITUTION_TRANSPORT_EGRESS_V0
authority: pgc.platform
concern: workload
operation: collatz.compute

# Result classification: runtime terminal status -> governed Result Class.
result_classification:
  SUCCESS:   SUCCESS
  VIOLATION: VIOLATION
  NACK:      VIOLATION
  REJECTED:  VIOLATION
# Declared (not inferred) class for any status not enumerated above.
default_result_class: EXECUTION_FAILURE

# Output contract: project the WF result surface + canonical input into the exposed
# result. `from` is a dotted path over {input, surface}; a `$key` segment substitutes
# str(input[key]) as a lookup key (e.g. surface.sequences.$number -> surface.sequences."27").
# `op` derives a value from the resolved node (default: identity).
output_contract:
  - { field: number,   from: input.number }
  - { field: sequence, from: surface.sequences.$number }
  - { field: steps,    from: surface.sequences.$number, op: length_minus_one }
  - { field: peak,     from: surface.sequences.$number, op: max }

# Evidence exposure: reference-only (emit trace id references, never inline evidence).
evidence_policy: reference_only
```