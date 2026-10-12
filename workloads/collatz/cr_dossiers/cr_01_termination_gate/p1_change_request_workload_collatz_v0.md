# Stage 1 — Change Request: Clarification & Fact Capture: workload / collatz

## Machine

```yaml
document:
  phase: p1
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P1_V0
registers:
  cr_type:
  - subdomain: collatz
    classification: MODIFY
    rationale: 'The termination gate cannot fail: its decision is a condition nothing runs.'
    source_finding: {phase: p0, register: cr_type, row: 1}
  business_vocabulary:
  - term: Sequence
    definition: The Collatz sequence computed for one number given to a run.
    source_finding: {phase: p0, register: business_vocabulary, row: 1}
  - term: Termination
    definition: A sequence ending at 1.
    source_finding: {phase: p0, register: business_vocabulary, row: 2}
  - term: Termination check
    definition: The capability that inspects every sequence of a run for termination.
    source_finding: {phase: p0, register: business_vocabulary, row: 3}
  - term: Termination gate
    definition: The contract that runs the termination check, decides from its findings, and ends with the conjecture holding or violated.
    source_finding: {phase: p0, register: business_vocabulary, row: 4}
  - term: Conjecture violated
    definition: The outcome of a run in which some sequence did not end at 1.
    source_finding: {phase: p0, register: business_vocabulary, row: 5}
  requested_outcomes:
  - outcome: The termination gate refuses when a sequence does not end at 1, by a capability that answers with an outcome.
    source_finding: {phase: p0, register: requested_outcomes, row: 1}
  - outcome: The termination gate routes on its steps' own outcomes, with no condition.
    source_finding: {phase: p0, register: requested_outcomes, row: 2}
  - outcome: The termination check is unchanged, and still names the numbers whose sequences did not end at 1.
    source_finding: {phase: p0, register: requested_outcomes, row: 3}
  - outcome: Every run that ends with the conjecture holding today ends the same way.
    source_finding: {phase: p0, register: requested_outcomes, row: 4}
  known_facts:
  - fact: A sequence that does not end at 1 violates the conjecture, and the run ends with it violated.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 1}
  - fact: A decision is made by a capability, which answers with an outcome.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 2}
  - fact: Routing only says what happens next.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 3}
  - fact: A change of meaning is a new identity, so the gate is replaced by a new version.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 4}
  - fact: The platform already checks that a value is one of a declared set, and refuses when it is not.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 5}
  - fact: A violated run records nothing, before and after this change.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 6}
  system_beliefs:
  - belief: The termination gate routes the check's success to a condition, and execution reads it as going on.
    why_it_matters: It is why the gate cannot fail.
    verification_goal: Establish the gate's routing and what execution does with it.
    source_finding: {phase: p0, register: system_beliefs, row: 1}
  - belief: The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not.
    why_it_matters: The gate decides from what it reports.
    verification_goal: Establish what the check returns and when it refuses.
    source_finding: {phase: p0, register: system_beliefs, row: 2}
  - belief: The platform's set-membership check refuses a value not in its declared set.
    why_it_matters: It makes the gate's decision.
    verification_goal: Establish what it accepts, returns and refuses.
    source_finding: {phase: p0, register: system_beliefs, row: 3}
  - belief: The workflow routes the gate's violation to the conjecture violated, and records nothing on that path.
    why_it_matters: The new gate's refusal must end the run the same way.
    verification_goal: Establish the workflow's routes after the gate.
    source_finding: {phase: p0, register: system_beliefs, row: 4}
  - belief: Only the workflow names the gate.
    why_it_matters: Replacing it must account for everything that names it.
    verification_goal: Establish every artifact that names the gate.
    source_finding: {phase: p0, register: system_beliefs, row: 5}
  assumptions: []
  constraints:
  - constraint: Every run that ends with the conjecture holding today ends the same way, and records the same result.
    source: Business author
    source_finding: {phase: p0, register: constraints, row: 1}
  - constraint: This change is built before the platform refuses routing to a condition.
    source: Business author
    source_finding: {phase: p0, register: constraints, row: 2}
  business_invariants:
  - invariant: A run ends with the conjecture holding only when every sequence ends at 1.
    source_finding: {phase: p0, register: business_invariants, row: 1}
  - invariant: The termination gate's outcome is the termination check's outcome.
    source_finding: {phase: p0, register: business_invariants, row: 2}
  lifecycle_states:
  - object: Termination gate
    state: In force
    meaning: Run by the Collatz workflow.
    source_finding: {phase: p0, register: lifecycle_states, row: 1}
  - object: Termination gate
    state: Stood down
    meaning: Replaced by the version this change adds, kept in the record and out of reach.
    source_finding: {phase: p0, register: lifecycle_states, row: 2}
  business_events: []
  authority_boundaries:
  - business_object: Whether every sequence ends at 1
    authoritative_owner: Collatz
    source_finding: {phase: p0, register: authority_boundaries, row: 1}
  - business_object: What routing may say
    authoritative_owner: Execution topology
    source_finding: {phase: p0, register: authority_boundaries, row: 2}
  - business_object: Whether a value is one of a declared set
    authoritative_owner: Capability transforms
    source_finding: {phase: p0, register: authority_boundaries, row: 3}
  out_of_scope:
  - item: Telling a malformed input apart from a violation
    reason: Both end the run with the conjecture violated today; not this change.
    source_finding: {phase: p0, register: out_of_scope, row: 1}
  - item: Recording a violated run
    reason: A violated run records nothing today, and the business keeps that.
    source_finding: {phase: p0, register: out_of_scope, row: 2}
  governance_scope:
  - scope_item: collatz
    relationship: MODIFIED
    source_finding: {phase: p0, register: governance_scope, row: 1}
  - scope_item: execution_topology
    relationship: ADJACENT
    source_finding: {phase: p0, register: governance_scope, row: 2}
  - scope_item: capability_transforms
    relationship: ADJACENT
    source_finding: {phase: p0, register: governance_scope, row: 3}
  clarification_requests: []
  acceptance_criteria:
  - criterion: A run in which every sequence ends at 1 ends with the conjecture holding, and records the same result as today.
    source_finding: {phase: p0, register: acceptance_criteria, row: 1}
  - criterion: A run in which a sequence does not end at 1 ends with the conjecture violated, and the check's findings in the trace name the numbers.
    source_finding: {phase: p0, register: acceptance_criteria, row: 2}
  - criterion: The termination gate declares no condition, and routes only to going on or ending.
    source_finding: {phase: p0, register: acceptance_criteria, row: 3}
  - criterion: The old gate is stood down, kept in the record and out of reach.
    source_finding: {phase: p0, register: acceptance_criteria, row: 4}
  - criterion: The workflow names the new gate, and decides as it does today.
    source_finding: {phase: p0, register: acceptance_criteria, row: 5}
  identity_and_sameness: []
  lifecycle_transitions:
  - object: Termination gate
    from_state: In force
    to_state: Stood down
    triggered_by: This change adds its successor
    cascade: The workflow is re-pointed
    source_finding: {phase: p0, register: lifecycle_transitions, row: 1}
  operation_refusals:
  - operation: Gating the conjecture
    refused_when: A sequence does not end at 1
    business_reason: It violates the conjecture.
    source_finding: {phase: p0, register: operation_refusals, row: 1}
  authority_deferrals: []
```

