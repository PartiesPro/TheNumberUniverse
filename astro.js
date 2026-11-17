/* The Number Universe: birth chart engine.
   Tropical zodiac. Sun, Moon and Ascendant from standard low precision
   astronomical formulas (Meeus), accurate to well under one degree. */
window.ASTRO = (function () {
  const R = Math.PI / 180, norm = x => ((x % 360) + 360) % 360;

  const SIGNS = [
    { n: 'Aries', s: '♈', el: 'Fire', mo: 'Cardinal', ru: 'Mars', d: 'Mar 21 to Apr 19',
      sun: 'Bold, direct and driven to begin. Your core self wants to lead, act and test its courage.',
      moon: 'Feelings flare quickly and pass quickly. You process emotion through action and need room to be independent.',
      rise: 'You come across as energetic, frank and ready to go, often the first to speak up.' },
    { n: 'Taurus', s: '♉', el: 'Earth', mo: 'Fixed', ru: 'Venus', d: 'Apr 20 to May 20',
      sun: 'Steady, sensual and loyal. Your core self values comfort, beauty and things built to last.',
      moon: 'You feel safest with routine, good food and familiar people. Calm returns through the senses.',
      rise: 'You come across as calm, grounded and quietly confident, with an eye for quality.' },
    { n: 'Gemini', s: '♊', el: 'Air', mo: 'Mutable', ru: 'Mercury', d: 'May 21 to Jun 20',
      sun: 'Curious, quick and sociable. Your core self lives through ideas, conversation and variety.',
      moon: 'You make sense of feelings by talking them through. A restless mind needs stimulation to feel settled.',
      rise: 'You come across as lively, witty and approachable, full of questions.' },
    { n: 'Cancer', s: '♋', el: 'Water', mo: 'Cardinal', ru: 'the Moon', d: 'Jun 21 to Jul 22',
      sun: 'Protective, intuitive and devoted to home. Your core self is built around care and belonging.',
      moon: 'The Moon is at home here. Emotions run deep, memory is long, and you need a safe place to return to.',
      rise: 'You come across as warm, gentle and a little reserved until trust is earned.' },
    { n: 'Leo', s: '♌', el: 'Fire', mo: 'Fixed', ru: 'the Sun', d: 'Jul 23 to Aug 22',
      sun: 'Warm, expressive and generous. Your core self wants to create, shine and live wholeheartedly.',
      moon: 'You need to feel seen and appreciated. Affection and play restore you.',
      rise: 'You come across as radiant and confident, with a natural presence in any room.' },
    { n: 'Virgo', s: '♍', el: 'Earth', mo: 'Mutable', ru: 'Mercury', d: 'Aug 23 to Sep 22',
      sun: 'Thoughtful, precise and helpful. Your core self finds meaning in improving things and being useful.',
      moon: 'You calm yourself by organizing and solving. Worry eases when life has order.',
      rise: 'You come across as composed, observant and polished, noticing every detail.' },
    { n: 'Libra', s: '♎', el: 'Air', mo: 'Cardinal', ru: 'Venus', d: 'Sep 23 to Oct 22',
      sun: 'Graceful, fair and relationship minded. Your core self seeks harmony, beauty and balance.',
      moon: 'Conflict unsettles you. You feel best in peaceful surroundings and good company.',
      rise: 'You come across as charming, diplomatic and easy to be around.' },
    { n: 'Scorpio', s: '♏', el: 'Water', mo: 'Fixed', ru: 'Pluto and Mars', d: 'Oct 23 to Nov 21',
      sun: 'Intense, private and perceptive. Your core self seeks depth, truth and transformation.',
      moon: 'Feelings are powerful and guarded. Trust is everything, and loyalty runs deep.',
      rise: 'You come across as magnetic and self contained, with a gaze that misses little.' },
    { n: 'Sagittarius', s: '♐', el: 'Fire', mo: 'Mutable', ru: 'Jupiter', d: 'Nov 22 to Dec 21',
      sun: 'Adventurous, optimistic and philosophical. Your core self wants freedom, meaning and wide horizons.',
      moon: 'You need space and something to look forward to. Humor and travel lift your mood.',
      rise: 'You come across as open, upbeat and candid, ready for whatever comes next.' },
    { n: 'Capricorn', s: '♑', el: 'Earth', mo: 'Cardinal', ru: 'Saturn', d: 'Dec 22 to Jan 19',
      sun: 'Ambitious, disciplined and responsible. Your core self builds patiently toward lasting goals.',
      moon: 'You hold feelings close and find security in achievement and structure.',
      rise: 'You come across as capable, serious and mature beyond your years.' },
    { n: 'Aquarius', s: '♒', el: 'Air', mo: 'Fixed', ru: 'Uranus and Saturn', d: 'Jan 20 to Feb 18',
      sun: 'Independent, inventive and humanitarian. Your core self thinks ahead and values originality.',
      moon: 'You process emotion through perspective and need freedom within your closest bonds.',
      rise: 'You come across as friendly yet unconventional, a little apart from the crowd.' },
    { n: 'Pisces', s: '♓', el: 'Water', mo: 'Mutable', ru: 'Neptune and Jupiter', d: 'Feb 19 to Mar 20',
      sun: 'Imaginative, compassionate and intuitive. Your core self moves between dreams and empathy.',
      moon: 'You absorb the feelings around you. Music, art and quiet time help you reset.',
      rise: 'You come across as gentle, dreamy and kind, with a soft and receptive presence.' }
  ];

  const jd = ms => ms / 864e5 + 2440587.5;
  const cent = J => (J - 2451545) / 36525;

  function sunLon(J) {
    const T = cent(J), L0 = 280.46646 + 36000.76983 * T + .0003032 * T * T, M = (357.52911 + 35999.05029 * T - .0001537 * T * T) * R;
    const C = (1.914602 - .004817 * T - .000014 * T * T) * Math.sin(M) + (.019993 - .000101 * T) * Math.sin(2 * M) + .000289 * Math.sin(3 * M);
    const om = (125.04 - 1934.136 * T) * R;
    return norm(L0 + C - .00569 - .00478 * Math.sin(om));
  }
  function moonLon(J) {
    const T = cent(J);
    const Lp = 218.3164477 + 481267.88123421 * T, D = (297.8501921 + 445267.1114034 * T) * R, M = (357.5291092 + 35999.0502909 * T) * R,
      Mp = (134.9633964 + 477198.8675055 * T) * R, F = (93.272095 + 483202.0175233 * T) * R, E = 1 - .002516 * T;
    const s = Math.sin;
    const l = 6.288774 * s(Mp) + 1.274027 * s(2 * D - Mp) + .658314 * s(2 * D) + .213618 * s(2 * Mp) - .185116 * E * s(M) - .114332 * s(2 * F)
      + .058793 * s(2 * D - 2 * Mp) + .057066 * E * s(2 * D - M - Mp) + .053322 * s(2 * D + Mp) + .045758 * E * s(2 * D - M) - .040923 * E * s(M - Mp)
      - .03472 * s(D) - .030383 * E * s(M + Mp) + .015327 * s(2 * D - 2 * F) - .012528 * s(Mp + 2 * F) + .01098 * s(Mp - 2 * F) + .010675 * s(4 * D - Mp)
      + .010034 * s(3 * Mp) + .008548 * s(4 * D - 2 * Mp) - .007888 * E * s(2 * D + M - Mp) - .006766 * E * s(2 * D + M) - .005163 * s(D - Mp)
      + .004987 * E * s(D + M) + .004036 * E * s(2 * D - M + Mp) + .003994 * s(2 * D + 2 * Mp) + .003861 * s(4 * D) + .003665 * s(2 * D - 3 * Mp);
    return norm(Lp + l);
  }
  function ascendant(J, lat, lon) {
    const T = cent(J);
    const gmst = norm(280.46061837 + 360.98564736629 * (J - 2451545) + .000387933 * T * T - T * T * T / 38710000);
    const th = norm(gmst + lon) * R, eps = (23.4392911 - .0130042 * T) * R, ph = lat * R;
    return norm(Math.atan2(Math.cos(th), -(Math.sin(th) * Math.cos(eps) + Math.tan(ph) * Math.sin(eps))) / R);
  }

  /* offset in minutes of an IANA zone at a UTC instant */
  function tzOffset(ms, tz) {
    const p = {}; new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).formatToParts(new Date(ms)).forEach(x => p[x.type] = x.value);
    return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - ms) / 60000;
  }
  /* local wall time in a zone to a UTC instant */
  function localToUTC(y, m, d, h, mi, tz) {
    const guess = Date.UTC(y, m - 1, d, h, mi);
    let ms = guess - tzOffset(guess, tz) * 60000;
    ms = guess - tzOffset(ms, tz) * 60000;
    return ms;
  }

  const signOf = lon => Math.floor(norm(lon) / 30);
  const deg = lon => { const x = norm(lon) % 30; return Math.floor(x) + '°' + String(Math.floor((x % 1) * 60)).padStart(2, '0') + '′'; };

  /* date: YYYY-MM-DD, time: HH:MM or '', place: {lat, lon, tz} or null */
  function compute(date, time, place) {
    const [y, m, d] = date.split('-').map(Number);
    const out = { exact: !!(time && place) };
    if (time && place) {
      const [h, mi] = time.split(':').map(Number);
      const J = jd(localToUTC(y, m, d, h, mi, place.tz));
      const s = sunLon(J), mo = moonLon(J), a = ascendant(J, place.lat, place.lon);
      out.sun = { i: [signOf(s)], lon: s }; out.moon = { i: [signOf(mo)], lon: mo }; out.rising = { i: [signOf(a)], lon: a };
      return out;
    }
    let t0, t1;
    if (time) {
      const [h, mi] = time.split(':').map(Number); const base = Date.UTC(y, m - 1, d, h, mi);
      t0 = base - 14 * 36e5; t1 = base + 12 * 36e5;
    } else if (place) {
      t0 = localToUTC(y, m, d, 0, 0, place.tz); t1 = localToUTC(y, m, d, 23, 59, place.tz);
    } else {
      t0 = Date.UTC(y, m - 1, d, 0, 0) - 12 * 36e5; t1 = Date.UTC(y, m - 1, d, 23, 59) + 14 * 36e5;
    }
    const range = fn => { const a = signOf(fn(jd(t0))), b = signOf(fn(jd(t1))); return a === b ? [a] : [a, b]; };
    out.sun = { i: range(sunLon) }; out.moon = { i: range(moonLon) }; out.rising = null;
    if (out.sun.i.length === 1 && time) out.sun.lon = sunLon(jd((t0 + t1) / 2));
    return out;
  }


  /* Planets: JPL approximate Keplerian elements (valid 1800 to 2050), J2000 ecliptic, then precessed to date */
  const EL = {
    mercury: [0.38709927, 0.00000037, 0.20563593, 0.00001906, 7.00497902, -0.00594749, 252.25032350, 149472.67411175, 77.45779628, 0.16047689, 48.33076593, -0.12534081],
    venus: [0.72333566, 0.00000390, 0.00677672, -0.00004107, 3.39467605, -0.00078890, 181.97909950, 58517.81538729, 131.60246718, 0.00268329, 76.67984255, -0.27769418],
    earth: [1.00000261, 0.00000562, 0.01671123, -0.00004392, -0.00001531, -0.01294668, 100.46457166, 35999.37244981, 102.93768193, 0.32327364, 0, 0],
    mars: [1.52371034, 0.00001847, 0.09339410, 0.00007882, 1.84969142, -0.00813131, -4.55343205, 19140.30268499, -23.94362959, 0.44441088, 49.55953891, -0.29257343],
    jupiter: [5.20288700, -0.00011607, 0.04838624, -0.00013253, 1.30439695, -0.00183714, 34.39644051, 3034.74612775, 14.72847983, 0.21252668, 100.47390909, 0.20469106],
    saturn: [9.53667594, -0.00125060, 0.05386179, -0.00050991, 2.48599187, 0.00193609, 49.95424423, 1222.49362201, 92.59887831, -0.41897216, 113.66242448, -0.28867794],
    uranus: [19.18916464, -0.00196176, 0.04725744, -0.00004397, 0.77263783, -0.00242939, 313.23810451, 428.48202785, 170.95427630, 0.40805281, 74.01692503, 0.04240589],
    neptune: [30.06992276, 0.00026291, 0.00859048, 0.00005105, 1.77004347, 0.00035372, -55.12002969, 218.45945325, 44.96476227, -0.32241464, 131.78422574, -0.00508664],
    pluto: [39.48211675, -0.00031596, 0.24882730, 0.00005170, 17.14001206, 0.00004818, 238.92903833, 145.20780515, 224.06891629, -0.04062942, 110.30393684, -0.01183482]
  };
  function helio(k, T) {
    const e0 = EL[k], a = e0[0] + e0[1] * T, e = e0[2] + e0[3] * T, I = (e0[4] + e0[5] * T) * R, L = e0[6] + e0[7] * T, wb = e0[8] + e0[9] * T, Om = e0[10] + e0[11] * T;
    const w = (wb - Om) * R, O = Om * R; let M = norm(L - wb); if (M > 180) M -= 360; M *= R;
    let E = M + e * Math.sin(M); for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    const xp = a * (Math.cos(E) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
    return [(cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp, (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp, (sw * sI) * xp + (cw * sI) * yp];
  }
  function planetLon(k, J) {
    const T = cent(J), p = helio(k, T), ea = helio('earth', T);
    return norm(Math.atan2(p[1] - ea[1], p[0] - ea[0]) / R + 1.396971 * T + .0003086 * T * T);
  }
  function mc(J, lon) {
    const T = cent(J), gmst = norm(280.46061837 + 360.98564736629 * (J - 2451545) + .000387933 * T * T - T * T * T / 38710000);
    const th = norm(gmst + lon) * R, eps = (23.4392911 - .0130042 * T) * R;
    return { mc: norm(Math.atan2(Math.sin(th), Math.cos(th) * Math.cos(eps)) / R), ramc: th / R, eps };
  }
  /* Placidus houses, with Porphyry used near the poles where Placidus is undefined */
  function houses(J, lat, lon) {
    const { mc: M, ramc, eps } = mc(J, lon), A = ascendant(J, lat, lon), ph = lat * R;
    const lamOfRA = r => norm(Math.atan2(Math.sin(r * R), Math.cos(r * R) * Math.cos(eps)) / R);
    const cusp = (frac, below) => {
      let r = ramc + (below ? 180 - 90 * frac : 90 * frac), ok = true;
      for (let i = 0; i < 30; i++) {
        const l = lamOfRA(r) * R, d = Math.asin(Math.sin(eps) * Math.sin(l)), x = Math.tan(ph) * Math.tan(d);
        if (Math.abs(x) >= 1) { ok = false; break; }
        const ad = Math.asin(x) / R;
        const nr = below ? ramc + 180 - frac * (90 - ad) : ramc + frac * (90 + ad);
        if (Math.abs(nr - r) < 1e-7) { r = nr; break; } r = nr;
      }
      return ok ? lamOfRA(r) : null;
    };
    let c11 = cusp(1 / 3, false), c12 = cusp(2 / 3, false), c2 = cusp(2 / 3, true), c3 = cusp(1 / 3, true), sys = 'Placidus';
    if ([c11, c12, c2, c3].some(x => x === null)) {
      sys = 'Porphyry'; const q1 = norm(A - M), q2 = norm(M + 180 - A);
      c11 = norm(M + q1 / 3); c12 = norm(M + 2 * q1 / 3); c2 = norm(A + q2 / 3); c3 = norm(A + 2 * q2 / 3);
    }
    const cs = [A, c2, c3, norm(M + 180), norm(c11 + 180), norm(c12 + 180), norm(A + 180), norm(c2 + 180), norm(c3 + 180), M, c11, c12];
    return { cusps: cs, asc: A, mc: M, sys };
  }
  const houseOf = (lonv, cs) => { for (let i = 0; i < 12; i++) { const a = cs[i], b = cs[(i + 1) % 12], span = norm(b - a); if (norm(lonv - a) < span) return i + 1; } return 1; };

  const PLANETS = [
    ['sun', 'Sun', '☉', 'your core identity'], ['moon', 'Moon', '☽', 'your emotional world'], ['mercury', 'Mercury', '☿', 'how you think and communicate'],
    ['venus', 'Venus', '♀', 'how you love and what you value'], ['mars', 'Mars', '♂', 'how you act and go after what you want'], ['jupiter', 'Jupiter', '♃', 'where you grow and find luck'],
    ['saturn', 'Saturn', '♄', 'where you build discipline and learn lessons'], ['uranus', 'Uranus', '♅', 'where you break from convention'], ['neptune', 'Neptune', '♆', 'where you dream and idealize'], ['pluto', 'Pluto', '♇', 'where you transform']
  ];
  const STYLE = ['bold and direct', 'steady and sensual', 'curious and quick', 'protective and intuitive', 'warm and expressive', 'precise and helpful', 'graceful and fair', 'intense and perceptive', 'adventurous and candid', 'disciplined and ambitious', 'inventive and independent', 'imaginative and compassionate'];
  const HOUSES = ['self and first impressions', 'money and personal values', 'communication and your local world', 'home, family and roots', 'creativity, play and romance', 'work, health and daily routines', 'partnership and close relationships', 'intimacy, shared resources and change', 'travel, learning and beliefs', 'career and public life', 'friends, community and hopes', 'solitude, the unconscious and spirituality'];
  const ASPECTS = [[0, 'Conjunction', '☌', 8, 'n'], [60, 'Sextile', '⚹', 4, 'h'], [90, 'Square', '□', 7, 'c'], [120, 'Trine', '△', 7, 'h'], [180, 'Opposition', '☍', 8, 'c']];

  function lonAt(k, J) { return k === 'sun' ? sunLon(J) : k === 'moon' ? moonLon(J) : planetLon(k, J); }
  /* full chart: exact when time and place are known, otherwise noon positions without houses */
  function full(date, time, place) {
    const [y, m, d] = date.split('-').map(Number);
    let ms, exact = !!(time && place);
    if (exact) { const [h, mi] = time.split(':').map(Number); ms = localToUTC(y, m, d, h, mi, place.tz); }
    else if (place) ms = localToUTC(y, m, d, 12, 0, place.tz);
    else if (time) { const [h, mi] = time.split(':').map(Number); ms = Date.UTC(y, m - 1, d, h, mi); }
    else ms = Date.UTC(y, m - 1, d, 12, 0);
    const J = jd(ms);
    const H = exact ? houses(J, place.lat, place.lon) : null;
    const bodies = PLANETS.map(([k, n, g, mean]) => {
      const lonv = lonAt(k, J), retro = k !== 'sun' && k !== 'moon' && norm(lonAt(k, J + .5) - lonAt(k, J - .5) + 180) - 180 < 0;
      return { k, n, g, mean, lon: lonv, sign: signOf(lonv), retro, house: H ? houseOf(lonv, H.cusps) : null };
    });
    const asp = [];
    for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
      const sep = Math.abs(norm(bodies[i].lon - bodies[j].lon + 180) - 180);
      for (const [ang, nm, gl, orb, kind] of ASPECTS) { const off = Math.abs(sep - ang); if (off <= orb) { asp.push({ a: bodies[i], b: bodies[j], nm, gl, kind, orb: off }); break; } }
    }
    asp.sort((p, q) => p.orb - q.orb);
    return { exact, bodies, houses: H, aspects: asp, moonApprox: !exact };
  }

  return { SIGNS, compute, deg, sunLon, moonLon, ascendant, localToUTC, jd, planetLon, houses, full, PLANETS, STYLE, HOUSES, mc };
})();
