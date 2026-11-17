(() => {
'use strict';
const { NUM, ANGEL, CULTURE, FREQ, INTENT, ZONES } = window.NU;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const app = $('#app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- icons ---------- */
const I = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  starF: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  search: '<svg class="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  love: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  career: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/></svg>',
  money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.2 0-2.1-.5-2.6-1.5M12 6.5V8M12 16v1.5"/></svg>',
  growth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21V10M12 10c0-4 3-6 7-6 0 4-3 6-7 6zM12 13c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6"/></svg>',
  spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>',
  phones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/></svg>',
  orbit: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1"><circle cx="20" cy="20" r="16"/><ellipse cx="20" cy="20" rx="16" ry="6"/><circle cx="20" cy="20" r="2.5" fill="currentColor"/></svg>',
  wing: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1"><path d="M20 30c-6-2-12-8-14-18 6 2 10 6 14 12 4-6 8-10 14-12-2 10-8 16-14 18z"/><path d="M20 30V14"/></svg>',
  grid: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1"><rect x="6" y="6" width="28" height="28" rx="2"/><path d="M15.3 6v28M24.6 6v28M6 15.3h28M6 24.6h28"/></svg>',
  wave: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M3 20c3-10 6-10 9 0s6 10 9 0 6-10 9 0 5 8 7 4"/><path d="M3 28h34" opacity=".4"/></svg>',
  compass: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1"><circle cx="20" cy="20" r="16"/><path d="m26 14-4 8-8 4 4-8z"/></svg>',
  self: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1"><circle cx="20" cy="20" r="16"/><circle cx="20" cy="20" r="9"/><circle cx="20" cy="20" r="2" fill="currentColor"/></svg>'
};

/* ---------- helpers ---------- */
const trimNum = n => { const s = n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2); return s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1'); };
const fmtHz = f => f >= 1000 ? trimNum(f / 1000) + ' kHz' : trimNum(f) + ' Hz';
const fmtLen = m => { const U = [[1e3, 'km'], [1, 'm'], [1e-2, 'cm'], [1e-3, 'mm']]; for (const [v, u] of U) if (m >= v) return trimNum(m / v) + ' ' + u; return trimNum(m / 1e-6) + ' µm'; };
const fmtTime = s => s >= 1 ? trimNum(s) + ' s' : s >= 1e-3 ? trimNum(s * 1e3) + ' ms' : trimNum(s * 1e6) + ' µs';
const NOTES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const noteOf = f => { const m = 12 * Math.log2(f / 440) + 69, r = Math.round(m), c = Math.round((m - r) * 100); return NOTES[((r % 12) + 12) % 12] + (Math.floor(r / 12) - 1) + (c === 0 ? '' : (c > 0 ? ' +' : ' −') + Math.abs(c) + '¢'); };
const zoneOf = f => ZONES.find(z => f >= z[0] && f < z[1]) || ZONES[ZONES.length - 1];
const fKey = f => 'f-' + String(+(+f).toFixed(2)).replace('.', 'p');
const parseFKey = s => parseFloat(s.replace('p', '.'));
const fillRange = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100) + '%');
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200); }
function playable(f) { if (f <= 0) return null; let p = f, k = 0; while (p < 100) { p *= 2; k++; } while (p > 20000) { p /= 2; k--; } return { f: p, k }; }
const dayIndex = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);

/* ---------- storage: this device, plus a private per account copy when available ---------- */
const Store = {
  s: { favN: [], favF: [], myF: [], recents: [], mixes: [], journal: [], sessions: [], profile: { birth: '', name: '' }, updated: 0 },
  load() { try { const r = localStorage.getItem('nu.v1'); if (r) Object.assign(this.s, JSON.parse(r)); } catch (e) {} if (!Array.isArray(this.s.myF)) this.s.myF = []; },
  save() { this.s.updated = Date.now(); try { localStorage.setItem('nu.v1', JSON.stringify(this.s)); } catch (e) {} Cloud.push(); }
};
const Cloud = {
  ref: null, busy: false, pending: false, t: 0, on: false,
  async init() {
    try {
      let tries = 0; while (!(window.claude && window.claude.use) && tries < 25) { await new Promise(r => setTimeout(r, 200)); tries++; }
      if (!(window.claude && window.claude.use)) return;
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      const id = await user.id(); if (!id) return;
      this.ref = db.collection('data/users/' + id).doc('universe');
      const snap = await Promise.race([this.ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
      const data = snap && (typeof snap.data === 'function' ? snap.data() : (snap.data !== undefined ? snap.data : snap));
      if (data && data.state) {
        const remote = JSON.parse(data.state);
        if ((remote.updated || 0) > (Store.s.updated || 0)) { Object.assign(Store.s, remote); try { localStorage.setItem('nu.v1', JSON.stringify(Store.s)); } catch (e) {} if (current === 'universe' || current === 'home') route(); }
        else if ((Store.s.updated || 0) > (remote.updated || 0)) this.push();
      } else if (Store.s.updated) this.push();
      this.on = true; $$('.sync').forEach(el => { el.classList.add('on'); el.lastChild.textContent = 'Synced privately to your account'; });
    } catch (e) { this.ref = null; }
  },
  push() { if (!this.ref) return; clearTimeout(this.t); this.t = setTimeout(() => this.flush(), 1500); },
  async flush() { if (this.busy) { this.pending = true; return; } this.busy = true; try { await this.ref.set({ state: JSON.stringify(Store.s), updated: Store.s.updated }); } catch (e) {} this.busy = false; if (this.pending) { this.pending = false; this.flush(); } }
};
function addRecent(type, v) { const k = type + ':' + v; Store.s.recents = [k, ...Store.s.recents.filter(x => x !== k)].slice(0, 16); Store.save(); }
function isFav(type, v) { return (type === 'n' ? Store.s.favN : Store.s.favF).includes(String(v)); }
function toggleFav(type, v) { const arr = type === 'n' ? 'favN' : 'favF'; v = String(v); if (Store.s[arr].includes(v)) { Store.s[arr] = Store.s[arr].filter(x => x !== v); toast('Removed from favorites'); } else { Store.s[arr].unshift(v); toast('Saved to My Universe'); } Store.save(); }

/* ---------- numerology engine (Pythagorean system) ---------- */
const MASTER = [11, 22, 33];
const digitSum = s => String(s).split('').reduce((a, d) => a + (+d || 0), 0);
function reduceSteps(n, keep = true) { const steps = []; while (n > 9 && !(keep && MASTER.includes(n))) { const ds = String(n).split(''); const s = ds.reduce((a, d) => a + +d, 0); steps.push(ds.join(' + ') + ' = ' + s); n = s; } return { n, steps }; }
const reduce = (n, keep = true) => reduceSteps(n, keep).n;
const LET = {}; 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c, i) => LET[c] = i % 9 + 1);
const VOW = new Set(['A', 'E', 'I', 'O', 'U']);
function nameCalc(name, filter) { const L = name.toUpperCase().replace(/[^A-Z]/g, '').split('').filter(filter); const sum = L.reduce((a, c) => a + LET[c], 0); const r = reduceSteps(sum); return { n: r.n, how: L.length ? L.map(c => c + LET[c]).join(' ') + ' = ' + sum + (r.steps.length ? ' → ' + r.steps.map(s => s.split(' = ')[1]).join(' → ') : '') : 'Enter a name' }; }
function birthParts(b) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(b || ''); return m ? { y: +m[1], m: +m[2], d: +m[3] } : null; }
function lifePath(b) { const p = birthParts(b); if (!p) return null; const rm = reduce(p.m), rd = reduce(p.d), ry = reduce(p.y); const tot = rm + rd + ry, r = reduceSteps(tot); return { n: r.n, how: 'Month ' + p.m + ' → ' + rm + ', day ' + p.d + ' → ' + rd + ', year ' + p.y + ' → ' + ry + '. ' + rm + ' + ' + rd + ' + ' + ry + ' = ' + tot + (r.steps.length ? ' → ' + r.n : '') }; }
function personal(b, now = new Date()) { const p = birthParts(b); if (!p) return null; const cy = now.getFullYear(), cm = now.getMonth() + 1, cd = now.getDate(); const py = reduce(reduce(p.m, false) + reduce(p.d, false) + reduce(cy, false), false); const pm = reduce(py + reduce(cm, false), false); const pd = reduce(pm + reduce(cd, false), false); return { py, pm, pd, cy, cm, cd, how: { py: 'Birth month ' + p.m + ' + birth day ' + p.d + ' + current year ' + cy + ', each reduced, then summed and reduced to ' + py, pm: 'Personal year ' + py + ' + current month ' + cm + ' → ' + pm, pd: 'Personal month ' + pm + ' + today ' + cd + ' → ' + pd } }; }
function analyze(str) {
  const digits = str.split('').map(Number); const sum = digits.reduce((a, b) => a + b, 0);
  let root, steps;
  if (str.length === 1) { root = +str; steps = [str + ' is a core number']; }
  else if (['11', '22', '33'].includes(str)) { root = +str; steps = [str + ' is a master number and is not reduced']; }
  else { const r = reduceSteps(sum); root = r.n; steps = [digits.join(' + ') + ' = ' + sum, ...r.steps]; }
  const pats = [];
  const rep = str.length > 1 && /^(\d)\1+$/.test(str);
  if (rep) pats.push(['Repeating digit', 'Numerology and angel number readers treat repetition as amplifying the energy of a single digit, here ' + str[0] + '.']);
  if (!rep && str.length >= 4 && /^(\d\d)\1+$/.test(str)) pats.push(['Repeating pair', 'Read as two energies in conversation: ' + str[0] + ' and ' + str[1] + '.']);
  if (!rep && str.length > 2 && str === str.split('').reverse().join('')) pats.push(['Mirror number', 'Palindromes are read as reflection and balance, reading the same in both directions.']);
  const up = str.length > 2 && digits.every((d, i) => i === 0 || d === digits[i - 1] + 1), down = str.length > 2 && digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  if (up) pats.push(['Ascending sequence', 'Read as step by step progress in the right order.']);
  if (down) pats.push(['Descending sequence', 'Read as release, simplification and returning to essentials.']);
  if (str.length > 1 && str.includes('0') && !rep) pats.push(['Contains zero', 'Zero is traditionally read as amplifying the digits beside it.']);
  const core = rep ? +str[0] : root;
  return { root, steps, pats, core, rep, sum };
}
function related(str) {
  const n = +str, out = new Set();
  if (str.length <= 15) {
    const rep = /^(\d)\1+$/.test(str) || str.length === 1;
    if (rep) { const d = str[0]; for (let k = 1; k <= 4; k++) out.add(d.repeat(k)); }
    const rv = str.split('').reverse().join(''); if (rv !== str && rv[0] !== '0') out.add(rv);
    if (Number.isSafeInteger(n)) { if (n - 1 >= 0) out.add(String(n - 1)); out.add(String(n + 1)); if (n - 9 >= 0) out.add(String(n - 9)); out.add(String(n + 9)); }
    const root = analyze(str).root; out.add(String(root));
    Object.keys(ANGEL).filter(k => analyze(k).root === root).slice(0, 3).forEach(k => out.add(k));
  }
  out.delete(str); return [...out].slice(0, 11);
}

/* ---------- audio engine ---------- */
const E = { ac: null, master: null, an: null, buf: null, fbuf: null, vol: 0.3, nb: {} };
const LV = { sine: .5, triangle: .45, square: .15, sawtooth: .18 };
function ac() {
  if (!E.ac) {
    const C = window.AudioContext || window.webkitAudioContext; E.ac = new C();
    E.master = E.ac.createGain(); E.master.gain.value = E.vol;
    const comp = E.ac.createDynamicsCompressor(); comp.threshold.value = -10; comp.ratio.value = 8; comp.attack.value = .005; comp.release.value = .2;
    E.an = E.ac.createAnalyser(); E.an.fftSize = 2048; E.an.smoothingTimeConstant = .82; E.buf = new Float32Array(2048); E.fbuf = new Uint8Array(1024);
    E.master.connect(comp); comp.connect(E.an); E.an.connect(E.ac.destination);
  }
  if (E.ac.state === 'suspended') E.ac.resume();
  return E.ac;
}
function logSession(label, start, extra) { const end = Date.now(); if (!start || end - start < 5000) return; Store.s.sessions.unshift(Object.assign({ label, start, end }, extra || {})); Store.s.sessions = Store.s.sessions.slice(0, 80); Store.save(); }

/* single tone player */
const T = { node: null, f: 440, w: 'sine', v: .7, dur: 0, timer: 0, label: '', start: 0, src: null };
function toneStart(f, label, src) {
  mixStop(true); toneStop(true); ac();
  const a = E.ac, o = a.createOscillator(), g = a.createGain();
  o.type = T.w; o.frequency.value = f; g.gain.value = 0; o.connect(g); g.connect(E.master); o.start();
  g.gain.setTargetAtTime(T.v * LV[T.w], a.currentTime, .05);
  T.node = { o, g }; T.f = f; T.label = label; T.src = src || null; T.start = Date.now();
  if (T.dur) { T.timer = setTimeout(() => toneStop(), T.dur * 60000); T.ends = Date.now() + T.dur * 60000; } else T.ends = 0;
  onAudio();
}
function toneStop(silent) { clearTimeout(T.timer); if (!T.node) return; const { o, g } = T.node, t = E.ac.currentTime; g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(0, t, .06); o.stop(t + .5); T.node = null; logSession(T.label, T.start, { tone: { f: T.f, w: T.w } }); if (!silent) onAudio(); }
function toneSetFreq(f, label) { T.f = f; if (label) T.label = label; if (T.node) T.node.o.frequency.setTargetAtTime(f, E.ac.currentTime, .02); onAudio(true); }
function saveMyFreq(f, name, w) { Store.s.myF.unshift({ id: Date.now(), name: (name || '').trim() || fmtHz(f), f: +(+f).toFixed(2), w: w || 'sine' }); Store.s.myF = Store.s.myF.slice(0, 60); Store.save(); toast('Saved to My frequencies'); }
function toneUpdate() { if (!T.node) return; const t = E.ac.currentTime; T.node.o.type = T.w; T.node.g.gain.setTargetAtTime(T.v * LV[T.w], t, .05); }

