const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

const cardChev = '<svg class="card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><polyline points="6 9 12 15 18 9"/></svg>';
const ph = (t, p) => '<div class="video-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg><p>' + t + '</p><code>' + p + '</code></div>';
const eyeIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const plusIco = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
const searchIco = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
const gearIco = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>';

// 1. Replace existing Device Management card → Overview card with hero image
const oldCard =
'<div class="card"><div class="card-hdr open" onclick="toggleCard(this)"><div class="card-icon" style="background:#0e5f7a"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="3"/></svg></div><div><div class="card-title">Device Management</div><div class="card-desc">Sync status, device assignments, and troubleshooting</div></div><svg class="card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><polyline points="6 9 12 15 18 9"/></svg></div>';

const newOverviewHdr =
'<div class="card-controls"><button onclick="expandAll(this)"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>Expand All</button><button onclick="collapseAll(this)"><svg viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15"/></svg>Collapse All</button></div>\n  ' +
'<div id="dv-overview" class="card"><div class="card-hdr open" onclick="toggleCard(this)"><div class="card-icon" style="background:#0e5f7a">' + eyeIco + '</div><div><div class="card-title">Overview</div><div class="card-desc">What the Devices page is, sync status, and assignments</div></div>' + cardChev + '</div>';

let h2 = h.replace(oldCard, newOverviewHdr);
if (h2 === h) { console.log('overview card not replaced'); process.exit(1); }
h = h2;

// 2. Replace the existing card body's h3 + placeholder with hero image + h3 + intro
const oldBody =
'<div class="card-body"><div class="prose"><h3>Device Management</h3><div class="video-placeholder">\n            <p>Devices Overview</p>\n            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg><code>/videos/devices/overview.mp4</code></div>';

const newBody =
'<div class="card-body"><div class="prose"><img src="screenshots/devices/devices-overview.png" alt="Devices page overview" style="width:100%;border-radius:8px;margin-bottom:20px;border:1px solid rgba(0,0,0,.08)"><h3>About This Page</h3>';

h2 = h.replace(oldBody, newBody);
if (h2 === h) { console.log('body header not replaced'); process.exit(1); }
h = h2;

// 3. Insert new cards (register, search, settings) before module-devices closing
// Build the new cards
const dvRegister =
'<div id="dv-register" class="card"><div class="card-hdr" onclick="toggleCard(this)"><div class="card-icon" style="background:#0e5f7a">' + plusIco + '</div><div><div class="card-title">Device Registration</div><div class="card-desc">Register a new handheld device so it appears on the Devices page</div></div>' + cardChev + '</div>' +
'<div class="card-body"><div class="prose">' +
'<h3>Device Registration</h3>' +
'<div class="video-embed"><video data-src="a/devices/device-registration.bin" muted loop playsinline></video></div>' +
'<p>Register a handheld device with PickTrace so it can sync timecards, production records, and crew assignments. Once registered, the device shows up on the Devices page with its sync status and current assignment.</p>' +
'</div></div></div>';

const dvSearch =
'<div id="dv-search" class="card"><div class="card-hdr" onclick="toggleCard(this)"><div class="card-icon" style="background:#0e5f7a">' + searchIco + '</div><div><div class="card-title">Advanced Search</div><div class="card-desc">Filter the device list</div></div>' + cardChev + '</div>' +
'<div class="card-body"><div class="prose">' +
'<h3>Advanced Search</h3>' +
ph('Searching Devices', '/videos/devices/search.mp4') +
'<p>Click the <strong>Search ▾</strong> dropdown in the toolbar to open Advanced Search and narrow the device list down by the filters available on this page.</p>' +
'</div></div></div>';

const dvSettings =
'<div id="dv-settings" class="card"><div class="card-hdr" onclick="toggleCard(this)"><div class="card-icon" style="background:#0e5f7a">' + gearIco + '</div><div><div class="card-title">Settings (Gear)</div><div class="card-desc">Column visibility, records per page, and archived vs. active view</div></div>' + cardChev + '</div>' +
'<div class="card-body"><div class="prose">' +
'<h3>Settings (Gear)</h3>' +
ph('Devices Settings (Gear)', '/videos/devices/settings.mp4') +
'<p>The <strong>⚙ gear</strong> icon at the far right of the toolbar controls how the device table displays:</p>' +
'<table class="tbl"><tr><th>Setting</th><th>What It Does</th></tr>' +
'<tr><td><strong>Column visibility</strong></td><td>Show or hide individual columns on the device table</td></tr>' +
'<tr><td><strong>Records per page</strong></td><td>How many device rows to display before paginating</td></tr>' +
'<tr><td><strong>Records status</strong></td><td>Switch between active and archived devices</td></tr>' +
'</table>' +
'</div></div></div>';

// Find the closing of module-devices and insert before it
const anchor = '</div>\r\n</div>\r\n\r\n<div id="module-crops"';
const i = h.indexOf(anchor);
if (i < 0) { console.log('module-devices anchor not found, trying alternate'); }
else {
  const ins = '\r\n  ' + dvRegister + '\r\n  ' + dvSearch + '\r\n  ' + dvSettings;
  h = h.slice(0, i) + '</div>' + ins + h.slice(i + '</div>'.length);
}

fs.writeFileSync('index.html', h);
const o = (h.match(/<div\b/g) || []).length, c = (h.match(/<\/div>/g) || []).length;
console.log('divs', o, '/', c, 'delta', o - c);
const s = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
let bad = 0; s.forEach(x => { try { new Function(x); } catch (e) { bad++; console.log('JS ERR', e.message); } });
console.log(bad ? 'JS ERROR' : 'JS OK');
const di = h.indexOf('id="module-devices"'), de = h.indexOf('id="module-crops"', di);
const ids = [...h.slice(di, de).matchAll(/<div id="(dv-[a-z]+)" class="card">/g)].map(m => m[1]);
console.log('cards:', ids);
