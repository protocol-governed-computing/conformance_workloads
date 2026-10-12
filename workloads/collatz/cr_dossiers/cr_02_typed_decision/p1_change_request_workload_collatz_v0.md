# Stage 1 — Change Request: Clarification & Fact Capture: workload / collatz

## Machine

```yaml
document:
  phase: p1
  domain: workload
  subdomain: collatz
  cr: cr_02_typed_decision
  rule_set: transformation.schemas.REGISTER_SCHEMA_P1_V0
registers:
  cr_type:
  - subdomain: collatz
    classification: MODIFY
    rationale: The termination gate decides by giving a capability a value of a type the capability does not declare.
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
  - term: Termination decision
    definition: The gate's step that refuses unless every sequence ended at 1.
    source_finding: {phase: p0, register: business_vocabulary, row: 5}
  - term: Conjecture violated
    definition: The outcome of a run in which some sequence did not end at 1.
    source_finding: {phase: p0, register: business_vocabulary, row: 6}
  requested_outcomes:
  - outcome: The termination gate decides with the platform's capability that refuses unless a boolean is true.
    source_finding: {phase: p0, register: requested_outcomes, row: 1}
  - outcome: The termination check is unchanged, and still names the numbers whose sequences did not end at 1.
    source_finding: {phase: p0, register: requested_outcomes, row: 2}
  - outcome: Every run decides and records exactly as it does today.
    source_finding: {phase: p0, register: requested_outcomes, row: 3}
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
  - fact: A capability is given only values of the types it declares.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 4}
  - fact: A change of meaning is a new identity, so the gate is replaced by a new version.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 5}
  - fact: The platform has a capability that succeeds when a boolean is true and refuses when it is false.
    certainty: HIGH
    source_finding: {phase: p0, register: known_facts, row: 6}
  system_beliefs:
  - belief: The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string.
    why_it_matters: It is what this change corrects.
    verification_goal: Establish the gate's decision step, what it gives the check, and what the check declares.
    source_finding: {phase: p0, register: system_beliefs, row: 1}
  - belief: The termination check reports whether every sequence ended at 1 as a boolean.
    why_it_matters: The decision is made on that value.
    verification_goal: Establish the type the check declares for what it reports.
    source_finding: {phase: p0, register: system_beliefs, row: 2}
  - belief: The platform's capability that refuses unless a boolean is true declares its value a boolean.
    why_it_matters: It makes the gate's decision.
    verification_goal: Establish what it accepts, returns and refuses.
    source_finding: {phase: p0, register: system_beliefs, row: 3}
  - belief: Only the workflow names the gate.
    why_it_matters: Replacing it must account for everything that names it.
    verification_goal: Establish every artifact that names the gate.
    source_finding: {phase: p0, register: system_beliefs, row: 4}
  assumptions: []
  constraints:
  - constraint: Every run decides and records exactly as it does today.
    source: Business author
    source_finding: {phase: p0, register: constraints, row: 1}
  - constraint: This change is built before the platform refuses a step given a value of a type it does not declare.
    source: Business author
    source_finding: {phase: p0, register: constraints, row: 2}
  business_invariants:
  - invariant: A run ends with the conjecture holding only when every sequence ends at 1.
    source_finding: {phase: p0, register: business_invariants, row: 1}
  - invariant: A capability is given only values of the types it declares.
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
  - business_object: Whether a boolean is true
    authoritative_owner: Capability transforms
    source_finding: {phase: p0, register: authority_boundaries, row: 2}
  out_of_scope:
  - item: Telling a malformed input apart from a violation
    reason: Both end the run with the conjecture violated today; not this change.
    source_finding: {phase: p0, register: out_of_scope, row: 1}
  - item: Refusing a step given a value of a type it does not declare
    reason: The platform's rule, made separately.
    source_finding: {phase: p0, register: out_of_scope, row: 2}
  governance_scope:
  - scope_item: collatz
    relationship: MODIFIED
    source_finding: {phase: p0, register: governance_scope, row: 1}
  - scope_item: capability_transforms
    relationship: ADJACENT
    source_finding: {phase: p0, register: governance_scope, row: 2}
  clarification_requests: []
  acceptance_criteria:
  - criterion: A run in which every sequence ends at 1 ends with the conjecture holding, and records the same result as today.
    source_finding: {phase: p0, register: acceptance_criteria, row: 1}
  - criterion: A run in which a sequence does not end at 1 ends with the conjecture violated, and the check's findings in the trace name the numbers.
    source_finding: {phase: p0, register: acceptance_criteria, row: 2}
  - criterion: Every value the gate gives a capability is of the type the capability declares.
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