/* noise and ambience */
function noiseBuf(kind) {
  if (E.nb[kind]) return E.nb[kind];
  const a = E.ac, len = a.sampleRate * 6, b = a.createBuffer(2, len, a.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (kind === 'white') d[i] = w * .5;
      else if (kind === 'pink') { b0 = .99886 * b0 + w * .0555179; b1 = .99332 * b1 + w * .0750759; b2 = .969 * b2 + w * .153852; b3 = .8665 * b3 + w * .3104856; b4 = .55 * b4 + w * .5329522; b5 = -.7616 * b5 - w * .016898; d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362) * .11; b6 = w * .115926; }
      else { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; }
    }
  }
  return (E.nb[kind] = b);
}
function nsrc(kind) { const s = E.ac.createBufferSource(); s.buffer = noiseBuf(kind); s.loop = true; s.start(0, Math.random() * 5); return s; }
function lfo(freq, depth, target) { const o = E.ac.createOscillator(), g = E.ac.createGain(); o.frequency.value = freq; g.gain.value = depth; o.connect(g); g.connect(target); o.start(); return o; }
function filt(type, f, q) { const b = E.ac.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
function gainN(v) { const g = E.ac.createGain(); g.gain.value = v; return g; }
function buildAmb(type, out) {
  const ns = [], add = x => (ns.push(x), x);
  if (type === 'rain') {
    const s = add(nsrc('pink')), hp = filt('highpass', 500), lp = filt('lowpass', 9000), g = gainN(.9); s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(out);
    const s2 = add(nsrc('white')), bp = filt('bandpass', 3200, .6), g2 = gainN(.12); s2.connect(bp); bp.connect(g2); g2.connect(out); add(lfo(.3, .05, g2.gain));
  } else if (type === 'ocean') {
    const s = add(nsrc('brown')), lp = filt('lowpass', 700), g = gainN(.55); s.connect(lp); lp.connect(g); g.connect(out); add(lfo(.075, 450, lp.frequency)); add(lfo(.075, .4, g.gain));
    const s2 = add(nsrc('pink')), hp = filt('highpass', 1500), g2 = gainN(.06); s2.connect(hp); hp.connect(g2); g2.connect(out); add(lfo(.075, .05, g2.gain));
  } else {
    const s = add(nsrc('pink')), bp = filt('bandpass', 520, 1.1), g = gainN(.8); s.connect(bp); bp.connect(g); g.connect(out); add(lfo(.09, 320, bp.frequency)); add(lfo(.05, .4, g.gain));
  }
  return { kill() { ns.forEach(n => { try { n.stop(); } catch (e) {} }); } };
}

/* studio mix */
const M = { layers: [], playing: false, nodes: new Map(), bus: null, start: 0, name: 'My mix', timerMin: 0, timerEnd: 0, tid: 0 };
let LID = 0;
const newLayer = o => Object.assign({ id: ++LID, mute: false }, JSON.parse(JSON.stringify(o)));
function layerNode(L) {
  const a = E.ac;
  if (L.k === 'tone') {
    const o = a.createOscillator(), g = gainN(0), p = a.createStereoPanner ? a.createStereoPanner() : null;
    o.connect(g); if (p) { g.connect(p); p.connect(M.bus); } else g.connect(M.bus); o.start();
    return { update(L) { const t = a.currentTime; o.type = L.w; o.frequency.setTargetAtTime(L.f, t, .02); g.gain.setTargetAtTime(L.mute ? 0 : L.v * LV[L.w], t, .05); if (p) p.pan.setTargetAtTime(L.pan || 0, t, .05); }, kill() { try { o.stop(); } catch (e) {} g.disconnect(); } };
  }
  if (L.k === 'bin') {
    const l = a.createOscillator(), r = a.createOscillator(), m = a.createChannelMerger(2), g = gainN(0);
    l.connect(m, 0, 0); r.connect(m, 0, 1); m.connect(g); g.connect(M.bus); l.start(); r.start();
    return { update(L) { const t = a.currentTime; l.frequency.setTargetAtTime(L.c, t, .03); r.frequency.setTargetAtTime(L.c + L.b, t, .03); g.gain.setTargetAtTime(L.mute ? 0 : L.v * .5, t, .05); }, kill() { try { l.stop(); r.stop(); } catch (e) {} g.disconnect(); } };
  }
  const g = gainN(0); g.connect(M.bus); let parts = buildAmb(L.type, g), type = L.type;
  return { update(L) { if (L.type !== type) { parts.kill(); parts = buildAmb(L.type, g); type = L.type; } g.gain.setTargetAtTime(L.mute ? 0 : L.v, a.currentTime, .1); }, kill() { parts.kill(); g.disconnect(); } };
}
function buildLayer(L) { if (!M.playing) return; const n = layerNode(L); n.update(L); M.nodes.set(L.id, n); }
function layerChanged(L) { const n = M.nodes.get(L.id); if (n) n.update(L); onAudio(true); }
function removeLayer(id) { const n = M.nodes.get(id); if (n) { n.kill(); M.nodes.delete(id); } M.layers = M.layers.filter(l => l.id !== id); }
function mixStart() {
  if (!M.layers.length) { toast('Add a layer first'); return; }
  toneStop(true); ac();
  if (!M.bus) { M.bus = E.ac.createGain(); M.bus.connect(E.master); }
  const t = E.ac.currentTime; M.bus.gain.cancelScheduledValues(t); M.bus.gain.setValueAtTime(0, t); M.bus.gain.setTargetAtTime(1, t, .15);
  M.playing = true; M.start = Date.now(); M.layers.forEach(buildLayer); armTimer(); onAudio();
}
function mixStop(silent) {
  if (!M.playing) return;
  const t = E.ac.currentTime; M.bus.gain.cancelScheduledValues(t); M.bus.gain.setTargetAtTime(0, t, .1);
  const ns = [...M.nodes.values()]; M.nodes.clear(); setTimeout(() => ns.forEach(n => n.kill()), 700);
  M.playing = false; clearTimeout(M.tid); M.timerEnd = 0; logSession('Mix: ' + M.name, M.start, { mix: { name: M.name, layers: M.layers.map(({ id, ...r }) => r) } }); if (!silent) onAudio();
}
function armTimer() { clearTimeout(M.tid); M.timerEnd = 0; if (M.playing && M.timerMin > 0) { M.timerEnd = Date.now() + M.timerMin * 60000; M.tid = setTimeout(() => { const t = E.ac.currentTime; M.bus.gain.setTargetAtTime(0, t, 1.2); setTimeout(() => mixStop(), 4000); }, M.timerMin * 60000); } }
function loadMix(mix, autoplay) { const was = M.playing; mixStop(true); M.layers = mix.layers.map(newLayer); M.name = mix.name; if (autoplay || was) mixStart(); else onAudio(); }
function stopAll() { toneStop(true); mixStop(true); onAudio(); }
const isPlaying = () => !!T.node || M.playing;
function mainFreq() { if (T.node) return T.f; if (M.playing) { const t = M.layers.find(l => !l.mute && (l.k === 'tone' || l.k === 'bin')); if (t) return t.k === 'tone' ? t.f : t.c; } return 432; }

/* status hooks */
function onAudio(light) {
  const live = isPlaying();
  $('#dDot').classList.toggle('live', live);
  let s = 'Silence';
  if (T.node) s = esc(T.label) + ' <small>' + T.w + (T.ends ? ' · ends ' + new Date(T.ends).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '') + '</small>';
  else if (M.playing) s = 'Mix: ' + esc(M.name) + ' <small>' + M.layers.length + ' layer' + (M.layers.length === 1 ? '' : 's') + (M.timerEnd ? ' · ends ' + new Date(M.timerEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '') + '</small>';
  $('#dStatus').innerHTML = s;
  if (light) return;
  $$('[data-player]').forEach(p => { const f = +p.dataset.f, on = !!T.node && Math.abs(T.f - f) < .001; const b = $('.pbtn', p); if (b) { b.classList.toggle('on', on); b.innerHTML = on ? I.stop : I.play; b.setAttribute('aria-label', on ? 'Stop tone' : 'Play tone'); } });
  $$('[data-cplay]').forEach(b => { const on = !!T.node && T.src === 'creator'; b.innerHTML = on ? I.stop : I.play; b.classList.toggle('on', on); b.setAttribute('aria-label', on ? 'Stop your frequency' : 'Play your frequency'); });
  $$('[data-mixbtn]').forEach(b => { b.innerHTML = M.playing ? I.stop : I.play; b.classList.toggle('on', M.playing); });
  $$('[data-playmix]').forEach(b => { const on = M.playing && M.name === b.dataset.playmix; b.innerHTML = (on ? I.stop + ' Stop' : I.play + ' Play') + ' the ' + esc(b.dataset.playmix) + ' mix'; });
}

/* ---------- visuals ---------- */
const Scopes = [];
function scope(cv, mode) { Scopes.push({ cv, mode }); }
let level = 0, phase = 0;
function drawScope(s, live, t) {
  const cv = s.cv; if (!cv.isConnected || !cv.offsetParent) return;
  const d = Math.min(2, window.devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight; if (!w) return;
  if (cv.width !== Math.round(w * d)) { cv.width = Math.round(w * d); cv.height = Math.round(h * d); }
  const x = cv.getContext('2d'); x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, w, h);
  const small = h < 60;
  if (!small) { x.strokeStyle = 'rgba(207,211,224,.06)'; x.lineWidth = 1; for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(0, h * i / 4); x.lineTo(w, h * i / 4); x.stroke(); } }
  const grad = x.createLinearGradient(0, 0, w, 0); grad.addColorStop(0, '#a593ff'); grad.addColorStop(.5, '#cfd3e0'); grad.addColorStop(1, '#5fb3ff');
  if (live && E.an) {
    if (s.mode === 'spectrum') {
      E.an.getByteFrequencyData(E.fbuf); const sr = E.ac.sampleRate, N = 72, bw = w / N;
      for (let i = 0; i < N; i++) { const f = 20 * Math.pow(1000, i / N), bin = Math.min(1023, Math.round(f / (sr / 2) * 1024)); const v = E.fbuf[bin] / 255; const bh = Math.max(1, v * h * .62); const g2 = x.createLinearGradient(0, h, 0, h - bh); g2.addColorStop(0, 'rgba(165,147,255,.05)'); g2.addColorStop(1, 'rgba(165,147,255,.55)'); x.fillStyle = g2; x.fillRect(i * bw + 1, h - bh, bw - 2, bh); }
    }
    E.an.getFloatTimeDomainData(E.buf);
    let peak = 0; for (let i = 0; i < E.buf.length; i++) { const a = Math.abs(E.buf[i]); if (a > peak) peak = a; }
    let st = 0; for (let i = 1; i < 1024; i++) { if (E.buf[i - 1] < 0 && E.buf[i] >= 0) { st = i; break; } }
    const N = 1024, sc = peak > 1e-4 ? (small ? .4 : .3) / peak : 0;
    x.beginPath(); for (let i = 0; i < N; i++) { const px = i / (N - 1) * w, py = h / 2 - E.buf[st + i] * sc * h; i ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.strokeStyle = grad; x.lineWidth = small ? 1.4 : 2; x.shadowColor = 'rgba(165,147,255,.9)'; x.shadowBlur = small ? 6 : 18; x.stroke(); x.shadowBlur = 0;
  } else {
    const f = +(cv.dataset.f || 432), cyc = 2 + Math.log2(Math.max(20, f) / 20) * .9;
    for (let k = 0; k < (small ? 1 : 3); k++) { x.beginPath(); for (let px = 0; px <= w; px += 3) { const env = Math.sin(Math.PI * px / w); const py = h / 2 + Math.sin(px / w * cyc * Math.PI * 2 + t * .0008 * (1 + k * .5) + k) * h * (small ? .12 : .1) * env * (1 - k * .25); px ? x.lineTo(px, py) : x.moveTo(px, py); } x.strokeStyle = grad; x.globalAlpha = small ? .35 : .4 - k * .12; x.lineWidth = 1.2; x.stroke(); x.globalAlpha = 1; }
  }
}
/* three.js universe */
const BG = { ok: false };
function dotTex() { const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d'), g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.4, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c); }
function initBG() {
  if (!window.THREE) return;
  try {
    const cv = $('#bg'), r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(50, 1, .1, 100); cam.position.set(0, 0, 6.2);
    const N = 9000, pos = new Float32Array(N * 3), rnd = new Float32Array(N), ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = ga * i; pos[i * 3] = Math.cos(th) * rr * 1.6; pos[i * 3 + 1] = y * 1.6; pos[i * 3 + 2] = Math.sin(th) * rr * 1.6; rnd[i] = Math.random(); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
    const uni = { uTime: { value: 0 }, uAmp: { value: 0 }, uFreq: { value: 4 }, uPx: { value: r.getPixelRatio() }, cA: { value: new THREE.Color('#a593ff') }, cB: { value: new THREE.Color('#5fb3ff') }, cC: { value: new THREE.Color('#e9dcb4') } };
    const mat = new THREE.ShaderMaterial({ uniforms: uni, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: 'uniform float uTime,uAmp,uFreq,uPx;attribute float aRand;varying float vMix;varying float vA;void main(){vec3 p=position;float w=sin(p.y*uFreq+uTime*.6)*.5+sin(p.x*uFreq*.7-uTime*.45)*.35+sin(p.z*uFreq*.5+uTime*.3)*.25;float r=1.+w*(.05+uAmp*.32)+sin(aRand*6.283+uTime)*.012;p*=r;vMix=clamp((p.y+1.8)/3.6,0.,1.);vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=(1.1+aRand*1.9)*(6./-mv.z)*uPx*(1.+uAmp*.6);vA=.25+.75*aRand;gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'uniform vec3 cA,cB,cC;varying float vMix;varying float vA;void main(){vec2 c=gl_PointCoord-.5;float d=length(c);if(d>.5)discard;float a=smoothstep(.5,0.,d)*vA;vec3 col=mix(cA,cB,vMix);col=mix(col,cC,step(.97,vA)*.7);gl_FragColor=vec4(col,a*.85);}' });
    const sphere = new THREE.Points(geo, mat); scene.add(sphere);
    const D = 1600, dp = new Float32Array(D * 3); for (let i = 0; i < D; i++) { const u = Math.random() * 2 - 1, th = Math.random() * 6.283, rad = 3 + Math.random() * 9, s = Math.sqrt(1 - u * u); dp[i * 3] = s * Math.cos(th) * rad; dp[i * 3 + 1] = u * rad; dp[i * 3 + 2] = Math.min(1.5, s * Math.sin(th) * rad - 4); }
    const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0xcfd3e0, size: .045, map: dotTex(), alphaTest: .01, transparent: true, opacity: .6, depthWrite: false })); scene.add(dust);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45, .0035, 8, 240), new THREE.MeshBasicMaterial({ color: 0xd9bd7f, transparent: true, opacity: .35 })); ring.rotation.x = 1.25; scene.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.9, .002, 8, 240), new THREE.MeshBasicMaterial({ color: 0x8fb8ff, transparent: true, opacity: .2 })); ring2.rotation.x = 1.4; ring2.rotation.y = .3; scene.add(ring2);
    let mx = 0, my = 0; addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
    function size() { const w = innerWidth, h = innerHeight; r.setSize(w, h, false); cam.aspect = w / h; cam.position.z = w < 700 ? 8.2 : 6.2; cam.updateProjectionMatrix(); }
    addEventListener('resize', size); size();
    Object.assign(BG, { ok: true, r, scene, cam, sphere, dust, ring, ring2, uni, mx: () => mx, my: () => my });
  } catch (e) { BG.ok = false; }
}
let fTarget = 4;
function frame(t) {
  const live = isPlaying();
  let rms = 0; if (live && E.an) { E.an.getFloatTimeDomainData(E.buf); let s = 0; for (let i = 0; i < 2048; i += 4) s += E.buf[i] * E.buf[i]; rms = Math.sqrt(s / 512); }
  level += ((live ? Math.min(1, rms * 5 + .25) : 0) - level) * .05;
  if (BG.ok && document.visibilityState === 'visible') {
    const f = mainFreq(); fTarget = 2 + Math.log2(Math.max(20, Math.min(20000, f)) / 20) * .75;
    BG.uni.uTime.value = t * .001; BG.uni.uAmp.value = level; BG.uni.uFreq.value += (fTarget - BG.uni.uFreq.value) * .02;
    BG.sphere.rotation.y = t * .00006 + BG.mx() * .4; BG.sphere.rotation.x = BG.my() * .25;
    BG.dust.rotation.y = t * .00002; BG.ring.rotation.z = t * .00008; BG.ring2.rotation.z = -t * .00005;
    const home = current === 'home'; BG.sphere.position.x += ((home ? 0 : 1.6) - BG.sphere.position.x) * .03;
    BG.r.render(BG.scene, BG.cam);
  }
  for (const s of Scopes) drawScope(s, live, t);
  drawScope({ cv: $('#dScope'), mode: 'wave' }, live, t);
  requestAnimationFrame(frame);
}

