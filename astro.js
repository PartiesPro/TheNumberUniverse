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

  return { SIGNS, compute, deg, sunLon, moonLon, ascendant, localToUTC, jd };
})();
