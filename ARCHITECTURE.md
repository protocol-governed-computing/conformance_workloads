# Architecture — `conformance_workloads`

This document describes what this repository is, what it owns, and what it must never do. It is
written to be read before any code, and assumes no prior familiarity with Protocol-Governed
Computing.

For the big picture — what PGC is and how the repositories compose — see
**https://github.com/protocol-governed-computing**.

---

## 1. What this repo is

This is the **proof**. It holds domains whose only purpose is to be executed so that a claim about
the platform becomes observable.

> These are not applications that happen to be useful for testing. They exist to demonstrate that
> an **independently authored** domain can be compiled against the platform, composed into it, and
> executed by a runtime that knows nothing about it.

The distinction from a business domain is the point. A business domain is written because someone
needs the business outcome. A conformance workload is written because someone needs to know whether
the guarantee holds — and if the platform's guarantee ever stops holding, one of these stops
working first.

**What this repo is not.** It is not part of the platform, not a library, and not a place business
logic belongs. Compiling a workload must leave the governance surface's identity unchanged — if
absorbing a workload changed the platform, the workload would no longer be an independent witness.

## 2. Where it sits

```
   software_governance          conformance_workloads       business_domains
   what is GOVERNED             what is EXECUTED to         what is done for
                                prove it (← YOU ARE HERE)   a business
          └──────────────────────────┼─────────────────────────┘
                                     │
                                compiler → assembler
                                     │
                            ┌────────▼────────┐
                            │ sealed snapshot │   one Profiled Normative Platform
                            └────────┬────────┘
                                     ▼
                                  runtime
```

**A platform is a composition, not a repository.** A *Profiled Normative Platform* is what you get
when a governance surface, a chosen set of workloads, and optionally a business domain are compiled
and assembled together under a conformance profile. There are as many platforms as there are
profiles, and this repo supplies the half that proves any of them.

## 3. The central idea: a domain describes itself

The distinction that explains every design choice in this repository:

```
   A PLUGIN SYSTEM                      A SELF-DESCRIBING DOMAIN

   the host keeps a list of             the domain carries its own build
   what it supports                     manifest, declaring its own sources
        │                                    │
        │  adding one =                      │  adding one =
        │  edit the host, edit the           │  add a directory. Nothing
        │  registry, redeploy the host       │  upstream is touched
        ▼                                    ▼
   the host must know every             the compiler never learns a
   domain that exists                   workload's name
```

A workload registers its sources **only** in its own build manifest. Its layers are declared as
paths under *this* repository, never as a subpath of the governance surface. It refers to
governance artefacts through the compiled import surface, never by file path.

The consequence is checkable: **adding a workload requires no edit to the compiler and no edit to
governance.** If it ever did, the claim that domains are independently authored would be false.

## 4. What it owns, and what it must never do

**It owns:**

- **workload domains** — each with its own governance artefacts: a workflow, its contracts, its
  transforms, its events, its actor context;
- **pure implementations** — the leaf functions a compiled binding points the runtime at;
- **boundary contracts** — the ingress/egress pair that publishes a workload over transport;
- **a client per workload** — a small web surface for exercising it by hand.

**It must never:**

- **import the compiler, the assembler, the runtime, or governance code.** An implementation is a
  leaf. It is called; it calls nothing back.
- **have effects inside a transform.** A capability transform is a pure function: inputs in,
  outputs out. No I/O, no filesystem, no network, no unseeded randomness, no global state. Anything
  with an effect is declared as a side-effect capability instead.
- **be installed as a package.** This repo is deliberately left out of the environment; its import
  root is supplied at run time. Making it installable would create a second, competing way for a
  compiled binding to resolve — and then which one ran would depend on installation order.
- **grow into the platform.** The platform is not enriched by absorbing a workload; the composed
  universe is enriched by composing independent domains.

## 5. The reference workload: Collatz

Take any positive whole number. If it is even, halve it; if it is odd, triple it and add one. Repeat.
The conjecture is that you always eventually reach 1. Nobody has proved it, which is irrelevant here
— what matters is the *shape* of the computation.

It was chosen because it exercises something the platform surface cannot demonstrate about itself:

> **an unbounded, recursive computation expressed as a finite, acyclic graph.**

The workflow contains no loop. The iteration lives inside a pure transform, where it is a
computation; the graph stays finite and checkable, where it is governance. A system that could only
express straight-line work would not have proved much.

```
   IN   input validated
     │        ACK ──▶ CC  compute sequences
     │                     │    SUCCESS ──▶ CC  verify termination
     │                     │                    │    SUCCESS ──▶ CC  store results
     │                     │                    │                     │  SUCCESS
     │                     │                    │                     ▼
     │                     │                    │              EXIT  conjecture proven  ──▶ event
     │                     │                    └─ VIOLATION ─▶ EXIT  conjecture violated
     │                     └─ VIOLATION ───────────────────────▶ EXIT  error
     └── NACK ─────────────────────────────────────────────────▶ EXIT  rejected
```

