# TEST_DATA_CT_PURE_TERMINATION_CHECK_V0

## Machine

```yaml
fqdn: workload::TEST_DATA_CT_PURE_TERMINATION_CHECK_V0
artifact_kind: TEST_DATA
version: V0
governed_by: conformance::CONSTITUTION_TEST_DATA_V0
authority: pgc.platform
concern: workload
target: workload::CT_PURE_TERMINATION_CHECK_V0
cases:
- case_id: every_sequence_terminates
  expected_outcome: SUCCESS
  bindings:
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
  expected:
    all_terminate: true
    non_terminating: []
- case_id: names_a_sequence_that_does_not_end_at_one
  expected_outcome: SUCCESS
  bindings:
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
  expected:
    all_terminate: false
    non_terminating:
    - '7'
```

## Intent

A sequence ending at 1 terminates; one that does not is named, and the check returns rather than refusing.
