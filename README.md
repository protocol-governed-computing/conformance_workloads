# conformance_workloads

**The workloads that prove a Profiled Normative Platform conforms.**

A *platform* is not a repository — it is a composition. A **Profiled Normative Platform (PNP)** is
what you get when a selected governance surface (`software_governance`), a selected set of workloads
(this repo), and optionally a business domain (`business_domains`) are compiled and assembled
together. There are as many PNPs as there are conformance profiles.

This repo holds the workloads side of that composition: independently-authored domains that exercise
the governed execution path end to end and make conformance claims observable.

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
./compile.sh                                              # governance surface first
./compile_domain.sh ../conformance_workloads/workloads/collatz
cd ../snapshot_assembler && ./assemble.sh                 # compose the PNP
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
