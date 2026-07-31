/**
 * collatz_bridge.js — Thin client for the Collatz demo over the PGC transport boundary.
 *
 * Zero workflow awareness. This page speaks ONLY the public operation identity via its
 * bound HTTP route (POST /collatz -> collatz.compute); it never names a workflow. It
 * sends the operation input and renders the Canonical Transport Response
 * (TRANSPORT_RESPONSE_V0): { request_id, outcome, result_class, result, evidence, errors }.
 */

const MAX_DISPLAY_STEPS = 300;

// The HTTP route bound (by the adapter's External Protocol Binding) to collatz.compute.
const OPERATION_ROUTE = '/collatz';

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
    const n = parseInt(rawValue, 10);
    if (!rawValue || isNaN(n) || n < 1 || n > 999999) {
        renderError(resultDiv, 'Enter a whole number between 1 and 999,999.');
        return;
    }

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
            body: JSON.stringify({ number: n })
        });
        const envelope = await response.json();
        renderResult(resultDiv, envelope, n);
    } catch (e) {
        renderError(resultDiv, e.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

function renderResult(el, envelope, n) {
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
