# TEST_DATA_CT_PURE_COLLATZ_STEP_V0

## Machine

```yaml
fqdn: workload::TEST_DATA_CT_PURE_COLLATZ_STEP_V0
artifact_kind: TEST_DATA
version: V0
governed_by: conformance::CONSTITUTION_TEST_DATA_V2
authority: pgc.platform
concern: workload
target: workload::CT_PURE_COLLATZ_STEP_V0
cases:
- case_id: one_is_its_own_sequence
  expected_outcome: SUCCESS
  bindings:
    numbers:
    - 1
  expected:
    sequences:
      '1':
      - 1
- case_id: sequences_for_several_numbers
  expected_outcome: SUCCESS
  bindings:
    numbers:
    - 6
    - 7
  expected:
    sequences:
      '6':
      - 6
      - 3
      - 10
      - 5
      - 16
      - 8
      - 4
      - 2
      - 1
      '7':
      - 7
      - 22
      - 11
      - 34
      - 17
      - 52
      - 26
      - 13
      - 40
      - 20
      - 10
      - 5
      - 16
      - 8
      - 4
      - 2
      - 1
```

## Intent

Each number maps to its whole sequence, ending at 1.
