# Delivery — cr_02_typed_decision

**Authorized by:** Gate 1 and Gate 2, at P7 and P8, against composition `1e3d4d99a682…`
**Delivered:**
- The termination gate gives each capability only values of the types it declares.
  `workload::CC_VERIFY_TERMINATION_V2` runs the termination check unchanged, then the platform's
  `CT_PURE_REQUIRE_TRUE_V0` on `all_terminate`, which refuses when a sequence did not end at 1.
- V1 is stood down, and the workflow runs V2.

**Validated:**
- Construction determined 34 of 34 facts.
- Construction acceptance 183/185 across 7 domains, red by design for the two pinned book_library
  differences.
- Published identity: none of the 500 changed meaning.
- Full regression `--all` 70/70 as expected.

---

## What this change closed

**Before.** The gate decided with the set-membership check, asked whether `all_terminate` was one of a
set holding only true. That check declares its value a string, and the gate gave it a boolean. It
compares by equality, so every run decided correctly, but the declaration and the use disagreed.

**Now.** The gate decides with a capability that declares a boolean. Every run decides and records as
before. The platform's new rule `INVARIANT_CT_INPUT_TYPED_V0` refuses the V1 step at build, so this
change ran before the rule was armed.

---

## What it took

**One step changed.** V2 differs from V1 in its identity, its supersession, the decision step's
transform, the dropped `allowed_set` and the output mapped from `held`.

**The capability came first.** No platform transform refused on a boolean. `CT_PURE_REQUIRE_TRUE_V0`
was added by a platform change note, and joined the platform's closed transform surface.

---

## What is carried

- **The workload design-language gaps remain.** P7 ignores a build config's
  `implementation_namespace`, and the workload build config does not discover `TEST_DATA`.
- **A malformed input still ends the run with the conjecture violated.**
- **V1 was created and stood down in this cycle.** It was never published, so a recorded human act
  may remove it (SU-12).