/* ---------- search ---------- */
const INT_KEYS = { love: ['love', 'heart', 'romance', 'relationship', 'self love'], confidence: ['confidence', 'courage', 'self esteem', 'brave'], abundance: ['abundance', 'money', 'wealth', 'prosperity', 'success'], focus: ['focus', 'study', 'concentration', 'work', 'productivity'], relaxation: ['relax', 'calm', 'stress', 'anxiety', 'peace'], creativity: ['creative', 'creativity', 'art', 'inspiration', 'ideas'], growth: ['growth', 'personal growth', 'learning', 'development'], clarity: ['clarity', 'clear', 'intuition', 'insight'], transformation: ['change', 'transformation', 'transform', 'renewal'], sleep: ['sleep', 'insomnia', 'rest', 'night', 'dream'], motivation: ['motivation', 'energy', 'drive', 'momentum'], balance: ['balance', 'emotional balance', 'harmony', 'emotions'] };
function suggestions(q) {
  q = q.trim().toLowerCase(); const out = [];
  if (!q) return out;
  const hz = /^(\d+(?:\.\d+)?)\s*(hz|hertz|khz)$/.exec(q);
  if (hz) { let f = +hz[1]; if (hz[2] === 'khz') f *= 1000; out.push({ t: 'Frequency', v: fmtHz(f), d: (FREQ[f] && FREQ[f].n) || 'Play and explore this tone', h: fKey(f) }); }
  else if (/^\d+$/.test(q) && q.length <= 15) {
    const a = ANGEL[q]; const an = analyze(q);
    out.push({ t: a ? 'Angel number' : 'Number', v: q, d: a ? a[0] : 'Root ' + an.root + ' · ' + NUM[an.root].t, h: 'n-' + q });
    const f = +q; if (f > 0 && f <= 20000) out.push({ t: 'Frequency', v: f + ' Hz', d: (FREQ[f] && FREQ[f].n) || 'Hear ' + f + ' Hz', h: fKey(f) });
    Object.keys(ANGEL).filter(k => k !== q && k.startsWith(q)).slice(0, 4).forEach(k => out.push({ t: 'Angel number', v: k, d: ANGEL[k][0], h: 'n-' + k }));
  } else if (/^\d+\.\d+$/.test(q)) { const f = +q; out.push({ t: 'Frequency', v: fmtHz(f), d: (FREQ[f] && FREQ[f].n) || 'Play this tone', h: fKey(f) }); }
  else {
    INTENT.forEach(it => { if (it.n.toLowerCase().includes(q) || INT_KEYS[it.id].some(k => k.includes(q) || q.includes(k))) out.push({ t: 'Intention', v: it.n, d: it.l, h: 'intention', i: it.id }); });
    if ('life path'.includes(q) || q.includes('numerology') || q.includes('destiny') || q.includes('soul') || q.includes('birth')) out.push({ t: 'Tool', v: 'Numerology', d: 'Life path, destiny, soul urge and more', h: 'numerology' });
    if (['astro', 'zodiac', 'birth chart', 'horoscope', 'sun sign', 'moon sign', 'rising', 'big three', 'star sign'].some(k => q.includes(k) || (q.length >= 3 && k.startsWith(q))) || (q.length >= 3 && ASTRO.SIGNS.some(s => s.n.toLowerCase().startsWith(q)))) out.push({ t: 'Tool', v: 'Your Birth Chart', d: 'Your Sun, Moon and Rising signs, free', h: 'chart' });
    if (q.includes('mix') || q.includes('studio') || q.includes('binaural') || q.includes('rain') || q.includes('ocean')) out.push({ t: 'Tool', v: 'Studio', d: 'Layer tones, binaural beats and ambience', h: 'studio' });
    Object.entries(ANGEL).filter(([k, v]) => v[0].toLowerCase().includes(q)).slice(0, 5).forEach(([k, v]) => out.push({ t: 'Angel number', v: k, d: v[0], h: 'n-' + k }));
    Object.entries(FREQ).filter(([k, v]) => v.n.toLowerCase().includes(q) || v.tr.toLowerCase().includes(q)).slice(0, 4).forEach(([k, v]) => out.push({ t: 'Frequency', v: fmtHz(+k), d: v.n, h: fKey(+k) }));
    Object.entries(NUM).filter(([k, v]) => v.t.toLowerCase().includes(q) || v.k.toLowerCase().includes(q)).slice(0, 3).forEach(([k, v]) => out.push({ t: 'Number', v: k, d: v.t, h: 'n-' + k }));
  }
  return out.slice(0, 9);
}
function goSugg(s) { if (!s) return; if (s.i) pendingIntent = s.i; closePalette(); if (location.hash === '#' + s.h) route(); else location.hash = s.h; }
function searchBox(cls = '') { return `<div class="search ${cls}" data-search><div class="box">${I.search}<input type="text" placeholder="Enter a number, frequency, or intention…" aria-label="Search numbers, frequencies and intentions" autocomplete="off"><button class="go" aria-label="Search">${I.arrow}</button></div><div class="sugg" role="listbox"></div></div>`; }
function bindSearch(root) {
  const inp = $('input', root), sg = $('.sugg', root); let list = [], act = 0;
  const render = () => { list = suggestions(inp.value); act = 0; if (!list.length) { sg.classList.toggle('open', !!inp.value.trim()); sg.innerHTML = inp.value.trim() ? '<div class="sg"><span class="d">Try a number like 444, a tone like 528 Hz, or a word like sleep.</span></div>' : ''; return; } sg.innerHTML = list.map((s, i) => `<div class="sg${i === 0 ? ' act' : ''}" data-i="${i}" role="option"><span class="t">${s.t}</span><span class="v">${esc(s.v)}</span><span class="d">${esc(s.d)}</span></div>`).join(''); sg.classList.add('open'); $$('.sg', sg).forEach(el => el.onmousedown = e => { e.preventDefault(); goSugg(list[+el.dataset.i]); }); };
  inp.addEventListener('input', render);
  inp.addEventListener('focus', () => inp.value && render());
  inp.addEventListener('blur', () => setTimeout(() => sg.classList.remove('open'), 150));
  inp.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!list.length) return; act = (act + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length; $$('.sg', sg).forEach((el, i) => el.classList.toggle('act', i === act)); }
    if (e.key === 'Enter') { e.preventDefault(); if (!list.length) render(); goSugg(list[act]); }
  });
  $('.go', root).onclick = () => { if (!list.length) list = suggestions(inp.value); goSugg(list[0]); };
  return inp;
}
function openPalette() { const p = $('#palette'); $('#palBox').innerHTML = searchBox(); p.classList.add('open'); const inp = bindSearch($('[data-search]', p)); inp.focus(); }
function closePalette() { $('#palette').classList.remove('open'); }
$('#palette').addEventListener('mousedown', e => { if (e.target.id === 'palette') closePalette(); });

/* ---------- shared fragments ---------- */
function playerHTML(f, label, opts = {}) {
  const pl = playable(f); const pf = pl ? pl.f : 0;
  if (!pl) return `<div class="callout">${I.info}<div>Zero has no frequency. In sound, it is silence.</div></div>`;
  const shifted = pl.k !== 0 ? `<div class="sh">You hear ${trimNum(pf)} Hz: ${Math.abs(pl.k)} octave${Math.abs(pl.k) > 1 ? 's' : ''} ${pl.k > 0 ? 'above' : 'below'} ${trimNum(f)} Hz, shifted into comfortable hearing range.</div>` : `<div class="sh">${noteOf(pf)} · ${zoneOf(pf)[2]}</div>`;
  return `<div class="player" data-player data-f="${pf}" data-label="${esc(label)}">
    <canvas class="scope" data-f="${pf}" aria-hidden="true"></canvas>
    <div class="pc">
      <div class="prow"><button class="pbtn" aria-label="Play tone">${I.play}</button><div class="pinfo"><div class="hz">${trimNum(pf)} Hz</div>${shifted}</div>
        ${opts.fav ? `<button class="ib${isFav('f', f) ? ' on' : ''}" data-favf="${f}" aria-label="Favorite frequency">${isFav('f', f) ? I.starF : I.star}</button>` : ''}
        <button class="btn sm" data-tostudio="${pf}">${I.plus} Add to Studio</button></div>
      <div class="prow">
        <div class="seg" data-wave>${['sine', 'triangle', 'square', 'sawtooth'].map(w => `<button data-w="${w}" class="${T.w === w ? 'on' : ''}">${w === 'sawtooth' ? 'Saw' : w[0].toUpperCase() + w.slice(1)}</button>`).join('')}</div>
        <div class="mini"><span class="lbl">Level</span><input type="range" min="0" max="1" step="0.01" value="${T.v}" data-level aria-label="Tone level"></div>
        <select class="input" data-dur style="width:auto;padding:8px 34px 8px 12px;font-size:13px" aria-label="Duration">${[[0, 'Continuous'], [1, '1 minute'], [5, '5 minutes'], [10, '10 minutes'], [20, '20 minutes'], [30, '30 minutes']].map(([v, l]) => `<option value="${v}"${T.dur === v ? ' selected' : ''}>${l}</option>`).join('')}</select>
      </div>
    </div></div>`;
}
function bindPlayers(root) {
  $$('[data-player]', root).forEach(p => {
    const f = +p.dataset.f, label = p.dataset.label;
    scope($('canvas', p), 'wave');
    $('.pbtn', p).onclick = () => { if (T.node && Math.abs(T.f - f) < .001) toneStop(); else toneStart(f, label); };
    $$('[data-wave] button', p).forEach(b => b.onclick = () => { T.w = b.dataset.w; $$('[data-wave] button', p).forEach(x => x.classList.toggle('on', x === b)); toneUpdate(); onAudio(true); });
    const lv = $('[data-level]', p); fillRange(lv); lv.oninput = () => { T.v = +lv.value; fillRange(lv); toneUpdate(); };
    $('[data-dur]', p).onchange = e => { T.dur = +e.target.value; if (T.node) toneStart(T.f, T.label); };
  });
  $$('[data-favf]', root).forEach(b => b.onclick = () => { const f = b.dataset.favf; toggleFav('f', f); const on = isFav('f', f); b.classList.toggle('on', on); b.innerHTML = on ? I.starF : I.star; });
  $$('[data-favn]', root).forEach(b => b.onclick = () => { const n = b.dataset.favn; toggleFav('n', n); const on = isFav('n', n); b.classList.toggle('on', on); b.innerHTML = (on ? I.starF : I.star) + (b.dataset.txt ? (on ? ' Saved to My Universe' : ' Save to My Universe') : ''); });
  $$('[data-tostudio]', root).forEach(b => b.onclick = () => { M.layers.push(newLayer({ k: 'tone', f: +b.dataset.tostudio, w: T.w, v: .5, pan: 0 })); if (M.playing) buildLayer(M.layers[M.layers.length - 1]); toast('Added to your Studio mix'); });
  onAudio();
}
const angelTile = k => `<a class="tile" href="#n-${k}"><div class="n glow">${k}</div><div class="tt">${esc(ANGEL[k][0])}</div><div class="dd">Root ${analyze(k).root}</div></a>`;
const lensTag = (c, t) => `<span class="lens ${c}">${t}</span>`;
const evTag = ev => `<span class="ev ${ev}"><i></i>${{ established: 'Established fact', limited: 'Limited early research', none: 'Tradition only' }[ev]}</span>`;
function numCardModal(n) {
  const d = NUM[n];
  $('#mBody').innerHTML = `<div class="kicker">${d.m ? 'Master number' : 'Core number'}</div><div class="glow" style="font-size:120px;margin-top:10px">${n}</div><h3 class="h3" style="margin-top:6px">${d.t}</h3><p class="muted" style="margin-top:10px">${d.e}</p>
    <div class="grid g2" style="margin-top:18px"><div><div class="lbl">Strengths</div><ul class="list">${d.s.map(x => `<li>${x}</li>`).join('')}</ul></div><div><div class="lbl">Challenges</div><ul class="list warm">${d.c.map(x => `<li>${x}</li>`).join('')}</ul></div></div>
    <div class="areas" style="grid-template-columns:1fr 1fr">${area('Love', d.love, I.love)}${area('Career', d.career, I.career)}${area('Money', d.money, I.money)}${area('Growth', d.growth, I.growth)}</div>
    <div style="margin-top:18px">${lensTag('num', 'Traditional numerology')}</div><div style="margin-top:16px"><a class="btn" href="#n-${n}">Open the ${n} page ${I.arrow}</a></div>`;
  $('#modal').classList.add('open');
}
const area = (t, v, ic) => `<div class="area">${ic}<b>${t}</b><p>${esc(v)}</p></div>`;
$('#mClose').onclick = () => $('#modal').classList.remove('open');
$('#modal').addEventListener('mousedown', e => { if (e.target.id === 'modal') $('#modal').classList.remove('open'); });

/* ---------- frequency creator ---------- */
function creatorInfo(f) {
  const z = zoneOf(f), whole = String(Math.round(f)), an = analyze(whole), ang = ANGEL[whole];
  const near = Object.keys(FREQ).map(Number).filter(x => x >= 20).sort((a, b) => Math.abs(Math.log(a / f)) - Math.abs(Math.log(b / f)))[0];
  const cents = Math.abs(1200 * Math.log2(f / near));
  const trad = cents < 1 ? 'This is ' + FREQ[near].n + '. ' + FREQ[near].tr : cents < 40 ? 'Close to ' + fmtHz(near) + ', ' + FREQ[near].n + '. Your tone has no documented tradition of its own, so its meaning is yours to define.' : 'No documented tradition is attached to this tone. Its meaning is yours to define.';
  return `<div class="cline">${lensTag('ac', 'Acoustics')}<p><b>${noteOf(f)}</b> · ${z[2]} · wavelength ${fmtLen(343 / f)}. ${z[3]}</p></div>
    <div class="cline">${lensTag('num', 'Numerology')}<p>As a number, <a href="#n-${whole}">${whole}</a> reduces to <b>${an.root}, ${NUM[an.root].t}</b>: ${NUM[an.root].k.toLowerCase()}.${ang ? ' In angel number tradition, ' + whole + ' means ' + ang[0].toLowerCase() + '.' : ''}</p></div>
    <div class="cline">${lensTag('trad', 'Tradition')}<p>${esc(trad)}</p></div>`;
}
function creatorHTML() {
  const f = creatorHTML.f || 432;
  return `<div class="creator card">
    <div>
      <div class="lbl">Your frequency</div>
      <div class="crow"><input id="cHz" class="chz" type="number" min="20" max="20000" step="0.01" value="${f}" aria-label="Your frequency in hertz"><span class="cu">Hz</span></div>
      <input type="range" id="cSlider" min="0" max="1000" step="0.1" aria-label="Frequency dial">
      <div class="chips" style="margin-top:12px">${[['÷2', 'h'], ['−10', -10], ['−1', -1], ['−0.1', -.1], ['+0.1', .1], ['+1', 1], ['+10', 10], ['×2', 'd']].map(([l, v]) => `<button class="chip mono" data-nudge="${v}">${l}</button>`).join('')}</div>
      <div class="prow" style="margin-top:18px"><button class="pbtn" data-cplay aria-label="Play your frequency">${I.play}</button><div class="seg" id="cWave">${['sine', 'triangle', 'square', 'sawtooth'].map(w => `<button data-w="${w}" class="${(creatorHTML.w || 'sine') === w ? 'on' : ''}">${({ sine: 'Sine', triangle: 'Triangle', square: 'Square', sawtooth: 'Saw' })[w]}</button>`).join('')}</div></div>
      <canvas class="scope" id="cScope" style="height:110px;width:100%;display:block;margin-top:16px" aria-hidden="true"></canvas>
    </div>
    <div class="cright">
      <div id="cInfo">${creatorInfo(f)}</div>
      <div class="field" style="margin-top:6px"><label for="cName">Name it</label><input class="input" id="cName" placeholder="My focus tone" maxlength="40"></div>
      <div class="actions" style="margin-top:12px"><button class="btn pri" id="cSave">${I.star} Save to My Universe</button><a class="btn" id="cOpen" href="#${fKey(f)}">Full page ${I.arrow}</a><button class="btn" id="cStudio">${I.plus} Studio</button></div>
    </div></div>`;
}
function bindCreator(root) {
  const hz = $('#cHz', root), sl = $('#cSlider', root), cv = $('#cScope', root);
  scope(cv, 'wave');
  const set = (f, from) => {
    f = Math.min(20000, Math.max(20, +(+f).toFixed(2))); if (!(f > 0)) return;
    creatorHTML.f = f; cv.dataset.f = f;
    if (from !== 'hz') hz.value = f;
    if (from !== 'sl') { sl.value = 1000 * Math.log(f / 20) / Math.log(1000); }
    hz.style.width = (Math.max(2, String(hz.value).length) * .56 + .1) + 'em';
    fillRange(sl); $('#cInfo', root).innerHTML = creatorInfo(f); $('#cOpen', root).href = '#' + fKey(f);
    if (T.node && T.src === 'creator') toneSetFreq(f, ($('#cName', root).value.trim() || 'Your frequency') + ' · ' + fmtHz(f));
  };
  set(creatorHTML.f || 432);
  sl.oninput = () => set(20 * Math.pow(1000, +sl.value / 1000), 'sl');
  hz.oninput = () => { hz.style.width = (Math.max(2, String(hz.value).length) * .56 + .1) + 'em'; const v = +hz.value; if (v >= 20 && v <= 20000) set(v, 'hz'); };
  hz.onblur = () => set(hz.value || 432);
  $$('[data-nudge]', root).forEach(b => b.onclick = () => { const v = b.dataset.nudge, f = creatorHTML.f; set(v === 'h' ? f / 2 : v === 'd' ? f * 2 : f + +v); });
  $$('#cWave button', root).forEach(b => b.onclick = () => { creatorHTML.w = b.dataset.w; $$('#cWave button', root).forEach(x => x.classList.toggle('on', x === b)); if (T.src === 'creator') { T.w = creatorHTML.w; toneUpdate(); } });
  $('[data-cplay]', root).onclick = () => { if (T.node && T.src === 'creator') toneStop(); else { T.w = creatorHTML.w || 'sine'; toneStart(creatorHTML.f, ($('#cName', root).value.trim() || 'Your frequency') + ' · ' + fmtHz(creatorHTML.f), 'creator'); } };
  $('#cSave', root).onclick = () => saveMyFreq(creatorHTML.f, $('#cName', root).value, creatorHTML.w);
  $('#cStudio', root).onclick = () => { const L = newLayer({ k: 'tone', f: creatorHTML.f, w: creatorHTML.w || 'sine', v: .45, pan: 0 }); M.layers.push(L); if (M.playing) buildLayer(L); toast('Added to your Studio mix'); };
  onAudio();
}

