# Stage 3 — Analysis Loop: workload / collatz

## Machine

```yaml
document:
  phase: p3
  domain: workload
  subdomain: collatz
  cr: cr_01_termination_gate
  rule_set: transformation.schemas.REGISTER_SCHEMA_P3_V0
registers:
  analysis_findings:
  - question_id: Q1
    finding: The gate's new version runs the termination check unchanged, then the platform's set-membership check on all_terminate against the set holding only true. The second refuses when a sequence did not end at 1.
    impact: The decision is made by a capability, which answers with an outcome.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 gaps #1; S2 belief_verification #3'
  - question_id: Q2
    finding: Both steps route SUCCESS to continue and VIOLATION to exit, and the gate declares no condition. As the last step, the second's continue ends the gate with SUCCESS.
    impact: The gate's outcome is its steps' outcomes, and it can fail.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 gaps #1; S2 architectural_observations #2'
  - question_id: Q3
    finding: The gate's outputs are mapped from the first step, as today, so the numbers whose sequences did not end at 1 are in the step's record when the second refuses.
    impact: The violated run is named in the trace.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 architectural_observations #4'
  - question_id: Q4
    finding: 'The workflow is re-pointed: the place that runs the gate runs its new version, with the same label, routes and bindings.'
    impact: The run decides as it does today, and the store reads the same findings.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 architectural_observations #1'
  - question_id: Q5
    finding: 'A run that holds records the same result as today: every sequence terminated, and none did not.'
    impact: The record is unchanged for every run that holds.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 architectural_observations #3'
  - question_id: Q6
    finding: 'A malformed input still ends with the conjecture violated, and the set-membership check''s declared string type is given a boolean. Both are accepted: the first as it is today, the second because declared types are not checked and the comparison is by equality.'
    impact: Accepted; neither changes what a run decides.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 discovery_concerns #1; S2 discovery_concerns #2'
  verification_results:
  - item: The termination gate routes the check's success to a condition, and execution reads it as going on.
    origin: {phase: p2, register: belief_verification, row: 1}
    result: CONFIRMED
    evidence: Resolved in Q1 and Q2
  - item: The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not.
    origin: {phase: p2, register: belief_verification, row: 2}
    result: CONFIRMED
    evidence: Kept unchanged; resolved in Q3
  - item: The platform's set-membership check refuses a value not in its declared set.
    origin: {phase: p2, register: belief_verification, row: 3}
    result: CONFIRMED
    evidence: Resolved in Q1
  - item: The workflow routes the gate's violation to the conjecture violated, and records nothing on that path.
    origin: {phase: p2, register: belief_verification, row: 4}
    result: CONFIRMED
    evidence: Resolved in Q4
  - item: Only the workflow names the gate.
    origin: {phase: p2, register: belief_verification, row: 5}
    result: CONFIRMED
    evidence: Resolved in Q4
  - item: A malformed input and a violation end the run the same way.
    origin: {phase: p2, register: discovery_concerns, row: 1}
    result: CONFIRMED
    evidence: Accepted in Q6
  - item: The set-membership check declares its value a string, and is given a boolean.
    origin: {phase: p2, register: discovery_concerns, row: 2}
    result: CONFIRMED
    evidence: Accepted in Q6
  dependency_discoveries:
  - dependency: The termination gate
    type: Capability contract
    disposition: AUTHOR_NEW
    evidence: workload::CC_VERIFY_TERMINATION_V0 is replaced by its next version
  - dependency: The termination check
    type: Capability transform
    disposition: REUSE
    evidence: workload::CT_PURE_TERMINATION_CHECK_V0, unchanged
  - dependency: Checking set membership
    type: Capability transform
    disposition: REUSE
    evidence: capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0, unchanged
  - dependency: Evaluating the conjecture
    type: Workflow
    disposition: EXISTING
    evidence: workload::WF_COLLATZ_CONJECTURE_V0, re-pointed
  - dependency: Recording the results
    type: Capability contract
    disposition: REUSE
    evidence: workload::CC_STORE_RESULTS_V0, unchanged
  impact_analysis:
  - artifact: workload::CC_VERIFY_TERMINATION_V0
    impact_scope: Stood down; run by one workflow
    consumer_count: '1'
    evidence: The record names workload::WF_COLLATZ_CONJECTURE_V0, and a route from workload::CC_COMPUTE_SEQUENCES_V0 that names nothing
  authoring_decisions:
  - capability: Gate the conjecture
    decision: AUTHOR_NEW
    rationale: A new version that decides with the platform's set-membership check and routes on its steps' outcomes.
    alternatives_checked: 'A new termination check that refuses was rejected: the design language cannot yet admit a new workload transform, and the platform already makes this decision. Running the condition at execution was rejected: routing is a lookup.'
    source_finding: {phase: p3, register: analysis_findings, key: Q1}
  placement_decision:
  - decision: EXTEND
    subdomain: collatz
    rationale: Whether a run holds the conjecture is Collatz's.
    source_finding: {phase: p3, register: analysis_findings, key: Q1}
  saturation:
  - criterion: No unresolved CRITICAL gaps
    status: SATISFIED
    evidence: The CRITICAL gap resolves in Q1 and Q2
  - criterion: No open analyst questions
    status: SATISFIED
    evidence: All six findings are CLOSED
  - criterion: No dependency expansion in the last pass
    status: SATISFIED
    evidence: The record names one referrer of the gate
  - criterion: Verification pass complete, no OVERTURNED item unresolved
    status: SATISFIED
    evidence: Every item CONFIRMED
  - criterion: Every INFERRED finding promoted to OBSERVED, explicitly accepted, or carried forward with a reason
    status: SATISFIED
    evidence: Every finding is OBSERVED
```

The gap and two concerns carried from Stage 2 are driven to committed decisions against the
pinned composition.

---

## 1. Analysis Findings

## 2. Verification Results

## 3. Dependency Discoveries

## 4. Impact Analysis

## 5. Authoring Decisions

## 6. Placement Decision

## 7. Saturation Assessment