Projected from the change seed. Every row is the seed's own, cited to the section it was
said in. S1 interrogates and does not author: a question raised by restating the seed
amends the seed and is projected again, so no row here states business content the seed
does not.

---

## 1. CR Type

---

## 2. Business Vocabulary

---

## 3. Requested Outcomes

---

## 4. Known Facts — Business Truths

---

## 5. Existing-System Beliefs — Requiring Verification

---

## 6. Assumptions

---

## 7. Constraints

---

## 8. Business Invariants

---

## 9. Lifecycle States

---

## 10. Business Events

---

## 11. Authority Boundaries

---

## 12. Out of Scope

---

## 13. Governance Scope

---

## 14. Clarification Requests

---

## 15. Acceptance Criteria

---

## 16. Identity and Sameness

---

## 17. Lifecycle Transitions

---

## 18. Operation Refusals

---

## 19. Authority Deferrals

---

## gov_projection — Governed Handoff to Stage 2

| Direction | Fields |
|-----------|--------|
| **Consumes** ← CR seed | human elicitation answers (the seed) |
| **Emits** → Stage 2 | cr_type · business_vocabulary · requested_outcomes · known_facts · system_beliefs · assumptions · constraints · business_invariants · lifecycle_states · business_events · authority_boundaries · out_of_scope · governance_scope · clarification_requests · acceptance_criteria · identity_and_sameness · lifecycle_transitions · operation_refusals · authority_deferrals |
