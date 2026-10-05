# Stage 1 — Change Request: Clarification & Fact Capture: workload / collatz
**Stage:** 1 — Change Request (Clarification & Fact Capture)
**CR:** cr_01_termination_gate
**Status:** DRAFT
**Feeds:** Stage 2 — Domain Model Discovery

Projected from the change seed. Every row is the seed's own, cited to the section it was
said in. S1 interrogates and does not author: a question raised by restating the seed
amends the seed and is projected again, so no row here states business content the seed
does not.

---

## 1. CR Type

<!-- register:cr_type business_language -->
| Subdomain | Classification (NEW_SUBDOMAIN, EXTEND_SUBDOMAIN, MODIFY, DEPRECATE) | Rationale | Source Finding |
|---------|-------------------------------------------------------------------|---------|--------------|
| collatz | MODIFY | The termination gate cannot fail: its decision is a condition nothing runs. | CR seed §1 CR Type #1 |

---

## 2. Business Vocabulary

<!-- register:business_vocabulary business_language -->
| Term | Definition | Source Finding |
|----|----------|--------------|
| Sequence | The Collatz sequence computed for one number given to a run. | CR seed §2 Business Vocabulary #1 |
| Termination | A sequence ending at 1. | CR seed §2 Business Vocabulary #2 |
| Termination check | The capability that inspects every sequence of a run for termination. | CR seed §2 Business Vocabulary #3 |
| Termination gate | The contract that runs the termination check, decides from its findings, and ends with the conjecture holding or violated. | CR seed §2 Business Vocabulary #4 |
| Conjecture violated | The outcome of a run in which some sequence did not end at 1. | CR seed §2 Business Vocabulary #5 |

---

## 3. Requested Outcomes

<!-- register:requested_outcomes business_language -->
| Outcome | Source Finding |
|-------|--------------|
| The termination gate refuses when a sequence does not end at 1, by a capability that answers with an outcome. | CR seed §3 Requested Outcomes #1 |
| The termination gate routes on its steps' own outcomes, with no condition. | CR seed §3 Requested Outcomes #2 |
| The termination check is unchanged, and still names the numbers whose sequences did not end at 1. | CR seed §3 Requested Outcomes #3 |
| Every run that ends with the conjecture holding today ends the same way. | CR seed §3 Requested Outcomes #4 |

---

## 4. Known Facts — Business Truths

<!-- register:known_facts business_language -->
| Fact | Certainty (HIGH, MEDIUM, LOW) | Source Finding |
|----|-----------------------------|--------------|
| A sequence that does not end at 1 violates the conjecture, and the run ends with it violated. | HIGH | CR seed §4 Known Facts — Business Truths #1 |
| A decision is made by a capability, which answers with an outcome. | HIGH | CR seed §4 Known Facts — Business Truths #2 |
| Routing only says what happens next. | HIGH | CR seed §4 Known Facts — Business Truths #3 |
| A change of meaning is a new identity, so the gate is replaced by a new version. | HIGH | CR seed §4 Known Facts — Business Truths #4 |
| The platform already checks that a value is one of a declared set, and refuses when it is not. | HIGH | CR seed §4 Known Facts — Business Truths #5 |
| A violated run records nothing, before and after this change. | HIGH | CR seed §4 Known Facts — Business Truths #6 |

---

## 5. Existing-System Beliefs — Requiring Verification

<!-- register:system_beliefs business_language -->
| Belief | Why It Matters | Verification Goal | Source Finding |
|------|--------------|-----------------|--------------|
| The termination gate routes the check's success to a condition, and execution reads it as going on. | It is why the gate cannot fail. | Establish the gate's routing and what execution does with it. | CR seed §5 Existing-System Beliefs — Requiring Verification #1 |
| The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not. | The gate decides from what it reports. | Establish what the check returns and when it refuses. | CR seed §5 Existing-System Beliefs — Requiring Verification #2 |
| The platform's set-membership check refuses a value not in its declared set. | It makes the gate's decision. | Establish what it accepts, returns and refuses. | CR seed §5 Existing-System Beliefs — Requiring Verification #3 |
| The workflow routes the gate's violation to the conjecture violated, and records nothing on that path. | The new gate's refusal must end the run the same way. | Establish the workflow's routes after the gate. | CR seed §5 Existing-System Beliefs — Requiring Verification #4 |
| Only the workflow names the gate. | Replacing it must account for everything that names it. | Establish every artifact that names the gate. | CR seed §5 Existing-System Beliefs — Requiring Verification #5 |

---

## 6. Assumptions

<!-- register:assumptions business_language optional -->
| Assumption | Basis | Source Finding |
|----------|-----|--------------|
| NONE IDENTIFIED |

---

## 7. Constraints

<!-- register:constraints business_language -->
| Constraint | Source | Source Finding |
|----------|------|--------------|
| Every run that ends with the conjecture holding today ends the same way, and records the same result. | Business author | CR seed §7 Constraints #1 |
| This change is built before the platform refuses routing to a condition. | Business author | CR seed §7 Constraints #2 |

---

## 8. Business Invariants

