# Stage 2 — Domain Model Verification: workload / collatz

## Machine

```yaml
document:
  phase: p2
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
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
    meaning: True when every sequence ends at 1.
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
    source_finding: {phase: p1, register: requested_outcomes, row: 4}
  process_steps:
  - process: Evaluate the conjecture
    step: '1'
    action: Compute each number's sequence.
    record_produced: The sequences.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 4}
  - process: Evaluate the conjecture
    step: '2'
    action: Check every sequence for termination, in the termination gate.
    record_produced: Whether every sequence terminated, and which did not.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 1}
  - process: Evaluate the conjecture
    step: '3'
    action: On the gate's success, record the sequences and the check's findings; on its violation, end with the conjecture violated.
    record_produced: The run's results, when the conjecture holds.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 4}
  belief_verification:
  - belief: The termination gate routes the check's success to a condition, and execution reads it as going on.
    result: VERIFIED
    evidence: workload::CC_VERIFY_TERMINATION_V0 has one step, check_termination, routing SUCCESS to evaluate_conjecture and VIOLATION to exit; its evaluation block holds evaluate_conjecture, all_terminate equal to true, ending SUCCESS when it holds and VIOLATION when it does not. Execution runs the next step on any answer but exit, and this is the last step, so the gate ends SUCCESS whatever the check found.
    source_finding: {phase: p1, register: system_beliefs, row: 1}
  - belief: The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not.
    result: VERIFIED
    evidence: workload::CT_PURE_TERMINATION_CHECK_V0 returns all_terminate and non_terminating. Its implementation refuses only when sequences is missing or not a mapping; a sequence that is empty or does not end at 1 is listed in non_terminating and the check succeeds.
    source_finding: {phase: p1, register: system_beliefs, row: 2}
  - belief: The platform's set-membership check refuses a value not in its declared set.
    result: VERIFIED
    evidence: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 takes value and allowed_set, refuses by raising when value is not in allowed_set, and otherwise returns is_member true. It declares value a string; the runtime carries declared input types into the sealed transform and checks none, and the implementation compares by equality, so a boolean is judged as given.
    source_finding: {phase: p1, register: system_beliefs, row: 3}
  - belief: The workflow routes the gate's violation to the conjecture violated, and records nothing on that path.
    result: VERIFIED
    evidence: workload::WF_COLLATZ_CONJECTURE_V0 routes the gate's SUCCESS to the place that stores the results and its VIOLATION to EXIT_CONJECTURE_VIOLATED, which stores nothing and announces workload::EV_CONJECTURE_EVALUATED_V0. The store place binds all_terminate and non_terminating from the gate's place; compiled, each binding names the contract the place runs, by address.
    source_finding: {phase: p1, register: system_beliefs, row: 4}
  - belief: Only the workflow names the gate.
    result: VERIFIED
    evidence: si.artifact.refs reports the gate named by workload::WF_COLLATZ_CONJECTURE_V0, which runs it, and reached from workload::CC_COMPUTE_SEQUENCES_V0 by a route, which names nothing.
    source_finding: {phase: p1, register: system_beliefs, row: 5}
  pps_baseline_fqdns:
  - capability: Checking termination
    fqdn: workload::CT_PURE_TERMINATION_CHECK_V0
    what_it_does: Reports whether every sequence ends at 1, and which do not.
    fit: EXACT
    cannot_do: Nothing for this purpose; it is unchanged.
  - capability: Checking set membership
    fqdn: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0
    what_it_does: Refuses a value not in a declared set.
    fit: EXACT
    cannot_do: Nothing for this purpose; it makes the gate's decision.
  - capability: The termination gate
    fqdn: workload::CC_VERIFY_TERMINATION_V0
    what_it_does: Runs the check and routes on a condition.
    fit: MISMATCH
    cannot_do: Its condition is never run, so it cannot fail.
  - capability: Evaluating the conjecture
    fqdn: workload::WF_COLLATZ_CONJECTURE_V0
    what_it_does: Computes, gates and records a run.
    fit: EXACT
    cannot_do: Nothing for this purpose; it is re-pointed.
  - capability: Recording the results
    fqdn: workload::CC_STORE_RESULTS_V0
    what_it_does: Stores the sequences and the check's findings.
    fit: EXACT
    cannot_do: Nothing for this purpose; it is unchanged.
  gaps:
  - gap: The termination gate's decision is a condition nothing runs.
    severity: CRITICAL
    impact: A run whose sequence did not end at 1 is recorded as proving the conjecture.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 1}
  architectural_observations:
  - observation: A workflow binding names a place, and the place names the contract.
    evidence: The compiler maps each place's label to the address of the contract it runs, so a place that keeps its label and runs a new contract keeps every binding that reads it.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 4}
  - observation: A check's refusal is routed like any other outcome.
    evidence: A transform that refuses ends its step VIOLATION, and a step routing VIOLATION to exit ends the gate with it.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 3}
  - observation: On the gate's success every sequence terminated.
    evidence: Once the gate refuses otherwise, all_terminate is true and non_terminating empty whenever the results are recorded, as on every run that holds today.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 2}
  - observation: A step's outputs are surfaced before a later step refuses.
    evidence: The gate's outputs are mapped from the check in its first step, so a refusal in the second leaves the check's findings in the step's record.
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 3}
  discovery_concerns:
  - concern: A malformed input and a violation end the run the same way.
    evidence: The check refuses a malformed input with the same outcome, so both end with the conjecture violated.
    severity: MINOR
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 2}
  - concern: The set-membership check declares its value a string, and is given a boolean.
    evidence: Declared input types are carried and not checked, so the comparison holds, but the declaration and the use disagree.
    severity: MINOR
    evidence_status: OBSERVED
    source_finding: {phase: p2, register: belief_verification, row: 3}
  open_questions: null
```

Every belief the change request declared is resolved against the pinned composition. The termination
gate and the termination check were read with the check's implementation, the platform's
set-membership check was read with its implementation, the workflow's routes and bindings were read as
declared and as compiled, and inspection was asked what names the gate.

---

## 1. Business Entities

## 2. Business Processes

## 3. Belief Verification — THE SPINE

## 4. PPS Baseline — What Already Exists

## 5. Gap Analysis — What Is Missing

## 6. Architectural Observations

## 7. Discovery Concerns

## 8. Open Questions
