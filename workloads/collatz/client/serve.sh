#!/usr/bin/env bash
#
# Collatz conformance client — composition launcher.
#
# PURPOSE: a stable, externally observable surface for exercising and demonstrating the
# COMPLETE PGC execution path against a KNOWN warm-boot snapshot. It is bound to that
# snapshot by design — it is not a production application and does not dynamically
# generalize across snapshots.
#
#   Assembled snapshot (software_governance + conformance_workloads)
#         |
#         +-- Collatz client   (this surface)
#
# This script is where workload-resident knowledge lives: it points the DOMAIN-NEUTRAL
# transport HTTP adapter at workload roots — the web client, the shell, and the HTTP
# binding table. Boundary declarations (TI/TE) are read from the sealed snapshot.
#
set -euo pipefail
CLIENT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"     # …/workloads/collatz/client
WORKLOADS="$(cd "$CLIENT/../../.." && pwd)"                # conformance_workloads/
UMBRELLA="$(cd "$WORKLOADS/.." && pwd)"                    # protocol-governed-computing/

export PGC_RUNTIME_ROOT="$UMBRELLA/protocol_runtime"
export PGC_IMPL_ROOTS="$UMBRELLA/software_governance:$WORKLOADS"   # capability_*.* + workloads.*
# TI/TE boundary contracts are read from the sealed snapshot (compiled TI_/TE_ kinds).
export PGC_HTTP_BINDINGS="$CLIENT/bindings/http.json"
export PGC_SNAPSHOT_ROOT="${PGC_SNAPSHOT_ROOT:-$UMBRELLA/snapshot}"
export PGC_DATA_ROOT="${PGC_DATA_ROOT:-$UMBRELLA/data/collatz_client}"
# Static mounts (all READ-ONLY, config-driven). Three roots:
#   /          the web client (shell + all screens)
#   /traces    live per-run evidence from the instance data root (transient)
#   /snapshot  live inspection of the assembled snapshot (compiled artifacts, PNGs)
# Live means never stale; a missing artifact fails soft via the adapter's friendly 404.
export PGC_STATIC_MOUNTS="/=$CLIENT/web;/traces=$PGC_DATA_ROOT/traces;/snapshot=$PGC_SNAPSHOT_ROOT"
export PGC_HTTP_PORT="${PGC_HTTP_PORT:-8000}"

echo "PGC collatz client (snapshot-bound)"
echo "  client   : $CLIENT"
echo "  snapshot : $PGC_SNAPSHOT_ROOT"
echo "  data     : $PGC_DATA_ROOT"
echo "  port     : $PGC_HTTP_PORT"
echo

exec "$UMBRELLA/protocol_transport/run_http.sh"
