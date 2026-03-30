# Claude Code Instructions: Add Advanced Search Filter Sub-Tabs to Timecards
## File: `index.html` (PickTrace Office Suite)

---

## Critical Context — This Is NOT the Old Timecards Guide

This is the **PickTrace Office Suite** (`index.html`) — a single-page app with a sidebar nav, module panels, and accordion cards. The architecture is completely different from any older timecards guide:

- Modules use class `module-panel` with `id="module-{name}"`
- Content lives inside `.card` → `.card-hdr` / `.card-body` accordion pairs
- **There is NO existing sub-tab system in this file** — CSS, HTML, and JS all need to be added
- CSS variables: `--blue:#1a6fba`, `--text:#3a3a3a`, `--border:#dde3ec`, `--bg:#f4f6f9`, `--white:#fff`, `--text-light:#666`

---

## What to Add

Replace the flat "Search & Filter" text block inside the **Overview card** (`#tc-overview`) with a 4-tab sub-tab component that organizes all real Advanced Search filters by category.

---

## Step 1 — Add Sub-Tab CSS

Inside the `<style>` block, **before the closing `</style>` tag**, add:

```css
/* ── Sub-tabs (Advanced Search filter categories) ── */
.stabs{display:flex;gap:2px;border-bottom:2px solid var(--border);margin:14px 0 16px}
.stab{background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-2px;
  padding:8px 14px;font-size:12px;font-weight:600;color:var(--text-light);
  cursor:pointer;font-family:inherit;transition:color .15s,border-color .15s;white-space:nowrap}
.stab:hover{color:var(--text)}
.stab.active{color:var(--blue);border-bottom-color:var(--blue)}
.sp{display:none}
.sp.active{display:block}
.filter-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;margin:10px 0 12px}
.filter-item{font-size:12px;color:var(--text);line-height:1.8;display:flex;align-items:baseline;gap:6px}
.filter-item::before{content:'›';color:var(--blue);font-weight:700;flex-shrink:0}
.filter-tag{display:inline-block;padding:1px 6px;border-radius:10px;font-size:10px;font-weight:700;background:#deeaf8;color:#1a4a7a;margin-left:4px}
.filter-chk{font-size:12px;color:var(--text);line-height:1.9;padding-left:2px}
.filter-chk::before{content:'☐ ';color:var(--text-light)}
```

---

## Step 2 — Add the `stab()` JS Function

Inside the `<script>` block at the bottom of the file, **before the closing `</script>` tag**, add:

```javascript
function stab(btn,pid){
  var p=btn.closest('.stabs').parentElement;
  p.querySelectorAll('.stab').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');
  p.querySelectorAll('.sp').forEach(function(s){s.classList.remove('active')});
  var panel=document.getElementById(pid);
  if(panel) panel.classList.add('active');
}
```

---

## Step 3 — Replace the Search & Filter Section

### Find This Exact Block

Inside `<div id="tc-overview" class="card">` → `.card-body` → `.prose`, locate and replace this exact block:

```html
<h3>Search & Filter</h3>
<p>Click <strong>Search</strong> in the top header. Combine criteria and click Apply. Available filters: Name, Site/Location, Crop, Employer, Crew, Job, Device, Hourly Rate, Production Records, Work Hours, Audited by, Has no Prod. Records, Edited Record.</p>
<div class="tip"><strong>Check "Edited Record"</strong> to see only timecards modified after creation — useful for spotting what's already been touched.</div>
```

### Replace With

