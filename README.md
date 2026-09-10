# conformance_workloads

**The workloads that prove a Profiled Normative Platform conforms.**

A *platform* is not a repository — it is a composition. A **Profiled Normative Platform (PNP)** is
what you get when a selected governance surface (`software_governance`), a selected set of workloads
(this repo), and optionally a business domain (`business_domains`) are compiled and assembled
together. There are as many PNPs as there are conformance profiles.

This repo holds the workloads side of that composition: independently-authored domains that exercise
the governed execution path end to end and make conformance claims observable.

## Install

```bash
pip install pgc-workloads
```

This package carries declarations and the implementation modules a sealed
snapshot binds at execution. It provides no command of its own — the toolchain
packages read it.

## Layout

```
conformance_workloads/
  workloads/
    __init__.py          import root — `workloads.<name>.implementation.*`
    collatz/
      registry/          the workload's own governance artifacts (WF/IN/CC/CT/EV/AC/RB/…)
      transport/         TI/TE governed boundary contracts
      implementation/    CT atom implementations (pure functions)
      client/            web client + HTTP binding + composition launcher
      test_payloads/     canonical request payloads
      snapshot/          compiled output (generated)
```

## Self-describing domains

A workload is compiled **against** an already-compiled governance surface; the governance surface is
never edited to admit a workload. Each workload carries its own build manifest
(`registry/structures/STRUCTURE_BUILD_*_CONFIG_V*.md`) declaring its layers via `domain_subpath` —
resolved under this repo, not under the governance repo.

## Build

```bash
cd ../protocol_compiler
./compile.sh STRUCTURE_BUILD_PLATFORM_CONFIG_V1           # governance surface first
./compile_domain.sh ../conformance_workloads/workloads/collatz
cd ../snapshot_assembler && PGC_SNAPSHOT_PROFILE=GOVERNANCE_SURFACE_PROFILE_V0 ./assemble.sh   # compose the PNP
cd ../protocol_runtime && ./run.sh
```

## Environment provisioning

This repo is **deliberately not installed** into the workspace venv. Its import root is
env-provisioned from the repo root — `protocol_runtime/run.sh` puts it on `PYTHONPATH` by default,
so CT handler refs resolve as `workloads.collatz.implementation.…`. Override with `PGC_IMPL_ROOTS`.

## Serve the client

```bash
./workloads/collatz/client/serve.sh        # http://127.0.0.1:8000
```

---

## The package family

| Package | Repository | Role |
|---|---|---|
| `pgc-compiler` | `protocol_compiler` | declarations → compiled projections |
| `pgc-assembler` | `snapshot_assembler` | projections → sealed snapshot |
| `pgc-runtime` | `protocol_runtime` | snapshot → governed execution |
| `pgc-inspector` | `snapshot_inspector` | snapshot → read-only inspection |
| `pgc-transformation` | `transformation` | change request → protocol artifacts |
| `pgc-governance` | `software_governance` | the governance surface and its capability implementations |
| `pgc-workloads` | `conformance_workloads` | the workloads that make conformance observable |
| `pgc-domains` | `business_domains` | the business domain implementations the composed snapshot binds |

`pip install protocol-governed-computing` brings in the whole family.

**Installing the toolchain is one of two steps.** The compiler resolves the governance surface from
`PGC_PLATFORM_ROOT` — fail-hard, cwd-independent, zero inference — so the *declarations* come from a
repository you point at, never from a wheel. A registry inside a package would be a second governance
surface competing with the repository's, and a build could then be governed by a stale copy.

```bash
git clone https://github.com/protocol-governed-computing/software_governance
export PGC_PLATFORM_ROOT=$PWD/software_governance
pgc            # reports what is installed and whether the anchor resolves
```

`PGC_DOMAIN_ROOTS` names an additional domain contributing its own `registry/structures` — the
directory that *directly contains* it, not the repository above it; pointing one level too high is a
silent no-op. `PGC_SNAPSHOT_ROOT` is where compiled output is written, and each domain build needs
its own: every layer's output consolidates into one root, and verification rejects any file in that
root the current build did not declare. `PGC_SNAPSHOT_PROFILES` is the directory holding snapshot
profiles, required by the assembler and the runtime alike.

`PGC_BUILD_ROOT` is accepted and reported and **nothing reads it** — `PGC_SNAPSHOT_ROOT` is the
anchor that controls output.

The full sequence, with the repositories it needs, is in
[`pgc_install`](https://github.com/protocol-governed-computing/pgc_install).

**Versioning.** Two schemes, and the published version follows the second.

- **Internal** — each repository's `VERSION` file, a monotonic composition ordinal. PGC versions the
  composition rather than each repo: they release together and the governance closure forces lockstep,
  so the ordinal names which composition a repo belongs to. Development happens on `dev/<N>` and each
  cycle is tagged `release-<N>`. This is not published.
- **Public** — `PUBLIC_VERSION`, tagged on every component repository. The platform is at **`v3`**.

**The published version is the public one: `v4` is `4.0.0`.** The standard the packages implement is a
separate artifact on its own track and is not this number.

The standard these packages implement is published separately: https://doi.org/10.5281/zenodo.22150616
