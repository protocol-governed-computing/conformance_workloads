# Stage 2 — Domain Model Verification: workload / collatz

## Machine

```yaml
document:
  phase: p2
  domain: workload
  subdomain: collatz
  cr: cr_02_typed_decision
  rule_set: transformation.schemas.REGISTER_SCHEMA_P2_V0
registers:
  entities:
  - entity: The Sequence
    description: The Collatz sequence computed for one number given to a run.
    store_model: Recorded with the run's results when the conjecture holds. Unchanged by this change.
    evidence_status: OBSERVED
    source_finding: {phase: p1, register: business_vocabulary, row: 1}
  - entity: The Termination Check
    description: The capability that inspects every sequence of a run for termination.
    store_model: Not stored; run by the termination gate.
    evidence_status: OBSERVED
    source_finding: {phase: p1, register: business_vocabulary, row: 3}
  - entity: The Termination Gate
    description: The contract that runs the check, decides from its findings, and ends with the conjecture holding or violated.
    store_model: Not stored; run by the Collatz workflow.
    evidence_status: OBSERVED
    source_finding: {phase: p1, register: business_vocabulary, row: 4}
  entity_attributes:
  - entity: The Termination Check
    attribute: Whether every sequence terminated
    meaning: True when every sequence ends at 1, reported as a boolean.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 2}
  - entity: The Termination Check
    attribute: The numbers that did not terminate
    meaning: The numbers whose sequences did not end at 1.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 2}
  business_processes:
  - process: Evaluate the conjecture
    initiator: A caller submitting numbers
    outcome: The run ends with the conjecture holding, recorded, or violated, not recorded.
    evidence_status: OBSERVED
    source_finding: {phase: p1, register: requested_outcomes, row: 3}
  process_steps:
  - process: Evaluate the conjecture
    step: '1'
    action: Check every sequence for termination, in the termination gate.
    record_produced: Whether every sequence terminated, and which did not.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 2}
  - process: Evaluate the conjecture
    step: '2'
    action: 'Decide, in the termination gate: refuse unless every sequence terminated.'
    record_produced: Nothing new.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 1}
  belief_verification:
  - belief: The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string.
    result: VERIFIED
    evidence: workload::CC_VERIFY_TERMINATION_V1 runs check_termination, then require_every_sequence_terminated, which runs capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 with value bound to the check's all_terminate and allowed_set holding only true. The set-membership check declares value a string. Its implementation compares by equality, so the decision comes out right.
    source_finding: {phase: p1, register: system_beliefs, row: 1}
  - belief: The termination check reports whether every sequence ended at 1 as a boolean.
    result: VERIFIED
    evidence: workload::CT_PURE_TERMINATION_CHECK_V0 declares the output all_terminate a boolean and non_terminating an array.
    source_finding: {phase: p1, register: system_beliefs, row: 2}
  - belief: The platform's capability that refuses unless a boolean is true declares its value a boolean.
    result: VERIFIED
    evidence: capability_transforms::CT_PURE_REQUIRE_TRUE_V0 declares value a boolean and the output held a boolean. It refuses by raising when the value is false or not a boolean, and otherwise returns held true. It is on the platform's closed transform surface.
    source_finding: {phase: p1, register: system_beliefs, row: 3}
  - belief: Only the workflow names the gate.
    result: VERIFIED
    evidence: si.artifact.refs reports the gate named by workload::WF_COLLATZ_CONJECTURE_V0, which runs it, and reached from workload::CC_COMPUTE_SEQUENCES_V0 by a route, which names nothing.
    source_finding: {phase: p1, register: system_beliefs, row: 4}
  pps_baseline_fqdns:
  - capability: Checking termination
    fqdn: workload::CT_PURE_TERMINATION_CHECK_V0
    what_it_does: Reports whether every sequence ends at 1, and which do not.
    fit: EXACT
    cannot_do: Nothing for this purpose; it is unchanged.
  - capability: Requiring a boolean true
    fqdn: capability_transforms::CT_PURE_REQUIRE_TRUE_V0
    what_it_does: Refuses unless a boolean is true.
    fit: EXACT
    cannot_do: Nothing for this purpose; it makes the gate's decision.
  - capability: Checking set membership
    fqdn: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    what_it_does: Refuses a string not in a declared set.
    fit: MISMATCH
    cannot_do: It declares a string, and the gate decides on a boolean.
  - capability: The termination gate
    fqdn: workload::CC_VERIFY_TERMINATION_V1
    what_it_does: Runs the check and decides with the set-membership check.
    fit: MISMATCH
    cannot_do: It gives the set-membership check a value of a type it does not declare.
  - capability: Evaluating the conjecture
    fqdn: workload::WF_COLLATZ_CONJECTURE_V0
    what_it_does: Computes, gates and records a run.
    fit: EXACT
    cannot_do: Nothing for this purpose; it is re-pointed.
  gaps:
  - gap: The termination gate gives a capability a value of a type it does not declare.
    severity: MAJOR
    impact: The gate cannot be built once the platform refuses such a step.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 1}
  architectural_observations:
  - observation: A workflow binding names a place, and the place names the contract.
    evidence: The place labelled CC_VERIFY_TERMINATION_V0 runs workload::CC_VERIFY_TERMINATION_V1 by its code, so a place that runs a new contract keeps every binding that reads it.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 4}
  - observation: The two capabilities decide alike on a boolean.
    evidence: Each succeeds when the value is true and refuses when it is false, so every run decides as today.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 3}
  discovery_concerns:
  - concern: A malformed input and a violation end the run the same way.
    evidence: The check refuses a malformed input with the same outcome, so both end with the conjecture violated.
    severity: MINOR
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 2}
  open_questions: null
```

Every belief the change request declared is resolved against the pinned composition. The termination
gate was read as declared and as compiled, the termination check and both platform capabilities were
read with their declarations, and inspection was asked what names the gate.

---

## 1. Business Entities

## 2. Business Processes

## 3. Belief Verification — THE SPINE

## 4. PPS Baseline — What Already Exists

## 5. Gap Analysis — What Is Missing

## 6. Architectural Observations

## 7. Discovery Concerns

## 8. Open Questions