/* ---------- views ---------- */
let current = 'home', pendingIntent = null, pendingJournal = null;
function studioPresets() { return [{ name: 'Solfeggio Chord', layers: [{ k: 'tone', f: 396, w: 'sine', v: .35, pan: -0.3 }, { k: 'tone', f: 528, w: 'sine', v: .3, pan: 0 }, { k: 'tone', f: 639, w: 'sine', v: .22, pan: 0.3 }] }, { name: '432 Calm', layers: [{ k: 'tone', f: 432, w: 'sine', v: .4, pan: 0 }, { k: 'tone', f: 216, w: 'sine', v: .3, pan: 0 }, { k: 'amb', type: 'ocean', v: .45 }] }, ...INTENT.map(i => i.mix)]; }
function dailyPicks() { const di = dayIndex(); const ak = Object.keys(ANGEL); const fk = Object.keys(FREQ).map(Number).filter(f => f >= 100 && !FREQ[f].sym); return { n: ak[(di * 7) % ak.length], f: fk[(di * 5) % fk.length] }; }

function vHome() {
  const dp = dailyPicks(), prof = Store.s.profile, per = personal(prof.birth), lp = lifePath(prof.birth), fd = FREQ[dp.f];
  app.innerHTML = `
  <section class="hero"><div class="hero-in fade">
    <div class="kicker">Numbers · Symbolism · Sound</div>
    <h1 class="display" style="margin-top:22px">Every number<br>has a story.</h1>
    <p class="sub">Explore the meaning behind numbers. Discover the science of sound. Create your own frequency experience.</p>
    ${searchBox()}
    <div class="try">Try <a href="#n-444">444</a><a href="#f-528">528 Hz</a><a data-i="sleep">sleep</a><a href="#n-1111">1111</a><a data-i="love">love</a><a href="#f-432">432 Hz</a></div>
    <div class="scrollcue">SCROLL TO ENTER</div>
  </div></section>
  <div class="page" style="padding-top:0">
    <section class="sec" style="margin-top:0"><div class="portals">
      ${[['explore', 'Explore Numbers', 'Any number, its root, patterns and story.', I.orbit], ['angel', 'Angel Numbers', 'Repeating sequences and their popular meanings.', I.wing], ['numerology', 'Numerology', 'Life path, destiny and soul urge calculators.', I.grid], ['studio', 'Frequency Studio', 'Layer real tones, binaural beats and ambience.', I.wave], ['intention', 'Discover by Intention', 'Start from a feeling instead of a number.', I.compass], ['universe', 'My Universe', 'Your numbers, mixes and journal, kept private.', I.self]].map(([h, t, p, ic], i) => `<a class="portal" href="#${h}"><span class="num">0${i + 1}</span><span class="ic">${ic}</span><div><h3>${t}</h3><p>${p}</p></div></a>`).join('')}
    </div></section>

    <section class="sec" id="create">
      <div class="sechead"><div><div class="kicker">Create</div><h2 class="h2" style="margin-top:12px">Your own <em>frequency</em></h2></div><p class="lead" style="max-width:440px">Dial in any tone from 20 to 20,000 Hz. See what it means through every lens, then name it and keep it.</p></div>
      ${creatorHTML()}
    </section>

    <section class="sec">
      <div class="sechead"><div><div class="kicker">Daily discovery</div><h2 class="h2" style="margin-top:12px">Today in the <em>universe</em></h2></div><span class="muted" style="font-size:13px">${new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span></div>
      <div class="daily">
        <a class="card dcard" href="#n-${dp.n}"><div><div class="lbl">Number of the day</div><div class="glow big" style="margin-top:18px">${dp.n}</div></div><div><div class="h3">${esc(ANGEL[dp.n][0])}</div><p class="muted" style="font-size:14px;margin-top:6px">${esc(ANGEL[dp.n][1])}</p><div class="dnote">Chosen by today's date, not a prediction.</div></div></a>
        <div class="card dcard"><div><div class="lbl">Frequency of the day</div><div class="glow" style="font-size:76px;margin-top:18px">${trimNum(dp.f)}<span style="font-size:28px"> Hz</span></div></div><div><div class="h3" style="font-size:24px">${esc(fd.n)}</div><p class="muted" style="font-size:14px;margin-top:6px">${esc(fd.tr)}</p><div class="actions" style="margin-top:14px"><button class="btn sm pri" data-quick="${dp.f}">${I.play} Listen</button><a class="btn sm" href="#${fKey(dp.f)}">Explore</a></div></div></div>
        <div class="card dcard">${per ? `<div><div class="lbl">Your personal day</div><div class="glow big" style="margin-top:18px">${per.pd}</div></div><div><div class="h3" style="font-size:24px">${NUM[per.pd].k}</div><p class="muted" style="font-size:14px;margin-top:6px">Personal year ${per.py} · month ${per.pm} · life path ${lp.n}. ${esc(NUM[per.pd].growth)}</p><div class="dnote">A traditional numerology reading for reflection, not a forecast.</div></div>` : `<div><div class="lbl">Your personal numbers</div><div class="glow big" style="margin-top:18px">?</div></div><div><div class="h3" style="font-size:24px">Add your birth date</div><p class="muted" style="font-size:14px;margin-top:6px">See your life path and a daily personal number. Optional and private.</p><a class="btn sm" style="margin-top:14px" href="#universe">Set up My Universe</a></div>`}</div>
      </div>
    </section>

    <section class="sec">
      <div class="sechead"><div><div class="kicker">How we tell the story</div><h2 class="h2" style="margin-top:12px">Three lenses, <em>one number</em></h2></div><p class="lead" style="max-width:440px">Most sites blur symbolism and science. Here every statement is labeled, so you always know what kind of claim you are reading.</p></div>
      <div class="lenses">
        <div>${lensTag('num', 'Numerology')}<h3>Symbolic system</h3><p>Digit sums, roots and master numbers, calculated with the Pythagorean method and shown step by step.</p></div>
        <div>${lensTag('trad', 'Tradition')}<h3>Spiritual and cultural</h3><p>Angel number readings and documented cultural symbolism, presented as interpretation rather than fact.</p></div>
        <div>${lensTag('ac', 'Acoustics')}<h3>Measurable physics</h3><p>Real tones generated live, with wavelength, pitch and an honest evidence rating for every claim.</p></div>
      </div>
    </section>

    <section class="sec">
      <div class="sechead"><div><div class="kicker">Most searched</div><h2 class="h2" style="margin-top:12px">Angel <em>numbers</em></h2></div><a class="btn" href="#angel">Full directory ${I.arrow}</a></div>
      <div class="strip">${['111', '222', '333', '444', '555', '666', '777', '888', '999', '1111', '1212'].map(angelTile).join('')}</div>
    </section>
  </div>`;
  bindSearch($('[data-search]', app));
  bindCreator(app);
  $$('.try a[data-i]').forEach(a => a.onclick = () => { pendingIntent = a.dataset.i; location.hash = 'intention'; });
  $$('[data-quick]').forEach(b => b.onclick = () => { const f = +b.dataset.quick; if (T.node && T.f === f) { toneStop(); b.innerHTML = I.play + ' Listen'; } else { toneStart(f, FREQ[f] ? FREQ[f].n : f + ' Hz'); b.innerHTML = I.stop + ' Stop'; } });
}

function vNumber(str) {
  if (!/^\d{1,15}$/.test(str)) { app.innerHTML = `<div class="page"><h1 class="h2">That is not a number we can read.</h1><a class="btn" href="#explore" style="margin-top:20px">Explore numbers</a></div>`; return; }
  addRecent('n', str);
  const a = analyze(str), R = NUM[a.root], C = NUM[a.core], angel = ANGEL[str], cult = CULTURE[str], n = +str;
  const title = angel ? angel[0] : (NUM[n] ? NUM[n].t : R.t);
  const uniq = [...new Set(str.split(''))];
  const pf = playable(n), fi = FREQ[n];
  document.title = str + ' · ' + title + ' · The Number Universe';
  app.innerHTML = `<div class="page fade">
    <button class="back" data-back="explore">${I.back} Back</button>
    <header class="numhero">
      <div><div class="kicker">${angel ? 'Angel number' : NUM[n] ? (NUM[n].m ? 'Master number' : 'Core number') : 'Number'} · Root ${a.root}</div>
        <div class="glow" style="margin-top:10px">${str}</div>
        <div class="title">${esc(title)}</div>
        <div class="meta">${lensTag('num', 'Numerology')}${angel ? lensTag('trad', 'Angel tradition') : ''}${cult ? lensTag('cult', 'Culture') : ''}${pf ? lensTag('ac', 'Acoustics') : ''}</div></div>
      <div class="actions"><button class="btn" data-favn="${str}" data-txt="1">${isFav('n', str) ? I.starF + ' Saved to My Universe' : I.star + ' Save to My Universe'}</button><button class="btn" data-journal="${str}">I saw this number</button>${pf ? `<a class="btn pri" data-scroll="sound">${I.play} Hear ${str} Hz</a>` : ''}</div>
    </header>

    <section class="sec cols">
      <div class="card">${lensTag('num', 'Numerology')}
        <h2 class="h3" style="margin-top:16px">Root number ${a.root}: ${R.t}</h2>
        <div class="calc">${a.steps.map((s, i) => (i ? '<span>→</span> ' : '') + s).join('<br>')}</div>
        <p>${esc(R.e)}</p>
        <div class="grid g2" style="margin-top:18px"><div><div class="lbl">Strengths</div><ul class="list">${R.s.map(x => `<li>${x}</li>`).join('')}</ul></div><div><div class="lbl">Challenges</div><ul class="list warm">${R.c.map(x => `<li>${x}</li>`).join('')}</ul></div></div>
      </div>
      <div class="card">${lensTag('num', 'Patterns')}
        <div style="margin-top:12px">${a.pats.length ? a.pats.map(p => `<div class="pattern"><div><b>${p[0]}</b><span>${p[1]}</span></div></div>`).join('') : `<div class="pattern"><div><b>No special pattern</b><span>${str} has no repetition, mirror or sequence, so readers focus on its digits and its root.</span></div></div>`}</div>
        <div class="lbl" style="margin-top:14px">Its digits</div>
        <div class="digits">${uniq.map(d => `<div class="digit" data-num="${d}"><div class="glow">${d}</div><div>${NUM[d].k}</div></div>`).join('')}</div>
      </div>
    </section>

    <section class="sec card">
      ${lensTag('trad', 'Angel number tradition')}
      ${angel ? `<h2 class="h2" style="margin-top:16px">${esc(angel[0])}</h2><p class="lead" style="margin-top:12px;color:#c8ccdf">${esc(angel[1])}</p>` :
        `<h2 class="h3" style="margin-top:16px">No widely documented interpretation</h2><p class="lead" style="margin-top:10px">There is no established angel number reading for ${str}. Rather than invent one, we show how the system itself would approach it: through its digits${a.pats.length ? ', its pattern' : ''} and its root number ${a.root}.</p>`}
      <div class="lbl" style="margin-top:26px">Life themes · drawn from the traditional meaning of ${a.core}${a.rep ? ', the repeated digit' : ', the root'}</div>
      <div class="areas">${area('Love and relationships', C.love, I.love)}${area('Career', C.career, I.career)}${area('Money', C.money, I.money)}${area('Personal growth', C.growth, I.growth)}</div>
      <p class="dnote" style="margin-top:16px">Popular spiritual interpretations, offered for reflection. They are not established facts or predictions.</p>
    </section>

    ${cult ? `<section class="sec card">${lensTag('cult', 'Documented culture and history')}<p class="lead" style="margin-top:16px;color:#d6d9e8;font-size:19px;font-family:var(--serif);font-size:26px;line-height:1.35;max-width:900px">${esc(cult)}</p></section>` : ''}

    <section class="sec" id="sound">
      <div class="sechead"><div>${lensTag('ac', 'Acoustics')}<h2 class="h2" style="margin-top:14px">${str} as <em>sound</em></h2></div>${pf ? `<a class="btn" href="#${fKey(n > 0 && n <= 20000 ? n : pf.f)}">Full frequency page ${I.arrow}</a>` : ''}</div>
      <div class="cols">
        ${playerHTML(n, str + ' Hz', { fav: true })}
        <div class="grid" style="align-content:start">
          <div class="callout">${I.info}<div><b>Two separate ideas.</b> The meaning of the number ${str} comes from numerology and spiritual tradition. A ${str} Hz tone is simply air vibrating ${str} times a second. No scientific research links the two, so treat the pairing as a creative bridge, not a mechanism.</div></div>
          ${fi ? `<div class="card tight">${evTag(fi.ev)}<p style="margin-top:10px;font-size:14px">${esc(fi.et)}</p></div>` : ''}
          ${pf ? `<div class="facts" style="margin-top:0"><div><b>${noteOf(pf.f)}</b><span>Nearest note</span></div><div><b>${fmtLen(343 / pf.f)}</b><span>Wavelength</span></div><div><b>${fmtTime(1 / pf.f)}</b><span>Period</span></div></div>` : ''}
        </div>
      </div>
    </section>

    <section class="sec"><div class="lbl">Related numbers</div><div class="chips" style="margin-top:14px">${related(str).map(r => `<a class="chip" href="#n-${r}"><b>${r}</b>${ANGEL[r] ? ' ' + esc(ANGEL[r][0]) : NUM[r] ? ' ' + NUM[r].t : ''}</a>`).join('')}</div></section>
  </div>`;
  bindPlayers(app);
  $$('[data-num]').forEach(d => d.onclick = () => numCardModal(+d.dataset.num));
  $$('[data-journal]').forEach(b => b.onclick = () => { pendingJournal = b.dataset.journal; location.hash = 'universe'; });
}

