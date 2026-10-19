## Response Style

Keep responses under ~400 output tokens. Prefer terse bullet summaries over prose narration. When a full document is needed, Write it to a file instead of printing it in chat.

# conformance_workloads — Architectural Rules

## What this is

The workloads half of a **Profiled Normative Platform (PNP)**. `software_governance` declares what
is governed; this repo declares what is executed to prove it. A PNP is the composition of the two
(plus optional `business_domains`) under a conformance profile — never a repo.

## Layer position

```
governance artifacts → compiler → projections → assembler → snapshot → runtime → workloads (here)
```

**MUST NOT import:** `compiler.*`, `assembler.*`, `runtime.*`, `pgs_*`, or any governance package.
A workload's implementation is a leaf — pure functions invoked by the runtime through a compiled
`handler_ref`.

## Self-describing domains (MANDATORY)

- A workload registers its source **only** in its own build manifest
  (`registry/structures/STRUCTURE_BUILD_*_CONFIG_V*.md`). No compiler edit, no governance edit.
- Layer sources are declared as `domain_subpath` — resolved under **this repo's** root
  (`PGC_DOMAIN_ROOTS`), never as a subpath of the governance surface.
- `implementation_namespace` and CT `machine.implementation.module` are `workloads.<name>.…`,
  matching the `workloads/` import root.
- References to governance artifacts resolve through the compiled **import surface**, never by path.

## CT implementations (MANDATORY)

Pure functions: inputs dict → outputs dict. Deterministic, no I/O, no filesystem, no network, no
unseeded randomness, no global mutation. Anything with an effect is a CS, declared as such.

## Not installed

This repo is **deliberately not installed** into the workspace venv (same posture as `protocol_transport`).
Its import root is env-provisioned from the repo root via `PGC_IMPL_ROOTS` / `PYTHONPATH`. Do not
add a `pyproject.toml` to make it installable — that would create a second, competing resolution
path for handler refs.

## Workflow rules

Diagnose → list the files to change and why → identify layer boundaries crossed → **wait for
approval** before multi-file changes.
