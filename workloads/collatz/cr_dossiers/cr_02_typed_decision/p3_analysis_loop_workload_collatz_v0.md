# Stage 3 — Analysis Loop: workload / collatz

**Stage:** 3 — Analysis Loop

**CR:** cr_02_typed_decision

**Status:** DRAFT

**Feeds:** Stage 4 — Business Model

The gap and the concern carried from Stage 2 are driven to committed decisions against the pinned
composition.

---

## 1. Analysis Findings

<!-- register:analysis_findings -->
| Question Id | Finding | Impact | Evidence Status (OBSERVED, INFERRED, OPEN) | Confidence (HIGH, MEDIUM, LOW) | Resolution Status (CLOSED, OPEN) | Evidence |
|-------------|---------|--------|-----------------|------------|-------------------|----------|
| Q1 | The gate's new version runs the termination check unchanged, then the platform's capability that refuses unless a boolean is true, on all_terminate. | Every value the gate gives a capability is of the type the capability declares. | OBSERVED | HIGH | CLOSED | S2 gaps #1; S2 belief_verification #3 |
| Q2 | Both steps route SUCCESS to continue and VIOLATION to exit, as today. The gate's inputs, outputs and allowed outcomes are unchanged, and conjecture_holds is mapped from the new capability's held. | The gate's outcome is its steps' outcomes, as today. | OBSERVED | HIGH | CLOSED | S2 architectural_observations #2 |
| Q3 | The workflow is re-pointed: the place that runs the gate runs its new version, with the same label, routes and bindings. | The run decides as it does today, and the store reads the same findings. | OBSERVED | HIGH | CLOSED | S2 architectural_observations #1 |
| Q4 | A malformed input still ends with the conjecture violated. | Accepted; it does not change what a run decides. | OBSERVED | HIGH | CLOSED | S2 discovery_concerns #1 |

## 2. Verification Results

<!-- register:verification_results -->
| Item | Origin | Result (CONFIRMED, OVERTURNED) | Evidence |
|------|--------|--------------------------------|----------|
| The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string. | S2 belief_verification #1 | CONFIRMED | Resolved in Q1 |
| The termination check reports whether every sequence ended at 1 as a boolean. | S2 belief_verification #2 | CONFIRMED | Kept unchanged; resolved in Q1 |
| The platform's capability that refuses unless a boolean is true declares its value a boolean. | S2 belief_verification #3 | CONFIRMED | Resolved in Q1 |
| Only the workflow names the gate. | S2 belief_verification #4 | CONFIRMED | Resolved in Q3 |
| A malformed input and a violation end the run the same way. | S2 discovery_concerns #1 | CONFIRMED | Accepted in Q4 |

## 3. Dependency Discoveries

<!-- register:dependency_discoveries -->
| Dependency | Type | Disposition (EXISTING, REUSE, AUTHOR_NEW, INVESTIGATE) | Evidence |
|------------|------|------------------------|----------|
| The termination gate | Capability contract | AUTHOR_NEW | workload::CC_VERIFY_TERMINATION_V1 is replaced by its next version |
| The termination check | Capability transform | REUSE | workload::CT_PURE_TERMINATION_CHECK_V0, unchanged |
| Requiring a boolean true | Capability transform | REUSE | capability_transforms::CT_PURE_REQUIRE_TRUE_V0, unchanged |
| Evaluating the conjecture | Workflow | EXISTING | workload::WF_COLLATZ_CONJECTURE_V0, re-pointed |

## 4. Impact Analysis

<!-- register:impact_analysis -->
| Artifact | Impact Scope | Consumer Count | Evidence |
|----------|--------------|----------------|----------|
| workload::CC_VERIFY_TERMINATION_V1 | Stood down; run by one workflow | 1 | The record names workload::WF_COLLATZ_CONJECTURE_V0, and a route from workload::CC_COMPUTE_SEQUENCES_V0 that names nothing |

## 5. Authoring Decisions

<!-- register:authoring_decisions business_language=capability -->
| Capability | Decision (REUSE, EXTEND, AUTHOR_NEW) | Rationale | Alternatives Checked | Source Finding |
|------------|----------|-----------|----------------------|----------------|
| Gate the conjecture | AUTHOR_NEW | A new version that decides with the platform's capability that refuses unless a boolean is true. | Declaring the set-membership check's value of any type was rejected: it changes a platform capability every domain uses. A termination check that refuses was rejected: the design language cannot yet admit a new workload transform. | S3 analysis_findings Q1 |

## 6. Placement Decision

<!-- register:placement_decision business_language=rationale -->
| Decision (NEW_SUBDOMAIN, EXTEND) | Subdomain | Rationale | Source Finding |
|----------|-----------|-----------|----------------|
| EXTEND | collatz | Whether a run holds the conjecture is Collatz's. | S3 analysis_findings Q1 |

## 7. Saturation Assessment

<!-- register:saturation business_language=criterion -->
| Criterion | Status (SATISFIED, NOT_SATISFIED) | Evidence |
|-----------|--------|----------|
| No unresolved CRITICAL gaps | SATISFIED | The one gap is MAJOR and resolves in Q1 |
| No open analyst questions | SATISFIED | All four findings are CLOSED |
| No dependency expansion in the last pass | SATISFIED | The record names one referrer of the gate |
| Verification pass complete, no OVERTURNED item unresolved | SATISFIED | Every item CONFIRMED |
| Every INFERRED finding promoted to OBSERVED, explicitly accepted, or carried forward with a reason | SATISFIED | Every finding is OBSERVED |
