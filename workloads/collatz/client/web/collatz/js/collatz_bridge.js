/**
 * collatz_bridge.js — Thin client for the Collatz demo over the PGC transport boundary.
 *
 * Zero workflow awareness. This page speaks ONLY the public operation identity via its
 * bound HTTP route (POST /collatz -> collatz.compute); it never names a workflow. It
 * sends the operation input and renders the Canonical Transport Response
 * (TRANSPORT_RESPONSE_V0): { request_id, outcome, result_class, result, evidence, errors }.
 *
 * It checks nothing. What was typed is sent as typed: a number-shaped value as a number, anything
 * else as text. The entrance (TI_COLLATZ_COMPUTE_V0) alone admits or refuses it.
 *
 * After a run it reads the run's trace (the evidence the response names) and marks, on the
 * compiled workflow, the routes the trace records.
 */

const MAX_DISPLAY_STEPS = 300;

// The HTTP route bound (by the adapter's External Protocol Binding) to collatz.compute.
const OPERATION_ROUTE = '/collatz';

// What the diagram is drawn from: the entrance, and the workflow's compiled graph in the snapshot.
const ENTRANCE = 'TI_COLLATZ_COMPUTE_V0';
const SNAPSHOT_ROOT = '/snapshot';
const GRAPH = SNAPSHOT_ROOT + '/behavior_logic/workload/WF_COLLATZ_CONJECTURE_V0/WF_COLLATZ_CONJECTURE_V0.graph.json';
let diagram = null;

async function loadDiagram() {
    const svg = document.getElementById('wf-diagram');
    if (!svg) return;
    try {
        const graph = await fetch(GRAPH).then((r) => { if (!r.ok) throw new Error(GRAPH); return r.json(); });
        diagram = window.WorkflowDiagram.draw(svg, graph, { entrance: ENTRANCE });
        const manifest = await fetch(SNAPSHOT_ROOT + '/manifest.json').then((r) => r.json());
        document.getElementById('wf-snapshot').textContent = 'snapshot ' + manifest.snapshot_id.slice(0, 16) + '…';
    } catch (e) {
        svg.outerHTML = '<p class="field-note">The compiled workflow is unavailable: ' + escapeHtml(e.message) + '</p>';
    }
}

// The run's trace, as the events the runtime recorded, one JSON object per line.
async function readTrace(ref) {
    const text = await fetch('/' + ref).then((r) => r.text());
    return text.trim().split('\n').map((line) => JSON.parse(line));
}

function pathFromTrace(events) {
    const routes = events.filter((e) => e.event_type === 'WF_ROUTE');
    const nodes = [ENTRANCE], edges = [];
    if (routes.length) edges.push([ENTRANCE, routes[0].detail.from_node]);
    for (const r of routes) {
        nodes.push(r.detail.from_node, r.detail.to_node);
        edges.push([r.detail.from_node, r.detail.to_node]);
    }
    return { nodes, edges };
}

function setPick(n) {
    document.getElementById('seed_number').value = n;
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'result-panel';
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
}