function vFreq(f) {
  if (!(f > 0) || f > 1e6) { app.innerHTML = `<div class="page"><h1 class="h2">Enter a frequency above 0 Hz.</h1></div>`; return; }
  addRecent('f', f);
  const d = FREQ[f], pl = playable(f), z = zoneOf(f), name = d ? d.n : fmtHz(f);
  const near = Object.keys(FREQ).map(Number).filter(x => x !== f).sort((a, b) => Math.abs(Math.log(a / f)) - Math.abs(Math.log(b / f))).slice(0, 5).sort((a, b) => a - b);
  const intN = Number.isInteger(f) && f < 1e15;
  document.title = fmtHz(f) + ' · ' + name + ' · The Number Universe';
  const aud = f < 20 ? 'Below human hearing. You can feel very low frequencies, but you cannot hear them as pitch.' : f < 80 ? 'Audible, but many laptop and phone speakers cannot reproduce it. Use headphones or a subwoofer.' : f > 20000 ? 'Above human hearing. Bats, dogs and dolphins can perceive ultrasound.' : f > 15000 ? 'Many adults cannot hear this range. Hearing at the top end fades with age.' : 'Comfortably within human hearing on most speakers and headphones.';
  app.innerHTML = `<div class="page fade">
    <button class="back" data-back="studio">${I.back} Back</button>
    <header class="numhero">
      <div><div class="kicker">Frequency · ${z[2]}</div><div class="glow" style="margin-top:10px">${trimNum(f)}<span style="font-size:.28em;letter-spacing:0"> Hz</span></div><div class="title">${esc(name)}</div>
        <div class="meta">${evTag(d ? d.ev : 'none')}${lensTag('ac', 'Acoustics')}${d && !d.sym && d.tr !== 'Not a traditional tone.' ? lensTag('trad', 'Tradition') : ''}</div></div>
      <div class="actions"><button class="btn" data-favf="${f}">${isFav('f', f) ? I.starF : I.star}</button><button class="btn" data-savemine="${f}">Save as my frequency</button>${intN ? `<a class="btn" href="#n-${f}">The number ${f}</a>` : ''}</div>
    </header>
    <section class="sec cols">
      ${playerHTML(f, fmtHz(f) + (d ? ' · ' + d.n : ''), {})}
      <div class="card">${lensTag('ac', 'Physical and acoustic characteristics')}
        <div class="facts"><div><b>${trimNum(f)}</b><span>Cycles per second</span></div><div><b>${noteOf(pl ? pl.f : f)}</b><span>Nearest note${pl && pl.k ? ' (shifted)' : ''}</span></div><div><b>${fmtLen(343 / f)}</b><span>Wavelength in air</span></div><div><b>${fmtTime(1 / f)}</b><span>Period</span></div><div><b>${fmtHz(f / 2)}</b><span>Octave below</span></div><div><b>${fmtHz(f * 2)}</b><span>Octave above</span></div></div>
        <p style="margin-top:16px;font-size:14px"><b>${z[2]}.</b> <span class="muted">${z[3]}</span></p>
        <p style="margin-top:8px;font-size:14px" class="muted">${aud}</p>
      </div>
    </section>
    <section class="sec grid g3">
      <div class="card">${lensTag('trad', 'Traditional associations')}<p style="margin-top:14px">${esc(d ? d.tr : 'No widely documented spiritual tradition is attached to this exact frequency. You can still explore how it sounds and how it relates to nearby tones.')}</p></div>
      <div class="card">${lensTag('cult', 'History and context')}<p style="margin-top:14px">${esc(d ? d.h : 'Any frequency can be generated precisely in your browser. Musical tuning today places A4 at 440 Hz, so this tone sits ' + noteOf(f) + ' relative to that standard.')}</p></div>
      <div class="card"><span class="lens ac">What the evidence says</span><div style="margin-top:14px">${evTag(d ? d.ev : 'none')}</div><p style="margin-top:12px">${esc(d ? d.et : 'No research links this specific frequency to health or spiritual effects.')}</p></div>
    </section>
    <section class="sec"><div class="lbl">Nearby notable frequencies</div><div class="chips" style="margin-top:14px">${near.map(x => `<a class="chip" href="#${fKey(x)}"><b>${fmtHz(x)}</b> ${esc(FREQ[x].n)}</a>`).join('')}<a class="chip" href="#${fKey(f / 2)}"><b>${fmtHz(f / 2)}</b> octave below</a><a class="chip" href="#${fKey(f * 2)}"><b>${fmtHz(f * 2)}</b> octave above</a></div></section>
  </div>`;
  bindPlayers(app);
  $$('[data-savemine]').forEach(b => b.onclick = () => saveMyFreq(f, d ? d.n : '', T.w));
}

function vExplore() {
  const featured = Object.keys(CULTURE);
  app.innerHTML = `<div class="page fade">
    <div class="kicker">Explore numbers</div><h1 class="h2" style="margin-top:14px">Every number, <em>opened up</em></h1>
    <p class="lead" style="margin-top:14px">Search any whole number up to fifteen digits. Each one gets its root, its patterns, its traditions where they exist, and its sound.</p>
    <div style="margin-top:8px">${searchBox('compact')}</div>
    <section class="sec"><div class="sechead"><div><div class="kicker">Numbers with documented stories</div><h2 class="h3" style="margin-top:10px">Culture and history</h2></div></div>
      <div class="tiles">${featured.map(k => `<a class="tile" href="#n-${k}"><div class="n glow">${k}</div><div class="dd" style="margin-top:10px;color:#c4c8db">${esc(CULTURE[k].slice(0, 92))}${CULTURE[k].length > 92 ? '…' : ''}</div></a>`).join('')}</div></section>
    <section class="sec"><div class="sechead"><div><div class="kicker">Browse</div><h2 class="h3" style="margin-top:10px">1 to 144, colored by root</h2></div><div class="chips">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(r => `<span class="chip" style="cursor:default"><i style="width:8px;height:8px;border-radius:50%;background:hsl(${250 + r * 14} 80% 72%)"></i>${r}</span>`).join('')}</div></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px">${Array.from({ length: 144 }, (_, i) => i + 1).map(n => { const r = analyze(String(n)).root, base = r > 9 ? (r === 11 ? 2 : r === 22 ? 4 : 6) : r; return `<a href="#n-${n}" class="tile" style="padding:12px 6px;text-align:center;border-color:hsla(${250 + base * 14},80%,72%,.25)"><div class="mono" style="font-size:17px">${n}</div><div style="font-size:10px;color:hsl(${250 + base * 14} 80% 75%);font-family:var(--mono)">${r}</div></a>`; }).join('')}</div></section>
  </div>`;
  bindSearch($('[data-search]', app));
}

function vAngel() {
  const keys = Object.keys(ANGEL).sort((a, b) => a.length - b.length || +a - +b);
  app.innerHTML = `<div class="page fade">
    <div class="kicker">Angel number directory</div><h1 class="h2" style="margin-top:14px">Repeating numbers, <em>read closely</em></h1>
    <p class="lead" style="margin-top:14px">These are popular spiritual interpretations, not established facts. Search any sequence: if it has no documented reading, its page explains how the system would calculate one instead of inventing it.</p>
    <div class="grid" style="grid-template-columns:1fr auto;gap:12px;margin-top:30px;max-width:720px"><input class="input" id="af" placeholder="Filter by number or theme, or type any sequence" aria-label="Filter angel numbers"><button class="btn pri" id="ago">Open ${I.arrow}</button></div>
    <section class="sec" style="margin-top:34px"><div class="tiles" id="at">${keys.map(angelTile).join('')}</div></section>
  </div>`;
  const inp = $('#af');
  const filter = () => { const q = inp.value.trim().toLowerCase(); $$('#at .tile').forEach((t, i) => { const k = keys[i]; t.style.display = !q || k.includes(q) || ANGEL[k][0].toLowerCase().includes(q) ? '' : 'none'; }); };
  inp.oninput = filter; const go = () => { const q = inp.value.trim(); if (/^\d+$/.test(q)) location.hash = 'n-' + q; else { const k = keys.find(k => ANGEL[k][0].toLowerCase().includes(q.toLowerCase())); if (k) location.hash = 'n-' + k; } };
  $('#ago').onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
}

function vNumerology() {
  const p = Store.s.profile;
  app.innerHTML = `<div class="page fade">
    <div class="kicker">Numerology</div><h1 class="h2" style="margin-top:14px">Your numbers, <em>calculated openly</em></h1>
    <p class="lead" style="margin-top:14px">We use the Pythagorean system, the most common in Western numerology. Every result shows its working, so you can check it by hand.</p>
    <section class="sec card">
      <div class="grid g3" style="align-items:end">
        <div class="field"><label for="nName">Full birth name</label><input class="input" id="nName" placeholder="As on your birth certificate" value="${esc(p.name || '')}"></div>
        <div class="field"><label for="nBirth">Birth date</label><input class="input" type="date" id="nBirth" value="${esc(p.birth || '')}"></div>
        <div class="actions"><button class="btn pri" id="nCalc">Calculate</button><button class="btn" id="nSave">Save to My Universe</button></div>
      </div>
      <p class="dnote">Nothing you enter leaves your browser unless you save it, and saved details stay private to you.</p>
      <div class="grid g2" id="nRes" style="margin-top:26px"></div>
    </section>
    <section class="sec"><div class="sechead"><div><div class="kicker">Core numbers</div><h2 class="h3" style="margin-top:10px">0 through 9</h2></div><span class="muted" style="font-size:13px">Tap a number for its full reading</span></div>
      <div class="grid g4">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button class="card ncard" data-num="${n}"><div class="glow">${n}</div><b>${NUM[n].t}</b><span>${NUM[n].k}</span></button>`).join('')}</div></section>
    <section class="sec"><div class="sechead"><div><div class="kicker">Master numbers</div><h2 class="h3" style="margin-top:10px">11, 22 and 33</h2></div><span class="muted" style="font-size:13px">Kept unreduced when they appear in a calculation</span></div>
      <div class="grid g3">${[11, 22, 33].map(n => `<button class="card ncard" data-num="${n}"><div class="glow">${n}</div><b>${NUM[n].t}</b><span>${NUM[n].e}</span></button>`).join('')}</div></section>
    <section class="sec grid g2">
      <div class="card"><h3 class="h3">How the calculations work</h3>
        <ul class="list" style="margin-top:14px">
          <li><span><b>Life path:</b> reduce the month, day and year separately, add them, then reduce again. Master numbers 11, 22 and 33 are kept.</span></li>
          <li><span><b>Destiny or expression:</b> every letter of the full birth name, using the chart.</span></li>
          <li><span><b>Soul urge:</b> vowels only. This version treats A, E, I, O and U as vowels and Y as a consonant.</span></li>
          <li><span><b>Personality:</b> consonants only.</span></li>
          <li><span><b>Birthday:</b> the day of the month, reduced.</span></li>
          <li><span><b>Personal year, month and day:</b> your birth month and day combined with the current calendar, reduced to a single digit.</span></li>
        </ul></div>
      <div class="card"><h3 class="h3">The Pythagorean chart</h3>
        <table class="chart"><tr>${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<th>${n}</th>`).join('')}</tr>${[0, 1, 2].map(r => `<tr>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(c => { const ch = String.fromCharCode(65 + r * 9 + c); return `<td>${r * 9 + c < 26 ? ch : ''}</td>`; }).join('')}</tr>`).join('')}</table></div>
    </section>
  </div>`;
  const calc = () => {
    const name = $('#nName').value.trim(), b = $('#nBirth').value, out = [];
    const lp = lifePath(b), per = personal(b), bp = birthParts(b);
    const card = (label, r, how) => { const d = NUM[r]; return `<div class="card tight result"><div class="glow">${r}</div><div><div class="lbl">${label}</div><h4>${d.t}</h4><div style="font-size:13.5px;margin-top:4px">${esc(d.e)}</div><div style="font-size:12.5px;margin-top:8px"><span class="gold">Strengths</span> ${d.s.join(', ')} · <span class="muted">Challenges</span> ${d.c.join(', ')}</div><div class="how">${esc(how)}</div></div></div>`; };
    if (lp) out.push(card('Life path', lp.n, lp.how));
    if (name) { const ex = nameCalc(name, () => true), so = nameCalc(name, c => VOW.has(c)), pe = nameCalc(name, c => !VOW.has(c)); out.push(card('Destiny or expression', ex.n, ex.how)); out.push(card('Soul urge', so.n, so.how)); out.push(card('Personality', pe.n, pe.how)); }
    if (bp) { const bd = reduceSteps(bp.d); out.push(card('Birthday', bd.n, 'Day ' + bp.d + (bd.steps.length ? ' → ' + bd.n : ''))); }
    if (per) { out.push(card('Personal year ' + per.cy, per.py, per.how.py)); out.push(card('Personal month', per.pm, per.how.pm)); }
    $('#nRes').innerHTML = out.length ? out.join('') : '<p class="muted">Enter a name, a birth date, or both.</p>';
  };
  $('#nCalc').onclick = calc;
  $('#nSave').onclick = () => { Store.s.profile = { name: $('#nName').value.trim(), birth: $('#nBirth').value }; Store.save(); toast('Saved privately to My Universe'); calc(); };
  $$('[data-num]', app).forEach(d => d.onclick = () => numCardModal(+d.dataset.num));
  if (p.birth || p.name) calc();
}

