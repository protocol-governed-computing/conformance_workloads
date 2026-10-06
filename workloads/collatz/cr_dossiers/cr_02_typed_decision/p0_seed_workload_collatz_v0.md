# Change Seed — workload / collatz

**Stage:** 0 — Change Seed
**CR:** cr_02_typed_decision
**Status:** DRAFT
**Feeds:** Stage 1 — Change Request

Reorganized faithfully from `p0_business_problem_statement.md`, including the clarifications its
author answered. Human input only — nothing here was added, decided or designed by the pipeline.

---

## 0. Subdomain Purpose

<!-- register:subdomain_purpose business_language -->

The Collatz subdomain is a conformance workload: it computes the Collatz sequence for each number it
is given, decides whether every sequence ends at 1, and records the result, so that a run shows the
platform executing exactly what it declares. It decides nothing about any business.

## 1. CR Type

<!-- register:cr_type business_language -->
| Subdomain | Classification (NEW_SUBDOMAIN, EXTEND_SUBDOMAIN, MODIFY, DEPRECATE) | Rationale |
|-----------|----------------|-----------|
| collatz | MODIFY | The termination gate decides by giving a capability a value of a type the capability does not declare. |

## 2. Business Vocabulary

<!-- register:business_vocabulary business_language -->
| Term | Definition |
|------|------------|
| Sequence | The Collatz sequence computed for one number given to a run. |
| Termination | A sequence ending at 1. |
| Termination check | The capability that inspects every sequence of a run for termination. |
| Termination gate | The contract that runs the termination check, decides from its findings, and ends with the conjecture holding or violated. |
| Termination decision | The gate's step that refuses unless every sequence ended at 1. |
| Conjecture violated | The outcome of a run in which some sequence did not end at 1. |

## 3. Requested Outcomes

<!-- register:requested_outcomes business_language -->
| Outcome |
|---------|
| The termination gate decides with the platform's capability that refuses unless a boolean is true. |
| The termination check is unchanged, and still names the numbers whose sequences did not end at 1. |
| Every run decides and records exactly as it does today. |

## 4. Known Facts — Business Truths

<!-- register:known_facts business_language -->
| Fact | Certainty (HIGH, MEDIUM, LOW) |
|------|-----------|
| A sequence that does not end at 1 violates the conjecture, and the run ends with it violated. | HIGH |
| A decision is made by a capability, which answers with an outcome. | HIGH |
| Routing only says what happens next. | HIGH |
| A capability is given only values of the types it declares. | HIGH |
| A change of meaning is a new identity, so the gate is replaced by a new version. | HIGH |
| The platform has a capability that succeeds when a boolean is true and refuses when it is false. | HIGH |

## 5. Existing-System Beliefs — Requiring Verification

*Not facts. Each is a discovery target the agent must verify against the snapshot at P2.*

<!-- register:system_beliefs business_language -->
| Belief | Why It Matters | Verification Goal |
|--------|----------------|-------------------|
| The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string. | It is what this change corrects. | Establish the gate's decision step, what it gives the check, and what the check declares. |
| The termination check reports whether every sequence ended at 1 as a boolean. | The decision is made on that value. | Establish the type the check declares for what it reports. |
| The platform's capability that refuses unless a boolean is true declares its value a boolean. | It makes the gate's decision. | Establish what it accepts, returns and refuses. |
| Only the workflow names the gate. | Replacing it must account for everything that names it. | Establish every artifact that names the gate. |

## 6. Assumptions

<!-- register:assumptions business_language optional -->
| Assumption | Basis |
|------------|-------|
| NONE IDENTIFIED | |

## 7. Constraints

<!-- register:constraints business_language optional -->
| Constraint | Source |
|------------|--------|
| Every run decides and records exactly as it does today. | Business author |
| This change is built before the platform refuses a step given a value of a type it does not declare. | Business author |

## 8. Business Invariants

<!-- register:business_invariants business_language -->
| Invariant |
|-----------|
| A run ends with the conjecture holding only when every sequence ends at 1. |
| A capability is given only values of the types it declares. |

## 9. Lifecycle States

<!-- register:lifecycle_states business_language -->
| Object | State | Meaning |
|--------|-------|---------|
| Termination gate | In force | Run by the Collatz workflow. |
| Termination gate | Stood down | Replaced by the version this change adds, kept in the record and out of reach. |

## 10. Business Events

<!-- register:business_events business_language -->
| Event | When It Occurs | Significance |
|-------|----------------|--------------|
| NONE IDENTIFIED | | |

## 11. Authority Boundaries

<!-- register:authority_boundaries business_language -->
| Business Object | Authoritative Owner |
|-----------------|---------------------|
| Whether every sequence ends at 1 | Collatz |
| Whether a boolean is true | Capability transforms |

## 12. Out of Scope

<!-- register:out_of_scope business_language -->
| Item | Reason |
|------|--------|
| Telling a malformed input apart from a violation | Both end the run with the conjecture violated today; not this change. |
| Refusing a step given a value of a type it does not declare | The platform's rule, made separately. |

## 13. Governance Scope

<!-- register:governance_scope business_language -->
| Scope Item | Relationship (CREATED, EXTENDED, MODIFIED, DEPRECATED, ADJACENT) |
|------------|--------------|
| collatz | MODIFIED |
| capability_transforms | ADJACENT |

## 14. Clarification Requests

<!-- register:clarification_requests business_language optional -->
| Question | Why Needed | Blocking (YES, NO) | Owner (HUMAN, SNAPSHOT, GOVERNANCE) |
|----------|------------|----------|-------|
| NONE IDENTIFIED |

## 15. Acceptance Criteria

<!-- register:acceptance_criteria business_language -->
| Criterion |
|-----------|
| A run in which every sequence ends at 1 ends with the conjecture holding, and records the same result as today. |
| A run in which a sequence does not end at 1 ends with the conjecture violated, and the check's findings in the trace name the numbers. |
| Every value the gate gives a capability is of the type the capability declares. |
| The old gate is stood down, kept in the record and out of reach. |
| The workflow names the new gate, and decides as it does today. |

## 16. Identity and Sameness

<!-- register:identity_and_sameness business_language optional -->
| Business Object | Identified By | Two Are The Same When |
|-----------------|---------------|-----------------------|
| NONE IDENTIFIED | | |

## 17. Lifecycle Transitions

<!-- register:lifecycle_transitions business_language optional -->
| Object | From State | To State | Triggered By | Cascade |
|--------|------------|----------|--------------|---------|
| Termination gate | In force | Stood down | This change adds its successor | The workflow is re-pointed |

## 18. Operation Refusals

<!-- register:operation_refusals business_language optional -->
| Operation | Refused When | Business Reason |
|-----------|--------------|-----------------|
| Gating the conjecture | A sequence does not end at 1 | It violates the conjecture. |

## 19. Authority Deferrals

<!-- register:authority_deferrals business_language optional -->
| Business Object | Deferred To | Until |
|-----------------|-------------|-------|
| NONE IDENTIFIED | | |
