# Stage 3 — Analysis Loop: workload / collatz

## Machine

```yaml
document:
  phase: p3
  domain: workload
  subdomain: collatz
  cr: cr_02_typed_decision
  rule_set: transformation.schemas.REGISTER_SCHEMA_P3_V0
registers:
  analysis_findings:
  - question_id: Q1
    finding: The gate's new version runs the termination check unchanged, then the platform's capability that refuses unless a boolean is true, on all_terminate.
    impact: Every value the gate gives a capability is of the type the capability declares.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 gaps #1; S2 belief_verification #3'
  - question_id: Q2
    finding: Both steps route SUCCESS to continue and VIOLATION to exit, as today. The gate's inputs, outputs and allowed outcomes are unchanged, and conjecture_holds is mapped from the new capability's held.
    impact: The gate's outcome is its steps' outcomes, as today.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 architectural_observations #2'
  - question_id: Q3
    finding: 'The workflow is re-pointed: the place that runs the gate runs its new version, with the same label, routes and bindings.'
    impact: The run decides as it does today, and the store reads the same findings.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 architectural_observations #1'
  - question_id: Q4
    finding: A malformed input still ends with the conjecture violated.
    impact: Accepted; it does not change what a run decides.
    evidence_status: OBSERVED
    confidence: HIGH
    resolution_status: CLOSED
    evidence: 'S2 discovery_concerns #1'
  verification_results:
  - item: The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string.
    origin: {phase: p2, register: belief_verification, row: 1}
    result: CONFIRMED
    evidence: Resolved in Q1
  - item: The termination check reports whether every sequence ended at 1 as a boolean.
    origin: {phase: p2, register: belief_verification, row: 2}
    result: CONFIRMED
    evidence: Kept unchanged; resolved in Q1
  - item: The platform's capability that refuses unless a boolean is true declares its value a boolean.
    origin: {phase: p2, register: belief_verification, row: 3}
    result: CONFIRMED
    evidence: Resolved in Q1
  - item: Only the workflow names the gate.
    origin: {phase: p2, register: belief_verification, row: 4}
    result: CONFIRMED
    evidence: Resolved in Q3
  - item: A malformed input and a violation end the run the same way.
    origin: {phase: p2, register: discovery_concerns, row: 1}
    result: CONFIRMED
    evidence: Accepted in Q4
  dependency_discoveries:
  - dependency: The termination gate
    type: Capability contract
    disposition: AUTHOR_NEW
    evidence: workload::CC_VERIFY_TERMINATION_V1 is replaced by its next version
  - dependency: The termination check
    type: Capability transform
    disposition: REUSE
    evidence: workload::CT_PURE_TERMINATION_CHECK_V0, unchanged
  - dependency: Requiring a boolean true
    type: Capability transform
    disposition: REUSE
    evidence: capability_transforms::CT_PURE_REQUIRE_TRUE_V0, unchanged
  - dependency: Evaluating the conjecture
    type: Workflow
    disposition: EXISTING
    evidence: workload::WF_COLLATZ_CONJECTURE_V0, re-pointed
  impact_analysis:
  - artifact: workload::CC_VERIFY_TERMINATION_V1
    impact_scope: Stood down; run by one workflow
    consumer_count: '1'
    evidence: The record names workload::WF_COLLATZ_CONJECTURE_V0, and a route from workload::CC_COMPUTE_SEQUENCES_V0 that names nothing
  authoring_decisions:
  - capability: Gate the conjecture
    decision: AUTHOR_NEW
    rationale: A new version that decides with the platform's capability that refuses unless a boolean is true.
    alternatives_checked: 'Declaring the set-membership check''s value of any type was rejected: it changes a platform capability every domain uses. A termination check that refuses was rejected: the design language cannot yet admit a new workload transform.'
    source_finding: {phase: p3, register: analysis_findings, key: Q1}
  placement_decision:
  - decision: EXTEND
    subdomain: collatz
    rationale: Whether a run holds the conjecture is Collatz's.
    source_finding: {phase: p3, register: analysis_findings, key: Q1}
  saturation:
  - criterion: No unresolved CRITICAL gaps
    status: SATISFIED
    evidence: The one gap is MAJOR and resolves in Q1
  - criterion: No open analyst questions
    status: SATISFIED
    evidence: All four findings are CLOSED
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

The gap and the concern carried from Stage 2 are driven to committed decisions against the pinned
composition.

---

## 1. Analysis Findings

## 2. Verification Results

## 3. Dependency Discoveries

## 4. Impact Analysis

## 5. Authoring Decisions

## 6. Placement Decision

## 7. Saturation Assessment
