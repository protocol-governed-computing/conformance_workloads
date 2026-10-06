# Stage 4 — Business Model: workload / collatz

**Stage:** 4 — Business Model

**CR:** cr_02_typed_decision

**Status:** DRAFT

**Feeds:** Stage 5 — Business Intent

Consolidation of Stages 1–3. Nothing is re-litigated and nothing new is decided.

---

## 1. Discovery Summary

<!-- register:actors business_language -->
### Actors (actors)
| Actor | Role | Authority Class | Source Finding |
|-------|------|-----------------|----------------|
| Collatz | Decides whether a run holds the conjecture. | Owning subdomain | S3 placement_decision collatz |

<!-- register:bm_entities business_language -->
### Entities (bm_entities)
| Entity | Description | Store Model | Source Finding |
|--------|-------------|-------------|----------------|
| The Sequence | The Collatz sequence computed for one number. | Recorded with the run's results when the conjecture holds. | S2 entities #1 |
| The Termination Check | The capability that inspects every sequence for termination; unchanged. | Run by the termination gate. | S2 entities #2 |
| The Termination Gate | The contract that runs the check and decides. | Run by the Collatz workflow. | S2 entities #3 |

<!-- register:resources optional business_language -->
### Resources
| Resource | Description | Source Finding |
|----------|-------------|----------------|
| NONE IDENTIFIED |

<!-- register:events business_language -->
### Events (events)
| Event | Trigger | Lifecycle Meaning | Source Finding |
|-------|---------|-------------------|----------------|
| NONE IDENTIFIED | This change recognises no new moment. | | S1 business_events #1 |

<!-- register:relationships optional business_language -->
### Relationships (Candidate Capabilities)
| Subject | Verb | Object | Capability Need | Source Finding |
|---------|------|--------|-----------------|----------------|
| Collatz | gates | the conjecture | Gate the conjecture | S3 authoring_decisions Gate the conjecture |

## 2. Capability Graph (capability_graph)

<!-- register:capability_graph business_language -->
| Capability | Source Finding | Status | Gap Register Entry | Notes |
|-----------|----------------|--------|--------------------|-------|
| Gate the conjecture | S3 authoring_decisions Gate the conjecture | MAJOR | GAP-01 | A new version that decides with the platform's capability that refuses unless a boolean is true. |

## 3. Dependency Graph (dependency_graph)

<!-- register:dependency_graph -->
| From | To | Dependency Type | PPS Status | Source Finding |
|------|----|-----------------|------------|----------------|
| collatz | workload::CT_PURE_TERMINATION_CHECK_V0 | transform | SATISFIED | S3 dependency_discoveries The termination check |
| collatz | capability_transforms::CT_PURE_REQUIRE_TRUE_V0 | transform | SATISFIED | S3 dependency_discoveries Requiring a boolean true |

## 4. Constraint Register (constraint_register)

<!-- register:constraint_register -->
| # | Constraint | Source Finding | Source |
|---|------------|----------------|--------|
| 1 | Every run decides and records exactly as it does today. | S1 constraints #1 | The business author |
| 2 | This change is built before the platform refuses a step given a value of a type it does not declare. | S1 constraints #2 | The business author |

## 5. Gap Register (gap_register)

<!-- register:gap_register business_language -->
| Gap Code | Source Finding | Capability | Owner Subdomain | Resolution |
|----------|----------------|-----------|-----------------|------------|
| GAP-01 | S3 authoring_decisions Gate the conjecture | Gate the conjecture | collatz | AUTHOR_NEW |

## 6. Design Decisions (design_decisions)

<!-- register:design_decisions -->
| # | Decision | Source Finding | Rationale | Constraints Imposed |
|---|----------|----------------|-----------|---------------------|
| 1 | The new gate runs the unchanged check, then the platform's capability that refuses unless a boolean is true, on all_terminate. | S3 analysis_findings Q1 | A capability is given only values of the types it declares. | No new transform. |
| 2 | Both steps route as today, and the gate's inputs, outputs and allowed outcomes are unchanged. | S3 analysis_findings Q2 | Every run decides as today. | Only the decision step's capability changes. |
| 3 | The workflow is re-pointed to the new gate. | S3 analysis_findings Q3 | It decides as today. | Only the gate its place runs changes. |
| 4 | The old gate is replaced by its new version. | S3 analysis_findings Q1 | A change of meaning is a new identity. | It stays in the record and out of reach. |

## 7. Authoring Scope (authoring_scope)

<!-- register:authoring_scope -->
### In Scope — This CR
| Capability | Gap Register Ref |
|-----------|-----------------|
| Gate the conjecture | GAP-01 |

### Deferred — Future CR
| Capability | Deferred Reason |
|-----------|-----------------|
| Tell a malformed input apart from a violation | Both end the run the same way today; not this change. |

## Pipeline Provenance

| Stage | Output | Status |
|-------|--------|--------|
| Stage 1 — Change Request & Input Elicitation | Classification + Problem + Outcome + Known Facts | COMPLETE |
| Stage 2 — Domain Model Discovery | Actors, Entities, Resources, Events, Relationships | COMPLETE |
| Stage 3 — Analysis Loop | Capability Graph, Dependency Graph, Constraints, Gap Register | COMPLETE — SATURATED |
| Stage 4 — Business Model | This document | COMPLETE |
| Stage 4b — Authoring Scope | IN/FUTURE CR boundary | PENDING |

---

## gov_projection — Governed Handoff to Stage 5

| Direction | Fields |
|-----------|--------|
| **Consumes** ← Stage 1 | cr_type · constraints · business_invariants · authority_boundaries · out_of_scope |
| **Consumes** ← Stage 2 | entities · entity_attributes · business_processes · pps_baseline_fqdns |
| **Consumes** ← Stage 3 | authoring_decisions · dependency_discoveries · placement_decision · saturation |
| **Emits** → Stage 5 | actors · bm_entities · events · capability_graph · dependency_graph · constraint_register · gap_register · design_decisions · authoring_scope |