function layerHTML(L) {
  const row = (lbl, inner, val) => `<div class="lrow"><span class="lbl">${lbl}</span>${inner}${val}</div>`;
  let body = '', ty = '', nm = '';
  if (L.k === 'tone') { ty = 'Tone'; nm = (FREQ[L.f] ? FREQ[L.f].n : fmtHz(L.f));
    body = row('Hz', `<input type="range" min="0" max="1000" step="1" value="${Math.round(1000 * Math.log(L.f / 20) / Math.log(1000))}" data-k="flog">`, `<input class="numin" type="number" min="20" max="20000" step="0.01" value="${L.f}" data-k="f" aria-label="Frequency">`) +
      row('Wave', `<div class="seg" style="justify-self:start">${['sine', 'triangle', 'square', 'sawtooth'].map(w => `<button data-w="${w}" class="${L.w === w ? 'on' : ''}">${w === 'sawtooth' ? 'Saw' : ({ sine: 'Sine', triangle: 'Tri', square: 'Square', sawtooth: 'Saw' })[w]}</button>`).join('')}</div>`, '<span></span>') +
      row('Pan', `<input type="range" min="-1" max="1" step="0.05" value="${L.pan || 0}" data-k="pan">`, `<span class="val" data-v="pan">${(L.pan || 0) === 0 ? 'Center' : (L.pan < 0 ? 'L ' : 'R ') + Math.round(Math.abs(L.pan) * 100)}</span>`); }
  else if (L.k === 'bin') { ty = 'Binaural'; nm = 'Beat ' + L.b + ' Hz on ' + L.c + ' Hz';
    body = row('Carrier', `<input type="range" min="80" max="500" step="1" value="${L.c}" data-k="c">`, `<span class="val" data-v="c">${L.c} Hz</span>`) + row('Beat', `<input type="range" min="0.5" max="40" step="0.5" value="${L.b}" data-k="b">`, `<span class="val" data-v="b">${L.b} Hz</span>`) + `<div class="dnote" style="margin:0;display:flex;gap:8px;align-items:center"><span style="width:16px;display:inline-block">${I.phones}</span>Left ${L.c} Hz, right ${L.c + L.b} Hz. Headphones required.</div>`; }
  else { ty = 'Ambience'; nm = L.type[0].toUpperCase() + L.type.slice(1);
    body = row('Sound', `<div class="seg" style="justify-self:start">${['rain', 'ocean', 'wind'].map(a => `<button data-a="${a}" class="${L.type === a ? 'on' : ''}">${a[0].toUpperCase() + a.slice(1)}</button>`).join('')}</div>`, '<span></span>'); }
  body += `<div class="lrow"><span class="lbl">Level</span><input type="range" min="0" max="1" step="0.01" value="${L.v}" data-k="v"><span class="val" data-v="v">${Math.round(L.v * 100)}%</span></div>`;
  return `<div class="layer${L.mute ? ' muted' : ''}" data-l="${L.id}"><div class="lhead"><span class="ty">${ty}</span><span class="nm">${esc(nm)}</span><button class="ib${L.mute ? ' on' : ''}" data-act="mute" aria-label="Mute layer">${L.mute ? I.mute : I.spk}</button><button class="ib" data-act="del" aria-label="Remove layer">${I.trash}</button></div>${body}</div>`;
}
function vStudio() {
  const presets = studioPresets();
  app.innerHTML = `<div class="page fade">
    <div class="sechead"><div><div class="kicker">Frequency studio</div><h1 class="h2" style="margin-top:14px">Compose your <em>sound</em></h1></div><p class="lead" style="max-width:460px">Layer pure tones, binaural beats and generated ambience. Everything is synthesized live in your browser with the Web Audio API.</p></div>
    <div class="chips" style="margin:6px 0 26px">${presets.map((p, i) => `<button class="chip" data-pre="${i}">${esc(p.name)}</button>`).join('')}</div>
    <div class="studio">
      <div class="stage"><div class="player">
        <canvas class="scope" id="sScope" aria-hidden="true"></canvas>
        <div class="pc">
          <div class="prow"><button class="pbtn" data-mixbtn aria-label="Play mix">${I.play}</button><div class="pinfo" style="flex:1"><input class="input" id="mName" value="${esc(M.name)}" aria-label="Mix name" style="font-family:var(--serif);font-size:24px;padding:6px 12px;background:transparent;border-color:transparent"></div><button class="btn sm" id="mSave">Save mix</button></div>
          <div class="prow">
            <div class="field" style="flex:1;min-width:160px"><label for="mTimer">Listening timer</label><select class="input" id="mTimer">${[[0, 'No timer'], [5, '5 minutes'], [10, '10 minutes'], [15, '15 minutes'], [30, '30 minutes'], [60, '60 minutes'], [90, '90 minutes']].map(([v, l]) => `<option value="${v}"${M.timerMin === v ? ' selected' : ''}>${l}${v > 30 ? ' · Plus' : ''}</option>`).join('')}</select></div>
            <div class="actions" style="align-self:flex-end"><button class="btn sm" data-add="tone">${I.plus} Tone</button><button class="btn sm" data-add="bin">${I.plus} Binaural</button><button class="btn sm" data-add="amb">${I.plus} Ambience</button></div>
          </div>
          <div class="callout" style="font-size:13px">${I.phones}<div>Start low and raise the master volume slowly. Binaural layers need headphones. Mixes based on tradition are for relaxation and enjoyment, not treatment.</div></div>
        </div></div>
        <div class="card tight" style="margin-top:14px"><div class="lbl">Saved mixes</div><div id="savedList"></div></div>
      </div>
      <div class="grid" id="layers" style="align-content:start"></div>
    </div>
  </div>`;
  scope($('#sScope'), 'spectrum');
  const draw = () => { $('#layers').innerHTML = M.layers.length ? M.layers.map(layerHTML).join('') : '<div class="card"><p class="muted">Your mix is empty. Add a tone, a binaural beat or an ambience, or start from a preset above.</p></div>'; bindLayers(); $$('#layers input[type=range]').forEach(fillRange); };
  const savedDraw = () => { const L = Store.s.mixes; $('#savedList').innerHTML = L.length ? L.map((m, i) => `<div class="row"><div class="grow"><b>${esc(m.name)}</b><span>${m.layers.length} layers · ${new Date(m.at).toLocaleDateString()}</span></div><button class="btn sm" data-load="${i}">Load</button><button class="ib" data-delmix="${i}" aria-label="Delete mix">${I.trash}</button></div>`).join('') : '<div class="empty">No saved mixes yet.</div>'; $$('[data-load]').forEach(b => b.onclick = () => { loadMix(Store.s.mixes[+b.dataset.load]); $('#mName').value = M.name; draw(); }); $$('[data-delmix]').forEach(b => b.onclick = () => { Store.s.mixes.splice(+b.dataset.delmix, 1); Store.save(); savedDraw(); }); };
  function bindLayers() {
    $$('#layers .layer').forEach(el => {
      const L = M.layers.find(l => l.id === +el.dataset.l); if (!L) return;
      $$('input', el).forEach(inp => inp.addEventListener('input', () => {
        const k = inp.dataset.k; if (inp.type === 'range') fillRange(inp);
        if (k === 'flog') { L.f = +(20 * Math.pow(1000, +inp.value / 1000)).toFixed(2); $('[data-k="f"]', el).value = L.f; $('.nm', el).textContent = FREQ[L.f] ? FREQ[L.f].n : fmtHz(L.f); }
        else if (k === 'f') { const v = +inp.value; if (v >= 20 && v <= 20000) { L.f = v; const r = $('[data-k="flog"]', el); r.value = Math.round(1000 * Math.log(v / 20) / Math.log(1000)); fillRange(r); $('.nm', el).textContent = FREQ[v] ? FREQ[v].n : fmtHz(v); } }
        else if (k) { L[k] = +inp.value; const out = $('[data-v="' + k + '"]', el); if (out) out.textContent = k === 'v' ? Math.round(L.v * 100) + '%' : k === 'pan' ? (L.pan === 0 ? 'Center' : (L.pan < 0 ? 'L ' : 'R ') + Math.round(Math.abs(L.pan) * 100)) : L[k] + ' Hz'; if (L.k === 'bin') { $('.nm', el).textContent = 'Beat ' + L.b + ' Hz on ' + L.c + ' Hz'; const dn = $('.dnote', el); dn.lastChild.textContent = 'Left ' + L.c + ' Hz, right ' + (L.c + L.b) + ' Hz. Headphones required.'; } }
        layerChanged(L);
      }));
      $$('[data-w]', el).forEach(b => b.onclick = () => { L.w = b.dataset.w; $$('[data-w]', el).forEach(x => x.classList.toggle('on', x === b)); layerChanged(L); });
      $$('[data-a]', el).forEach(b => b.onclick = () => { L.type = b.dataset.a; $$('[data-a]', el).forEach(x => x.classList.toggle('on', x === b)); $('.nm', el).textContent = L.type[0].toUpperCase() + L.type.slice(1); layerChanged(L); });
      $('[data-act="mute"]', el).onclick = () => { L.mute = !L.mute; layerChanged(L); draw(); };
      $('[data-act="del"]', el).onclick = () => { removeLayer(L.id); if (!M.layers.length) mixStop(); draw(); onAudio(); };
    });
  }
  $$('[data-add]').forEach(b => b.onclick = () => { const k = b.dataset.add; const L = newLayer(k === 'tone' ? { k: 'tone', f: 432, w: 'sine', v: .4, pan: 0 } : k === 'bin' ? { k: 'bin', c: 200, b: 10, v: .4 } : { k: 'amb', type: 'rain', v: .4 }); M.layers.push(L); buildLayer(L); draw(); onAudio(); });
  $$('[data-pre]').forEach(b => b.onclick = () => { loadMix(presets[+b.dataset.pre], true); $('#mName').value = M.name; draw(); });
  $('[data-mixbtn]').onclick = () => M.playing ? mixStop() : mixStart();
  $('#mName').oninput = e => { M.name = e.target.value || 'My mix'; onAudio(true); };
  $('#mTimer').onchange = e => { M.timerMin = +e.target.value; armTimer(); onAudio(true); };
  $('#mSave').onclick = () => { if (!M.layers.length) return toast('Add a layer first'); Store.s.mixes.unshift({ name: M.name, layers: M.layers.map(({ id, ...r }) => r), at: Date.now() }); Store.save(); savedDraw(); toast('Mix saved to My Universe'); };
  draw(); savedDraw(); onAudio();
}

