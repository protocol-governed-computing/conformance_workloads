# Change Seed — workload / collatz

## Machine

```yaml
document:
  phase: p0
  domain: workload
  subdomain: collatz
  cr: cr_02_typed_decision
  rule_set: transformation.schemas.REGISTER_SCHEMA_P0_V0
registers:
  subdomain_purpose: |2

    The Collatz subdomain is a conformance workload: it computes the Collatz sequence for each number it
    is given, decides whether every sequence ends at 1, and records the result, so that a run shows the
    platform executing exactly what it declares. It decides nothing about any business.
  cr_type:
  - subdomain: collatz
    classification: MODIFY
    rationale: The termination gate decides by giving a capability a value of a type the capability does not declare.
  business_vocabulary:
  - term: Sequence
    definition: The Collatz sequence computed for one number given to a run.
  - term: Termination
    definition: A sequence ending at 1.
  - term: Termination check
    definition: The capability that inspects every sequence of a run for termination.
  - term: Termination gate
    definition: The contract that runs the termination check, decides from its findings, and ends with the conjecture holding or violated.
  - term: Termination decision
    definition: The gate's step that refuses unless every sequence ended at 1.
  - term: Conjecture violated
    definition: The outcome of a run in which some sequence did not end at 1.
  requested_outcomes:
  - outcome: The termination gate decides with the platform's capability that refuses unless a boolean is true.
  - outcome: The termination check is unchanged, and still names the numbers whose sequences did not end at 1.
  - outcome: Every run decides and records exactly as it does today.
  known_facts:
  - fact: A sequence that does not end at 1 violates the conjecture, and the run ends with it violated.
    certainty: HIGH
  - fact: A decision is made by a capability, which answers with an outcome.
    certainty: HIGH
  - fact: Routing only says what happens next.
    certainty: HIGH
  - fact: A capability is given only values of the types it declares.
    certainty: HIGH
  - fact: A change of meaning is a new identity, so the gate is replaced by a new version.
    certainty: HIGH
  - fact: The platform has a capability that succeeds when a boolean is true and refuses when it is false.
    certainty: HIGH
  system_beliefs:
  - belief: The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string.
    why_it_matters: It is what this change corrects.
    verification_goal: Establish the gate's decision step, what it gives the check, and what the check declares.
  - belief: The termination check reports whether every sequence ended at 1 as a boolean.
    why_it_matters: The decision is made on that value.
    verification_goal: Establish the type the check declares for what it reports.
  - belief: The platform's capability that refuses unless a boolean is true declares its value a boolean.
    why_it_matters: It makes the gate's decision.
    verification_goal: Establish what it accepts, returns and refuses.
  - belief: Only the workflow names the gate.
    why_it_matters: Replacing it must account for everything that names it.
    verification_goal: Establish every artifact that names the gate.
  assumptions: []
  constraints:
  - constraint: Every run decides and records exactly as it does today.
    source: Business author
  - constraint: This change is built before the platform refuses a step given a value of a type it does not declare.
    source: Business author
  business_invariants:
  - invariant: A run ends with the conjecture holding only when every sequence ends at 1.
  - invariant: A capability is given only values of the types it declares.
  lifecycle_states:
  - object: Termination gate
    state: In force
    meaning: Run by the Collatz workflow.
  - object: Termination gate
    state: Stood down
    meaning: Replaced by the version this change adds, kept in the record and out of reach.
  business_events: []
  authority_boundaries:
  - business_object: Whether every sequence ends at 1
    authoritative_owner: Collatz
  - business_object: Whether a boolean is true
    authoritative_owner: Capability transforms
  out_of_scope:
  - item: Telling a malformed input apart from a violation
    reason: Both end the run with the conjecture violated today; not this change.
  - item: Refusing a step given a value of a type it does not declare
    reason: The platform's rule, made separately.
  governance_scope:
  - scope_item: collatz
    relationship: MODIFIED
  - scope_item: capability_transforms
    relationship: ADJACENT
  clarification_requests: []
  acceptance_criteria:
  - criterion: A run in which every sequence ends at 1 ends with the conjecture holding, and records the same result as today.
  - criterion: A run in which a sequence does not end at 1 ends with the conjecture violated, and the check's findings in the trace name the numbers.
  - criterion: Every value the gate gives a capability is of the type the capability declares.
  - criterion: The old gate is stood down, kept in the record and out of reach.
  - criterion: The workflow names the new gate, and decides as it does today.
  identity_and_sameness: []
  lifecycle_transitions:
  - object: Termination gate
    from_state: In force
    to_state: Stood down
    triggered_by: This change adds its successor
    cascade: The workflow is re-pointed
  operation_refusals:
  - operation: Gating the conjecture
    refused_when: A sequence does not end at 1
    business_reason: It violates the conjecture.
  authority_deferrals: []
```

Reorganized faithfully from `p0_business_problem_statement.md`, including the clarifications its
author answered. Human input only — nothing here was added, decided or designed by the pipeline.

---

## 0. Subdomain Purpose

## 1. CR Type

## 2. Business Vocabulary

## 3. Requested Outcomes

## 4. Known Facts — Business Truths

## 5. Existing-System Beliefs — Requiring Verification

*Not facts. Each is a discovery target the agent must verify against the snapshot at P2.*

## 6. Assumptions

## 7. Constraints

## 8. Business Invariants

## 9. Lifecycle States

## 10. Business Events

## 11. Authority Boundaries

## 12. Out of Scope

## 13. Governance Scope

## 14. Clarification Requests

## 15. Acceptance Criteria

## 16. Identity and Sameness

## 17. Lifecycle Transitions

## 18. Operation Refusals

## 19. Authority Deferrals
