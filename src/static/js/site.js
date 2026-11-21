// Air Climate — site script: nav, dropdowns, lead forms, quiz funnels (with UTM capture).
(function () {
  // ── Mobile nav toggle ──
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
  }
  // ── Dropdowns (click / tap; desktop also opens on hover via CSS) ──
  var drops = document.querySelectorAll('.has-drop');
  drops.forEach(function (li) {
    var btn = li.querySelector('.drop-btn');
    btn.addEventListener('click', function () {
      var open = !li.classList.contains('open');
      drops.forEach(function (o) { if (o !== li) { o.classList.remove('open'); o.querySelector('.drop-btn').setAttribute('aria-expanded', 'false'); } });
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 1000 && !e.target.closest('.has-drop')) drops.forEach(function (o) { o.classList.remove('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    drops.forEach(function (o) { o.classList.remove('open'); });
    if (nav && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
  });

  // ── Campaign tracking: keep UTM / click IDs from the landing URL for the whole visit ──
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  var params = new URLSearchParams(location.search);
  var found = {};
  keys.forEach(function (k) { if (params.get(k)) found[k] = params.get(k); });
  try {
    if (Object.keys(found).length) sessionStorage.setItem('ac_utm', JSON.stringify(found));
    else found = JSON.parse(sessionStorage.getItem('ac_utm') || '{}');
  } catch (e) { /* storage unavailable */ }
  var utmString = Object.keys(found).map(function (k) { return k + '=' + found[k]; }).join('&');

  function prep(form) {
    var page = form.querySelector('[data-page]');
    var utm = form.querySelector('[data-utm]');
    if (page) page.value = location.pathname;
    if (utm) utm.value = utmString;
  }
  function val(form, n) { var el = form.elements[n]; return el && el.value ? String(el.value).trim() : ''; }
  function send(form, btn, label) {
    if (form.company_website && form.company_website.value) return; // spam trap
    btn.disabled = true; btn.textContent = 'Sending…';
    // Email subject Netlify uses for the notification, e.g. "New lead: AC repair – Maria (95207)"
    var subj = form.querySelector('[data-subject]');
    if (subj) subj.value = 'New lead: ' + (val(form, 'interest') || val(form, 'problem') || 'Website request') + ' – ' + val(form, 'name') + (val(form, 'zip') ? ' (' + val(form, 'zip') + ')' : '');
    var done = function () { try { sessionStorage.setItem('ac_lead', val(form, 'form-name') || '1'); } catch (e) {} location.href = '/thank-you/'; };
    var local = /^(localhost|127.0.0.1)$/.test(location.hostname);
    var custom = form.getAttribute('data-endpoint');
    if (local && !custom) { done(); return; } // local preview: no form backend, just show the thank-you page
    var req = custom
      ? fetch(custom, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      : fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() });
    req.then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
      .catch(function () {
        btn.disabled = false; btn.textContent = label;
        var err = form.querySelector('.form-error');
        if (err) { err.textContent = 'That didn’t go through. Please call (209) 642-9021 and we’ll take care of you.'; err.hidden = false; }
      });
  }
  function checkField(f) {
    var ok = f.value.trim() !== '' && f.checkValidity();
    if (f.name === 'phone') ok = f.value.replace(/\D/g, '').length >= 10;
    if (f.name === 'zip') ok = /^\d{5}$/.test(f.value.trim());
    f.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }
  function labelOf(f) { return f.labels && f.labels[0] ? f.labels[0].textContent.toLowerCase().replace(/\s*\(.*\)/, '').trim() : 'details'; }

  // ── Simple lead forms ──
  document.querySelectorAll('[data-lead-form]').forEach(function (form) {
    prep(form);
    var err = form.querySelector('.form-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (err) { err.hidden = true; err.textContent = ''; }
      var bad = null;
      form.querySelectorAll('input[required], select[required]').forEach(function (f) { if (!checkField(f) && !bad) bad = f; });
      if (bad) { if (err) { err.textContent = 'Please add your ' + labelOf(bad) + ' so we can reach you.'; err.hidden = false; } bad.focus(); return; }
      send(form, form.querySelector('button[type="submit"]'), 'Request service');
    });
  });

  // ── Quiz funnels: one question at a time, auto-advance on tap ──
  var inArea = /^(952|953|945|956|957)/; // rough check for the 40-mile area; never blocks a lead
  document.querySelectorAll('[data-quiz]').forEach(function (form) {
    prep(form);
    var steps = Array.prototype.slice.call(form.querySelectorAll('.qz-step'));
    var total = steps.length;
    var i = 0;
    var bar = form.querySelector('.qz-bar');
    var n = form.querySelector('[data-qz-n]');
    var back = form.querySelector('[data-qz-back]');
    var err = form.querySelector('.form-error');

    function show(k, focus) {
      i = Math.max(0, Math.min(total - 1, k));
      steps.forEach(function (s, j) { s.hidden = j !== i; });
      bar.style.setProperty('--p', ((i + 1) / total).toFixed(3));
      n.textContent = i + 1;
      back.hidden = i === 0;
      if (err) err.hidden = true;
      if (focus) {
        var first = steps[i].querySelector('input:checked, input:not([type=hidden])');
        if (first) first.focus({ preventScroll: true });
        if (form.getBoundingClientRect().top < 0) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    steps.forEach(function (s) {
      s.querySelectorAll('input[type=radio]').forEach(function (r) {
        r.addEventListener('change', function () { setTimeout(function () { show(i + 1, true); }, 260); });
      });
    });
    var zip = form.querySelector('input[name=zip]');
    var zipNote = form.querySelector('[data-zip-note]');
    function zipNext() {
      if (!checkField(zip)) { err.textContent = 'Please enter a 5-digit ZIP code.'; err.hidden = false; zip.focus(); return; }
      if (!inArea.test(zip.value) && zipNote.hidden) {
        zipNote.textContent = 'That ZIP may be outside our 40-mile area. Tap Continue and we’ll let you know either way.';
        zipNote.hidden = false; return;
      }
      show(i + 1, true);
    }
    form.querySelector('[data-qz-next]').addEventListener('click', zipNext);
    zip.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); zipNext(); } });
    zip.addEventListener('input', function () { zipNote.hidden = true; });
    back.addEventListener('click', function () { show(i - 1, true); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (i !== total - 1) return;
      var bad = null;
      steps[i].querySelectorAll('[data-qz-required]').forEach(function (f) { if (!checkField(f) && !bad) bad = f; });
      if (bad) { err.textContent = 'Please add your ' + labelOf(bad) + ' so we can reach you.'; err.hidden = false; bad.focus(); return; }
      send(form, form.querySelector('button[type="submit"]'), 'Get my call back');
    });
    show(0, false);
  });

  // ── Conversion tracking: fire "Lead" once, on the thank-you page right after a real submission ──
  if (location.pathname === '/thank-you/') {
    var lead = null;
    try { lead = sessionStorage.getItem('ac_lead'); sessionStorage.removeItem('ac_lead'); } catch (e) {}
    if (lead) {
      if (window.fbq) fbq('track', 'Lead', { content_name: lead });
      if (window.gtag) {
        gtag('event', 'generate_lead', { form_name: lead });
        var ads = document.querySelector('meta[name="ads-lead"]');
        if (ads) gtag('event', 'conversion', { send_to: ads.content });
      }
    }
  }
})();