```html
<h3>Search &amp; Filter</h3>
<p>Click the <strong>Search ▾</strong> dropdown in the top header to open <strong>Advanced Search</strong>. Combine any number of filters and click <strong>Apply</strong>.</p>

<div class="stabs">
  <button class="stab active" onclick="stab(this,'sf-people')">People &amp; Location</button>
  <button class="stab" onclick="stab(this,'sf-work')">Work Details</button>
  <button class="stab" onclick="stab(this,'sf-status')">Status &amp; Compliance</button>
  <button class="stab" onclick="stab(this,'sf-flags')">Record Flags</button>
</div>

<!-- Sub-panel 1: People & Location -->
<div class="sp active" id="sf-people">
  <p style="font-size:12px;color:var(--text-light);margin-bottom:8px">Narrow by who worked and where. All dropdowns support Include or Exclude.</p>
  <div class="filter-grid">
    <div class="filter-item">Employee</div>
    <div class="filter-item">Crew</div>
    <div class="filter-item">Employer</div>
    <div class="filter-item">Employee title</div>
    <div class="filter-item">Team</div>
    <div class="filter-item">Site</div>
    <div class="filter-item">Location</div>
    <div class="filter-item">Device user</div>
  </div>
  <div class="tip"><strong>Always filter by Crew first</strong> before making any edits — this prevents accidentally touching another crew's timecards.</div>
</div>

<!-- Sub-panel 2: Work Details -->
<div class="sp" id="sf-work">
  <p style="font-size:12px;color:var(--text-light);margin-bottom:8px">Filter by what the employee was doing, how long, and on what device.</p>
  <div class="filter-grid">
    <div class="filter-item">Job <span class="filter-tag">Include / Exclude</span></div>
    <div class="filter-item">Work Bundle <span class="filter-tag">Include / Exclude</span></div>
    <div class="filter-item">Crop <span class="filter-tag">Include / Exclude</span></div>
    <div class="filter-item">Variety <span class="filter-tag">Include / Exclude</span></div>
    <div class="filter-item">Device <span class="filter-tag">text search</span></div>
    <div class="filter-item">Hourly rate <span class="filter-tag">= / &lt; / &gt;</span></div>
    <div class="filter-item">Hours — Work <span class="filter-tag">= / &lt; / &gt;</span></div>
    <div class="filter-item">Hours — Shift <span class="filter-tag">= / &lt; / &gt;</span></div>
  </div>
  <div class="tip"><strong>Use the Exclude toggle on Job</strong> and select Break + Lunch before any bulk job edit — this prevents overwriting break records.</div>
</div>

<!-- Sub-panel 3: Status & Compliance -->
<div class="sp" id="sf-status">
  <p style="font-size:12px;color:var(--text-light);margin-bottom:8px">Surface errors, break violations, and penalty premium status.</p>
  <div class="filter-grid">
    <div class="filter-item">Error / warning <span class="filter-tag">Include / Exclude</span></div>
    <div class="filter-item">Break warnings <span class="filter-tag">Include / Exclude</span></div>
    <div class="filter-item">Attestation Status <span class="filter-tag">Include / Exclude</span></div>
  </div>
  <div style="margin-top:8px">
    <div class="filter-chk" style="font-size:12px;color:var(--text);line-height:2">Penalty Premium Applied</div>
  </div>
  <div class="tip" style="margin-top:10px"><strong>Break warnings → Apply Penalty</strong> using the star icon to the right of the search bar. Filter by <em>Penalty Premium Applied</em> to find and remove previously applied penalties.</div>
</div>

<!-- Sub-panel 4: Record Flags -->
<div class="sp" id="sf-flags">
  <p style="font-size:12px;color:var(--text-light);margin-bottom:8px">Checkbox filters that show or hide specific record types.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 20px;margin:8px 0">
    <div class="filter-chk">No production records</div>
    <div class="filter-chk">Edited record</div>
    <div class="filter-chk">Reviewed data</div>
    <div class="filter-chk">Unreviewed data</div>
    <div class="filter-chk">Open Timecards</div>
    <div class="filter-chk">H-2A Employee</div>
    <div class="filter-chk">From Kiosk Device</div>
    <div class="filter-chk">Shift Start Timecards</div>
    <div class="filter-chk">Notes</div>
  </div>
  <div class="tip"><strong>Use "Unreviewed data" as your final pre-payroll check</strong> to catch anything not yet approved. Use "Edited record" to see every timecard touched after creation.</div>
</div>
```

---

## Summary of All 3 Changes

| # | Location | What to add/change |
|---|---|---|
| 1 | `<style>` — before `</style>` | 14 lines of sub-tab + filter-grid CSS |
| 2 | `<script>` — before `</script>` | `stab()` function (7 lines) |
| 3 | `#tc-overview .card-body .prose` | Replace 3-line Search & Filter block with 4-tab component |

---

## Exact Filter Reference (from Live PickTrace Screenshot)

These are the real filter names exactly as they appear in the PickTrace Advanced Search panel:

**Dropdown + Include/Exclude:** Employee, Crew, Crop, Variety, Site, Location, Job, Work Bundle, Employer, Employee title, Device user, Team, Error/warning, Break warnings, Attestation Status

**Text/numeric fields:** Device (text), Hourly rate (comparator + value + `/hr`), Hours with Work/Shift toggle (comparator + hour + min)

**Checkboxes:** No production records, Edited record, H-2A Employee, Reviewed data, Unreviewed data, Notes, Open Timecards, From Kiosk Device, Shift Start Timecards, Penalty Premium Applied

---

## Do NOT Change

- Any other `.card`, module panel, sidebar, or JS function in the file
- CSS variables — use them as-is (`--blue`, `--text`, `--border`, etc.)
- The `toggleCard()`, `showModule()`, `toggleSub()`, `showModuleSub()` functions
- The `#tc-overview` card header or any other card
- The sub-panel IDs (`sf-people`, `sf-work`, `sf-status`, `sf-flags`) must be globally unique — verify no other element shares these IDs before saving
