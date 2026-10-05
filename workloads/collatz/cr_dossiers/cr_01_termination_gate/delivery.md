# Delivery — cr_01_termination_gate

**Authorized by:** Gate 1 and Gate 2, at P7 and P8, against composition `d880845e3b18…`
**Delivered:** the termination gate can fail. `workload::CC_VERIFY_TERMINATION_V1` runs the
termination check unchanged, then the platform's set-membership check on `all_terminate` against the
set holding only true, which refuses when a sequence did not end at 1. Each step routes on its own
outcome; the gate declares no condition. V0 is stood down, and the workflow runs V1.
**Validated:** `test_reference_collatz` 6/6; construction acceptance 178/178 across 7 domains with 0
field differences; full regression `--all` 66/66 as expected

---

## What this change closed

The gate routed the check's SUCCESS to `evaluate_conjecture`, a condition nothing runs. Execution
read the answer as going on, and the step was the last, so the gate ended SUCCESS whatever the check
found. A run whose sequence did not end at 1 would have been recorded as proving the conjecture.

Now the decision is a capability's. A run in which the check reports a sequence that did not end at 1
ends VIOLATION, routes to `EXIT_CONJECTURE_VIOLATED`, stores nothing, and announces the numbers in
`EV_CONJECTURE_EVALUATED_V0`. A run that holds ends and records exactly as before.

---

## What it took

**The first design was refused at P7, and the decision moved to the platform.** A new termination
check that refuses could not pass: the design language expects a transform's module at
`{domain}.implementation…`, while the workload's build config declares `workloads.collatz…`, and the
workload's build config does not discover test data, so no vector could be written. P0 was amended
and Gate 0 re-confirmed: the gate decides with the platform's set-membership check, and no transform
is added. Both gaps are parked on dev/18.

**Every step declares what it reports.** The first emit failed the build: the pipeline-step schema
requires `outputs`, and the second step mapped none. Neither the P7 rules nor the construction check
know this. The step now maps `is_member` to a new output, `conjecture_holds`, and P7 and P8 were
amended before the second emit. The failed rebuild removed the working snapshot; the workload was
restored, the snapshot rebuilt to the same identity, and construction emitted again.

**The literal is written `[True]`.** `[true]` does not parse, and a binding literal that does not
parse is refused.

**What it touched outside the workload:**

- `protocol_runtime/testbed/pgc/test_reference_collatz.py`: a run whose check reports a sequence that
  did not end at 1 ends violated, stores nothing and announces the numbers.
- `transformation/scripts/testbed/construction_acceptance.py`: the workload's dossiers are compared.
- `.github/process/expectations.yaml`: 510 artifacts, 11 supersession relations, 178/178 across 7
  domains, 6 Collatz tests.

---

## What is carried

- **Two design-language gaps for workloads.** P7 ignores a build config's `implementation_namespace`,
  and the workload build config does not discover `TEST_DATA`. No new workload transform can pass P7
  until both close.
- **A step's required outputs are not known to design.** The schema requires them; P7 and the
  construction check do not.
- **Declared input types are not checked.** The set-membership check declares `value` a string and
  is given a boolean; the comparison is by equality, so it holds.
- **A malformed input still ends the run with the conjecture violated.**
- **V1 sits under `registry/collatz/`,** beside V0 under `registry/capability_contracts/`.
  Discovery is recursive, so both are found.
