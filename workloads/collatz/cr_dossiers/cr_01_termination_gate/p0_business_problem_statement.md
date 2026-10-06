# Business Problem Statement

**Project Name:** workload — Collatz termination gate

## 1. Context

The Collatz workload proves that the platform runs what it declares. It computes the sequence for each
number it is given, checks that every sequence ends at 1, and records the result. A run where every
sequence ends at 1 ends with the conjecture holding. A run where one does not ends with the
conjecture violated.

The check of termination says what it found: whether every sequence ended at 1, and which did not.
The decision is not made by the check. The contract that runs it routes the check's success to a
condition, "every sequence ended at 1", which ends the contract one way when it holds and the other
way when it does not.

Nothing runs that condition. Execution reads it as "go on", so the contract succeeds whatever the
check found. A run in which a sequence did not end at 1 would end with the conjecture holding and be
recorded as proof. The workload meant to show that the platform runs what it declares does not.

The platform is changing so that routing says only "go on" or "end", and a decision is always made by
a capability. Once it does, this contract can no longer be built.

---

## 2. Problem Statement

**The termination gate cannot fail: its decision is a condition nothing runs, so a run whose sequence
did not end at 1 is recorded as proving the conjecture.**

This change shall:

- have the gate decide with a capability: after the check reports, a second step refuses unless
  every sequence ended at 1;
- have the gate route on its steps' own outcomes, with no condition;
- keep the check unchanged, so the numbers whose sequences did not end at 1 stay in what it reports;
- keep every run that ends with the conjecture holding today ending the same way.

### What the business already decided

These are settled and are not reopened by this change:

- **A sequence that does not end at 1 violates the conjecture**, and the run ends with it violated.
- **A decision is made by a capability, which answers with an outcome.** Routing only says what
  happens next.
- **A change of meaning is a new identity.** The gate is replaced by a new version, and the workflow
  names it. The check's meaning does not change.

---

## 3. Clarifications answered by the business author

- **Is the record of a violated run changed?** No. A violated run records nothing today and records
  nothing after this change. The numbers stay in the check's findings, in the run's trace.
- **Is a new capability written for the decision?** No. The platform already checks that a value is
  one of a declared set, and refuses when it is not.
- **Is a malformed input told apart from a violation?** No. Both end the run with the conjecture
  violated today, and that is out of scope here.
