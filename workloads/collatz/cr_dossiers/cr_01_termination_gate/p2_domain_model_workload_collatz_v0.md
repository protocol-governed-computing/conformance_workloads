# Stage 2 — Domain Model Verification: workload / collatz

**Stage:** 2 — Domain Model Verification
**CR:** cr_01_termination_gate
**Status:** DRAFT
**Feeds:** Stage 3 — Analysis Loop

Every belief the change request declared is resolved against the pinned composition. The termination
gate and the termination check were read with the check's implementation, the platform's
set-membership check was read with its implementation, the workflow's routes and bindings were read as
declared and as compiled, and inspection was asked what names the gate.

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
| The Termination Check | Whether every sequence terminated | True when every sequence ends at 1. | OBSERVED | S2 belief_verification #2 |
| The Termination Check | The numbers that did not terminate | The numbers whose sequences did not end at 1. | OBSERVED | S2 belief_verification #2 |

## 2. Business Processes

<!-- register:business_processes business_language -->
| Process | Initiator | Outcome | Evidence Status | Source Finding |
|---------|-----------|---------|-----------------|----------------|
| Evaluate the conjecture | A caller submitting numbers | The run ends with the conjecture holding, recorded, or violated, not recorded. | OBSERVED | S1 requested_outcomes #4 |

<!-- register:process_steps business_language -->
| Process | Step # | Action | Record Produced | Evidence Status | Source Finding |
|---------|--------|--------|-----------------|-----------------|----------------|
| Evaluate the conjecture | 1 | Compute each number's sequence. | The sequences. | OBSERVED | S2 belief_verification #4 |
| Evaluate the conjecture | 2 | Check every sequence for termination, in the termination gate. | Whether every sequence terminated, and which did not. | OBSERVED | S2 belief_verification #1 |
| Evaluate the conjecture | 3 | On the gate's success, record the sequences and the check's findings; on its violation, end with the conjecture violated. | The run's results, when the conjecture holds. | OBSERVED | S2 belief_verification #4 |

## 3. Belief Verification — THE SPINE

<!-- register:belief_verification -->
| Belief | Result (VERIFIED, NOT_FOUND, INSUFFICIENT_EVIDENCE) | Evidence | Source Finding |
|--------|------------------------------------------------------|----------|----------------|
| The termination gate routes the check's success to a condition, and execution reads it as going on. | VERIFIED | workload::CC_VERIFY_TERMINATION_V0 has one step, check_termination, routing SUCCESS to evaluate_conjecture and VIOLATION to exit; its evaluation block holds evaluate_conjecture, all_terminate equal to true, ending SUCCESS when it holds and VIOLATION when it does not. Execution runs the next step on any answer but exit, and this is the last step, so the gate ends SUCCESS whatever the check found. | S1 system_beliefs #1 |
| The termination check reports whether every sequence ended at 1 and never refuses for a sequence that did not. | VERIFIED | workload::CT_PURE_TERMINATION_CHECK_V0 returns all_terminate and non_terminating. Its implementation refuses only when sequences is missing or not a mapping; a sequence that is empty or does not end at 1 is listed in non_terminating and the check succeeds. | S1 system_beliefs #2 |
| The platform's set-membership check refuses a value not in its declared set. | VERIFIED | capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 takes value and allowed_set, refuses by raising when value is not in allowed_set, and otherwise returns is_member true. It declares value a string; the runtime carries declared input types into the sealed transform and checks none, and the implementation compares by equality, so a boolean is judged as given. | S1 system_beliefs #3 |
| The workflow routes the gate's violation to the conjecture violated, and records nothing on that path. | VERIFIED | workload::WF_COLLATZ_CONJECTURE_V0 routes the gate's SUCCESS to the place that stores the results and its VIOLATION to EXIT_CONJECTURE_VIOLATED, which stores nothing and announces workload::EV_CONJECTURE_EVALUATED_V0. The store place binds all_terminate and non_terminating from the gate's place; compiled, each binding names the contract the place runs, by address. | S1 system_beliefs #4 |
| Only the workflow names the gate. | VERIFIED | si.artifact.refs reports the gate named by workload::WF_COLLATZ_CONJECTURE_V0, which runs it, and reached from workload::CC_COMPUTE_SEQUENCES_V0 by a route, which names nothing. | S1 system_beliefs #5 |

## 4. PPS Baseline — What Already Exists

<!-- register:pps_baseline_fqdns -->
| Capability | FQDN | What It Does | Fit (EXACT, PARTIAL, MISMATCH) | Cannot Do |
|-----------|------|--------------|--------------------------------|-----------|
| Checking termination | workload::CT_PURE_TERMINATION_CHECK_V0 | Reports whether every sequence ends at 1, and which do not. | EXACT | Nothing for this purpose; it is unchanged. |
| Checking set membership | capability_transforms::CT_PURE_VALIDATE_SET_MEMBERSHIP_V0 | Refuses a value not in a declared set. | EXACT | Nothing for this purpose; it makes the gate's decision. |
| The termination gate | workload::CC_VERIFY_TERMINATION_V0 | Runs the check and routes on a condition. | MISMATCH | Its condition is never run, so it cannot fail. |
| Evaluating the conjecture | workload::WF_COLLATZ_CONJECTURE_V0 | Computes, gates and records a run. | EXACT | Nothing for this purpose; it is re-pointed. |
| Recording the results | workload::CC_STORE_RESULTS_V0 | Stores the sequences and the check's findings. | EXACT | Nothing for this purpose; it is unchanged. |

## 5. Gap Analysis — What Is Missing

<!-- register:gaps business_language -->
| Gap | Severity | Impact | Evidence Status | Source Finding |
|-----|----------|--------|-----------------|----------------|
| The termination gate's decision is a condition nothing runs. | CRITICAL | A run whose sequence did not end at 1 is recorded as proving the conjecture. | OBSERVED | S2 belief_verification #1 |

## 6. Architectural Observations

<!-- register:architectural_observations business_language -->
| Observation | Evidence | Evidence Status | Source Finding |
|-------------|----------|-----------------|----------------|
| A workflow binding names a place, and the place names the contract. | The compiler maps each place's label to the address of the contract it runs, so a place that keeps its label and runs a new contract keeps every binding that reads it. | OBSERVED | S2 belief_verification #4 |
| A check's refusal is routed like any other outcome. | A transform that refuses ends its step VIOLATION, and a step routing VIOLATION to exit ends the gate with it. | OBSERVED | S2 belief_verification #3 |
| On the gate's success every sequence terminated. | Once the gate refuses otherwise, all_terminate is true and non_terminating empty whenever the results are recorded, as on every run that holds today. | OBSERVED | S2 belief_verification #2 |
| A step's outputs are surfaced before a later step refuses. | The gate's outputs are mapped from the check in its first step, so a refusal in the second leaves the check's findings in the step's record. | OBSERVED | S2 belief_verification #3 |

## 7. Discovery Concerns

<!-- register:discovery_concerns business_language -->
| Concern | Evidence | Severity | Evidence Status | Source Finding |
|---------|----------|----------|-----------------|----------------|
| A malformed input and a violation end the run the same way. | The check refuses a malformed input with the same outcome, so both end with the conjecture violated. | MINOR | OBSERVED | S2 belief_verification #2 |
| The set-membership check declares its value a string, and is given a boolean. | Declared input types are carried and not checked, so the comparison holds, but the declaration and the use disagree. | MINOR | OBSERVED | S2 belief_verification #3 |

## 8. Open Questions

<!-- register:open_questions -->
| Question | Category | Why It Matters | Source Finding |
|----------|----------|----------------|----------------|