Every arrow exists before anything runs. Note that a refused input and a violated conjecture leave
by **different exits** — the graph distinguishes "you asked something inadmissible" from "the
computation itself produced a governed outcome", and the trace records which.

## 6. Try it — the whole path, by hand

Two commands, no prior knowledge:

```bash
cd conformance_workloads
./workloads/collatz/client/serve.sh          # http://localhost:8000
```

Open it, type a number — or use one of the buttons — and press **Compute Sequence**. On screen you
get the sequence, the terminal result, the live evidence for that run, and the **compiled workflow
graph** rendered as an image. That last one is worth dwelling on: the picture is not documentation
someone drew, it is the graph that was compiled and sealed, and the run you just made followed a
path through it.

The same path is available without the browser:

```bash
curl -s -X POST http://localhost:8000/collatz \
     -H 'Content-Type: application/json' -d '{"number":27}'
```

```json
{ "request_id": "…", "outcome": "SUCCESS", "result_class": "SUCCESS",
  "result": { "number": 27, "sequence": [27, 82, 41, 124, …] } }
```

### Now make it refuse

```bash
curl -s -X POST http://localhost:8000/collatz -d '{"number":-5}'
```

```json
{ "outcome": "FAILURE", "result_class": "VIOLATION",
  "errors": [ { "code": "INPUT_OUT_OF_RANGE", "message": "'number' below minimum 1" } ] }
```

Nothing executed. The refusal came from the boundary contract, which declares that `number` has a
minimum — and no code in the workload implements that check. **The declaration is the enforcement.**

### Three details that repay a second look

1. **You sent `number`; the workflow takes `numbers`.** The boundary contract declares the mapping
   from the public input to the workflow's payload. The public shape is a promise to callers; the
   internal shape is free to differ, and to change.
2. **The route is data.** `POST /collatz → collatz.compute` lives in a small binding file next to
   the client, not in the transport engine. The engine serves this workload without containing the
   word "collatz" anywhere.
3. **The launcher is where workload knowledge lives.** It points a domain-neutral engine at this
   repo's client, bindings and implementation roots. The engine learns everything from being
   pointed; it discovers nothing.

To run the workload without any web surface at all, invoke the workflow directly through the
runtime with one of the payloads in `workloads/collatz/test_payloads/`.

## 7. Layout

```
workloads/
    __init__.py             the import root compiled bindings resolve against
    collatz/
        registry/           the workload's own governance artefacts:
                            workflow · intent · contracts · transforms · event · actor ·
                            storage structure · invariant · build manifest
        transport/          the ingress/egress pair that publishes collatz.compute
        implementation/     pure transform functions — the leaves
        client/             web client, HTTP binding table, composition launcher
        test_payloads/      canonical requests, including one that must be refused
        snapshot/           compiled output (generated)
```

Every directory under `collatz/` is the pattern for a second workload. A new one is a sibling.

## 8. Rules this repo enforces

1. **A workload declares its own sources**, in its own build manifest, resolved under this repo.
2. **Adding a workload edits nothing upstream** — not the compiler, not governance.
3. **No import of compiler, assembler, runtime, or governance packages.** Implementations are leaves.
4. **Transforms are pure and deterministic.** Effects are declared as side-effect capabilities.
5. **This repo is not installed**, so there is exactly one way a compiled binding resolves.
6. **Compiling a workload leaves the governance surface's identity unchanged.**
7. **Governance is referenced through the compiled import surface**, never by path.
8. **A refusal and a governed failure exit by different paths**, and both are recorded.

## 9. How to know it works

```bash
cd ../protocol_runtime
./run.sh                                      # warm-boot the sealed snapshot and verify it
./run.sh run --wf workload::WF_COLLATZ_CONJECTURE_V0 \
             --payload ../conformance_workloads/workloads/collatz/test_payloads/01_happy_path.json \
             --data-root /tmp/pgc_instance
```

A good result reports `SUCCESS` with `all_terminate: true`, and writes a trace. But the outcome is
the *less* interesting half. What this repository exists to demonstrate is checkable in three
observations:

- the platform's identity hash is **unchanged** by the workload having been compiled;
- the trace's path is a path **present in the compiled graph** — the run invented nothing;
- the inadmissible payload (`03_invalid_nack.json`, containing `0` and `-5`) ends `VIOLATION` at the
  intent gate, having computed nothing — the same refusal the boundary makes earlier for a caller
  over HTTP, enforced a second time for a caller that bypassed it.

If all three hold, an independently authored domain was governed by a platform that never learned
its name.

## 10. Where the architecture is explained

This document describes *this repository*. The architecture it realizes is developed in the papers
indexed at **https://github.com/protocol-governed-computing**:

- **An Architecture for Deterministic Declarative Execution** — the execution partition these
  workloads exercise, and why the runtime can be domain-blind.
- **Realizing the Normative Platform and Its Governed Transformation** — the Profiled Normative
  Platform, and what it means for a composition to *prove* rather than assert conformance.
- **A Conceptual Model** — the snapshot as the immutable admissibility boundary, and the evidence a
  run leaves behind.
