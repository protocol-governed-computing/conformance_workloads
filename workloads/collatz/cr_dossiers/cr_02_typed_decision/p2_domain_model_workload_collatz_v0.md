# Stage 2 — Domain Model Verification: workload / collatz

**Stage:** 2 — Domain Model Verification
**CR:** cr_02_typed_decision
**Status:** DRAFT
**Feeds:** Stage 3 — Analysis Loop

Every belief the change request declared is resolved against the pinned composition. The termination
gate was read as declared and as compiled, the termination check and both platform capabilities were
read with their declarations, and inspection was asked what names the gate.

---

## 1. Business Entities

<!-- register:entities business_language -->
| Entity | Description | Store Model | Evidence Status | Source Finding |
|--------|-------------|-------------|-----------------|----------------|
| The Sequence | The Collatz sequence computed for one number given to a run. | Recorded with the run's results when the conjecture holds. Unchanged by this change. | OBSERVED | S1 business_vocabulary #1 |
| The Termination Check | The capability that inspects every sequence of a run for termination. | Not stored; run by the termination gate. | OBSERVED | S1 business_vocabulary #3 |
| The Termination Gate | The contract that runs the check, decides from its findings, and ends with the conjecture holding or violated. | Not stored; run by the Collatz workflow. | OBSERVED | S1 business_vocabulary #4 |

<!-- register:entity_attributes business_language -->
| Entity | Attribute | Meaning | Evidence Status | Source Finding |
|--------|-----------|---------|-----------------|----------------|
| The Termination Check | Whether every sequence terminated | True when every sequence ends at 1, reported as a boolean. | OBSERVED | S2 belief_verification #2 |
| The Termination Check | The numbers that did not terminate | The numbers whose sequences did not end at 1. | OBSERVED | S2 belief_verification #2 |

## 2. Business Processes

<!-- register:business_processes business_language -->
| Process | Initiator | Outcome | Evidence Status | Source Finding |
|---------|-----------|---------|-----------------|----------------|
| Evaluate the conjecture | A caller submitting numbers | The run ends with the conjecture holding, recorded, or violated, not recorded. | OBSERVED | S1 requested_outcomes #3 |

<!-- register:process_steps business_language -->
| Process | Step # | Action | Record Produced | Evidence Status | Source Finding |
|---------|--------|--------|-----------------|-----------------|----------------|
| Evaluate the conjecture | 1 | Check every sequence for termination, in the termination gate. | Whether every sequence terminated, and which did not. | OBSERVED | S2 belief_verification #2 |
| Evaluate the conjecture | 2 | Decide, in the termination gate: refuse unless every sequence terminated. | Nothing new. | OBSERVED | S2 belief_verification #1 |

## 3. Belief Verification — THE SPINE

<!-- register:belief_verification -->
| Belief | Result (VERIFIED, NOT_FOUND, INSUFFICIENT_EVIDENCE) | Evidence | Source Finding |
|--------|------------------------------------------------------|----------|----------------|
| The termination gate decides with the platform's set-membership check, giving it a boolean where it declares a string. | VERIFIED | workload::CC_VERIFY_TERMINATION_V1 runs check_termination, then require_every_sequence_terminated, which runs capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 with value bound to the check's all_terminate and allowed_set holding only true. The set-membership check declares value a string. Its implementation compares by equality, so the decision comes out right. | S1 system_beliefs #1 |
| The termination check reports whether every sequence ended at 1 as a boolean. | VERIFIED | workload::CT_PURE_TERMINATION_CHECK_V0 declares the output all_terminate a boolean and non_terminating an array. | S1 system_beliefs #2 |
| The platform's capability that refuses unless a boolean is true declares its value a boolean. | VERIFIED | capability_transforms::CT_PURE_REQUIRE_TRUE_V0 declares value a boolean and the output held a boolean. It refuses by raising when the value is false or not a boolean, and otherwise returns held true. It is on the platform's closed transform surface. | S1 system_beliefs #3 |
| Only the workflow names the gate. | VERIFIED | si.artifact.refs reports the gate named by workload::WF_COLLATZ_CONJECTURE_V0, which runs it, and reached from workload::CC_COMPUTE_SEQUENCES_V0 by a route, which names nothing. | S1 system_beliefs #4 |

## 4. PPS Baseline — What Already Exists

<!-- register:pps_baseline_fqdns -->
| Capability | FQDN | What It Does | Fit (EXACT, PARTIAL, MISMATCH) | Cannot Do |
|-----------|------|--------------|--------------------------------|-----------|
| Checking termination | workload::CT_PURE_TERMINATION_CHECK_V0 | Reports whether every sequence ends at 1, and which do not. | EXACT | Nothing for this purpose; it is unchanged. |
| Requiring a boolean true | capability_transforms::CT_PURE_REQUIRE_TRUE_V0 | Refuses unless a boolean is true. | EXACT | Nothing for this purpose; it makes the gate's decision. |
| Checking set membership | capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 | Refuses a string not in a declared set. | MISMATCH | It declares a string, and the gate decides on a boolean. |
| The termination gate | workload::CC_VERIFY_TERMINATION_V1 | Runs the check and decides with the set-membership check. | MISMATCH | It gives the set-membership check a value of a type it does not declare. |
| Evaluating the conjecture | workload::WF_COLLATZ_CONJECTURE_V0 | Computes, gates and records a run. | EXACT | Nothing for this purpose; it is re-pointed. |

## 5. Gap Analysis — What Is Missing

<!-- register:gaps business_language -->
| Gap | Severity | Impact | Evidence Status | Source Finding |
|-----|----------|--------|-----------------|----------------|
| The termination gate gives a capability a value of a type it does not declare. | MAJOR | The gate cannot be built once the platform refuses such a step. | OBSERVED | S2 belief_verification #1 |

## 6. Architectural Observations

<!-- register:architectural_observations business_language -->
| Observation | Evidence | Evidence Status | Source Finding |
|-------------|----------|-----------------|----------------|
| A workflow binding names a place, and the place names the contract. | The place labelled CC_VERIFY_TERMINATION_V0 runs workload::CC_VERIFY_TERMINATION_V1 by its code, so a place that runs a new contract keeps every binding that reads it. | OBSERVED | S2 belief_verification #4 |
| The two capabilities decide alike on a boolean. | Each succeeds when the value is true and refuses when it is false, so every run decides as today. | OBSERVED | S2 belief_verification #3 |

## 7. Discovery Concerns

<!-- register:discovery_concerns business_language -->
| Concern | Evidence | Severity | Evidence Status | Source Finding |
|---------|----------|----------|-----------------|----------------|
| A malformed input and a violation end the run the same way. | The check refuses a malformed input with the same outcome, so both end with the conjecture violated. | MINOR | OBSERVED | S2 belief_verification #2 |

## 8. Open Questions

<!-- register:open_questions -->
| Question | Category | Why It Matters | Source Finding |
|----------|----------|----------------|----------------|