function vIntention() {
  let sel = pendingIntent || INTENT[0].id; pendingIntent = null;
  app.innerHTML = `<div class="page fade">
    <div class="kicker">Discover by intention</div><h1 class="h2" style="margin-top:14px">Start from a <em>feeling</em></h1>
    <p class="lead" style="margin-top:14px">Choose what you are seeking. Each path gathers numbers, tones and a listening experience. Every suggestion is labeled with what it rests on.</p>
    <section class="sec" style="margin-top:36px"><div class="itiles">${INTENT.map(i => `<button class="itile" data-it="${i.id}"><b>${i.n}</b><span>${i.l}</span></button>`).join('')}</div></section>
    <section class="sec" id="itDetail" style="margin-top:22px"></section>
  </div>`;
  const show = id => {
    sel = id; const it = INTENT.find(i => i.id === id);
    $$('.itile').forEach(t => t.classList.toggle('on', t.dataset.it === id));
    $('#itDetail').innerHTML = `<div class="card fade"><div class="grid" style="grid-template-columns:1.2fr 1fr;gap:30px">
      <div><div class="kicker">${it.n}</div><h2 class="h2" style="margin-top:12px">${it.l}</h2>
        <div style="margin-top:16px">${it.basis === 'tradition' ? lensTag('trad', 'Based on spiritual tradition') : lensTag('trad', 'Tradition plus early research')}</div>
        <p class="muted" style="margin-top:14px;font-size:14px">${it.basis === 'tradition' ? 'These pairings come from numerology and sound healing tradition, not clinical evidence.' : 'These pairings draw on tradition plus binaural beat research, where findings are mixed and still developing. Not a clinical treatment.'}</p>
        <div class="lbl" style="margin-top:24px">Numbers</div><div class="chips" style="margin-top:10px">${it.nums.map(n => `<a class="chip" href="#n-${n}"><b>${n}</b> ${esc(ANGEL[n] ? ANGEL[n][0] : NUM[n] ? NUM[n].t : '')}</a>`).join('')}</div>
        <div class="lbl" style="margin-top:20px">Frequencies</div><div class="chips" style="margin-top:10px">${it.fr.map(f => `<a class="chip" href="#${fKey(f)}"><b>${fmtHz(f)}</b> ${esc(FREQ[f] ? FREQ[f].n : '')}</a>`).join('')}</div></div>
      <div class="player" style="align-self:start"><canvas class="scope" id="iScope" data-f="${it.fr[0]}"></canvas><div class="pc">
        <div class="lbl">Listening experience</div><div class="h3">${esc(it.mix.name)}</div>
        <div style="font-size:13px" class="muted">${it.mix.layers.map(l => l.k === 'tone' ? fmtHz(l.f) + ' tone' : l.k === 'bin' ? l.b + ' Hz binaural beat' : l.type + ' ambience').join(' · ')}</div>
        <div class="actions"><button class="btn pri" data-playmix="${esc(it.mix.name)}">${I.play} Play</button><a class="btn" href="#studio" data-open>Open in Studio</a></div>
        ${it.mix.layers.some(l => l.k === 'bin') ? `<div class="dnote" style="margin:0">Includes a binaural layer. Use headphones.</div>` : ''}
      </div></div></div></div>`;
    scope($('#iScope'), 'wave');
    $('[data-playmix]').onclick = () => { if (M.playing && M.name === it.mix.name) mixStop(); else loadMix(it.mix, true); };
    $('[data-open]').onclick = () => { if (M.name !== it.mix.name) loadMix(it.mix, false); };
    onAudio();
  };
  $$('.itile').forEach(t => t.onclick = () => { show(t.dataset.it); $('#itDetail').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
  show(sel);
  if (sel !== INTENT[0].id) setTimeout(() => $('#itDetail').scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
}


/* ---------- birth chart ---------- */
const BIG = { sun: ['Sun', 'Core identity'], moon: ['Moon', 'Emotional world'], rising: ['Rising', 'How you first come across'] };
const zs = i => ASTRO.SIGNS[i].s + '︎';
function loadCities(cb) { if (window.NU_CITIES) return cb(); const s = document.createElement('script'); s.src = 'cities.js?v=20261117d'; s.onload = cb; s.onerror = () => toast('The city list could not load. Enter coordinates instead.'); document.head.appendChild(s); }
function chartResult(c) { try { return c && c.date ? ASTRO.compute(c.date, c.unknown ? '' : (c.time || ''), c.place || null) : null; } catch (e) { return null; } }
function bigCard(kind, r, c) {
  const [nm, sub] = BIG[kind];
  const head = `<div class="bc-head"><span class="lbl">${nm}</span><span class="bc-sub">${sub}</span></div>`;
  if (!r) {
    const why = !c.time || c.unknown ? 'Add your birth time and birthplace to reveal your Rising sign. It changes about every two hours, so the time matters.' : 'Add your birthplace to reveal your Rising sign.';
    return `<div class="bc-card bc-blank">${head}<div class="bc-sym">?</div><div class="bc-name">Not yet known</div><p>${why}</p></div>`;
  }
  if (r.i.length === 2) {
    const [x, y] = r.i.map(i => ASTRO.SIGNS[i]);
    return `<div class="bc-card">${head}<div class="bc-sym bc-two">${zs(r.i[0])}<span>or</span>${zs(r.i[1])}</div><div class="bc-name">${x.n} or ${y.n}</div><p>${kind === 'sun' ? 'You were born on the day the Sun moved between signs.' : 'The Moon moved between signs on your birth date.'} ${c.time && !c.unknown ? 'Adding your birthplace decides which.' : 'Your birth time decides which.'}</p></div>`;
  }
  const S = ASTRO.SIGNS[r.i[0]];
  return `<div class="bc-card">${head}<div class="bc-sym">${zs(r.i[0])}</div><div class="bc-name">${S.n}${r.lon !== undefined && c.place && c.time && !c.unknown ? `<span class="bc-deg mono">${ASTRO.deg(r.lon)}</span>` : ''}</div><p>${S[kind === 'rising' ? 'rise' : kind]}</p><div class="chips" style="margin-top:14px"><span class="chip" style="cursor:default">${S.el}</span><span class="chip" style="cursor:default">${S.mo}</span><span class="chip" style="cursor:default">Ruled by ${S.ru}</span></div></div>`;
}
function chartMini() {
  const c = Store.s.chart, r = chartResult(c);
  if (!r) return `<div class="uv-big3 uv-big3-cta"><div><div class="lbl">Your Big Three</div><p class="muted" style="font-size:13px;margin-top:6px">Sun, Moon and Rising, calculated from your birth date. Always free.</p></div><a class="btn sm" href="#chart">Discover your birth chart ${I.arrow}</a></div>`;
  const cell = (k, x) => `<a class="uv-b3" href="#chart"><span class="uv-b3s">${x ? (x.i.length === 2 ? zs(x.i[0]) : zs(x.i[0])) : '?'}</span><span><span class="lbl">${BIG[k][0]}</span><b>${x ? x.i.map(i => ASTRO.SIGNS[i].n).join(' or ') : 'Add birth time'}</b></span></a>`;
  return `<div class="uv-big3"><div class="uv-b3row">${cell('sun', r.sun)}${cell('moon', r.moon)}${cell('rising', r.rising)}</div><a class="uv-link" href="#chart">View your birth chart ${I.arrow}</a></div>`;
}
function vChart() {
  const saved = Store.s.chart || {};
  const D = { date: saved.date || Store.s.profile.birth || '', time: saved.time || '', unknown: !!saved.unknown, place: saved.place || null };
  app.innerHTML = `<div class="page fade">
    <button class="back" data-back="universe">${I.back} Back</button>
    <div class="kicker">Astrology · Always free</div><h1 class="h2" style="margin-top:14px">Your Birth <em>Chart</em></h1>
    <p class="lead" style="margin-top:14px">Your Big Three: the Sun, Moon and Rising signs, worked out from where they were in the sky when you were born.</p>
    <div class="meta" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">${lensTag('ac', 'Astronomy')}${lensTag('trad', 'Astrology tradition')}</div>
    <section class="sec card" style="margin-top:30px">
      <div class="bc-form">
        <div class="field"><label for="bcDate">Birth date</label><input class="input" type="date" id="bcDate" value="${esc(D.date)}"></div>
        <div class="field"><label for="bcTime">Birth time <span class="uv-opt">For Rising</span></label><input class="input" type="time" id="bcTime" value="${esc(D.time)}"${D.unknown ? ' disabled' : ''}><label class="bc-check"><input type="checkbox" id="bcUnknown"${D.unknown ? ' checked' : ''}> I don't know my birth time</label></div>
        <div class="field bc-place"><label for="bcPlace">Birthplace <span class="uv-opt">For Rising</span></label><input class="input" id="bcPlace" placeholder="Start typing a city" autocomplete="off" value="${esc(D.place ? D.place.n : '')}"><div class="sugg" id="bcSugg" role="listbox"></div><button class="bc-coord" id="bcCoordT">Not listed? Enter coordinates</button></div>
      </div>
      <div class="bc-form bc-coords" id="bcCoords" style="display:none">
        <div class="field"><label for="bcLat">Latitude</label><input class="input" type="number" step="0.01" id="bcLat" placeholder="40.71"></div>
        <div class="field"><label for="bcLon">Longitude</label><input class="input" type="number" step="0.01" id="bcLon" placeholder="-74.01"></div>
        <div class="field"><label for="bcTz">Time zone</label><select class="input" id="bcTz">${(Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : ['UTC']).map(z => `<option${z === (Intl.DateTimeFormat().resolvedOptions().timeZone) ? ' selected' : ''}>${z}</option>`).join('')}</select></div>
      </div>
      <div class="actions" style="margin-top:20px"><button class="btn pri" id="bcGo">Reveal my Big Three</button></div>
      <p class="dnote">Only your birth date is required. Your details stay private to you.</p>
    </section>
    <section class="sec" id="bcRes" style="margin-top:22px"></section>
    <section class="sec card tight"><p class="muted" style="font-size:13px">Sign positions are calculated in your browser with standard astronomical formulas, accurate to well under one degree, using the tropical zodiac followed in Western astrology. The meanings come from astrological tradition. They are interpretation for reflection, not science or prediction. Birthplace data from <a href="https://www.geonames.org" style="border-bottom:1px solid var(--line2)">GeoNames</a>, CC BY 4.0.</p></section>
  </div>`;
  const place = $('#bcPlace'), sg = $('#bcSugg'); let list = [], act = 0;
  const pick = row => { D.place = { n: row[0], lat: row[1], lon: row[2], tz: row[3] }; place.value = row[0]; sg.classList.remove('open'); };
  const renderS = () => {
    const q = place.value.trim().toLowerCase(); D.place = null; if (q.length < 2) { sg.classList.remove('open'); return; }
    loadCities(() => {
      const C = window.NU_CITIES, a = [], b = [];
      for (const r of C) { const l = r[0].toLowerCase(); if (l.startsWith(q)) a.push(r); else if (l.includes(q)) b.push(r); if (a.length >= 8) break; }
      list = a.concat(b).slice(0, 8); act = 0;
      sg.innerHTML = list.length ? list.map((r, i) => `<div class="sg${i ? '' : ' act'}" data-i="${i}" role="option"><span class="d" style="color:var(--text)">${esc(r[0])}</span></div>`).join('') : '<div class="sg"><span class="d">No match. Try a nearby larger city, or enter coordinates.</span></div>';
      sg.classList.add('open'); $$('.sg[data-i]', sg).forEach(el => el.onmousedown = e => { e.preventDefault(); pick(list[+el.dataset.i]); });
    });
  };
  place.addEventListener('input', renderS);
  place.addEventListener('blur', () => setTimeout(() => sg.classList.remove('open'), 150));
  place.addEventListener('keydown', e => { if (!sg.classList.contains('open') || !list.length) return; if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length; $$('.sg', sg).forEach((el, i) => el.classList.toggle('act', i === act)); } if (e.key === 'Enter') { e.preventDefault(); pick(list[act]); } });
  $('#bcCoordT').onclick = () => { const c = $('#bcCoords'); c.style.display = c.style.display === 'none' ? '' : 'none'; };
  $('#bcUnknown').onchange = e => { $('#bcTime').disabled = e.target.checked; };
  const read = () => {
    const c = { date: $('#bcDate').value, time: $('#bcTime').value, unknown: $('#bcUnknown').checked, place: D.place };
    const la = parseFloat($('#bcLat').value), lo = parseFloat($('#bcLon').value);
    if (!c.place && $('#bcCoords').style.display !== 'none' && la >= -90 && la <= 90 && lo >= -180 && lo <= 180) c.place = { n: la.toFixed(2) + '°, ' + lo.toFixed(2) + '° (' + $('#bcTz').value + ')', lat: la, lon: lo, tz: $('#bcTz').value };
    return c;
  };
  const show = c => {
    const r = chartResult(c); if (!r) return;
    $('#bcRes').innerHTML = `<div class="bc-grid">${bigCard('sun', r.sun, c)}${bigCard('moon', r.moon, c)}${bigCard('rising', r.rising, c)}</div>
      <div class="actions" style="margin-top:18px"><button class="btn pri" id="bcSave">${I.star} Save to My Universe</button><a class="btn" href="#universe">Go to My Universe</a></div>`;
    $('#bcSave').onclick = () => { Store.s.chart = c; if (!Store.s.profile.birth) Store.s.profile.birth = c.date; Store.save(); toast('Your Big Three is saved to My Universe'); };
  };
  $('#bcGo').onclick = () => { const c = read(); if (!birthParts(c.date)) return toast('Enter your birth date'); if (place.value.trim() && !c.place) return toast('Choose your birthplace from the list'); show(c); $('#bcRes').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  if (Store.s.chart && Store.s.chart.date) show(Store.s.chart);
}

function starPos(list) {
  const pts = [];
  list.forEach(n => {
    let h = 7; for (const ch of String(n)) h = (h * 31 + ch.charCodeAt(0) * 17) % 100003;
    let x = 8 + (h % 84), y = 16 + (Math.floor(h / 89) % 66), tries = 0;
    while (pts.some(p => Math.hypot((p.x - x) * 1.6, p.y - y) < 30) && tries < 60) { x = 8 + ((x - 8 + 29) % 84); y = 16 + ((y - 16 + 23) % 66); tries++; }
    pts.push({ n, x, y });
  });
  return pts;
}
const timesWord = c => ['', 'once', 'twice', 'three times', 'four times', 'five times', 'six times', 'seven times', 'eight times', 'nine times', 'ten times'][c] || c + ' times';
function dayLabel(d) { const t = new Date(); t.setHours(0, 0, 0, 0); const x = new Date(d); x.setHours(0, 0, 0, 0); const diff = Math.round((t - x) / 864e5); return diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : new Date(d).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }); }
function lastListen() {
  const s = Store.s.sessions[0]; if (!s) return null;
  if (s.mix) return { kind: 'mix', name: s.mix.name, mix: s.mix, label: s.label };
  if (s.tone) return { kind: 'tone', f: s.tone.f, w: s.tone.w, label: s.label };
  if (s.label.startsWith('Mix: ')) { const name = s.label.slice(5); const m = Store.s.mixes.find(x => x.name === name) || studioPresets().find(x => x.name === name); if (m) return { kind: 'mix', name, mix: m, label: s.label }; }
  return { kind: 'none', label: s.label };
}
function vUniverse() {
  const S = Store.s, prof = S.profile, lp = lifePath(prof.birth), per = personal(prof.birth);
  const week = S.sessions.filter(s => s.end > Date.now() - 7 * 864e5).reduce((a, s) => a + (s.end - s.start), 0) / 60000;
  const jc = {}; S.journal.forEach(j => jc[j.n] = (jc[j.n] || 0) + 1); const top = Object.entries(jc).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const icSpark = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/></svg>';
  const icBook = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/></svg>';
  const lifeCard = lp && per
    ? `<div class="card uv-life"><div class="uv-pair">
        <div><div class="lbl">Life path</div><div class="glow" style="font-size:88px;margin-top:10px">${lp.n}</div><div class="h3" style="font-size:24px">${NUM[lp.n].t}</div><p class="muted" style="font-size:13px;margin-top:6px">${esc(NUM[lp.n].e)}</p></div>
        <div><div class="lbl">Personal year ${per.cy}</div><div class="glow" style="font-size:88px;margin-top:10px">${per.py}</div><div class="h3" style="font-size:24px">A year of ${NUM[per.py].k.toLowerCase()}</div><p class="muted" style="font-size:13px;margin-top:6px">Personal month ${per.pm}, ${NUM[per.pm].k.toLowerCase()}. Personal day ${per.pd}, ${NUM[per.pd].k.toLowerCase()}.</p></div>
      </div><div class="actions" style="margin-top:18px"><a class="btn sm pri" href="#numerology">See your free full report ${I.arrow}</a><button class="btn sm" id="uChange">Change birth date</button></div>${chartMini()}</div>`
    : `<div class="card uv-life"><h2 class="uv-title">Discover your Life Path</h2><p class="muted" style="font-size:14px;margin-top:6px">Enter your birth date to see your Life Path and Personal Year.</p>
        <div class="uv-form"><input class="input" type="date" id="uBirth" value="${esc(prof.birth || '')}" aria-label="Birth date"><button class="btn pri" id="uCalc">Calculate my numbers</button></div><a class="uv-link" href="#chart" style="margin-top:16px;align-self:flex-start">Discover your birth chart ${I.arrow}</a></div>`;
  const favCard = (() => {
    if (!S.favN.length) return `<div class="card"><div class="lbl">Favorite numbers</div><div class="uv-empty"><span class="uv-ic">${icSpark}</span><b>No favorite numbers yet.</b><span>Save numbers that feel meaningful to you.</span><a class="btn sm" href="#explore">Explore numbers</a></div></div>`;
    const pts = starPos(S.favN.slice().reverse());
    const lines = pts.slice(1).map((p, i) => `<line x1="${pts[i].x}" y1="${pts[i].y}" x2="${p.x}" y2="${p.y}"/>`).join('');
    const tip = n => ANGEL[n] ? ANGEL[n][0] : NUM[n] ? NUM[n].t : NUM[analyze(n).root].t;
    return `<div class="card"><div class="lbl">Your constellation</div>
      <div class="uv-sky" role="list" aria-label="Your saved numbers as a constellation"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>
        ${pts.map((p, i) => `<a class="uv-star" role="listitem" href="#n-${p.n}" style="left:${p.x}%;top:${p.y}%;animation-delay:${(i * .37) % 3}s" title="${esc(p.n + ' · ' + tip(p.n))}"><i></i><span>${p.n}</span></a>`).join('')}</div>
      <div class="lbl" style="margin-top:16px">Saved numbers</div>
      <div class="uv-list">${S.favN.map(n => `<a class="row" href="#n-${n}"><span class="glow" style="font-size:28px;min-width:64px">${n}</span><span class="grow"><b>${esc(tip(n))}</b><span>${ANGEL[n] ? 'Angel number' : NUM[n] ? 'Core number' : 'Root ' + analyze(n).root}</span></span>${I.arrow}</a>`).join('')}</div>
      <a class="btn sm" href="#explore" style="margin-top:14px">Explore numbers</a></div>`;
  })();
  const jForm = `<div class="uv-jform" id="jForm"${S.journal.length || pendingJournal ? '' : ' style="display:none"'}>
      <div class="field uv-jn"><label for="jN">Number you saw</label><input class="input" id="jN" placeholder="444" inputmode="numeric" value="${esc(pendingJournal || '')}"></div>
      <div class="field"><label for="jNote">What was happening when you noticed it? <span class="uv-opt">Optional</span></label><input class="input" id="jNote" placeholder="A moment, a place, a feeling" maxlength="200"></div>
      <button class="btn pri" id="jAdd">Log</button></div>`;
  const now = new Date(), monthCounts = {};
  S.journal.forEach(j => { const d = new Date(j.d); if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) monthCounts[j.n] = (monthCounts[j.n] || 0) + 1; });
  const topM = Object.entries(monthCounts).sort((x, y) => y[1] - x[1])[0];
  const insight = topM && topM[1] > 1 ? `You've logged <a href="#n-${topM[0]}">${topM[0]}</a> ${timesWord(topM[1])} this month.` : S.journal.length ? `Your latest sighting was <a href="#n-${S.journal[0].n}">${S.journal[0].n}</a>. Log it again when it returns and patterns will appear here.` : '';
  const groups = []; S.journal.slice(0, 60).forEach((j, i) => { const k = dayLabel(j.d); let g = groups[groups.length - 1]; if (!g || g.k !== k) groups.push(g = { k, items: [] }); g.items.push({ j, i }); });
  const journalCard = S.journal.length || pendingJournal
    ? `<div class="card" id="jCard"><div class="lbl">Number journal</div>${insight ? `<p class="uv-insight">${insight}</p>` : ''}${jForm}
        ${groups.length ? `<div class="uv-tl">${groups.map(g => `<div class="uv-day">${g.k}</div>${g.items.map(({ j, i }) => `<div class="uv-ent"><a href="#n-${j.n}" class="glow">${j.n}</a><div class="grow"><b>${new Date(j.d).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</b><span>${j.note ? esc(j.note) : 'No note'}</span></div><button class="ib" data-dj="${i}" aria-label="Delete entry">${I.trash}</button></div>`).join('')}`).join('')}</div>` : ''}</div>`
    : `<div class="card" id="jCard"><div class="lbl">Number journal</div><div class="uv-empty" id="jEmpty"><span class="uv-ic">${icBook}</span><b>No journal entries yet.</b><span>Log a number and a note to start your journal.</span><button class="btn sm" id="jOpen">Log a number</button></div>${jForm}</div>`;
  const ll = lastListen();
  const listenAction = !ll ? `<a class="btn sm pri" href="#studio">Try Frequency Studio ${I.arrow}</a>`
    : ll.kind === 'none' ? `<a class="uv-link" href="#studio">Open Studio ${I.arrow}</a>`
    : `<button class="btn sm pri" id="uAgain">${I.play} Listen again</button><a class="uv-link" href="#studio">Open Studio ${I.arrow}</a>`;
  app.innerHTML = `<div class="page fade">
    <div class="sechead"><div><div class="kicker">My universe</div><h1 class="h2" style="margin-top:14px">Your private <em>constellation</em></h1><p class="muted" style="margin-top:12px;font-size:15px">Discover your numbers and revisit what you save.</p></div><span class="sync${Cloud.on ? ' on' : ''}"><i></i><span>${Cloud.on ? 'Synced privately to your account' : 'Saved on this device only'}</span></span></div>
    <section class="sec uv-top" style="margin-top:30px">
      ${lifeCard}
      <div class="card uv-listen"><div class="lbl">Listening this week</div><div class="glow" style="font-size:72px;margin-top:12px">${Math.round(week)}</div><div class="h3" style="font-size:22px">minutes</div><div class="uv-foot"><span class="muted" style="font-size:13px">${S.sessions.length ? 'Last session: ' + esc(S.sessions[0].label) : 'Layer tones, binaural beats and ambience to start your first session.'}</span><div class="actions">${listenAction}</div></div></div>
    </section>
    <section class="sec grid g2" style="margin-top:14px">${favCard}${journalCard}</section>
    <section class="sec grid g2">
      <div class="card"><div class="lbl">My frequencies</div>${S.myF.length ? S.myF.map((m, i) => `<div class="row"><div class="grow"><b>${esc(m.name)}</b><span>${fmtHz(m.f)} · ${m.w === 'sawtooth' ? 'saw' : m.w} · ${noteOf(m.f)}</span></div><button class="btn sm" data-myplay="${i}">${I.play}</button><a class="btn sm" href="#${fKey(m.f)}">Open</a><button class="ib" data-mydel="${i}" aria-label="Delete frequency">${I.trash}</button></div>`).join('') : '<div class="empty">Create one on the home page and save it here.</div>'}
        <div class="lbl" style="margin-top:22px">Favorite frequencies</div><div class="chips" style="margin-top:12px">${S.favF.length ? S.favF.map(f => `<a class="chip" href="#${fKey(+f)}"><b>${fmtHz(+f)}</b>${FREQ[f] ? ' ' + esc(FREQ[f].n) : ''}</a>`).join('') : '<span class="empty">Tap the star on any frequency.</span>'}</div>
        <div class="lbl" style="margin-top:22px">Recently explored</div><div class="chips" style="margin-top:12px">${S.recents.length ? S.recents.map(r => { const [t, v] = r.split(':'); return t === 'n' ? `<a class="chip" href="#n-${v}"><b>${v}</b></a>` : `<a class="chip" href="#${fKey(+v)}"><b>${fmtHz(+v)}</b></a>`; }).join('') : '<span class="empty">Your discoveries will gather here.</span>'}</div></div>
      <div class="card"><div class="lbl">Saved mixes</div>${S.mixes.length ? S.mixes.map((m, i) => `<div class="row"><div class="grow"><b>${esc(m.name)}</b><span>${m.layers.length} layers</span></div><button class="btn sm" data-um="${i}">${I.play} Play</button></div>`).join('') : '<div class="empty">Save a mix in the Studio.</div>'}
        <div class="lbl" style="margin-top:22px">Listening history</div>${S.sessions.length ? S.sessions.slice(0, 8).map(s => `<div class="row"><div class="grow"><b>${esc(s.label)}</b><span>${new Date(s.start).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} · ${Math.max(1, Math.round((s.end - s.start) / 60000))} min</span></div></div>`).join('') : '<div class="empty">Nothing yet.</div>'}</div>
    </section>
    <section class="sec grid g3">
      <div class="tier"><div class="lbl">Free, always</div><h4>Explorer</h4><ul class="list" style="margin-top:10px"><li>Every number, angel number and frequency page</li><li>Basic numerology calculations</li><li>Single tone player and educational content</li></ul></div>
      <div class="tier plus"><div class="lbl gold">Coming soon</div><h4>Universe <span class="plus">PLUS</span></h4><ul class="list warm" style="margin-top:10px"><li>Advanced mixer and unlimited saved mixes</li><li>Extended listening sessions and timers</li><li>Full numerology reports and expanded journal</li><li>Premium soundscapes and visual themes</li></ul></div>
      <div class="card tight"><div class="lbl">Your data</div><p class="muted" style="font-size:13px;margin-top:8px">${Cloud.on ? 'Your details are private to you: not visible to other visitors and never shared.' : 'Your details are saved only in this browser on this device. Nothing is sent anywhere.'}</p><div class="actions" style="margin-top:12px"><button class="btn sm" id="uExport">Copy my data</button><button class="btn sm" id="uClear">Erase everything</button></div></div>
    </section>
  </div>`;
  const calc = $('#uCalc');
  if (calc) { const go = () => { const b = $('#uBirth').value; if (!birthParts(b)) return toast('Enter your birth date'); Store.s.profile = { ...Store.s.profile, birth: b }; Store.save(); vUniverse(); }; calc.onclick = go; $('#uBirth').onkeydown = e => { if (e.key === 'Enter') go(); }; }
  const chg = $('#uChange');
  if (chg) chg.onclick = () => { const card = $('.uv-life'); card.innerHTML = `<h2 class="uv-title">Discover your Life Path</h2><p class="muted" style="font-size:14px;margin-top:6px">Enter your birth date to see your Life Path and Personal Year.</p><div class="uv-form"><input class="input" type="date" id="uBirth" value="${esc(prof.birth || '')}" aria-label="Birth date"><button class="btn pri" id="uCalc">Calculate my numbers</button></div>`; $('#uCalc').onclick = () => { const b = $('#uBirth').value; if (!birthParts(b)) return toast('Enter your birth date'); Store.s.profile = { ...Store.s.profile, birth: b }; Store.save(); vUniverse(); }; $('#uBirth').focus(); };
  const jo = $('#jOpen'); if (jo) jo.onclick = () => { $('#jEmpty').style.display = 'none'; $('#jForm').style.display = ''; $('#jN').focus(); };
  if (pendingJournal) { pendingJournal = null; setTimeout(() => { const c = $('#jCard'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'center' }); $('#jNote').focus({ preventScroll: true }); }, 120); }
  const ag = $('#uAgain');
  if (ag) { const sync = () => { const on = ll.kind === 'mix' ? M.playing && M.name === ll.name : !!T.node && T.f === ll.f; ag.innerHTML = on ? I.stop + ' Stop' : I.play + ' Listen again'; };
    ag.onclick = () => { if (ll.kind === 'mix') { if (M.playing && M.name === ll.name) mixStop(); else loadMix(ll.mix, true); } else { if (T.node && T.f === ll.f) toneStop(); else { T.w = ll.w || 'sine'; toneStart(ll.f, ll.label, 'mine'); } } sync(); }; sync(); }
  const add = () => { const n = $('#jN').value.replace(/\D/g, '').slice(0, 15); if (!n) return toast('Enter the number you saw'); Store.s.journal.unshift({ d: new Date().toISOString(), n, note: $('#jNote').value.trim() }); Store.save(); toast('Logged in your journal'); vUniverse(); };
  $('#jAdd').onclick = add; $('#jNote').onkeydown = e => { if (e.key === 'Enter') add(); }; $('#jN').onkeydown = e => { if (e.key === 'Enter') add(); };
  $$('[data-dj]').forEach(b => b.onclick = () => { Store.s.journal.splice(+b.dataset.dj, 1); Store.save(); vUniverse(); });
  $$('[data-myplay]').forEach(b => b.onclick = () => { const m = Store.s.myF[+b.dataset.myplay]; if (T.node && T.src === 'mine' && T.f === m.f) { toneStop(); return; } T.w = m.w; toneStart(m.f, m.name + ' · ' + fmtHz(m.f), 'mine'); });
  $$('[data-mydel]').forEach(b => b.onclick = () => { Store.s.myF.splice(+b.dataset.mydel, 1); Store.save(); vUniverse(); });
  $$('[data-um]').forEach(b => b.onclick = () => loadMix(Store.s.mixes[+b.dataset.um], true));
  $('#uExport').onclick = async () => { try { await navigator.clipboard.writeText(JSON.stringify(Store.s, null, 2)); toast('Your data is copied'); } catch (e) { toast('Copy is not available here'); } };
  let armed = false; $('#uClear').onclick = e => { if (!armed) { armed = true; e.target.textContent = 'Tap again to erase'; setTimeout(() => { armed = false; e.target.textContent = 'Erase everything'; }, 3000); return; } Store.s = { favN: [], favF: [], myF: [], recents: [], mixes: [], journal: [], sessions: [], profile: { birth: '', name: '' }, updated: 0 }; Store.save(); toast('Everything erased'); vUniverse(); };
}

