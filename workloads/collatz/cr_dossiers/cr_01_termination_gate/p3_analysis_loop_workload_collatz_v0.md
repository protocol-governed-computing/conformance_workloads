# Stage 3 — Analysis Loop: workload / collatz

**Stage:** 3 — Analysis Loop

**CR:** cr_01_termination_gate

**Status:** DRAFT

**Feeds:** Stage 4 — Business Model

The gap and two concerns carried from Stage 2 are driven to committed decisions against the
pinned composition.

---

## 1. Analysis Findings

<!-- register:analysis_findings -->
| Question Id | Finding | Impact | Evidence Status (OBSERVED, INFERRED, OPEN) | Confidence (HIGH, MEDIUM, LOW) | Resolution Status (CLOSED, OPEN) | Evidence |
|-------------|---------|--------|-----------------|------------|-------------------|----------|
| Q1 | The gate's new version runs the termination check unchanged, then the platform's set-membership check on all_terminate against the set holding only true. The second refuses when a sequence did not end at 1. | The decision is made by a capability, which answers with an outcome. | OBSERVED | HIGH | CLOSED | S2 gaps #1; S2 belief_verification #3 |
| Q2 | Both steps route SUCCESS to continue and VIOLATION to exit, and the gate declares no condition. As the last step, the second's continue ends the gate with SUCCESS. | The gate's outcome is its steps' outcomes, and it can fail. | OBSERVED | HIGH | CLOSED | S2 gaps #1; S2 architectural_observations #2 |
| Q3 | The gate's outputs are mapped from the first step, as today, so the numbers whose sequences did not end at 1 are in the step's record when the second refuses. | The violated run is named in the trace. | OBSERVED | HIGH | CLOSED | S2 architectural_observations #4 |
| Q4 | The workflow is re-pointed: the place that runs the gate runs its new version, with the same label, routes and bindings. | The run decides as it does today, and the store reads the same findings. | OBSERVED | HIGH | CLOSED | S2 architectural_observations #1 |
| Q5 | A run that holds records the same result as today: every sequence terminated, and none did not. | The record is unchanged for every run that holds. | OBSERVED | HIGH | CLOSED | S2 architectural_observations #3 |
| Q6 | A malformed input still ends with the conjecture violated, and the set-membership check's declared string type is given a boolean. Both are accepted: the first as it is today, the second because declared types are not checked and the comparison is by equality. | Accepted; neither changes what a run decides. | OBSERVED | HIGH | CLOSED | S2 discovery_concerns #1; S2 discovery_concerns #2 |

## 2. Verification Results

<!-- register:verification_results -->
| Item | Origin | Result (CONFIRMED, OVERTURNED) | Evidence |
|------|--------|--------------------------------|----------|
| The termination gate routes the check's success to a condition, and execution reads it as going on. | S2 belief_verification #1 | CONFIRMED | Resolved in Q1 and Q2 |
| The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not. | S2 belief_verification #2 | CONFIRMED | Kept unchanged; resolved in Q3 |
| The platform's set-membership check refuses a value not in its declared set. | S2 belief_verification #3 | CONFIRMED | Resolved in Q1 |
| The workflow routes the gate's violation to the conjecture violated, and records nothing on that path. | S2 belief_verification #4 | CONFIRMED | Resolved in Q4 |
| Only the workflow names the gate. | S2 belief_verification #5 | CONFIRMED | Resolved in Q4 |
| A malformed input and a violation end the run the same way. | S2 discovery_concerns #1 | CONFIRMED | Accepted in Q6 |
| The set-membership check declares its value a string, and is given a boolean. | S2 discovery_concerns #2 | CONFIRMED | Accepted in Q6 |

## 3. Dependency Discoveries

<!-- register:dependency_discoveries -->
| Dependency | Type | Disposition (EXISTING, REUSE, AUTHOR_NEW, INVESTIGATE) | Evidence |
|------------|------|------------------------|----------|
| The termination gate | Capability contract | AUTHOR_NEW | workload::CC_VERIFY_TERMINATION_V0 is replaced by its next version |
| The termination check | Capability transform | REUSE | workload::CT_PURE_TERMINATION_CHECK_V0, unchanged |
| Checking set membership | Capability transform | REUSE | capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0, unchanged |
| Evaluating the conjecture | Workflow | EXISTING | workload::WF_COLLATZ_CONJECTURE_V0, re-pointed |
| Recording the results | Capability contract | REUSE | workload::CC_STORE_RESULTS_V0, unchanged |

## 4. Impact Analysis

<!-- register:impact_analysis -->
| Artifact | Impact Scope | Consumer Count | Evidence |
|----------|--------------|----------------|----------|
| workload::CC_VERIFY_TERMINATION_V0 | Stood down; run by one workflow | 1 | The record names workload::WF_COLLATZ_CONJECTURE_V0, and a route from workload::CC_COMPUTE_SEQUENCES_V0 that names nothing |

## 5. Authoring Decisions

<!-- register:authoring_decisions business_language=capability -->
| Capability | Decision (REUSE, EXTEND, AUTHOR_NEW) | Rationale | Alternatives Checked | Source Finding |
|------------|----------|-----------|----------------------|----------------|
| Gate the conjecture | AUTHOR_NEW | A new version that decides with the platform's set-membership check and routes on its steps' outcomes. | A new termination check that refuses was rejected: the design language cannot yet admit a new workload transform, and the platform already makes this decision. Running the condition at execution was rejected: routing is a lookup. | S3 analysis_findings Q1 |

## 6. Placement Decision

<!-- register:placement_decision business_language=rationale -->
| Decision (NEW_SUBDOMAIN, EXTEND) | Subdomain | Rationale | Source Finding |
|----------|-----------|-----------|----------------|
| EXTEND | collatz | Whether a run holds the conjecture is Collatz's. | S3 analysis_findings Q1 |

## 7. Saturation Assessment

<!-- register:saturation business_language=criterion -->
| Criterion | Status (SATISFIED, NOT_SATISFIED) | Evidence |
|-----------|--------|----------|
| No unresolved CRITICAL gaps | SATISFIED | The CRITICAL gap resolves in Q1 and Q2 |
| No open analyst questions | SATISFIED | All six findings are CLOSED |
| No dependency expansion in the last pass | SATISFIED | The record names one referrer of the gate |
| Verification pass complete, no OVERTURNED item unresolved | SATISFIED | Every item CONFIRMED |
| Every INFERRED finding promoted to OBSERVED, explicitly accepted, or carried forward with a reason | SATISFIED | Every finding is OBSERVED |