async function submitCollatz() {
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('collatz-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    const rawValue = document.getElementById('seed_number').value.trim();
    const value = /^-?\d+$/.test(rawValue) ? Number(rawValue) : rawValue;
    if (diagram) diagram.clear();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Computing...';
    resultDiv.className = 'result-panel';
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';

    try {
        // Body IS the operation input; the route carries the operation identity.
        const response = await fetch(OPERATION_ROUTE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: value })
        });
        const envelope = await response.json();
        const ref = (envelope.evidence || []).find((e) => typeof e === 'string' && e.indexOf('trace:') === 0);
        const events = ref ? await readTrace(ref.slice('trace:'.length)) : [];
        renderResult(resultDiv, envelope, events);
        if (diagram) {
            diagram.mark(events.length ? pathFromTrace(events)
                : { nodes: [ENTRANCE, 'REFUSED'], edges: [[ENTRANCE, 'REFUSED']] });
        }
    } catch (e) {
        renderError(resultDiv, e.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

function renderResult(el, envelope, events) {
    const isSuccess = envelope.result_class === 'SUCCESS';
    el.className = 'result-panel visible ' + (isSuccess ? 'success' : 'error');
    el.style.display = '';

    let html = '<span class="status-badge">' + escapeHtml(envelope.result_class || 'ERROR') + '</span>';

    if (Array.isArray(envelope.evidence) && envelope.evidence.length) {
        const items = envelope.evidence.map(function (ev) {
            // A "trace:<path>" reference is resolvable via the /traces mount; link it live.
            if (typeof ev === 'string' && ev.indexOf('trace:') === 0) {
                const ref = ev.slice('trace:'.length);          // traces/<domain>/<wf>/<id>/<id>.jsonl
                const id = ref.replace(/\.jsonl$/, '').split('/').pop();
                return '<a href="/' + encodeURI(ref) + '" target="_blank" rel="noopener">trace:'
                     + escapeHtml(id) + '</a>';
            }
            return escapeHtml(String(ev));
        }).join(', ');
        html += '<div class="result-field"><span class="label">Evidence</span> '
             +  '<span class="value">' + items + '</span></div>';
    }

    if (isSuccess && envelope.result) {
        const r = envelope.result;
        const seq = Array.isArray(r.sequence) ? r.sequence : [];
        const peak = r.peak;

        html += '<div class="seq-stats">'
             +  '  <div class="seq-stat"><span class="stat-label">Seed</span><span class="stat-value">' + r.number + '</span></div>'
             +  '  <div class="seq-stat"><span class="stat-label">Steps to 1</span><span class="stat-value">' + r.steps + '</span></div>'
             +  '  <div class="seq-stat"><span class="stat-label">Peak value</span><span class="stat-value peak">' + Number(peak).toLocaleString() + '</span></div>'
             +  '</div>';

        if (seq.length) {
            html += '<div class="seq-chain-wrap"><div class="seq-chain-label">Sequence</div><div class="seq-chain">';
            const display = seq.length > MAX_DISPLAY_STEPS ? seq.slice(0, MAX_DISPLAY_STEPS) : seq;
            for (let i = 0; i < display.length; i++) {
                const v = display[i];
                let cls = 'seq-num';
                if (i === 0) cls += ' seed';
                else if (v === peak) cls += ' peak';
                if (v === 1) cls = 'seq-num one';
                html += '<span class="' + cls + '">' + v.toLocaleString() + '</span>';
                if (i < display.length - 1) html += '<span class="seq-arrow">&#8594;</span>';
            }
            if (seq.length > MAX_DISPLAY_STEPS) {
                html += '<span class="seq-arrow">&#8594;</span>';
                html += '<span class="seq-truncated">... (' + (seq.length - MAX_DISPLAY_STEPS) + ' more) &rarr; 1</span>';
            }
            html += '</div></div>';
        }
    } else if (Array.isArray(envelope.errors) && envelope.errors.length) {
        if (!events.length) {
            html += '<div class="result-field"><span class="value">Refused at the entrance. No step ran, '
                 +  'so no trace was written.</span></div>';
        }
        for (const err of envelope.errors) {
            html += '<div class="result-field"><span class="label">' + escapeHtml(err.code || 'ERROR') + '</span> '
                 +  '<span class="value">' + escapeHtml(err.message || '') + '</span></div>';
        }
    }

    html += '<details open style="margin-top:12px;">'
         +  '<summary style="font-size:12px;color:#64748b;cursor:pointer;padding:4px 0;">Canonical Transport Response</summary>'
         +  '<div class="result-json">' + escapeHtml(JSON.stringify(envelope, null, 2)) + '</div>'
         +  '</details>';

    el.innerHTML = html;
}

function renderError(el, msg) {
    el.className = 'result-panel visible error';
    el.style.display = '';
    el.innerHTML = '<span class="status-badge">ERROR</span>'
        + '<div class="result-field"><span class="label">Message</span> '
        + '<span class="value">' + escapeHtml(msg) + '</span></div>';
}

function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// `?n=27` plays that number on arrival, so a run can be shared as a link.
loadDiagram().then(() => {
    const n = new URLSearchParams(location.search).get('n');
    if (n !== null) {
        document.getElementById('seed_number').value = n;
        submitCollatz();
    }
});
