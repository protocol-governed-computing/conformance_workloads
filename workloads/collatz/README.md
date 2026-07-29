# workload::collatz — PGC reference workload

**A reference workload / architectural regression domain, not part of the normative platform surface.**

Collatz is an independently-authored domain (`workload::`) that the PGC runtime executes with zero
domain knowledge. It exercises a distinctive capability the platform surface itself does not: a
**recursive computation expressed as a finite, acyclic protocol DAG** (the unbounded iteration lives
inside a pure CT; the WF has no loop). It is the first end-to-end proof that PGC can take an
independently-authored domain, **compile it against the platform**, compose it into an assembled
universe, warm-reboot that universe, and execute it — producing a verifiable trace.

It is **not** part of `pcg::`. The platform is not made richer by absorbing this workload; the
assembled *universe* is made richer by composing independent domains. Compiling `workload` must
leave the platform's identity/hash unchanged.

## Phasing

- **Phase 1 (current):** pure `compute → verify`. WF surface = the sequences + terminal result.
  No persistence — no CS, no cross-domain capability consumption. Proves: compile-against-platform
  (governance import) + N=2 assembly + execute + behavioral regression.
- **Phase 2:** add `CC_STORE_RESULTS` via the platform's `capability_side_effects::CS_MUTABLE_JSON_V0`.
  Deliberately isolates and proves cross-domain capability consumption: compile-time capability
  import + runtime cross-domain handler resolution + assembler vocabulary address-space reconciliation.

## Provenance

Extracted from the RI-0 `ai_governance` domain (`registry/collatz_conjecture/`) solely as a reference
workload; re-namespaced `ai_governance::` → `workload::`. It is **not** semantically an AI-governance
artifact — its prior location there was incidental. When RI-0 `ai_governance` is migrated to `pgs::`,
Collatz is removed there to avoid duplication. The RI-0 web demo UI (`collatz.css`,
`collatz_bridge.js`) is intentionally dropped — it is not part of the conformance/regression workload.

## Layout

```
workloads/collatz/
  registry/
    workflows/            WF_COLLATZ_CONJECTURE_V0.md
    intents/              IN_COLLATZ_INPUT_VALIDATED_V0.md
    capability_contracts/ CC_COMPUTE_SEQUENCES_V0.md  CC_VERIFY_TERMINATION_V0.md
    capability_transforms/CT_PURE_COLLATZ_STEP_V0.md  CT_PURE_TERMINATION_CHECK_V0.md
  implementation/
    capability_transforms/atoms/  ct_pure_collatz_step_v0.py  ct_pure_termination_check_v0.py
```

Compiled as its own domain via `STRUCTURE_BUILD_WORKLOAD_CONFIG_V1` (domain id `workload`),
assembled as a second domain alongside `platform`.
