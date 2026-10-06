# Stage 1 — Change Request: Clarification & Fact Capture: workload / collatz
**Stage:** 1 — Change Request (Clarification & Fact Capture)
**CR:** cr_02_typed_decision
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
| collatz | MODIFY | The termination gate decides by giving a capability a value of a type the capability does not declare. | CR seed §1 CR Type #1 |

---

## 2. Business Vocabulary

<!-- register:business_vocabulary business_language -->
| Term | Definition | Source Finding |
|----|----------|--------------|
| Sequence | The Collatz sequence computed for one number given to a run. | CR seed §2 Business Vocabulary #1 |
| Termination | A sequence ending at 1. | CR seed §2 Business Vocabulary #2 |
| Termination check | The capability that inspects every sequence of a run for termination. | CR seed §2 Business Vocabulary #3 |
| Termination gate | The contract that runs the termination check, decides from its findings, and ends with the conjecture holding or violated. | CR seed §2 Business Vocabulary #4 |
| Termination decision | The gate's step that refuses unless every sequence ended at 1. | CR seed §2 Business Vocabulary #5 |
| Conjecture violated | The outcome of a run in which some sequence did not end at 1. | CR seed §2 Business Vocabulary #6 |

---

## 3. Requested Outcomes

<!-- register:requested_outcomes business_language -->
| Outcome | Source Finding |
|-------|--------------|
| The termination gate decides with the platform's capability that refuses unless a boolean is true. | CR seed §3 Requested Outcomes #1 |
| The termination check is unchanged, and still names the numbers whose sequences did not end at 1. | CR seed §3 Requested Outcomes #2 |
| Every run decides and records exactly as it does today. | CR seed §3 Requested Outcomes #3 |

---

## 4. Known Facts — Business Truths

<!-- register:known_facts business_language -->
| Fact | Certainty (HIGH, MEDIUM, LOW) | Source Finding |
|----|-----------------------------|--------------|
| A sequence that does not end at 1 violates the conjecture, and the run ends with it violated. | HIGH | CR seed §4 Known Facts — Business Truths #1 |
| A decision is made by a capability, which answers with an outcome. | HIGH | CR seed §4 Known Facts — Business Truths #2 |
| Routing only says what happens next. | HIGH | CR seed §4 Known Facts — Business Truths #3 |
| A capability is given only values of the types it declares. | HIGH | CR seed §4 Known Facts — Business Truths #4 |
| A change of meaning is a new identity, so the gate is replaced by a new version. | HIGH | CR seed §4 Known Facts — Business Truths #5 |
| The platform has a capability that succeeds when a boolean is true and refuses when it is false. | HIGH | CR seed §4 Known Facts — Business Truths #6 |

---

## 5. Existing-System Beliefs — Requiring Verification

<!-- register:system_beliefs business_language -->
| Belief | Why It Matters | Verification Goal | Source Finding |
|------|--------------|-----------------|--------------|
| The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string. | It is what this change corrects. | Establish the gate's decision step, what it gives the check, and what the check declares. | CR seed §5 Existing-System Beliefs — Requiring Verification #1 |
| The termination check reports whether every sequence ended at 1 as a boolean. | The decision is made on that value. | Establish the type the check declares for what it reports. | CR seed §5 Existing-System Beliefs — Requiring Verification #2 |
| The platform's capability that refuses unless a boolean is true declares its value a boolean. | It makes the gate's decision. | Establish what it accepts, returns and refuses. | CR seed §5 Existing-System Beliefs — Requiring Verification #3 |
| Only the workflow names the gate. | Replacing it must account for everything that names it. | Establish every artifact that names the gate. | CR seed §5 Existing-System Beliefs — Requiring Verification #4 |

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
| Every run decides and records exactly as it does today. | Business author | CR seed §7 Constraints #1 |
| This change is built before the platform refuses a step given a value of a type it does not declare. | Business author | CR seed §7 Constraints #2 |

---

## 8. Business Invariants

<!-- register:business_invariants business_language -->
| Invariant | Source Finding |
|---------|--------------|
| A run ends with the conjecture holding only when every sequence ends at 1. | CR seed §8 Business Invariants #1 |
| A capability is given only values of the types it declares. | CR seed §8 Business Invariants #2 |

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
| Whether a boolean is true | Capability transforms | CR seed §11 Authority Boundaries #2 |

---

## 12. Out of Scope

<!-- register:out_of_scope business_language optional -->
| Item | Reason | Source Finding |
|----|------|--------------|
| Telling a malformed input apart from a violation | Both end the run with the conjecture violated today; not this change. | CR seed §12 Out of Scope #1 |
| Refusing a step given a value of a type it does not declare | The platform's rule, made separately. | CR seed §12 Out of Scope #2 |

---

## 13. Governance Scope

<!-- register:governance_scope business_language -->
| Scope Item | Relationship (CREATED, EXTENDED, MODIFIED, DEPRECATED, ADJACENT) | Source Finding |
|----------|----------------------------------------------------------------|--------------|
| collatz | MODIFIED | CR seed §13 Governance Scope #1 |
| capability_transforms | ADJACENT | CR seed §13 Governance Scope #2 |

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
| Every value the gate gives a capability is of the type the capability declares. | CR seed §15 Acceptance Criteria #3 |
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