<!-- register:business_invariants business_language -->
| Invariant | Source Finding |
|---------|--------------|
| A run ends with the conjecture holding only when every sequence ends at 1. | CR seed §8 Business Invariants #1 |
| The termination gate's outcome is the termination check's outcome. | CR seed §8 Business Invariants #2 |

---

## 9. Lifecycle States

<!-- register:lifecycle_states business_language -->
| Object | State | Meaning | Source Finding |
|------|-----|-------|--------------|
| Termination gate | In force | Run by the Collatz workflow. | CR seed §9 Lifecycle States #1 |
| Termination gate | Stood down | Replaced by the version this change adds, kept in the record and out of reach. | CR seed §9 Lifecycle States #2 |

---

## 10. Business Events

<!-- register:business_events business_language -->
| Event | When It Occurs | Significance | Source Finding |
|-----|--------------|------------|--------------|
| NONE IDENTIFIED |

---

## 11. Authority Boundaries

<!-- register:authority_boundaries business_language -->
| Business Object | Authoritative Owner | Source Finding |
|---------------|-------------------|--------------|
| Whether every sequence ends at 1 | Collatz | CR seed §11 Authority Boundaries #1 |
| What routing may say | Execution topology | CR seed §11 Authority Boundaries #2 |
| Whether a value is one of a declared set | Capability transforms | CR seed §11 Authority Boundaries #3 |

---

## 12. Out of Scope

<!-- register:out_of_scope business_language optional -->
| Item | Reason | Source Finding |
|----|------|--------------|
| Telling a malformed input apart from a violation | Both end the run with the conjecture violated today; not this change. | CR seed §12 Out of Scope #1 |
| Recording a violated run | A violated run records nothing today, and the business keeps that. | CR seed §12 Out of Scope #2 |

---

## 13. Governance Scope

<!-- register:governance_scope business_language -->
| Scope Item | Relationship (CREATED, EXTENDED, MODIFIED, DEPRECATED, ADJACENT) | Source Finding |
|----------|----------------------------------------------------------------|--------------|
| collatz | MODIFIED | CR seed §13 Governance Scope #1 |
| execution_topology | ADJACENT | CR seed §13 Governance Scope #2 |
| capability_transforms | ADJACENT | CR seed §13 Governance Scope #3 |

---

## 14. Clarification Requests

<!-- register:clarification_requests business_language optional -->
| Question | Why Needed | Blocking (YES, NO) | Owner (HUMAN, SNAPSHOT, GOVERNANCE) | Source Finding |
|--------|----------|------------------|-----------------------------------|--------------|
| NONE IDENTIFIED |

---

## 15. Acceptance Criteria

<!-- register:acceptance_criteria business_language -->
| Criterion | Source Finding |
|---------|--------------|
| A run in which every sequence ends at 1 ends with the conjecture holding, and records the same result as today. | CR seed §15 Acceptance Criteria #1 |
| A run in which a sequence does not end at 1 ends with the conjecture violated, and the check's findings in the trace name the numbers. | CR seed §15 Acceptance Criteria #2 |
| The termination gate declares no condition, and routes only to going on or ending. | CR seed §15 Acceptance Criteria #3 |
| The old gate is stood down, kept in the record and out of reach. | CR seed §15 Acceptance Criteria #4 |
| The workflow names the new gate, and decides as it does today. | CR seed §15 Acceptance Criteria #5 |

---

## 16. Identity and Sameness

<!-- register:identity_and_sameness business_language optional -->
| Business Object | Identified By | Two Are The Same When | Source Finding |
|---------------|-------------|---------------------|--------------|
| NONE IDENTIFIED |

---

## 17. Lifecycle Transitions

<!-- register:lifecycle_transitions business_language optional -->
| Object | From State | To State | Triggered By | Cascade | Source Finding |
|------|----------|--------|------------|-------|--------------|
| Termination gate | In force | Stood down | This change adds its successor | The workflow is re-pointed | CR seed §17 Lifecycle Transitions #1 |

---

## 18. Operation Refusals

<!-- register:operation_refusals business_language optional -->
| Operation | Refused When | Business Reason | Source Finding |
|---------|------------|---------------|--------------|
| Gating the conjecture | A sequence does not end at 1 | It violates the conjecture. | CR seed §18 Operation Refusals #1 |

---

## 19. Authority Deferrals

<!-- register:authority_deferrals business_language optional -->
| Business Object | Deferred To | Until | Source Finding |
|---------------|-----------|-----|--------------|
| NONE IDENTIFIED |

---

## gov_projection — Governed Handoff to Stage 2

| Direction | Fields |
|-----------|--------|
| **Consumes** ← CR seed | human elicitation answers (the seed) |
| **Emits** → Stage 2 | cr_type · business_vocabulary · requested_outcomes · known_facts · system_beliefs · assumptions · constraints · business_invariants · lifecycle_states · business_events · authority_boundaries · out_of_scope · governance_scope · clarification_requests · acceptance_criteria · identity_and_sameness · lifecycle_transitions · operation_refusals · authority_deferrals |
