# TI_COLLATZ_COMPUTE_V0

**Kind:** Transport Ingress Contract (Transport Standard V0 §6)
**Operation Identity:** `collatz.compute`
**Home:** platform-resident boundary declaration for the Collatz reference workload.
**Status:** cut-#1 hand-authored. Promoted to a compiler-recognized `TI_` kind in Phase 3.

Declares the admission semantics for the operation `collatz.compute`: its input
contract, the handler it binds to, and how the canonical input maps onto that handler.
The public identity `collatz.compute` is stable; the bound workflow
`workload::WF_COLLATZ_CONJECTURE_V0` is an implementation detail and may be
re-pointed without any adapter change (`OPERATION_IDENTITY_INDEPENDENCE`, Patch 1).

`handler.kind` is the generalization point: `WF_INVOCATION` here; a future
`SNAPSHOT_QUERY` (for `pi.query` over the platform-resident PPS) is a sibling kind,
added without touching the transport engine.

## Machine

```yaml
fqdn: workload::TI_COLLATZ_COMPUTE_V0
artifact_kind: TRANSPORT_INGRESS
version: v0
governed_by: transport::CONSTITUTION_TRANSPORT_INGRESS_V0
authority: pgc.platform
concern: workload
operation: collatz.compute

# Input contract — a declared, named contract (not inline schema logic executed at
# request time; the resolver enforces the compiled boundary — Patch 3).
input_contract:
  number:
    type: integer
    required: true
    min: 1
    max: 999999

# Context requirements — inert in V0 (AC reserved).
context_requirements: []

# Operation binding: operation identity -> handler.
handler:
  kind: WF_INVOCATION
  workflow: workload::WF_COLLATZ_CONJECTURE_V0
  # Canonical input -> WF payload. `${input.KEY}` substitutes the canonical input value
  # (type-preserving). The list wrapper is literal: scalar number -> {"numbers": [number]}.
  payload_template:
    numbers: ["${input.number}"]
```