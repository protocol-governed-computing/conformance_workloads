# Change Seed — workload / collatz

## Machine

```yaml
document:
  phase: p0
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P0_V0
registers:
  subdomain_purpose: |2

    The Collatz subdomain is a conformance workload: it computes the Collatz sequence for each number it
    is given, decides whether every sequence ends at 1, and records the result, so that a run shows the
    platform executing exactly what it declares. It decides nothing about any business.
  cr_type:
  - subdomain: collatz
    classification: MODIFY
    rationale: 'The termination gate cannot fail: its decision is a condition nothing runs.'
  business_vocabulary:
  - term: Sequence
    definition: The Collatz sequence computed for one number given to a run.
  - term: Termination
    definition: A sequence ending at 1.
  - term: Termination check
    definition: The capability that inspects every sequence of a run for termination.
  - term: Termination gate
    definition: The contract that runs the termination check, decides from its findings, and ends with the conjecture holding or violated.
  - term: Conjecture violated
    definition: The outcome of a run in which some sequence did not end at 1.
  requested_outcomes:
  - outcome: The termination gate refuses when a sequence does not end at 1, by a capability that answers with an outcome.
  - outcome: The termination gate routes on its steps' own outcomes, with no condition.
  - outcome: The termination check is unchanged, and still names the numbers whose sequences did not end at 1.
  - outcome: Every run that ends with the conjecture holding today ends the same way.
  known_facts:
  - fact: A sequence that does not end at 1 violates the conjecture, and the run ends with it violated.
    certainty: HIGH
  - fact: A decision is made by a capability, which answers with an outcome.
    certainty: HIGH
  - fact: Routing only says what happens next.
    certainty: HIGH
  - fact: A change of meaning is a new identity, so the gate is replaced by a new version.
    certainty: HIGH
  - fact: The platform already checks that a value is one of a declared set, and refuses when it is not.
    certainty: HIGH
  - fact: A violated run records nothing, before and after this change.
    certainty: HIGH
  system_beliefs:
  - belief: The termination gate routes the check's success to a condition, and execution reads it as going on.
    why_it_matters: It is why the gate cannot fail.
    verification_goal: Establish the gate's routing and what execution does with it.
  - belief: The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not.
    why_it_matters: The gate decides from what it reports.
    verification_goal: Establish what the check returns and when it refuses.
  - belief: The platform's set-membership check refuses a value not in its declared set.
    why_it_matters: It makes the gate's decision.
    verification_goal: Establish what it accepts, returns and refuses.
  - belief: The workflow routes the gate's violation to the conjecture violated, and records nothing on that path.
    why_it_matters: The new gate's refusal must end the run the same way.
    verification_goal: Establish the workflow's routes after the gate.
  - belief: Only the workflow names the gate.
    why_it_matters: Replacing it must account for everything that names it.
    verification_goal: Establish every artifact that names the gate.
  assumptions: []
  constraints:
  - constraint: Every run that ends with the conjecture holding today ends the same way, and records the same result.
    source: Business author
  - constraint: This change is built before the platform refuses routing to a condition.
    source: Business author
  business_invariants:
  - invariant: A run ends with the conjecture holding only when every sequence ends at 1.
  - invariant: The termination gate's outcome is the termination check's outcome.
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
  - business_object: What routing may say
    authoritative_owner: Execution topology
  - business_object: Whether a value is one of a declared set
    authoritative_owner: Capability transforms
  out_of_scope:
  - item: Telling a malformed input apart from a violation
    reason: Both end the run with the conjecture violated today; not this change.
  - item: Recording a violated run
    reason: A violated run records nothing today, and the business keeps that.
  governance_scope:
  - scope_item: collatz
    relationship: MODIFIED
  - scope_item: execution_topology
    relationship: ADJACENT
  - scope_item: capability_transforms
    relationship: ADJACENT
  clarification_requests: []
  acceptance_criteria:
  - criterion: A run in which every sequence ends at 1 ends with the conjecture holding, and records the same result as today.
  - criterion: A run in which a sequence does not end at 1 ends with the conjecture violated, and the check's findings in the trace name the numbers.
  - criterion: The termination gate declares no condition, and routes only to going on or ending.
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
