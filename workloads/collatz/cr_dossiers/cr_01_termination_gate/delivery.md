# Delivery — cr_01_termination_gate

**Authorized by:** Gate 1 and Gate 2, at P7 and P8, against composition `d42ef69df1b0…`
**Delivered:**
- The termination gate can fail. `workload::CC_VERIFY_TERMINATION_V1` runs the termination check
  unchanged. Then it runs the platform's set-membership check on `all_terminate`, against the set
  holding only true, which refuses when a sequence did not end at 1.
- Each step routes on its own outcome, and the gate declares no condition.
- V0 is stood down, and the workflow runs V1.

**Validated:**
- Construction acceptance 182/184 across 7 domains, red by design for the two pinned book_library
  differences.
- Published identity: none of the 500 changed meaning.
- Full regression `--all` 66/66 as expected.
- The runtime test of a failing gate lands with the runtime in step 8.

---

## What this change closed

**Before.** The gate routed the check's SUCCESS to `evaluate_conjecture`, a condition nothing runs.
Execution read that answer as going on, and the step was the last, so the gate ended SUCCESS whatever
the check found. A run whose sequence did not end at 1 would have been recorded as proving the
conjecture.

**Now.** The decision is a capability's. A run in which the check reports a sequence that did not end
at 1 ends VIOLATION and routes to `EXIT_CONJECTURE_VIOLATED`. It stores nothing, and it announces the
numbers in `EV_CONJECTURE_EVALUATED_V0`. A run in which the conjecture holds ends and records exactly
as before.

---

## What it took

**The design is dev/18's, unchanged.** Every phase document is ported from dev/18, and P7's baseline
line is re-pinned to this composition. `CC_VERIFY_TERMINATION_V1` is identical to dev/18's.
Construction determined 35 of 35 facts.

**It ran before the platform's routing rules.** `INVARIANT_TOPOLOGY_CONTRACT_CLOSED_V1` refuses the
evaluation block V0 carries. The plan scheduled this dossier after that rule was armed, and the first
build with the rule failed on the workload, so the dossier moved ahead of it.

**Construction acceptance compares the workload's dossiers.**

---

## What is carried

- **Two design-language gaps for workloads.** P7 ignores a build config's `implementation_namespace`,
  and the workload build config does not discover `TEST_DATA`. No new workload transform can pass P7
  until both close.
- **A step's required outputs are not known to design.** The schema requires them; P7 and the
  construction check do not.
- **Declared input types are not checked.** The set-membership check declares `value` a string and is
  given a boolean. It compares by equality, so the check holds.
- **A malformed input still ends the run with the conjecture violated.**
- **V1 sits under `registry/collatz/`,** beside V0 under `registry/capability_contracts/`. Discovery is
  recursive, so both are found.
