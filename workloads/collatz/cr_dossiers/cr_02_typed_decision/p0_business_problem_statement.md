# Business Problem Statement

**Project Name:** workload — Collatz termination decision, as declared

## 1. Context

The Collatz workload proves that the platform runs what it declares. Its termination gate runs the
termination check, which reports whether every sequence ended at 1. Then the gate decides: a second
step refuses unless every sequence ended at 1.

That second step is the platform's set-membership check, asked whether the check's answer is one of
a set that holds only true. The set-membership check declares the value it is given a string. The
gate gives it a boolean. The check compares by equality, so the decision comes out right, but the
gate uses a capability against its own declaration.

The workload meant to show that the platform runs what it declares gives a capability a value of a
type it does not declare. The platform is about to refuse any step that does so. Once it does, this
gate can no longer be built.

The platform now has a capability for exactly this decision: it succeeds when a boolean is true and
refuses when it is false.

---

## 2. Problem Statement

**The termination gate decides by giving a capability a value of a type the capability does not
declare.**

This change shall:

- have the gate decide with the platform's capability that refuses unless a boolean is true;
- keep the termination check unchanged, so the numbers whose sequences did not end at 1 stay in what
  it reports;
- keep every run deciding and recording exactly as it does today.

### What the business already decided

These are settled and are not reopened by this change:

- **A sequence that does not end at 1 violates the conjecture**, and the run ends with it violated.
- **A decision is made by a capability, which answers with an outcome.** Routing only says what
  happens next.
- **A capability is given only values of the types it declares.**
- **A change of meaning is a new identity.** The gate is replaced by a new version, and the workflow
  names it.

---

## 3. Clarifications answered by the business author

- **Is a new capability written for the decision?** No. The platform already has a capability that
  refuses unless a boolean is true.
- **Does any run decide differently?** No. A run in which every sequence ends at 1 holds, and any
  other is violated, as today.
- **Is a malformed input told apart from a violation?** No. That stays out of scope.