function vBlueprint() {
  app.innerHTML = `<div class="page fade bp">
    <div class="kicker">Product blueprint</div><h1 class="h2" style="margin-top:14px">How The Number Universe <em>grows</em></h1>
    <p class="lead" style="margin-top:14px">Strategy, identity, architecture and data model behind this prototype.</p>
    <section class="sec grid g2">
      <div class="card"><h3>Where it wins</h3><ul>
        <li><b>Trust as the brand.</b> Competitors blend numerology, spirituality and pseudo science. Three labeled lenses and an evidence badge on every claim is a position nobody else holds.</li>
        <li><b>Everything plays.</b> Every number has a live, accurate tone and visual, not a YouTube embed.</li>
        <li><b>Feeling first entry.</b> Search by intention meets people where they are.</li>
        <li><b>A daily ritual.</b> Number and frequency of the day, personal day, and a journal for sightings give reasons to return.</li>
        <li><b>Gallery grade design.</b> Restraint, space and light instead of mystical clip art.</li></ul></div>
      <div class="card"><h3>Visual identity</h3><p>A luxury gallery meeting a sound laboratory. Cormorant Garamond for numbers and headlines, Manrope for interface, IBM Plex Mono for measurements. Glow is reserved for numbers. Motion is slow and continuous, reacting to sound.</p>
        <div class="swatch">${[['#04050a', 'Deep black'], ['#0a0f24', 'Midnight'], ['#11131d', 'Charcoal'], ['#a593ff', 'Violet'], ['#5fb3ff', 'Electric blue'], ['#cfd3e0', 'Silver'], ['#d9bd7f', 'Gold']].map(([c, n]) => `<div><i style="background:${c}"></i><span>${n}<br>${c}</span></div>`).join('')}</div></div>
    </section>
    <section class="sec grid g2">
      <div class="card"><h3>Recommended stack</h3><ul>
        <li><b>Next.js</b> with static generation for every number, angel number and frequency page, so each one is indexable.</li>
        <li><b>React Three Fiber</b> for the universe scene, with a 2D fallback on low power devices.</li>
        <li><b>Audio engine</b> as a standalone Web Audio module, shared across pages, with an AudioWorklet for premium soundscapes.</li>
        <li><b>Postgres and Prisma</b> for content and user data, with a full text search index for instant results.</li>
        <li><b>Auth.js</b> for optional accounts, <b>Stripe Billing</b> for Universe Plus.</li>
        <li><b>GitHub to Render</b> deploys with a CDN in front, matching your existing sites.</li></ul></div>
      <div class="card"><h3>Content and data model</h3><div class="schema">numbers        (value, root, is_master, patterns[])
interpretations(number, lens, area, body, source_id)
  lens: numerology | angel | culture
  area: essence | love | career | money | growth
frequencies    (hz, name, zone, is_tradition)
claims         (subject, body, evidence, source_id)
  evidence: established | limited | none
sources        (title, author, year, url)
intentions     (slug, name, basis, numbers[], hz[])
mixes          (user_id, name, layers jsonb)
journal        (user_id, number, note, seen_at)
sessions       (user_id, label, started, ended)
profiles       (user_id, birth_date, name)  encrypted</div></div>
    </section>
    <section class="sec card"><h3>Roadmap</h3><div class="grid g3" style="margin-top:10px">
      <div><div class="lbl">Now · prototype</div><p style="margin-top:8px">Search, number and frequency templates, numerology tools, studio with timer, intentions, private dashboard.</p></div>
      <div><div class="lbl">Next · launch</div><p style="margin-top:8px">Accounts, thousands of static SEO pages, cited sources in every claim, a deeper content library, analytics.</p></div>
      <div><div class="lbl">Later · Plus</div><p style="margin-top:8px">Recorded premium soundscapes, full reports, visual themes, a mobile app with daily notifications and offline listening.</p></div>
    </div></section>
  </div>`;
}


function vPrivacy() {
  app.innerHTML = `<div class="page fade bp" style="max-width:860px">
    <div class="kicker">Privacy</div><h1 class="h2" style="margin-top:14px">Your universe <em>stays yours</em></h1>
    <p class="lead" style="margin-top:14px">Last updated ${new Date(2026, 10, 15).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</p>
    <section class="sec card"><h3>What we store</h3><p>Only what you choose to enter: an optional birth date and name for numerology, an optional birth time and birthplace for your birth chart, favorite numbers and frequencies, saved mixes, journal entries, recently explored pages and listening history.</p></section>
    <section class="sec card"><h3>Where it lives</h3><p>All of it is saved in your own browser on your own device. It is not sent to our servers, it is not shared or sold, and there are no accounts. Clearing your browser data, or using Erase everything in My Universe, deletes it completely.</p></section>
    <section class="sec card"><h3>What we do not do</h3><ul><li>No advertising trackers and no selling of data.</li><li>No cookies are required to use the site.</li><li>Sound is generated on your device. Nothing you play is recorded.</li></ul></section>
    <section class="sec card"><h3>About the content</h3><p>Numerology and angel number meanings are spiritual and cultural traditions, not scientific findings or predictions. Frequency information describes physical sound, with an evidence rating for any claim. Nothing on this site is medical advice.</p></section>
    <section class="sec card"><h3>Changes</h3><p>If accounts or analytics are added in the future, this page will be updated first and will explain exactly what changes.</p></section>
  </div>`;
}

/* ---------- router ---------- */
function route() {
  const h = decodeURIComponent((location.hash || '#home').slice(1)) || 'home';
  Scopes.length = 0;
  if (T.node && !h.startsWith('n-') && !h.startsWith('f-') && h !== 'home' && h !== 'universe' && h !== 'chart') toneStop();
  let key = h;
  if (h.startsWith('n-')) { key = 'number'; vNumber(h.slice(2)); }
  else if (h.startsWith('f-')) { key = 'freq'; vFreq(parseFKey(h.slice(2))); }
  else ({ home: vHome, explore: vExplore, angel: vAngel, numerology: vNumerology, studio: vStudio, intention: vIntention, universe: vUniverse, blueprint: vBlueprint, privacy: vPrivacy, chart: vChart }[h] || (key = 'home', vHome))();
  current = key;
  if (key !== 'number' && key !== 'freq') document.title = 'The Number Universe' + (key === 'home' ? '' : ' · ' + ({ explore: 'Explore Numbers', angel: 'Angel Numbers', numerology: 'Numerology', studio: 'Frequency Studio', intention: 'Discover by Intention', universe: 'My Universe', blueprint: 'Blueprint', privacy: 'Privacy', chart: 'Your Birth Chart' }[key] || ''));
  document.body.classList.toggle('inner', key !== 'home');
  $$('.navlinks a').forEach(a => a.classList.toggle('on', a.dataset.r === key));
  $('#navlinks').classList.remove('open');
  window.scrollTo(0, 0);
  onAudio();
}

/* ---------- boot ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-back]'); if (b) { if (history.length > 1) history.back(); else location.hash = b.dataset.back; return; }
  const sc = e.target.closest('[data-scroll]'); if (sc) { e.preventDefault(); const t = document.getElementById(sc.dataset.scroll); if (t) t.scrollIntoView({ behavior: 'smooth' }); }
});
Store.load();
addEventListener('hashchange', route);
$('#navsearch').onclick = openPalette;
$('#burger').onclick = () => $('#navlinks').classList.toggle('open');
$('#dStop').onclick = stopAll;
const vol = $('#dVol'); fillRange(vol); vol.oninput = () => { E.vol = +vol.value; fillRange(vol); if (E.master) E.master.gain.setTargetAtTime(E.vol, E.ac.currentTime, .03); };
addEventListener('keydown', e => {
  if (e.key === 'Escape') { stopAll(); closePalette(); $('#modal').classList.remove('open'); return; }
  const tag = (document.activeElement && document.activeElement.tagName) || '';
  if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); const hs = $('#app [data-search] input'); if (hs && current === 'home') hs.focus(); else openPalette(); }
});
initBG(); route(); requestAnimationFrame(frame); Cloud.init();
})();
